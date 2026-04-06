<script lang="ts">
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { characterStore, refreshCharacterStore } from '$lib/stores';
    import { checkDailyPenalties, renommerPersonnage } from '$lib/db';
    import '../app.css';

    let { children } = $props();
    let drawerOuvert = $state(false);

    // Onboarding
    let onboardingOuvert = $state(false);
    let nomInput = $state('');
    let nomErreur = $state('');

    async function validerNom() {
        nomErreur = '';
        const n = nomInput.trim();
        if (n.length < 1) { nomErreur = 'Saisis au moins 1 caractère.'; return; }
        if (n.length > 20) { nomErreur = 'Maximum 20 caractères.'; return; }
        await renommerPersonnage(1, n);
        await refreshCharacterStore();
        onboardingOuvert = false;
    }

    // Animations header
    let goldFlash = $state<'up' | 'down' | null>(null);
    let levelFlash = $state(false);
    let prevGold = $state<number | null>(null);
    let prevLevel = $state<number | null>(null);

    $effect(() => {
        const g = $characterStore.gold_actuel;
        if (prevGold !== null && g !== prevGold) {
            goldFlash = g > prevGold ? 'up' : 'down';
            setTimeout(() => goldFlash = null, 800);
        }
        prevGold = g;
    });

    $effect(() => {
        const l = $characterStore.level_id;
        if (prevLevel !== null && l > prevLevel) {
            levelFlash = true;
            setTimeout(() => levelFlash = false, 800);
        }
        prevLevel = l;
    });

    onMount(async () => {
        try {
            const result = await checkDailyPenalties(1);
            if (result.gameOver) {
                localStorage.removeItem('donjon_save_1');
                localStorage.removeItem('donjon_cleared_1');
                localStorage.removeItem('donjon_best_1');
            }
        } catch (e) { console.warn('checkDailyPenalties:', e); }
        await refreshCharacterStore();
        // Onboarding : nom par défaut = 'Héros'
        const { getPersonnage } = await import('$lib/db');
        const p = await getPersonnage(1);
        if (p && p.nom === 'Héros') { nomInput = ''; onboardingOuvert = true; }
    });

    afterNavigate(async () => {
        await refreshCharacterStore();
    });
</script>

<div class="app-container">
    <header>
        <div class="stats">
            <span>❤️ {$characterStore.pv_vie_actuels}/{$characterStore.pv_vie_max}</span>
            <span class:flash-level={levelFlash}>⭐ Lvl {$characterStore.level_id}</span>
            <span class:flash-up={goldFlash === 'up'} class:flash-down={goldFlash === 'down'}>💰 {$characterStore.gold_actuel}g</span>
        </div>
        {#if ($characterStore.mode ?? 'normal') !== 'normal'}
        <div class="mode-badge mode-badge-{$characterStore.mode}">
            {$characterStore.mode === 'hard' ? '🔥 HARD' : '💀 CAUCHEMAR'}
        </div>
        {/if}
    </header>

    <main>
        {@render children()}
    </main>

    <!-- Bouton burger fixé en bas -->
    <button class="burger" aria-label="Ouvrir le menu" onclick={() => drawerOuvert = !drawerOuvert}>
        <span></span><span></span><span></span>
    </button>
</div>

<!-- Overlay sombre -->
{#if drawerOuvert}
<button class="overlay" aria-label="Fermer le menu" onclick={() => drawerOuvert = false}></button>
{/if}

<!-- Drawer latéral -->
<nav class="drawer" class:ouvert={drawerOuvert}>
    <div class="drawer-header">Menu</div>
    <a href="/" onclick={() => drawerOuvert = false}>
        <img src="/accueil.png" alt="" /> Accueil
    </a>
    <a href="/tasks" onclick={() => drawerOuvert = false}>
        <img src="/verifier.png" alt="" /> Tâches
    </a>
    <a href="/shop" onclick={() => drawerOuvert = false}>
        <img src="/magasin.png" alt="" /> Boutique
    </a>
    <a href="/dungeon" onclick={() => drawerOuvert = false}>
        <img src="/donjon.png" alt="" /> Donjon
    </a>
    <a href="/inventory" onclick={() => drawerOuvert = false}>
        <img src="/inventaire.png" alt="" /> Sacoche
    </a>
    <a href="/stats" onclick={() => drawerOuvert = false}>
        <img src="/statistique.png" alt="" /> Stats
    </a>
    <a href="/tuto" onclick={() => drawerOuvert = false}>
        Tuto
    </a>
</nav>

<!-- Modal onboarding -->
{#if onboardingOuvert}
<div class="onboarding-overlay">
    <div class="onboarding-modal">
        <div class="onboarding-logo">⚔️</div>
        <div class="onboarding-titre">Rogue Life</div>
        <div class="onboarding-sous">Bienvenue, héros. Comment t'appelles-tu ?</div>
        <input
            class="onboarding-input"
            type="text"
            placeholder="Ton nom..."
            maxlength="20"
            bind:value={nomInput}
            onkeydown={(e) => e.key === 'Enter' && validerNom()}
        />
        {#if nomErreur}<div class="onboarding-err">{nomErreur}</div>{/if}
        <button class="onboarding-btn" onclick={validerNom}>
            Commencer l'aventure
        </button>
    </div>
</div>
{/if}

<style>
    /* Variables et body définis dans app.css */

    @keyframes flashUp {
        0%,100% { color: inherit; transform: scale(1); }
        30%     { color: var(--gold); transform: scale(1.22); }
    }
    @keyframes flashDown {
        0%,100% { color: inherit; transform: scale(1); }
        30%     { color: var(--danger); transform: scale(1.1); }
    }
    @keyframes flashLevel {
        0%,100% { color: inherit; transform: scale(1); }
        30%     { color: var(--success); transform: scale(1.22); }
    }
    .flash-up    { animation: flashUp    0.8s ease; display: inline-block; }
    .flash-down  { animation: flashDown  0.8s ease; display: inline-block; }
    .flash-level { animation: flashLevel 0.8s ease; display: inline-block; }

    .app-container {
        display: flex;
        flex-direction: column;
        height: 100dvh;
        max-width: 430px;
        width: 100%;
        margin: 0 auto;
        background-color: #16213e;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        position: relative;
    }

    header {
        background-color: #0f3460;
        padding: 10px 15px;
        text-align: center;
        border-bottom: 2px solid #e94560;
    }
    .mode-badge {
        font-size: 0.68rem; font-weight: bold; letter-spacing: 1px;
        border-radius: 4px; padding: 2px 8px; margin-top: 4px;
        display: inline-block;
    }
    .mode-badge-hard { background: #e67e22; color: #fff; }
    .mode-badge-cauchemar { background: #e74c3c; color: #fff; }

    .stats {
        display: flex;
        justify-content: space-around;
        font-weight: bold;
    }

    main {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        padding-bottom: 70px; /* espace pour le burger */
    }

    /* Bouton burger fixé en bas */
    .burger {
        position: absolute;
        bottom: 16px;
        right: 16px;
        width: 48px;
        height: 48px;
        background: #e94560;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        z-index: 20;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }
    .burger span {
        display: block;
        width: 22px;
        height: 2px;
        background: white;
        border-radius: 2px;
    }

    /* Overlay */
    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        z-index: 30;
        border: none;
        padding: 0;
        cursor: default;
    }

    /* Drawer */
    .drawer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100dvh;
        width: 220px;
        background: #0f3460;
        border-right: 2px solid #e94560;
        z-index: 40;
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
    }
    .drawer.ouvert {
        transform: translateX(0);
    }

    .drawer-header {
        font-size: 1.1rem;
        font-weight: bold;
        padding: 0 20px 16px;
        border-bottom: 1px solid #e94560;
        margin-bottom: 8px;
        color: #e94560;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .drawer a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        color: white;
        text-decoration: none;
        font-size: 1rem;
        transition: background 0.15s;
    }
    .drawer a:hover {
        background: rgba(233, 69, 96, 0.15);
        color: #e94560;
    }
    .drawer a img {
        width: 22px;
        height: 22px;
    }

    /* Onboarding */
    .onboarding-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.96);
        display: flex; align-items: center; justify-content: center;
        z-index: 200;
    }
    .onboarding-modal {
        display: flex; flex-direction: column; align-items: center; gap: 14px;
        padding: 32px 28px; max-width: 300px; width: 90%;
        background: var(--bg-header); border: 2px solid var(--accent);
        border-radius: var(--radius-lg);
        animation: fadeInScale 0.35s ease;
    }
    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
    }
    .onboarding-logo  { font-size: 2.8rem; }
    .onboarding-titre { font-size: 1.6rem; font-weight: bold; color: var(--gold); letter-spacing: 2px; }
    .onboarding-sous  { font-size: 0.85rem; color: var(--text-muted); text-align: center; }
    .onboarding-input {
        width: 100%; box-sizing: border-box;
        background: var(--bg); border: 1px solid #555; border-radius: var(--radius);
        color: var(--text); font-family: var(--font); font-size: 1rem;
        padding: 10px 12px; text-align: center;
        outline: none;
    }
    .onboarding-input:focus { border-color: var(--accent); }
    .onboarding-err   { font-size: 0.78rem; color: var(--danger); }
    .onboarding-btn {
        width: 100%; padding: 12px;
        background: var(--accent); color: white; border: none;
        border-radius: var(--radius); font-family: var(--font);
        font-size: 0.95rem; font-weight: bold; cursor: pointer;
        transition: background 0.15s;
    }
    .onboarding-btn:hover { background: #c0392b; }
</style>
