<script lang="ts">
    import { onMount } from "svelte";
    import { getPersonnage, getCaracteristique, getLevels, getInventaire, getStuffs, allouerStat, acheterStat, gameOver, changerMode, STAT_SHOP_PRIX, getPersonnageAffinites, renommerPersonnage, getTitres, changerTitre, calculerStreak, calculerEtAttribuerTitre, calculerTitresDebloques, type StatAllouable } from "$lib/db";
    import { refreshCharacterStore } from "$lib/stores";
    import type { Personnage, Caracteristique, Level, stuff, inventaire, GameMode, PersonnageAffinite, Titre } from "$lib/types";
    import { ELEMENT_ICONS } from "$lib/icons";
    import { CLASSES, getBonusCumulatif, getClassesDebloquees, equiperClasse } from "$lib/classes";

    let personnage = $state<Personnage | null>(null);
    let carac = $state<Caracteristique | null>(null);
    let levelSuivant = $state<Level | null>(null);
    let equipements = $state<(inventaire & { stuff: stuff })[]>([]);
    let affinites = $state<PersonnageAffinite[]>([]);
    let classesDebloquees = $state<number[]>([]);
    let classeModalOuvert = $state(false);
    let titreModalOuvert = $state(false);
    let titres = $state<Titre[]>([]);
    let titresDebloques = $state<number[]>([1]);
    let streakActuel = $state(0);
    let streakRecord = $state(0);
    let titreActuel = $derived(titres.find(t => t.id === personnage?.titre_id) ?? null);
    let erreurClasse = $state('');

    const ELEMENTS_RADAR = ['surnaturel','technologie','feu','eau','terre','air','vie','mort','tenebres','lumiere'];
    const RADAR_CX = 130; const RADAR_CY = 130; const RADAR_R = 80; const RADAR_MAX = 100;

    let affiniteMap = $derived.by(() => {
        const base: Record<string, number> = Object.fromEntries(affinites.map(a => [a.element, a.bonus_pct]));
        for (const e of equipements) {
            if ((e.stuff.bonus_aff_elem ?? 0) > 0 && e.stuff.element && e.stuff.element !== 'neutre') {
                base[e.stuff.element] = (base[e.stuff.element] ?? 0) + e.stuff.bonus_aff_elem;
            }
        }
        return base;
    });

    let radarPoints = $derived(ELEMENTS_RADAR.map((el, i) => {
        const angle = -Math.PI / 2 + i * (2 * Math.PI / 10);
        const val = Math.min((affiniteMap[el] ?? 0) / RADAR_MAX, 1);
        return { x: Math.round(RADAR_CX + Math.cos(angle) * RADAR_R * val), y: Math.round(RADAR_CY + Math.sin(angle) * RADAR_R * val) };
    }));

    let radarAxes = $derived(ELEMENTS_RADAR.map((el, i) => {
        const angle = -Math.PI / 2 + i * (2 * Math.PI / 10);
        return {
            el,
            x:  Math.round(RADAR_CX + Math.cos(angle) * RADAR_R),
            y:  Math.round(RADAR_CY + Math.sin(angle) * RADAR_R),
            ix: Math.round(RADAR_CX + Math.cos(angle) * (RADAR_R + 26)),
            iy: Math.round(RADAR_CY + Math.sin(angle) * (RADAR_R + 26)),
        };
    }));

    const GRID_PCTS = [0.25, 0.5, 0.75, 1];
    let radarGrid = $derived(GRID_PCTS.map(pct =>
        ELEMENTS_RADAR.map((_, i) => {
            const a = -Math.PI / 2 + i * (2 * Math.PI / 10);
            return `${Math.round(RADAR_CX + Math.cos(a) * RADAR_R * pct)},${Math.round(RADAR_CY + Math.sin(a) * RADAR_R * pct)}`;
        }).join(' ')
    ));

    let radarPointsStr = $derived(radarPoints.map(p => `${p.x},${p.y}`).join(' '));

    let classeActuelle = $derived(CLASSES.find(c => c.id === personnage?.classe_id) ?? null);
    let bonusClasse = $derived(getBonusCumulatif(personnage?.classe_id ?? null));

    async function charger() {
        personnage = await getPersonnage(1);
        if (!personnage) return;

        await calculerEtAttribuerTitre(1);
        titres = await getTitres();
        titresDebloques = await calculerTitresDebloques(1);
        const streak = await calculerStreak(1);
        streakActuel = streak.actuel;
        streakRecord = streak.record;

        if (personnage.nom === 'Heros') {
            nomModal = true; nomSaisie = '';
            localStorage.removeItem('donjon_save_1');
            localStorage.removeItem('donjon_cleared_1');
            localStorage.removeItem('donjon_best_1');
        }

        carac = await getCaracteristique(personnage.caracteristique_id);

        const levels = await getLevels();
        levelSuivant = levels.find(l => l.id === personnage!.level_id + 1) ?? levels[levels.length - 1];

        const inventaire = await getInventaire(1);
        const stuffs = await getStuffs();
        equipements = inventaire
            .filter(i => i.est_equipe)
            .map(i => ({ ...i, stuff: stuffs.find(s => s.id === i.stuff_id)! }))
            .filter(i => i.stuff);

        try { affinites = await getPersonnageAffinites(1); } catch { affinites = []; }
        try { classesDebloquees = await getClassesDebloquees(1); } catch { classesDebloquees = []; }
    }

    async function allouer(stat: StatAllouable) {
        await allouerStat(1, stat);
        await charger();
    }

    let erreurStat = $state('');
    let gameOverModal = $state(false);

    // Popup saisie nom
    let nomModal = $state(false);
    let nomSaisie = $state('');
    async function validerNom() {
        const n = nomSaisie.trim();
        if (!n) return;
        await renommerPersonnage(1, n);
        nomModal = false;
        await charger();
    }

    // Mode de jeu
    let modeConfirm = $state<GameMode | null>(null);
    let erreurMode = $state('');

    async function demanderChangerMode(newMode: GameMode) {
        if (newMode === (personnage?.mode ?? 'normal')) return;
        modeConfirm = newMode;
        erreurMode = '';
    }

    async function confirmerChangerMode() {
        if (!modeConfirm) return;
        erreurMode = '';
        try {
            await changerMode(1, modeConfirm);
            modeConfirm = null;
            await refreshCharacterStore();
            await charger();
        } catch (e: any) {
            erreurMode = e.message ?? String(e);
            modeConfirm = null;
        }
    }

    const MODE_LABELS: Record<GameMode, string> = { normal: 'Normal', hard: 'Hard', cauchemar: 'Cauchemar' };
    const MODE_DESC: Record<GameMode, string> = {
        normal: 'Mode par défaut. Pas de restriction.',
        hard: 'Pas de récup PV IRL, pas d\'utilitaires. Gains ×1.5. Coffres : rare/7j, épique/mois.',
        cauchemar: 'Une erreur = Game Over. Gains ×2. Coffres : épique/7j, légendaire/mois.'
    };

    async function acheter(stat: StatAllouable) {
        erreurStat = '';
        try {
            await acheterStat(1, stat);
            await refreshCharacterStore();
            await charger();
        } catch (e: any) { erreurStat = e.message ?? String(e); }
    }

    async function confirmerGameOver() {
        await gameOver(1);
        localStorage.removeItem('donjon_save_1');
        localStorage.removeItem('donjon_cleared_1');
        localStorage.removeItem('donjon_best_1');
        gameOverModal = false;
        await refreshCharacterStore();
        await charger();
    }

    let erreurChargement = $state('');

    onMount(() => {
        setTimeout(async () => {
            try {
                await charger();
                if (carac && carac.pv_vie_actuels <= 0) gameOverModal = true;
            } catch (e: any) {
                erreurChargement = e?.message ?? String(e);
                console.error('charger() failed:', e);
            }
        }, 100);
        window.addEventListener('focus', charger);
        return () => window.removeEventListener('focus', charger);
    });

    let xpPct = $derived(personnage && levelSuivant
        ? Math.min(100, (personnage.experience_actuelle / levelSuivant.exp_max_requise) * 100)
        : 0);
    let pvViePct = $derived(carac ? Math.min(100, (carac.pv_vie_actuels / carac.pv_vie_max) * 100) : 0);
    let pvCombatPct = $derived(carac ? Math.min(100, (carac.pv_combat_actuels / carac.pv_combat_max) * 100) : 0);
    let manaPct = $derived(carac ? Math.min(100, (carac.mana_actuels / Math.max(1, carac.mana_max)) * 100) : 0);

    let bonusTotal = $derived(equipements.reduce((acc, e) => ({
        attq:      acc.attq      + (e.stuff.bonus_attq      ?? 0),
        attq_spe:  acc.attq_spe  + (e.stuff.bonus_attq_spe  ?? 0),
        def:       acc.def       + (e.stuff.bonus_def        ?? 0),
        def_spe:   acc.def_spe   + (e.stuff.bonus_def_spe   ?? 0),
        vitesse:   acc.vitesse   + (e.stuff.bonus_vitesse    ?? 0),
        pv_combat: acc.pv_combat + (e.stuff.bonus_pv_combat  ?? 0),
    }), {
        attq:      bonusClasse.attq,
        attq_spe:  bonusClasse.attq_spe,
        def:       bonusClasse.def,
        def_spe:   bonusClasse.def_spe,
        vitesse:   bonusClasse.vit,
        pv_combat: bonusClasse.pv_max,
    }));
</script>

{#if personnage && carac}
<div class="profil">

    <div class="perso">
        <div class="avatar"></div>
        <div class="infos">
            <div class="name">{personnage.nom}</div>
            <div class="meta">
                Niveau {personnage.level_id}
                — <span class="classe-nom">{classeActuelle?.nom ?? 'Sans classe'}</span>
                <button class="btn-classe-change" onclick={() => classeModalOuvert = true}>⇄</button>
                {#if titreActuel}— <span class="titre-nom">✦ {titreActuel.nom}</span>
                <button class="btn-classe-change" onclick={() => titreModalOuvert = true}>⇄</button>{/if}
            </div>
            {#if streakActuel > 0}
            <div class="streak-line">🔥 {streakActuel}j{#if streakRecord > streakActuel} · rec:{streakRecord}j{/if}</div>
            {/if}
            <div class="gold">Or : {personnage.gold_actuel}</div>
        </div>
    </div>

    <div class="stats">
        <div class="barre-label">PV IRL : {carac.pv_vie_actuels} / {carac.pv_vie_max}</div>
        <div class="barre"><div class="barre-fill vie" style="width: {pvViePct}%"></div></div>

        <div class="barre-label">PV Combat : {carac.pv_combat_actuels} / {carac.pv_combat_max}</div>
        <div class="barre"><div class="barre-fill combat" style="width: {pvCombatPct}%"></div></div>

        <div class="barre-label">Mana : {carac.mana_actuels ?? 0} / {carac.mana_max ?? 150}</div>
        <div class="barre"><div class="barre-fill mana" style="width: {manaPct}%"></div></div>

        <div class="barre-label">XP : {personnage.experience_actuelle} / {levelSuivant?.exp_max_requise ?? '?'}</div>
        <div class="barre"><div class="barre-fill xp" style="width: {xpPct}%"></div></div>
    </div>

    {#if (personnage.points_stat_disponibles ?? 0) > 0}
    <div class="levelup-panel">
        <div class="levelup-titre">⬆️ LEVEL UP — {personnage.points_stat_disponibles} point{personnage.points_stat_disponibles > 1 ? 's' : ''} à distribuer</div>
        <div class="levelup-grid">
            {#each [
                { stat: 'pv_combat_max' as StatAllouable, label: 'PV Combat',  gain: '+5 PV' },
                { stat: 'mana_max'      as StatAllouable, label: 'Mana',        gain: '+15'   },
                { stat: 'attq'          as StatAllouable, label: 'ATQ',         gain: '+1'    },
                { stat: 'attq_spe'      as StatAllouable, label: 'ATQ SPÉ',     gain: '+1'    },
                { stat: 'def'           as StatAllouable, label: 'DEF',         gain: '+1'    },
                { stat: 'def_spe'       as StatAllouable, label: 'DEF SPÉ',     gain: '+1'    },
                { stat: 'vitesse'       as StatAllouable, label: 'Vitesse',     gain: '+1'    },
            ] as row}
            <button class="btn-allouer" onclick={() => allouer(row.stat)}>
                <span class="allouer-label">{row.label}</span>
                <span class="allouer-gain">{row.gain}</span>
            </button>
            {/each}
        </div>
    </div>
    {/if}

    <!-- Boutique des stats -->
    <div class="stat-shop">
        <div class="stat-shop-titre">🛒 Boutique des stats</div>
        {#if erreurStat}<div class="stat-shop-err">{erreurStat}</div>{/if}
        <div class="levelup-grid">
            {#each [
                { stat: 'pv_combat_max' as StatAllouable, label: 'PV Combat', gain: '+5 PV', prix: STAT_SHOP_PRIX.pv_combat_max },
                { stat: 'mana_max'      as StatAllouable, label: 'Mana',       gain: '+15',   prix: STAT_SHOP_PRIX.mana_max      },
                { stat: 'attq'          as StatAllouable, label: 'ATQ',        gain: '+1',    prix: STAT_SHOP_PRIX.attq          },
                { stat: 'attq_spe'      as StatAllouable, label: 'ATQ SPÉ',    gain: '+1',    prix: STAT_SHOP_PRIX.attq_spe      },
                { stat: 'def'           as StatAllouable, label: 'DEF',        gain: '+1',    prix: STAT_SHOP_PRIX.def            },
                { stat: 'def_spe'       as StatAllouable, label: 'DEF SPÉ',    gain: '+1',    prix: STAT_SHOP_PRIX.def_spe       },
                { stat: 'vitesse'       as StatAllouable, label: 'Vitesse',    gain: '+1',    prix: STAT_SHOP_PRIX.vitesse        },
            ] as row}
            <button class="btn-allouer btn-shop-stat"
                class:insuffisant={(personnage?.gold_actuel ?? 0) < row.prix}
                onclick={() => acheter(row.stat)}>
                <span class="allouer-label">{row.label}</span>
                <span class="allouer-gain">{row.gain}</span>
                <span class="shop-prix">{row.prix}g</span>
            </button>
            {/each}
        </div>
    </div>

    <!-- Mode de jeu -->
    <div class="mode-panel">
        <div class="mode-titre">⚔️ Mode de jeu</div>
        {#if erreurMode}<div class="mode-err">{erreurMode}</div>{/if}
        <div class="mode-grid">
            {#each (['normal', 'hard', 'cauchemar'] as GameMode[]) as m}
            <button
                class="btn-mode"
                class:mode-actif={m === (personnage.mode ?? 'normal')}
                class:mode-hard={m === 'hard'}
                class:mode-cauchemar={m === 'cauchemar'}
                onclick={() => demanderChangerMode(m)}>
                <span class="mode-nom">{MODE_LABELS[m]}</span>
                {#if m === (personnage.mode ?? 'normal')}<span class="mode-badge">ACTIF</span>{/if}
            </button>
            {/each}
        </div>
        <div class="mode-desc">{MODE_DESC[personnage.mode ?? 'normal']}</div>
        {#if (personnage.mode ?? 'normal') !== 'normal' && personnage.mode_debut}
        <div class="mode-debut">Depuis le {personnage.mode_debut}</div>
        {/if}
    </div>

    <div class="stat-grid">
        <div class="stat-ligne">
            {#each [
                { label: 'ATQ',     base: carac.attq,     bonus: bonusTotal.attq     },
                { label: 'ATQ SPÉ', base: carac.attq_spe, bonus: bonusTotal.attq_spe },
            ] as s}
            <div class="stat-cell">
                <span class="stat-label">{s.label}</span>
                <span class="stat-val">{s.base + s.bonus}{#if s.bonus > 0}<span class="stat-bonus"> +{s.bonus}</span>{/if}</span>
            </div>
            {/each}
        </div>
        <div class="stat-ligne">
            {#each [
                { label: 'DEF',     base: carac.def,     bonus: bonusTotal.def     },
                { label: 'DEF SPÉ', base: carac.def_spe, bonus: bonusTotal.def_spe },
            ] as s}
            <div class="stat-cell">
                <span class="stat-label">{s.label}</span>
                <span class="stat-val">{s.base + s.bonus}{#if s.bonus > 0}<span class="stat-bonus"> +{s.bonus}</span>{/if}</span>
            </div>
            {/each}
        </div>
        <div class="stat-ligne">
            <div class="stat-cell">
                <span class="stat-label">VIT</span>
                <span class="stat-val">{carac.vitesse + bonusTotal.vitesse}{#if bonusTotal.vitesse > 0}<span class="stat-bonus"> +{bonusTotal.vitesse}</span>{/if}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Affinités élémentaires</h2>
        <div class="radar-wrap">
            <svg width="260" height="260" viewBox="0 0 260 260" shape-rendering="crispEdges">
                {#each radarGrid as pts, gi}
                <polygon points={pts} fill="none"
                    stroke={gi === radarGrid.length - 1 ? '#111' : '#222'}
                    stroke-width={gi === radarGrid.length - 1 ? 2 : 1} />
                {/each}
                {#each radarAxes as ax}
                <line x1={RADAR_CX} y1={RADAR_CY} x2={ax.x} y2={ax.y} stroke="#222" stroke-width="1" />
                {/each}
                <circle cx={RADAR_CX} cy={RADAR_CY} r="4" fill="#e94560" />
                <polygon points={radarPointsStr} fill="rgba(233,69,96,0.22)" stroke="#e94560" stroke-width="2" stroke-linejoin="miter" />
                {#each radarAxes as ax}
                <image href={ELEMENT_ICONS[ax.el] ?? ''} x={ax.ix - 16} y={ax.iy - 16} width="32" height="32" />
                {/each}
            </svg>
        </div>
    </div>

    {#if equipements.length > 0}
    <div class="equipement">
        <h3>Équipement actif</h3>
        {#each equipements as item}
        <div class="item">
            <span>{item.stuff.nom}</span>
            <span class="bonus">
                {#if item.stuff.bonus_attq} ATQ +{item.stuff.bonus_attq}{/if}
                {#if item.stuff.bonus_def} DEF +{item.stuff.bonus_def}{/if}
                {#if item.stuff.bonus_vitesse} VIT +{item.stuff.bonus_vitesse}{/if}
            </span>
        </div>
        {/each}
    </div>
    {/if}

</div>
{:else}
<p>Chargement...</p>
{#if erreurChargement}<p style="color:#e74c3c;font-size:0.8rem;padding:8px">Erreur : {erreurChargement}</p>{/if}
{/if}

{#if modeConfirm}
<div class="gameover-overlay">
    <div class="gameover-modal">
        <div class="mode-confirm-titre">Passer en mode {MODE_LABELS[modeConfirm]} ?</div>
        <div class="gameover-msg">{MODE_DESC[modeConfirm]}</div>
        {#if modeConfirm === 'cauchemar'}
        <div class="gameover-note">Escalade immédiate. Retour possible après 3 jours.</div>
        {:else if modeConfirm === 'hard' && (personnage?.mode ?? 'normal') === 'normal'}
        <div class="gameover-note">Retour en normal possible après 3 jours.</div>
        {:else}
        <div class="gameover-note">Descente de mode — possible seulement après 3 jours.</div>
        {/if}
        <div class="confirm-btns">
            <button class="gameover-btn" onclick={confirmerChangerMode}>Confirmer</button>
            <button class="cancel-btn" onclick={() => modeConfirm = null}>Annuler</button>
        </div>
    </div>
</div>
{/if}

{#if classeModalOuvert}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="gameover-overlay" onclick={() => classeModalOuvert = false}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="classe-modal" onclick={(e) => e.stopPropagation()}>
        <div class="classe-modal-titre">Choisir une classe</div>
        {#if erreurClasse}<div class="classe-err">{erreurClasse}</div>{/if}
        {#each ['guerrier', 'vagabond', 'sorcier'] as arbre}
        {@const classesArbre = CLASSES.filter(c =>
            c.arbre === arbre &&
            (c.palier === 1 || classesDebloquees.includes(c.id))
        )}
        {#if classesArbre.length > 0}
        <div class="classe-arbre-titre">{arbre === 'guerrier' ? '🗡️ Guerrier' : arbre === 'vagabond' ? '🎒 Vagabond' : '🔮 Sorcier'}</div>
        {#each classesArbre as c}
        {@const bonus = getBonusCumulatif(c.id)}
        <button
            class="btn-classe"
            class:classe-active={personnage?.classe_id === c.id}
            onclick={async () => {
                erreurClasse = '';
                try {
                    await equiperClasse(1, c.id);
                    await charger();
                    classeModalOuvert = false;
                } catch (e: any) {
                    const msg = e?.message ?? String(e);
                    console.error('equiperClasse erreur:', msg, e);
                    erreurClasse = msg;
                }
            }}>
            <div class="classe-btn-nom">{c.nom} <span class="classe-palier">Palier {c.palier}</span></div>
            <div class="classe-btn-bonus">
                {#if bonus.attq > 0}ATQ +{bonus.attq} {/if}
                {#if bonus.def > 0}DEF +{bonus.def} {/if}
                {#if bonus.attq_spe > 0}ATQ SPÉ +{bonus.attq_spe} {/if}
                {#if bonus.def_spe > 0}DEF SPÉ +{bonus.def_spe} {/if}
                {#if bonus.vit > 0}VIT +{bonus.vit} {/if}
                {#if bonus.pv_max > 0}PV +{bonus.pv_max} {/if}
                {#if bonus.aff_elem > 0}Élem +{bonus.aff_elem}% {/if}
            </div>
        </button>
        {/each}
        {/if}
        {/each}
        <button class="cancel-btn" onclick={() => classeModalOuvert = false}>Fermer</button>
    </div>
</div>
{/if}

{#if titreModalOuvert}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="gameover-overlay" onclick={() => titreModalOuvert = false}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="classe-modal" onclick={(e) => e.stopPropagation()}>
        <div class="classe-modal-titre">Choisir un titre</div>
        {#each titres.filter(t => titresDebloques.includes(t.id)) as t}
        <button
            class="btn-classe"
            class:classe-active={personnage?.titre_id === t.id}
            onclick={async () => {
                await changerTitre(1, t.id);
                await charger();
                titreModalOuvert = false;
            }}>
            <div class="classe-btn-nom">✦ {t.nom}</div>
            <div class="classe-btn-bonus">{t.bonus_stat}</div>
        </button>
        {/each}
        <button class="cancel-btn" onclick={() => titreModalOuvert = false}>Fermer</button>
    </div>
</div>
{/if}

{#if nomModal}
<div class="gameover-overlay">
    <div class="gameover-modal">
        <div class="gameover-titre">Bienvenue, héros !</div>
        <div class="gameover-msg">Quel est ton nom ?</div>
        <input
            class="nom-input"
            type="text"
            placeholder="Ton nom..."
            bind:value={nomSaisie}
            onkeydown={(e) => e.key === 'Enter' && validerNom()}
        />
        <button class="gameover-btn" onclick={validerNom} disabled={!nomSaisie.trim()}>
            Confirmer
        </button>
    </div>
</div>
{/if}

{#if gameOverModal}
<div class="gameover-overlay">
    <div class="gameover-modal">
        <div class="gameover-titre">💀 GAME OVER</div>
        <div class="gameover-msg">Tes PV IRL ont atteint 0.<br>Le personnage repart de zéro.</div>
        <div class="gameover-note">Tes compétences et ta progression donjon sont réinitialisées.</div>
        <button class="gameover-btn" onclick={confirmerGameOver}>Recommencer</button>
    </div>
</div>
{/if}

<style>
  .profil {
    background-color: #16213e;
    color: #eee;
    min-height: 100vh;
    padding: 16px;
    font-family: var(--font);
  }
  .perso {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #444;
    flex-shrink: 0;
  }
  .name {
    font-size: 1.4rem;
    font-weight: bold;
  }
  .meta {
    font-size: 0.85rem;
    color: #aaa;
    margin-top: 4px;
  }
  .gold {
    margin-top: 6px;
    color: gold;
  }
  .stats {
    margin-bottom: 24px;
  }
  .barre-label {
    font-size: 0.85rem;
    margin-bottom: 4px;
    margin-top: 10px;
  }
  .barre {
    background-color: #333;
    border-radius: 4px;
    height: 14px;
    width: 100%;
    overflow: hidden;
  }
  .barre-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.4s ease;
  }
  .vie    { background-color: #e74c3c; }
  .combat { background-color: #e67e22; }
  .mana   { background-color: #3498db; }
  .xp     { background-color: #2ecc71; }
  .equipement h3 {
    font-size: 1rem;
    margin-bottom: 8px;
    color: #aaa;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #222;
  }
  .bonus {
    color: #2ecc71;
    font-size: 0.85rem;
  }
  .levelup-panel {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 2px solid #f39c12;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 16px;
    animation: glow 2s ease-in-out infinite alternate;
  }
  @keyframes glow {
    from { box-shadow: 0 0 6px rgba(243,156,18,0.3); }
    to   { box-shadow: 0 0 16px rgba(243,156,18,0.7); }
  }
  .levelup-titre {
    font-size: 0.88rem;
    font-weight: bold;
    color: #f39c12;
    margin-bottom: 10px;
    text-align: center;
  }
  .levelup-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  .btn-allouer {
    display: flex; flex-direction: column; align-items: center;
    background: #0f3460; border: 1px solid #f39c12;
    border-radius: 8px; padding: 8px 4px;
    cursor: pointer; font-family: var(--font);
    transition: background 0.15s;
    min-width: 0; overflow: hidden;
  }
  .btn-allouer:hover { background: #1a4a80; }
  .allouer-label { font-size: 0.7rem; color: #aaa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; text-align: center; }
  .allouer-gain  { font-size: 0.85rem; font-weight: bold; color: #f39c12; margin-top: 2px; }

  .stat-grid {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 6px 10px;
  }
  .stat-ligne {
    display: contents;
  }
  .stat-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }
  .stat-label { color: #aaa; font-size: 0.70rem; min-height: 2em; line-height: 1; }
  .stat-val   { font-weight: bold; font-size: 0.9rem;margin-top: 7px; }
  .stat-bonus { color: #2ecc71; font-size: 0.72rem; }
  .radar-wrap { display: flex; justify-content: center; }

  .stat-shop {
    background: #1a1a2e; border: 1px solid #555;
    border-radius: 10px; padding: 14px; margin-bottom: 16px;
  }
  .stat-shop-titre {
    font-size: 0.88rem; font-weight: bold; color: #aaa;
    margin-bottom: 10px; text-align: center;
  }
  .stat-shop-err { color: #e74c3c; font-size: 0.78rem; margin-bottom: 8px; text-align: center; }
  .btn-shop-stat { border-color: #555 !important; }
  .btn-shop-stat:hover { background: #1a4a80; }
  .btn-shop-stat.insuffisant { opacity: 0.45; cursor: not-allowed; }
  .shop-prix { font-size: 0.72rem; color: gold; margin-top: 2px; }

  .mode-panel {
    background: #1a1a2e; border: 1px solid #555;
    border-radius: 10px; padding: 14px; margin-bottom: 16px;
  }
  .mode-titre {
    font-size: 0.88rem; font-weight: bold; color: #aaa;
    margin-bottom: 10px; text-align: center;
  }
  .mode-err { color: #e74c3c; font-size: 0.78rem; margin-bottom: 8px; text-align: center; }
  .mode-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 10px;
  }
  .btn-mode {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: #0f3460; border: 1px solid #555;
    border-radius: 8px; padding: 8px 4px; gap: 4px;
    cursor: pointer; font-family: var(--font); transition: background 0.15s;
    min-width: 0; overflow: hidden;
  }
  .btn-mode:hover { background: #1a4a80; }
  .mode-nom { font-size: 0.82rem; color: #eee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; text-align: center; }
  .mode-badge { font-size: 0.62rem; background: #2ecc71; color: #000; border-radius: 4px; padding: 1px 4px; font-weight: bold; }
  .btn-mode.mode-actif { border-color: #2ecc71; }
  .btn-mode.mode-hard.mode-actif { border-color: #e67e22; }
  .btn-mode.mode-hard.mode-actif .mode-badge { background: #e67e22; color: #fff; }
  .btn-mode.mode-cauchemar.mode-actif { border-color: #e74c3c; }
  .btn-mode.mode-cauchemar.mode-actif .mode-badge { background: #e74c3c; color: #fff; }
  .mode-desc { font-size: 0.75rem; color: #888; text-align: center; }
  .mode-debut { font-size: 0.72rem; color: #666; text-align: center; margin-top: 4px; }

  .mode-confirm-titre { font-size: 1.1rem; font-weight: bold; color: #f39c12; }
  .confirm-btns { display: flex; gap: 10px; justify-content: center; }
  .cancel-btn {
    background: #333; color: #eee; border: 1px solid #555;
    border-radius: 8px; padding: 10px 20px;
    font-size: 0.9rem; cursor: pointer; font-family: var(--font);
  }
  .cancel-btn:hover { background: #444; }

  .gameover-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.88);
    display: flex; align-items: center; justify-content: center;
    z-index: 100;
  }
  .gameover-modal {
    background: #16213e; border: 2px solid #e74c3c;
    border-radius: 12px; padding: 28px 24px;
    text-align: center; max-width: 280px;
    display: flex; flex-direction: column; gap: 12px;
    animation: fadeInScale 0.3s ease;
  }
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  .gameover-titre { font-size: 1.6rem; font-weight: bold; color: #e74c3c; }
  .gameover-msg { font-size: 0.9rem; color: #eee; line-height: 1.5; }
  .gameover-note { font-size: 0.75rem; color: #888; }
  .gameover-btn {
    background: #e74c3c; color: white; border: none;
    border-radius: 8px; padding: 10px 20px;
    font-size: 1rem; font-weight: bold; cursor: pointer;
    font-family: var(--font); margin-top: 4px;
  }
  .gameover-btn:hover { background: #c0392b; }
  .gameover-btn:disabled { background: #666; cursor: not-allowed; }
  .nom-input {
    width: 100%; box-sizing: border-box;
    background: #1a1a2e; color: #eee; border: 1px solid #444;
    border-radius: 8px; padding: 10px 14px;
    font-size: 1rem; font-family: var(--font);
    margin-top: 4px;
  }
  .nom-input:focus { outline: none; border-color: #f39c12; }

  /* Modal classe */
  .classe-modal {
    background: #16213e; border: 2px solid #f39c12;
    padding: 20px 16px; max-width: 320px; width: 94%;
    max-height: 80vh; overflow-y: auto;
    display: flex; flex-direction: column; gap: 8px;
    animation: fadeInScale 0.3s ease;
  }
  .classe-modal-titre {
    font-size: 0.9rem; font-weight: bold; color: #f39c12;
    text-align: center; margin-bottom: 4px;
  }
  .classe-arbre-titre {
    font-size: 0.7rem; color: #aaa; margin-top: 8px; margin-bottom: 2px;
    border-bottom: 1px solid #333; padding-bottom: 4px;
  }
  .btn-classe {
    width: 100%; background: #0f3460; border: 1px solid #555;
    padding: 8px 10px; cursor: pointer; font-family: var(--font);
    text-align: left; display: flex; flex-direction: column; gap: 3px;
    transition: background 0.15s;
  }
  .btn-classe:hover { background: #1a4a80; }
  .btn-classe.classe-active { border-color: #f39c12; background: #1a3a6a; }
  .classe-btn-nom { font-size: 0.68rem; color: #eee; }
  .classe-palier { font-size: 0.58rem; color: #888; margin-left: 6px; }
  .classe-btn-bonus { font-size: 0.60rem; color: #2ecc71; }

  .classe-err { font-size: 0.62rem; color: #e74c3c; text-align: center; }
  .classe-nom { color: #f39c12; }
  .titre-nom { color: #9b59b6; }
  .streak-line { font-size: 0.78rem; color: #f39c12; margin-top: 2px; }
  .btn-classe-change {
    background: none; border: 1px solid #f39c12; color: #f39c12;
    font-size: 0.65rem; padding: 1px 5px; cursor: pointer;
    font-family: var(--font); margin-left: 4px; vertical-align: middle;
  }
  .btn-classe-change:hover { background: #f39c1222; }
</style>
