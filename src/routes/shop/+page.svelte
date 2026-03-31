<script lang="ts">
    import { onMount } from 'svelte';
    import {
        getMagasinInventaire, getStuffs, getInventaire, acheterItem, equiperItem, desequiperItem, utiliserConsommable,
        getCompetences, getPersonnageCompetences, acheterCompetence, equiperCompetence, desequiperCompetence,
    } from '$lib/db';
    import { refreshCharacterStore, characterStore } from '$lib/stores';
    import type { stuff, inventaire, magasin_inventaire, Competence, PersonnageCompetence } from '$lib/types';

    let onglet = $state<'armes' | 'armures' | 'utilitaires' | 'competences'>('armes');
    let catalogue = $state<(magasin_inventaire & { stuff: stuff })[]>([]);
    let inventaireItems = $state<(inventaire & { stuff: stuff })[]>([]);
    let competencesDispos = $state<Competence[]>([]);
    let mesCompetences = $state<(PersonnageCompetence & { competence: Competence })[]>([]);
    let erreur = $state('');
    let succes = $state('');
    let filtreSlot = $state('tous');
    let filtreRarete = $state('tous');
    let filtreElement = $state('tous');
    let filtresOuverts = $state(false);

    const ELEMENT_COLORS: Record<string, string> = {
        neutre: '#888', surnaturel: '#9b59b6', technologie: '#3498db',
        feu: '#e74c3c', eau: '#1abc9c', terre: '#8B6914',
        air: '#bdc3c7', vie: '#2ecc71', mort: '#555',
        tenebres: '#6c3483', lumiere: '#f1c40f',
    };

    const ELEMENT_ICONS: Record<string, string> = {
        neutre: '○', surnaturel: '👻', technologie: '⚙️',
        feu: '🔥', eau: '💧', terre: '🪨',
        air: '🌪', vie: '🌿', mort: '💀',
        tenebres: '🌑', lumiere: '☀️',
    };

    const RARETE_COLORS: Record<string, string> = {
        commun: '#aaa',
        peu_commun: '#2ecc71',
        rare: '#3498db',
        epique: '#9b59b6',
        legendaire: '#f39c12',
    };

    const slotLabel: Record<string, string> = {
        arme_1main: 'Arme 1 main',
        arme_2mains: 'Arme 2 mains',
        bouclier_1main: 'Bouclier 1 main',
        bouclier_2mains: 'Bouclier 2 mains',
        tete: 'Tête',
        plastron: 'Plastron',
        jambiere: 'Jambières',
        bottes: 'Bottes',
        gants: 'Gants',
        consommable: 'Consommable',
        joker: 'Joker',
    };

    const rareteLabel: Record<string, string> = {
        commun: 'Commun',
        peu_commun: 'Peu commun',
        rare: 'Rare',
        epique: 'Épique',
        legendaire: 'Légendaire',
    };

    const typeCompLabel: Record<string, string> = {
        attaque: 'Attaque',
        buff: 'Buff',
        statut: 'Statut',
    };

    const effetLabel: Record<string, string> = {
        physique: 'Physique',
        magique: 'Magique',
        buff_attq: '+ATQ',
        buff_def: '+DEF',
        buff_vitesse: '+VIT',
        poison: 'Poison',
        stun: 'Étourdissement',
    };

    const slotsByOnglet: Record<string, string[]> = {
        armes: ['arme_1main', 'arme_2mains', 'bouclier_1main', 'bouclier_2mains'],
        armures: ['tete', 'plastron', 'jambiere', 'bottes', 'gants'],
        utilitaires: ['consommable', 'joker'],
        competences: [],
    };

    const raretes = ['commun', 'peu_commun', 'rare', 'epique', 'legendaire'];

    async function charger() {
        const stock = await getMagasinInventaire(1);
        const stuffs = await getStuffs();
        catalogue = stock
            .map(m => ({ ...m, stuff: stuffs.find(s => s.id === m.stuff_id)! }))
            .filter(m => m.stuff);

        const inv = await getInventaire(1);
        inventaireItems = inv
            .map(i => ({ ...i, stuff: stuffs.find(s => s.id === i.stuff_id)! }))
            .filter(i => i.stuff);

        try {
            competencesDispos = await getCompetences();
            mesCompetences = await getPersonnageCompetences(1);
        } catch { /* migration 0007 pas encore appliquée */ }
    }

    onMount(() => { setTimeout(charger, 100); });

    let catKey = $derived(onglet === 'armes' ? 'arme' : onglet === 'armures' ? 'armure' : 'utilitaire');
    let nbEquipees = $derived(mesCompetences.filter(c => c.est_equipee).length);

    function applyFilters<T extends { stuff: stuff }>(items: T[]): T[] {
        return items.filter(i => {
            if (i.stuff.categorie !== catKey) return false;
            if (filtreSlot !== 'tous' && i.stuff.slot !== filtreSlot) return false;
            if (filtreRarete !== 'tous' && i.stuff.rarete !== filtreRarete) return false;
            return true;
        });
    }

    function catalogueFiltré() { return applyFilters(catalogue); }
    function inventaireFiltré() { return applyFilters(inventaireItems); }

    function competencesFiltrées() {
        return competencesDispos.filter(c => {
            if (filtreRarete   !== 'tous' && c.rarete   !== filtreRarete)   return false;
            if (filtreElement  !== 'tous' && c.element  !== filtreElement)   return false;
            return true;
        });
    }

    function possede(stuff_id: number) {
        return inventaireItems.some(i => i.stuff_id === stuff_id);
    }
    function possedeComp(comp_id: number) {
        return mesCompetences.some(c => c.competence_id === comp_id);
    }

    async function acheter(stuff_id: number, nom: string) {
        erreur = ''; succes = '';
        try {
            await acheterItem(1, 1, stuff_id);
            await refreshCharacterStore();
            await charger();
            succes = `${nom} acheté !`;
        } catch (e) { erreur = String(e).replace('Error: ', ''); }
    }

    async function toggleEquip(item: inventaire & { stuff: stuff }) {
        erreur = ''; succes = '';
        try {
            if (item.est_equipe) {
                await desequiperItem(item.id);
            } else {
                await equiperItem(1, item.id);
            }
            await charger();
        } catch (e) { erreur = String(e); }
    }

    async function utiliser(item: inventaire & { stuff: stuff }) {
        erreur = ''; succes = '';
        try {
            await utiliserConsommable(1, item.id);
            await refreshCharacterStore();
            await charger();
            succes = item.stuff.slot === 'joker' ? 'Joker ajouté !' : `+${item.stuff.soin_pv} PV IRL !`;
        } catch (e) { erreur = String(e); }
    }

    async function acheterComp(comp: Competence) {
        erreur = ''; succes = '';
        try {
            await acheterCompetence(1, comp.id);
            await refreshCharacterStore();
            await charger();
            succes = `${comp.nom} apprise !`;
        } catch (e) { erreur = String(e).replace('Error: ', ''); }
    }

    async function toggleEquipComp(pc: PersonnageCompetence & { competence: Competence }) {
        erreur = ''; succes = '';
        try {
            if (pc.est_equipee) {
                await desequiperCompetence(pc.id);
            } else {
                await equiperCompetence(1, pc.id);
            }
            await charger();
        } catch (e) { erreur = String(e).replace('Error: ', ''); }
    }

    function bonusStr(s: stuff): string {
        const b = [];
        if (s.bonus_attq)      b.push(`ATQ +${s.bonus_attq}`);
        if (s.bonus_attq_spe)  b.push(`ATQ SPE +${s.bonus_attq_spe}`);
        if (s.bonus_def)       b.push(`DEF +${s.bonus_def}`);
        if (s.bonus_def_spe)   b.push(`DEF SPE +${s.bonus_def_spe}`);
        if (s.bonus_vitesse)   b.push(`VIT +${s.bonus_vitesse}`);
        if (s.bonus_pv_combat) b.push(`PV +${s.bonus_pv_combat}`);
        return b.join(' · ') || '—';
    }

    function compEffetStr(c: Competence): string {
        if (c.type === 'attaque') return `${effetLabel[c.effet_type]} ${c.valeur} dégâts`;
        if (c.type === 'buff') return `${effetLabel[c.effet_type]} +${c.valeur} pendant ${c.duree_tours} tours`;
        if (c.effet_type === 'stun') return `Étourdit le monstre 1 tour`;
        return `${effetLabel[c.effet_type]} ${c.valeur}/tour · ${c.duree_tours} tours`;
    }

    function changerOnglet(o: typeof onglet) {
        onglet = o;
        filtreSlot = 'tous';
        filtreRarete = 'tous';
        filtreElement = 'tous';
        filtresOuverts = false;
    }
</script>

<div class="shop">

    <!-- ONGLETS -->
    <div class="onglets">
        <button class:actif={onglet === 'armes'}        onclick={() => changerOnglet('armes')}>⚔️ Armes</button>
        <button class:actif={onglet === 'armures'}      onclick={() => changerOnglet('armures')}>🛡️ Armures</button>
        {#if ($characterStore.mode ?? 'normal') === 'normal'}
        <button class:actif={onglet === 'utilitaires'}  onclick={() => changerOnglet('utilitaires')}>🧪 Utils</button>
        {/if}
        <button class:actif={onglet === 'competences'}  onclick={() => changerOnglet('competences')}>⚡ Sorts</button>
    </div>

    <!-- BOUTON FILTRES -->
    <button class="btn-filtres" onclick={() => filtresOuverts = !filtresOuverts}>
        {filtresOuverts ? '🔼' : '🔽'} Filtres
    </button>

    <!-- DRAWER FILTRES COULISSANT -->
    <div class="filtres-drawer" class:ouvert={filtresOuverts}>
        {#if onglet !== 'competences'}
        <div class="filtres">
            <span class="filtre-label">Slot</span>
            <button class="pill" class:actif={filtreSlot === 'tous'} onclick={() => filtreSlot = 'tous'}>Tous</button>
            {#each slotsByOnglet[onglet] as s}
                <button class="pill" class:actif={filtreSlot === s} onclick={() => filtreSlot = s}>{slotLabel[s]}</button>
            {/each}
        </div>
        {/if}

        {#if onglet !== 'utilitaires'}
        <div class="filtres">
            <span class="filtre-label">Rareté</span>
            <button class="pill" class:actif={filtreRarete === 'tous'} onclick={() => filtreRarete = 'tous'}>Toutes</button>
            {#each raretes as r}
                <button class="pill rarete-pill" class:actif={filtreRarete === r}
                    style="--rc: {RARETE_COLORS[r]}"
                    onclick={() => filtreRarete = r}>{rareteLabel[r]}</button>
            {/each}
        </div>
        {/if}

        {#if onglet === 'competences'}
        <div class="filtres">
            <span class="filtre-label">Élément</span>
            <button class="pill" class:actif={filtreElement === 'tous'} onclick={() => filtreElement = 'tous'}>Tous</button>
            {#each Object.keys(ELEMENT_ICONS) as el}
                <button class="pill" class:actif={filtreElement === el}
                    style={filtreElement === el ? `color:${ELEMENT_COLORS[el]};border-color:${ELEMENT_COLORS[el]}` : ''}
                    onclick={() => filtreElement = el}>{ELEMENT_ICONS[el]} {el}</button>
            {/each}
        </div>
        {/if}
    </div>

    {#if erreur}<p class="msg erreur">{erreur}</p>{/if}
    {#if succes}<p class="msg succes">{succes}</p>{/if}

    <!-- ── ONGLET COMPÉTENCES ─────────────────────────────── -->
    {#if onglet === 'competences'}

        <h3>Grimoire <span class="badge-count">{nbEquipees}/6 équipées</span></h3>

        {#if competencesFiltrées().length === 0}
            <p class="vide">Aucune compétence disponible.</p>
        {:else}
            {#each competencesFiltrées() as c}
            {@const deja = possedeComp(c.id)}
            {@const rc = RARETE_COLORS[c.rarete] ?? '#aaa'}
            <div class="card" class:grise={deja} style="border-left: 3px solid {rc}">
                <div class="card-info">
                    <div class="card-top">
                        <span class="nom">{c.nom}</span>
                        <span class="slot-badge">{typeCompLabel[c.type]}</span>
                        <span class="rarete-badge" style="color:{rc}">{rareteLabel[c.rarete]}</span>
                        {#if c.element && c.element !== 'neutre'}
                        <span class="element-badge" style="color:{ELEMENT_COLORS[c.element]}; border-color:{ELEMENT_COLORS[c.element]}">{ELEMENT_ICONS[c.element]} {c.element}</span>
                        {/if}
                    </div>
                    <span class="bonus">{compEffetStr(c)}</span>
                </div>
                {#if deja}
                    <span class="possede-txt">Appris</span>
                {:else}
                    <button class="btn-acheter" onclick={() => acheterComp(c)}>{c.prix_boutique}g</button>
                {/if}
            </div>
            {/each}
        {/if}

        <h3 style="margin-top:16px">Mes compétences</h3>
        {#if mesCompetences.length === 0}
            <p class="vide">Aucune compétence apprise.</p>
        {:else}
            {#each mesCompetences as pc}
            {@const c = pc.competence}
            {@const rc = RARETE_COLORS[c.rarete] ?? '#aaa'}
            <div class="card" class:equipe={pc.est_equipee} style="border-left: 3px solid {rc}">
                <div class="card-info">
                    <div class="card-top">
                        <span class="nom">{c.nom}</span>
                        <span class="slot-badge">{typeCompLabel[c.type]}</span>
                        <span class="rarete-badge" style="color:{rc}">{rareteLabel[c.rarete]}</span>
                        {#if c.element && c.element !== 'neutre'}
                        <span class="element-badge" style="color:{ELEMENT_COLORS[c.element]}; border-color:{ELEMENT_COLORS[c.element]}">{ELEMENT_ICONS[c.element]} {c.element}</span>
                        {/if}
                        {#if pc.est_equipee}<span class="badge-equipe">Équipée</span>{/if}
                    </div>
                    <span class="bonus">{compEffetStr(c)}</span>
                </div>
                <button class="btn-equip" class:equipe={pc.est_equipee} onclick={() => toggleEquipComp(pc)}>
                    {pc.est_equipee ? 'Retirer' : 'Équiper'}
                </button>
            </div>
            {/each}
        {/if}

    <!-- ── ONGLETS ITEMS ──────────────────────────────────── -->
    {:else}

        <!-- CATALOGUE -->
        <h3>Boutique</h3>
        {#if catalogueFiltré().length === 0}
            <p class="vide">Rien à vendre ici.</p>
        {:else}
            {#each catalogueFiltré() as m}
            {@const rc = RARETE_COLORS[m.stuff.rarete] ?? '#aaa'}
            <div class="card" style="border-left: 3px solid {rc}">
                <div class="card-info">
                    <div class="card-top">
                        <span class="nom">{m.stuff.nom}</span>
                        <span class="slot-badge">{slotLabel[m.stuff.slot] ?? m.stuff.slot}</span>
                        <span class="rarete-badge" style="color:{rc}">{rareteLabel[m.stuff.rarete] ?? m.stuff.rarete}</span>
                    </div>
                    {#if m.stuff.categorie === 'utilitaire'}
                        <span class="bonus">{m.stuff.slot === 'consommable' ? `+${m.stuff.soin_pv} PV IRL` : 'Skip 1 routine sans pénalité'}</span>
                    {:else}
                        <span class="bonus">{bonusStr(m.stuff)}</span>
                    {/if}
                </div>
                <button class="btn-acheter" onclick={() => acheter(m.stuff_id, m.stuff.nom)}>
                    {m.prix_vente_local}g
                </button>
            </div>
            {/each}
        {/if}

        <!-- INVENTAIRE -->
        <h3 style="margin-top: 16px;">Inventaire</h3>
        {#if inventaireFiltré().length === 0}
            <p class="vide">Aucun item.</p>
        {:else}
            {#each inventaireFiltré() as item}
            {@const rc = RARETE_COLORS[item.stuff.rarete] ?? '#aaa'}
            <div class="card" class:equipe={item.est_equipe} style="border-left: 3px solid {rc}">
                <div class="card-info">
                    <div class="card-top">
                        <span class="nom">{item.stuff.nom}</span>
                        <span class="slot-badge">{slotLabel[item.stuff.slot] ?? item.stuff.slot}</span>
                        <span class="rarete-badge" style="color:{rc}">{rareteLabel[item.stuff.rarete] ?? item.stuff.rarete}</span>
                        {#if item.est_equipe}<span class="badge-equipe">Équipé</span>{/if}
                        {#if item.quantite > 1}<span class="qte">x{item.quantite}</span>{/if}
                    </div>
                    {#if item.stuff.categorie !== 'utilitaire'}
                        <span class="bonus">{bonusStr(item.stuff)}</span>
                    {:else if item.stuff.slot === 'consommable'}
                        <span class="bonus">+{item.stuff.soin_pv} PV IRL</span>
                    {:else}
                        <span class="bonus">Skip 1 routine</span>
                    {/if}
                </div>
                {#if item.stuff.categorie === 'utilitaire'}
                    <button class="btn-utiliser" onclick={() => utiliser(item)}>Utiliser</button>
                {:else}
                    <button class="btn-equip" class:equipe={item.est_equipe} onclick={() => toggleEquip(item)}>
                        {item.est_equipe ? 'Retirer' : 'Équiper'}
                    </button>
                {/if}
            </div>
            {/each}
        {/if}

    {/if}

</div>

<style>
    .shop { color: #eee; font-family: monospace; }

    .onglets {
        display: flex;
        gap: 4px;
        margin-bottom: 10px;
    }
    .onglets button {
        flex: 1;
        background: #1a1a3e;
        color: #aaa;
        border: 1px solid #333;
        border-radius: 6px;
        padding: 8px 2px;
        cursor: pointer;
        font-size: 0.72rem;
        transition: all 0.15s;
    }
    .onglets button.actif {
        background: #e94560;
        color: white;
        border-color: #e94560;
    }

    .btn-filtres {
        background: #0f3460; color: #aaa; border: 1px solid #333;
        border-radius: 6px; padding: 5px 14px; cursor: pointer;
        font-size: 0.78rem; font-family: monospace; margin-bottom: 6px;
    }
    .btn-filtres:hover { color: #eee; }

    .filtres-drawer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    .filtres-drawer.ouvert {
        max-height: 300px;
    }

    .filtre-label {
        font-size: 0.68rem; color: #666; align-self: center; margin-right: 2px;
    }

    .filtres {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 8px;
        align-items: center;
    }
    .pill {
        background: #1a1a3e;
        color: #888;
        border: 1px solid #333;
        border-radius: 12px;
        padding: 3px 10px;
        cursor: pointer;
        font-size: 0.7rem;
        transition: all 0.15s;
        font-family: monospace;
    }
    .pill.actif {
        background: #0f3460;
        color: #eee;
        border-color: #555;
    }
    .rarete-pill.actif {
        background: color-mix(in srgb, var(--rc) 20%, transparent);
        color: var(--rc);
        border-color: var(--rc);
    }

    h3 {
        margin: 0 0 8px;
        font-size: 0.9rem;
        color: #aaa;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .badge-count {
        font-size: 0.72rem;
        background: #0f3460;
        color: #eee;
        border-radius: 8px;
        padding: 2px 8px;
        text-transform: none;
        font-weight: normal;
    }
    .vide { color: #555; font-style: italic; font-size: 0.82rem; }

    .msg { font-size: 0.82rem; padding: 6px 10px; border-radius: 4px; margin-bottom: 10px; }
    .erreur { background: rgba(231,76,60,0.2); color: #e74c3c; }
    .succes { background: rgba(46,204,113,0.2); color: #2ecc71; }

    .card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1a1a3e;
        border: 1px solid #333;
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 8px;
    }
    .card.equipe  { border-color: #2ecc71; }
    .card.grise   { opacity: 0.5; }
    .card-info { flex: 1; min-width: 0; }
    .card-top { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 2px; }
    .nom  { font-weight: bold; font-size: 0.9rem; }
    .bonus { font-size: 0.72rem; color: #aaa; }
    .qte  { font-size: 0.72rem; color: #888; }
    .slot-badge {
        font-size: 0.62rem; padding: 1px 5px;
        background: #0f3460; color: #aaa;
        border-radius: 8px; white-space: nowrap;
    }
    .element-badge {
        font-size: 0.62rem; padding: 1px 6px;
        border: 1px solid; border-radius: 8px;
        white-space: nowrap; text-transform: capitalize;
    }
    .rarete-badge {
        font-size: 0.62rem; padding: 1px 5px;
        border-radius: 8px; white-space: nowrap;
        font-style: italic;
    }
    .badge-equipe {
        font-size: 0.62rem; padding: 1px 5px;
        background: #2ecc71; color: #111;
        border-radius: 8px; font-weight: bold;
    }
    .possede-txt { font-size: 0.72rem; color: #666; font-style: italic; flex-shrink: 0; }

    .btn-acheter {
        background: #e94560; color: white; border: none;
        border-radius: 4px; padding: 6px 10px;
        cursor: pointer; font-weight: bold; font-size: 0.85rem;
        flex-shrink: 0; margin-left: 8px;
    }
    .btn-equip {
        background: #0f3460; color: white; border: 1px solid #555;
        border-radius: 4px; padding: 6px 10px;
        cursor: pointer; font-size: 0.82rem;
        flex-shrink: 0; margin-left: 8px;
    }
    .btn-equip.equipe { background: #2ecc71; color: #111; border-color: #2ecc71; }
    .btn-utiliser {
        background: #8e44ad; color: white; border: none;
        border-radius: 4px; padding: 6px 10px;
        cursor: pointer; font-size: 0.82rem;
        flex-shrink: 0; margin-left: 8px;
    }
</style>
