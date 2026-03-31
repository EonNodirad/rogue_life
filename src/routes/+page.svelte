<script lang="ts">
    import { onMount } from "svelte";
    import { getPersonnage, getCaracteristique, getLevels, getInventaire, getStuffs, allouerStat, acheterStat, gameOver, changerMode, STAT_SHOP_PRIX, type StatAllouable } from "$lib/db";
    import { refreshCharacterStore } from "$lib/stores";
    import type { Personnage, Caracteristique, Level, stuff, inventaire, GameMode } from "$lib/types";

    let personnage = $state<Personnage | null>(null);
    let carac = $state<Caracteristique | null>(null);
    let levelSuivant = $state<Level | null>(null);
    let equipements = $state<(inventaire & { stuff: stuff })[]>([]);

    async function charger() {
        personnage = await getPersonnage(1);
        if (!personnage) return;

        carac = await getCaracteristique(personnage.caracteristique_id);

        const levels = await getLevels();
        levelSuivant = levels.find(l => l.id === personnage!.level_id + 1) ?? levels[levels.length - 1];

        const inventaire = await getInventaire(1);
        const stuffs = await getStuffs();
        equipements = inventaire
            .filter(i => i.est_equipe)
            .map(i => ({ ...i, stuff: stuffs.find(s => s.id === i.stuff_id)! }))
            .filter(i => i.stuff);
    }

    async function allouer(stat: StatAllouable) {
        await allouerStat(1, stat);
        await charger();
    }

    let erreurStat = $state('');
    let gameOverModal = $state(false);

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
        gameOverModal = false;
        await refreshCharacterStore();
        await charger();
    }

    onMount(async () => {
        setTimeout(async () => {
            await charger();
            // Déclencher game over si PV IRL = 0 au chargement
            if (carac && carac.pv_vie_actuels <= 0) gameOverModal = true;
        }, 100);
        window.addEventListener('focus', charger);
        return () => window.removeEventListener('focus', charger);
    });

    let xpPct = $derived(personnage && levelSuivant
        ? Math.min(100, (personnage.experience_actuelle / levelSuivant.exp_max_requise) * 100)
        : 0);
    let pvViePct = $derived(carac ? Math.min(100, (carac.pv_vie_actuels / carac.pv_vie_max) * 100) : 0);
    let pvCombatPct = $derived(carac ? Math.min(100, (carac.pv_combat_actuels / carac.pv_combat_max) * 100) : 0);

    let bonusTotal = $derived(equipements.reduce((acc, e) => ({
        attq:      acc.attq      + (e.stuff.bonus_attq      ?? 0),
        attq_spe:  acc.attq_spe  + (e.stuff.bonus_attq_spe  ?? 0),
        def:       acc.def       + (e.stuff.bonus_def        ?? 0),
        def_spe:   acc.def_spe   + (e.stuff.bonus_def_spe   ?? 0),
        vitesse:   acc.vitesse   + (e.stuff.bonus_vitesse    ?? 0),
        pv_combat: acc.pv_combat + (e.stuff.bonus_pv_combat  ?? 0),
    }), { attq: 0, attq_spe: 0, def: 0, def_spe: 0, vitesse: 0, pv_combat: 0 }));
</script>

{#if personnage && carac}
<div class="profil">

    <div class="perso">
        <div class="avatar"></div>
        <div class="infos">
            <div class="name">{personnage.nom}</div>
            <div class="meta">Niveau {personnage.level_id} — Classe #{personnage.classe_id} — Titre #{personnage.titre_id}</div>
            <div class="gold">Or : {personnage.gold_actuel}</div>
        </div>
    </div>

    <div class="stats">
        <div class="barre-label">PV IRL : {carac.pv_vie_actuels} / {carac.pv_vie_max}</div>
        <div class="barre"><div class="barre-fill vie" style="width: {pvViePct}%"></div></div>

        <div class="barre-label">PV Combat : {carac.pv_combat_actuels} / {carac.pv_combat_max}</div>
        <div class="barre"><div class="barre-fill combat" style="width: {pvCombatPct}%"></div></div>

        <div class="barre-label">XP : {personnage.experience_actuelle} / {levelSuivant?.exp_max_requise ?? '?'}</div>
        <div class="barre"><div class="barre-fill xp" style="width: {xpPct}%"></div></div>
    </div>

    {#if (personnage.points_stat_disponibles ?? 0) > 0}
    <div class="levelup-panel">
        <div class="levelup-titre">⬆️ LEVEL UP — {personnage.points_stat_disponibles} point{personnage.points_stat_disponibles > 1 ? 's' : ''} à distribuer</div>
        <div class="levelup-grid">
            {#each [
                { stat: 'pv_combat_max' as StatAllouable, label: 'PV Combat',  gain: '+5 PV' },
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
{/if}

{#if modeConfirm}
<div class="gameover-overlay">
    <div class="gameover-modal">
        <div class="mode-confirm-titre">Passer en mode {MODE_LABELS[modeConfirm]} ?</div>
        <div class="gameover-msg">{MODE_DESC[modeConfirm]}</div>
        {#if modeConfirm === 'normal'}
        <div class="gameover-note">Retour en normal possible seulement après 3 jours dans le mode.</div>
        {:else if modeConfirm === 'cauchemar' && (personnage?.mode ?? 'normal') === 'hard'}
        <div class="gameover-note">Escalade immédiate. Retour en normal possible après 3 jours.</div>
        {:else if modeConfirm === 'hard' && (personnage?.mode ?? 'normal') === 'cauchemar'}
        <div class="gameover-note">Passage libre. Retour en normal possible après 3 jours.</div>
        {:else}
        <div class="gameover-note">Retour en normal possible après 3 jours.</div>
        {/if}
        <div class="confirm-btns">
            <button class="gameover-btn" onclick={confirmerChangerMode}>Confirmer</button>
            <button class="cancel-btn" onclick={() => modeConfirm = null}>Annuler</button>
        </div>
    </div>
</div>
{/if}

{#if gameOverModal}
<div class="gameover-overlay">
    <div class="gameover-modal">
        <div class="gameover-titre">💀 GAME OVER</div>
        <div class="gameover-msg">Tes PV IRL ont atteint 0.<br>Le personnage repart de zéro.</div>
        <div class="gameover-note">Ton inventaire et tes compétences sont conservés.</div>
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
  }
  .btn-allouer:hover { background: #1a4a80; }
  .allouer-label { font-size: 0.7rem; color: #aaa; }
  .allouer-gain  { font-size: 0.85rem; font-weight: bold; color: #f39c12; margin-top: 2px; }

  .stat-grid {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .stat-ligne {
    display: flex;
    gap: 16px;
  }
  .stat-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 80px;
  }
  .stat-label { color: #aaa; font-size: 0.72rem; }
  .stat-val   { font-weight: bold; font-size: 0.9rem; }
  .stat-bonus { color: #2ecc71; font-size: 0.72rem; }

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
  }
  .btn-mode:hover { background: #1a4a80; }
  .mode-nom { font-size: 0.82rem; color: #eee; }
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
</style>
