<script lang="ts">
    import { onMount } from 'svelte';
    import {
        getInventaire, getStuffs, getPersonnageCompetences,
        equiperItem, desequiperItem, utiliserConsommable,
        equiperCompetence, desequiperCompetence, vendreItem,
    } from '$lib/db';
    import { refreshCharacterStore } from '$lib/stores';
    import type { stuff, inventaire, PersonnageCompetence, Competence } from '$lib/types';
    import { ELEMENT_ICONS } from '$lib/icons';

    type InvItem = inventaire & { stuff: stuff };
    type PcItem  = PersonnageCompetence & { competence: Competence };

    let items       = $state<InvItem[]>([]);
    let competences = $state<PcItem[]>([]);
    let erreur      = $state('');

    // Filtres inventaire
    let filtreCategorie = $state<'tous' | 'arme' | 'armure' | 'utilitaire'>('tous');
    let filtreRarete    = $state<'tous' | 'commun' | 'peu_commun' | 'rare' | 'epique' | 'legendaire'>('tous');
    let filtresInvOuverts = $state(false);

    // Filtres compétences
    let filtreCompRarete  = $state('tous');
    let filtreCompElement = $state('tous');
    let filtresCompOuverts = $state(false);

    const ELEMENTS = ['neutre','surnaturel','technologie','feu','eau','terre','air','vie','mort','tenebres','lumiere'];

    async function charger() {
        const inv    = await getInventaire(1);
        const stuffs = await getStuffs();
        items = inv
            .map(i => ({ ...i, stuff: stuffs.find(s => s.id === i.stuff_id)! }))
            .filter(i => i.stuff);
        competences = await getPersonnageCompetences(1);
    }

    onMount(charger);

    async function agirItem(item: InvItem) {
        erreur = '';
        try {
            if (item.stuff.slot === 'consommable') {
                await utiliserConsommable(1, item.id);
                await refreshCharacterStore();
            } else if (item.est_equipe) {
                await desequiperItem(item.id);
            } else {
                await equiperItem(1, item.id);
            }
            await charger();
        } catch (e: any) { erreur = e.message ?? String(e); }
    }

    async function vendre(item: InvItem) {
        erreur = '';
        try {
            const prix = await vendreItem(1, item.id);
            await refreshCharacterStore();
            await charger();
            erreur = ''; // clear any previous error
            // brief success hint via erreur field repurposed — show as succes
            succes = `+${prix}g 💰`;
            if (succesTimer) clearTimeout(succesTimer);
            succesTimer = setTimeout(() => succes = '', 2000);
        } catch (e: any) { erreur = e.message ?? String(e); }
    }

    let succes = $state('');
    let succesTimer: ReturnType<typeof setTimeout> | null = null;

    async function agirComp(pc: PcItem) {
        erreur = '';
        try {
            if (pc.est_equipee) {
                await desequiperCompetence(pc.id);
            } else {
                await equiperCompetence(1, pc.id);
            }
            await charger();
        } catch (e: any) { erreur = e.message ?? String(e); }
    }

    let equipes = $derived(items.filter(i => i.est_equipe));
    let inventaireFiltré = $derived(items.filter(i => {
        if (filtreCategorie !== 'tous' && i.stuff.categorie !== filtreCategorie) return false;
        if (filtreRarete    !== 'tous' && i.stuff.rarete    !== filtreRarete)    return false;
        return true;
    }));
    let compsEquipees = $derived(competences.filter(c => c.est_equipee).length);
    let competencesFiltrees = $derived(competences.filter(pc => {
        if (filtreCompRarete  !== 'tous' && pc.competence.rarete   !== filtreCompRarete)  return false;
        if (filtreCompElement !== 'tous' && pc.competence.element  !== filtreCompElement) return false;
        return true;
    }));

    const COULEURS_RARETE: Record<string, string> = {
        commun: '#aaa', peu_commun: '#2ecc71', rare: '#3498db', epique: '#9b59b6', legendaire: '#f39c12'
    };
</script>

<div class="sacoche">
    <h2>🎒 Sacoche</h2>

    {#if erreur}<div class="erreur">{erreur}</div>{/if}
    {#if succes}<div class="succes">{succes}</div>{/if}

    <!-- Équipement actif -->
    <section>
        <h3>Équipement actif</h3>
        {#if equipes.length === 0}
        <p class="vide">Aucun équipement.</p>
        {:else}
        {#each equipes as item}
        <div class="item-row">
            <div class="item-info">
                <span class="item-nom" style="color:{COULEURS_RARETE[item.stuff.rarete]}">{item.stuff.nom}</span>
                <span class="item-slot">{item.stuff.slot}</span>
            </div>
            <button class="btn-action desequiper" onclick={() => agirItem(item)}>Retirer</button>
        </div>
        {/each}
        {/if}
    </section>

    <!-- Inventaire complet -->
    <section>
        <div class="section-header">
            <h3>Inventaire</h3>
            <button class="btn-filtres-comp" onclick={() => filtresInvOuverts = !filtresInvOuverts}>
                {filtresInvOuverts ? '🔼' : '🔽'} Filtres
            </button>
        </div>

        <div class="filtres-drawer" class:ouvert={filtresInvOuverts}>
            <div class="filtre-groupe">
                <span class="filtre-label">Catégorie</span>
                {#each ['tous','arme','armure','utilitaire'] as cat}
                <button class="pill" class:active={filtreCategorie === cat} onclick={() => filtreCategorie = cat as typeof filtreCategorie}>{cat}</button>
                {/each}
            </div>
            <div class="filtre-groupe">
                <span class="filtre-label">Rareté</span>
                {#each ['tous','commun','peu_commun','rare','epique','legendaire'] as r}
                <button class="pill" class:active={filtreRarete === r}
                    style={filtreRarete === r && r !== 'tous' ? `background:${COULEURS_RARETE[r]};border-color:${COULEURS_RARETE[r]};color:#111` : ''}
                    onclick={() => filtreRarete = r as typeof filtreRarete}>{r.replace('_',' ')}</button>
                {/each}
            </div>
        </div>

        {#if inventaireFiltré.length === 0}
        <p class="vide">Aucun item.</p>
        {:else}
        {#each inventaireFiltré as item}
        {@const prixVente = Math.floor((item.stuff.prix_base ?? 0) / 4)}
        <div class="item-row">
            <div class="item-info">
                <span class="item-nom" style="color:{COULEURS_RARETE[item.stuff.rarete]}">{item.stuff.nom}</span>
                <span class="item-meta">×{item.quantite} · {item.stuff.categorie} · {item.stuff.slot}</span>
                <span class="item-bonus">
                    {#if item.stuff.bonus_attq}ATQ+{item.stuff.bonus_attq} {/if}
                    {#if item.stuff.bonus_def}DEF+{item.stuff.bonus_def} {/if}
                    {#if item.stuff.bonus_vitesse}VIT+{item.stuff.bonus_vitesse} {/if}
                    {#if item.stuff.bonus_pv_combat}PV+{item.stuff.bonus_pv_combat} {/if}
                    {#if item.stuff.soin_pv}Soin+{item.stuff.soin_pv} {/if}
                </span>
            </div>
            <div class="item-actions">
                <button
                    class="btn-action"
                    class:desequiper={item.est_equipe}
                    onclick={() => agirItem(item)}
                >
                    {#if item.stuff.slot === 'consommable'}Utiliser
                    {:else if item.est_equipe}Retirer
                    {:else}Équiper{/if}
                </button>
                {#if !item.est_equipe}
                <button class="btn-vendre" onclick={() => vendre(item)} title="Vendre {prixVente}g">
                    {prixVente}g
                </button>
                {/if}
            </div>
        </div>
        {/each}
        {/if}
    </section>

    <!-- Compétences -->
    <section>
        <div class="section-header">
            <h3>Compétences ({compsEquipees}/6 équipées)</h3>
            <button class="btn-filtres-comp" onclick={() => filtresCompOuverts = !filtresCompOuverts}>
                {filtresCompOuverts ? '🔼' : '🔽'} Filtres
            </button>
        </div>

        <div class="filtres-drawer" class:ouvert={filtresCompOuverts}>
            <div class="filtre-groupe">
                <span class="filtre-label">Rareté</span>
                {#each ['tous','commun','peu_commun','rare','epique','legendaire'] as r}
                <button class="pill" class:active={filtreCompRarete === r}
                    style={filtreCompRarete === r && r !== 'tous' ? `background:${COULEURS_RARETE[r]};border-color:${COULEURS_RARETE[r]};color:#111` : ''}
                    onclick={() => filtreCompRarete = r}>{r.replace('_',' ')}</button>
                {/each}
            </div>
            <div class="filtre-groupe">
                <span class="filtre-label">Élément</span>
                <button class="pill" class:active={filtreCompElement === 'tous'} onclick={() => filtreCompElement = 'tous'}>tous</button>
                {#each ELEMENTS.filter(e => e !== 'neutre') as el}
                <button class="pill" class:active={filtreCompElement === el}
                    onclick={() => filtreCompElement = el}><img class="pixel-icon" src={ELEMENT_ICONS[el]} alt={el} /> {el}</button>
                {/each}
            </div>
        </div>

        {#if competences.length === 0}
        <p class="vide">Aucune compétence.</p>
        {:else if competencesFiltrees.length === 0}
        <p class="vide">Aucune compétence pour ces filtres.</p>
        {:else}
        {#each competencesFiltrees as pc}
        <div class="item-row">
            <div class="item-info">
                <span class="item-nom" style="color:{COULEURS_RARETE[pc.competence.rarete]}">{pc.competence.nom}</span>
                <span class="item-meta"><img class="pixel-icon" src={ELEMENT_ICONS[pc.competence.element] ?? ''} alt={pc.competence.element} /> {pc.competence.element} · {pc.competence.rarete.replace('_',' ')}</span>
                <span class="item-bonus">{pc.competence.description}</span>
            </div>
            <button
                class="btn-action"
                class:desequiper={pc.est_equipee}
                onclick={() => agirComp(pc)}
            >
                {pc.est_equipee ? 'Retirer' : 'Équiper'}
            </button>
        </div>
        {/each}
        {/if}
    </section>
</div>

<style>
  .sacoche {
    color: #eee;
    font-family: var(--font);
    padding-bottom: 20px;
  }
  h2 { font-size: 1.3rem; margin-bottom: 16px; }
  h3 { font-size: 0.95rem; color: #aaa; margin: 20px 0 10px; border-bottom: 1px solid #333; padding-bottom: 6px; }
  .erreur { background: #c0392b; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; font-size: 0.85rem; }
  .succes { background: rgba(46,204,113,0.2); color: #2ecc71; padding: 6px 12px; border-radius: 6px; margin-bottom: 8px; font-size: 0.85rem; }
  .vide { color: #555; font-size: 0.85rem; }

  .filtre-groupe { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; margin-bottom: 4px; }
  .filtre-label { font-size: 0.68rem; color: #555; margin-right: 2px; }
  .pill {
    padding: 4px 10px; border-radius: 12px; font-size: 0.72rem; font-family: var(--font);
    border: 1px solid #444; background: transparent; color: #aaa; cursor: pointer;
  }
  .pill.active { background: #e94560; border-color: #e94560; color: white; }

  .section-header { display: flex; align-items: center; justify-content: space-between; }
  .section-header h3 { margin-bottom: 0; border-bottom: none; }
  .btn-filtres-comp {
    font-size: 0.72rem; font-family: var(--font); background: #0f3460;
    border: 1px solid #333; border-radius: 6px; color: #aaa;
    padding: 3px 10px; cursor: pointer; margin-bottom: 4px;
  }
  .filtres-drawer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
  .filtres-drawer.ouvert { max-height: 200px; }
  /* separator under section-header when drawer closed */
  section h3 { border-bottom: 1px solid #333; padding-bottom: 6px; }

  .item-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 0; border-bottom: 1px solid #1e1e3a; gap: 8px;
  }
  .item-info { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
  .item-nom  { font-size: 0.88rem; font-weight: bold; }
  .item-slot { font-size: 0.72rem; color: #888; }
  .item-meta { font-size: 0.72rem; color: #888; }
  .item-bonus { font-size: 0.72rem; color: #2ecc71; }

  .item-actions { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; flex-shrink: 0; }
  .btn-vendre {
    padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-family: var(--font);
    border: 1px solid #e67e22; background: transparent; color: #e67e22; cursor: pointer;
    white-space: nowrap;
  }
  .btn-vendre:hover { background: rgba(230,126,34,0.15); }
  .btn-action {
    padding: 5px 12px; border-radius: 6px; font-size: 0.78rem; font-family: var(--font);
    border: 1px solid #2ecc71; background: transparent; color: #2ecc71; cursor: pointer;
    white-space: nowrap; flex-shrink: 0;
  }
  .btn-action:hover { background: rgba(46,204,113,0.15); }
  .btn-action.desequiper { border-color: #e74c3c; color: #e74c3c; }
  .btn-action.desequiper:hover { background: rgba(231,76,60,0.15); }
</style>
