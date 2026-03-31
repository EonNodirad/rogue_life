<script lang="ts">
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { characterStore, refreshCharacterStore } from '$lib/stores';
    import { checkDailyPenalties } from '$lib/db';

    let { children } = $props();
    let drawerOuvert = $state(false);

    onMount(async () => {
        try { await checkDailyPenalties(1); } catch (e) { console.warn('checkDailyPenalties:', e); }
        await refreshCharacterStore();
    });

    afterNavigate(async () => {
        await refreshCharacterStore();
    });
</script>

<div class="app-container">
    <header>
        <div class="stats">
            <span>❤️ {$characterStore.pv_vie_actuels}/{$characterStore.pv_vie_max}</span>
            <span>⭐ Lvl {$characterStore.level_id}</span>
            <span>💰 {$characterStore.gold_actuel}g</span>
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
    <button class="burger" onclick={() => drawerOuvert = !drawerOuvert}>
        <span></span><span></span><span></span>
    </button>
</div>

<!-- Overlay sombre -->
{#if drawerOuvert}
<div class="overlay" onclick={() => drawerOuvert = false}></div>
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
        🎒 Sacoche
    </a>
</nav>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #16213e;
        color: white;
        overflow: hidden;
    }

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
</style>
