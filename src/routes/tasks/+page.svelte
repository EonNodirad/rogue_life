<script lang="ts">
    import { onMount } from 'svelte';
    import { getTaches, createTache, completerTache, echouerTache, completerRoutine, supprimerRoutine, getHistoriqueActivite, ROUTINE_STATS, checkLevelUp, getStuffs, getCompetencesDonjon, getPersonnageCompetences, ajouterRecompenseDonjon, checkModeCoffres, calculerStreak } from '$lib/db';
    import { refreshCharacterStore } from '$lib/stores';
    import type { tache, historique_activite, Rarete } from '$lib/types';
    import { piocherLoot } from '$lib/loot';
    import type { LootOption } from '$lib/loot';

    let toastLevelUp = $state('');
    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    // Loot box routines
    let lootModalOuvert = $state(false);
    let lootChoix = $state<LootOption[]>([]);
    let lootRarete = $state('');
    let lootEnCours = $state(false);

    const LOOT_WEEK_KEY = 'loot_streak_week'; // semaine ISO déjà réclamée
    let streakActuel = $state(0);
    let streakRecord = $state(0);

    function semaineISO(date = new Date()): string {
        const d = new Date(date);
        d.setHours(0,0,0,0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return d.getFullYear() + '-W' + String(1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)).padStart(2, '0');
    }

    function afficherToast(msg: string) {
        toastLevelUp = msg;
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toastLevelUp = ''; }, 3500);
    }

    let ponctuelles = $state<tache[]>([]);
    let routines = $state<tache[]>([]);
    let historique = $state<historique_activite[]>([]);
    let routinesFaitesAujourdhui = $state(new Set<number>());

    // Modale
    let modale = $state(false);
    let erreur = $state('');
    let typeCreation = $state<'ponctuelle' | 'routine'>('ponctuelle');

    let gameOverModal = $state(false);

    async function confirmerGameOver() {
        localStorage.removeItem('donjon_save_1');
        localStorage.removeItem('donjon_cleared_1');
        localStorage.removeItem('donjon_best_1');
        gameOverModal = false;
        await refreshCharacterStore();
        await charger();
    }

    let nouvellePonctuelle = $state({ nom: '', type_activite: 'sport', difficulte: 1, date_limite: '' });
    let nouvelleRoutine = $state({ nom: '', type_activite: 'sport', difficulte: 1 });

    const today = new Date().toISOString().split('T')[0];

    async function charger() {
        const toutes = await getTaches();
        ponctuelles = toutes.filter(t => t.type === 'ponctuelle');
        routines = toutes.filter(t => t.type === 'routine');

        const hist = await getHistoriqueActivite(1);
        historique = hist.slice(0, 10);

        // Routines faites aujourd'hui
        routinesFaitesAujourdhui = new Set(
            hist
                .filter(h => h.statut === 'succes' && new Date(h.date_action).toISOString().slice(0, 10) === today)
                .map(h => h.tache_id)
        );

        const streak = await calculerStreak(1);
        streakActuel = streak.actuel;
        streakRecord = streak.record;
    }

    // File d'attente pour les coffres de mode (hebdo/mensuel)
    let coffreFile = $state<Array<{ rarete: Rarete; label: string }>>([]);

    async function traiterProchainCoffre() {
        if (coffreFile.length === 0 || lootModalOuvert) return;
        const coffre = coffreFile[0];
        lootRarete = coffre.rarete;

        const stuffs = await getStuffs();
        const donjonComps = await getCompetencesDonjon();
        const mesComps = await getPersonnageCompetences(1);
        const ownedCompIds = mesComps.map(pc => pc.competence_id);
        lootChoix = piocherLoot(coffre.rarete, stuffs, donjonComps, ownedCompIds, 3);
        lootModalOuvert = true;
    }

    onMount(async () => {
        await charger();
        // Vérifier coffres hebdo/mensuel liés au mode
        try {
            const coffres = await checkModeCoffres(1);
            if (coffres.mensuel) coffreFile.push({ rarete: coffres.mensuel, label: 'Coffre mensuel' });
            if (coffres.hebdo)   coffreFile.push({ rarete: coffres.hebdo,   label: 'Coffre hebdo'   });
            if (coffreFile.length > 0) await traiterProchainCoffre();
        } catch (e) { console.warn('checkModeCoffres:', e); }
    });

    // Jours restants pour une ponctuelle
    function joursRestants(t: tache): number | null {
        const dateStr = t.date_limite ?? (t.date_creation && t.duree_jours
            ? (() => { const d = new Date(t.date_creation!); d.setDate(d.getDate() + t.duree_jours!); return d.toISOString().split('T')[0]; })()
            : null);
        if (!dateStr) return null;
        return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
    }

    function badgeJours(t: tache) {
        const j = joursRestants(t);
        if (j === null) return null;
        if (j < 0) return { label: 'EXPIRÉ', cls: 'badge-expire' };
        if (j === 0) return { label: 'Aujourd\'hui !', cls: 'badge-urgent' };
        if (j <= 2) return { label: `${j}j`, cls: 'badge-urgent' };
        return { label: `${j}j`, cls: 'badge-ok' };
    }

    async function ouvrirModale(type: 'ponctuelle' | 'routine') {
        typeCreation = type;
        modale = true;
    }

    async function validerCreation() {
        erreur = '';
        try {
            if (typeCreation === 'ponctuelle') {
                const stats = ROUTINE_STATS[nouvellePonctuelle.difficulte] ?? ROUTINE_STATS[1];
                await createTache({ ...nouvellePonctuelle, type: 'ponctuelle', exp_recompense: stats.xp, gold_recompense: stats.gold, pv_vie_penalite: stats.pv });
                nouvellePonctuelle = { nom: '', type_activite: 'sport', difficulte: 1, date_limite: '' };
            } else {
                const stats = ROUTINE_STATS[nouvelleRoutine.difficulte] ?? ROUTINE_STATS[1];
                await createTache({ ...nouvelleRoutine, type: 'routine', exp_recompense: stats.xp, gold_recompense: stats.gold, pv_vie_penalite: stats.pv });
                nouvelleRoutine = { nom: '', type_activite: 'sport', difficulte: 1 };
            }
            modale = false;
            await charger();
        } catch (e) {
            erreur = String(e);
        }
    }

    async function reussir(id: number) {
        try {
            await completerTache(1, id);
            const lu = await checkLevelUp(1);
            if (lu.levels_gagnes > 0) afficherToast(`🎉 LEVEL UP ! Niveau ${lu.levels_gagnes > 1 ? `+${lu.levels_gagnes}` : ''} atteint ! ${lu.points_gagnes} points à distribuer`);
            await refreshCharacterStore();
            await charger();
        } catch (e) { erreur = String(e); }
    }

    async function echouer(id: number) {
        try {
            const res = await echouerTache(1, id);
            await refreshCharacterStore();
            await charger();
            if (res.gameOver) gameOverModal = true;
        } catch (e) { erreur = String(e); }
    }

    async function faireRoutine(id: number) {
        await completerRoutine(1, id);
        const lu = await checkLevelUp(1);
        if (lu.levels_gagnes > 0) afficherToast(`🎉 LEVEL UP ! ${lu.points_gagnes} points à distribuer`);
        await refreshCharacterStore();
        await charger();

        // Vérifier si toutes les routines sont faites aujourd'hui + streak ≥ 7 + semaine non réclamée
        const toutesTerminees = routines.every(r => routinesFaitesAujourdhui.has(r.id));
        const semaineActuelle = semaineISO();
        if (toutesTerminees && routines.length > 0 && streakActuel >= 7 && localStorage.getItem(LOOT_WEEK_KEY) !== semaineActuelle) {
            await ouvrirLootRoutine();
        }
    }

    async function supprimerR(id: number) {
        try {
            await supprimerRoutine(id);
            await charger();
        } catch (e) {
            afficherToast(String(e).replace('Error: ', ''));
        }
    }

    async function rareteDepuis7Jours(): Promise<Rarete> {
        const hist = await getHistoriqueActivite(1);
        const il7j = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
        const total = hist.filter(h =>
            h.statut === 'succes' &&
            new Date(h.date_action).toISOString().slice(0, 10) >= il7j
        ).length;
        const moyenne = total / 7;
        if (moyenne >= 20) return 'legendaire';
        if (moyenne >= 15) return 'epique';
        if (moyenne >= 12) return 'rare';
        if (moyenne >= 7)  return 'peu_commun';
        return 'commun';
    }

    async function ouvrirLootRoutine() {
        const rarete = await rareteDepuis7Jours();
        lootRarete = rarete;

        const stuffs = await getStuffs();
        const donjonComps = await getCompetencesDonjon();
        const mesComps = await getPersonnageCompetences(1);
        const ownedCompIds = mesComps.map(pc => pc.competence_id);

        lootChoix = piocherLoot(rarete, stuffs, donjonComps, ownedCompIds, 3);
        lootModalOuvert = true;
    }

    async function choisirLootRoutine(option: LootOption) {
        if (lootEnCours) return;
        lootEnCours = true;
        await ajouterRecompenseDonjon(1, option.type, option.id);
        localStorage.setItem(LOOT_WEEK_KEY, semaineISO());
        lootModalOuvert = false;
        lootEnCours = false;
        afficherToast(`🎁 ${option.nom} obtenu !`);
        // Coffre suivant dans la file (mode hebdo/mensuel)
        coffreFile.shift();
        if (coffreFile.length > 0) await traiterProchainCoffre();
    }

    const diffLabel = (d: number) => (['', 'Facile', 'Moyen', 'Difficile'][d] ?? String(d));

</script>

<div class="tasks">

    {#if toastLevelUp}
    <div class="toast-levelup">{toastLevelUp}</div>
    {/if}

    {#if erreur}<p class="erreur">{erreur}</p>{/if}

    <!-- PONCTUELLES -->
    <div class="section-header">
        <h2>Tâches</h2>
        <button class="btn-add" onclick={() => ouvrirModale('ponctuelle')}>+</button>
    </div>

    {#if ponctuelles.length === 0}
        <p class="vide">Aucune tâche ponctuelle.</p>
    {:else}
        {#each ponctuelles as t}
        {@const badge = badgeJours(t)}
        <div class="tache-card" class:expire={badge?.cls === 'badge-expire'}>
            <div class="tache-info">
                <div class="tache-top">
                    <span class="tache-nom">{t.nom}</span>
                    {#if badge}<span class="badge {badge.cls}">{badge.label}</span>{/if}
                </div>
                <span class="tache-meta">{diffLabel(t.difficulte)} · +{t.exp_recompense} XP · +{t.gold_recompense}g · -{t.pv_vie_penalite} PV</span>
            </div>
            <div class="tache-actions">
                {#if badge?.cls !== 'badge-expire'}
                    <button class="btn-ok" onclick={() => reussir(t.id)}>✓</button>
                    <button class="btn-ko" onclick={() => echouer(t.id)}>✗</button>
                {/if}
            </div>
        </div>
        {/each}
    {/if}

    <!-- ROUTINES -->
    <div class="section-header" style="margin-top: 20px;">
        <h2>Routines</h2>
        <button class="btn-add" onclick={() => ouvrirModale('routine')}>+</button>
    </div>
    {#if streakActuel > 0}
    <div class="streak-bar">
        <span class="streak-feu">🔥</span>
        <span class="streak-val">{streakActuel}j</span>
        {#if streakRecord > streakActuel}<span class="streak-rec">· rec:{streakRecord}j</span>{/if}
        {#if streakActuel < 7}
        <span class="streak-hint">— lootbox à {7 - streakActuel}j</span>
        {:else}
        <span class="streak-hint streak-ready">— 🎁 disponible cette semaine</span>
        {/if}
    </div>
    {/if}

    {#if routines.length === 0}
        <p class="vide">Aucune routine.</p>
    {:else}
        {#each routines as r}
        {@const faite = routinesFaitesAujourdhui.has(r.id)}
        {@const stats = ROUTINE_STATS[r.difficulte] ?? ROUTINE_STATS[1]}
        <div class="tache-card" class:faite>
            <div class="tache-info">
                <div class="tache-top">
                    <span class="tache-nom">{r.nom}</span>
                    <span class="badge {faite ? 'badge-ok' : 'badge-todo'}">{faite ? '✓ Fait' : 'À faire'}</span>
                </div>
                <span class="tache-meta">{diffLabel(r.difficulte)} · +{stats.xp} XP · +{stats.gold}g · -{stats.pv} PV si oubli</span>
            </div>
            <div class="routine-actions">
                {#if !faite}
                <button class="btn-ok" onclick={() => faireRoutine(r.id)}>✓</button>
                {/if}
                <button class="btn-del" onclick={() => supprimerR(r.id)} title="Supprimer (7j min)">×</button>
            </div>
        </div>
        {/each}
    {/if}

    <!-- HISTORIQUE -->
    {#if historique.length > 0}
    <h3 style="margin-top: 20px;">Historique récent</h3>
    {#each historique as h}
    <div class="histo-row {h.statut}">
        <span>{h.nom_tache || `Tâche #${h.tache_id}`}</span>
        <span class="statut">
            {#if h.statut === 'succes'}✓ Réussie
            {:else if h.statut === 'echec'}✗ Échouée
            {:else if h.statut === 'expire'}⚠ Expirée
            {:else if h.statut === 'penalite'}⚠ Routine manquée
            {/if}
        </span>
        <span class="date">{new Date(h.date_action).toLocaleDateString()}</span>
    </div>
    {/each}
    {/if}
</div>

<!-- GAME OVER -->
{#if gameOverModal}
<div class="overlay">
    <div class="gameover-modal">
        <div class="gameover-titre">💀 GAME OVER</div>
        <div class="gameover-msg">Tes PV IRL ont atteint 0.<br>Le personnage repart de zéro.</div>
        <div class="gameover-note">Tes compétences et ta progression donjon sont réinitialisées.</div>
        <button class="gameover-btn" onclick={confirmerGameOver}>Recommencer</button>
    </div>
</div>
{/if}

<!-- LOOT BOX ROUTINES -->
{#if lootModalOuvert}
{@const RARETE_COLORS_LOOT: Record<string, string> = { commun: '#aaa', peu_commun: '#2ecc71', rare: '#3498db', epique: '#9b59b6', legendaire: '#f39c12' }}
{@const rareteLabel_LOOT: Record<string, string> = { commun: 'Commun', peu_commun: 'Peu commun', rare: 'Rare', epique: 'Épique', legendaire: 'Légendaire' }}
<div class="overlay">
    <div class="loot-modal">
        <div class="loot-titre">🎁 Loot Box — <span style="color:{RARETE_COLORS_LOOT[lootRarete]}">{rareteLabel_LOOT[lootRarete] ?? lootRarete}</span></div>
        <div class="loot-sous">Toutes les routines complétées ! Choisissez votre récompense :</div>
        <div class="loot-cartes">
            {#each lootChoix as option}
            {@const rc = RARETE_COLORS_LOOT[option.rarete] ?? '#aaa'}
            <button class="loot-carte" style="border-color:{rc}" onclick={() => choisirLootRoutine(option)} disabled={lootEnCours}>
                <span class="loot-type">{option.type === 'stuff' ? '⚔️ Équip.' : '⚡ Sort'}</span>
                <span class="loot-nom">{option.nom}</span>
                <span class="loot-rarete" style="color:{rc}">{rareteLabel_LOOT[option.rarete] ?? option.rarete}</span>
            </button>
            {/each}
            {#if lootChoix.length === 0}
            <p style="color:#888;font-size:0.85rem;text-align:center">Inventaire complet, rien à offrir.</p>
            <button class="btn-cancel" onclick={() => { localStorage.setItem(LOOT_WEEK_KEY, semaineISO()); lootModalOuvert = false; }}>Fermer</button>
            {/if}
        </div>
    </div>
</div>
{/if}

<!-- MODALE -->
{#if modale}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="overlay" onclick={(e) => { if (e.target === e.currentTarget) modale = false; }}>
    <div class="modale">
        {#if typeCreation === 'ponctuelle'}
            <h3>Nouvelle tâche</h3>
            <label>Nom<input bind:value={nouvellePonctuelle.nom} placeholder="Ex: Finir le rapport" /></label>
            <label>Type<select bind:value={nouvellePonctuelle.type_activite}>
                <option value="sport">Sport</option>
                <option value="travail">Travail</option>
                <option value="sante">Santé</option>
                <option value="autre">Autre</option>
            </select></label>
            <label>Difficulté<select bind:value={nouvellePonctuelle.difficulte}>
                <option value={1}>Facile — 15 XP / 8g</option>
                <option value={2}>Moyen — 30 XP / 15g</option>
                <option value={3}>Difficile — 50 XP / 25g</option>
            </select></label>
            <label>Date limite<input type="date" bind:value={nouvellePonctuelle.date_limite} min={today} /></label>
            <p class="info-fixe">XP et or sont fixes selon la difficulté.</p>
        {:else}
            <h3>Nouvelle routine</h3>
            <label>Nom<input bind:value={nouvelleRoutine.nom} placeholder="Ex: 30 min de sport" /></label>
            <label>Type<select bind:value={nouvelleRoutine.type_activite}>
                <option value="sport">Sport</option>
                <option value="travail">Travail</option>
                <option value="sante">Santé</option>
                <option value="autre">Autre</option>
            </select></label>
            <label>Difficulté<select bind:value={nouvelleRoutine.difficulte}>
                <option value={1}>Facile — 15 XP / 8g</option>
                <option value={2}>Moyen — 30 XP / 15g</option>
                <option value={3}>Difficile — 50 XP / 25g</option>
            </select></label>
            <p class="info-fixe">XP et or sont fixes selon la difficulté.</p>
        {/if}

        {#if erreur}<p class="erreur">{erreur}</p>{/if}
        <div class="modale-actions">
            <button class="btn-cancel" onclick={() => modale = false}>Annuler</button>
            <button class="btn-ok" onclick={validerCreation} disabled={typeCreation === 'ponctuelle' ? !nouvellePonctuelle.nom : !nouvelleRoutine.nom}>Créer</button>
        </div>
    </div>
</div>
{/if}

<style>
    .tasks { color: #eee; font-family: var(--font); }

    .streak-bar {
        display: flex; align-items: center; gap: 5px;
        font-size: 0.82rem; margin-bottom: 8px; color: #aaa;
    }
    .streak-feu { font-size: 1rem; }
    .streak-val { font-weight: bold; color: #f39c12; }
    .streak-rec { color: #888; }
    .streak-hint { color: #666; }
    .streak-ready { color: #2ecc71 !important; }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    h2 { margin: 0; font-size: 1.1rem; }
    h3 { color: #aaa; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 6px; }
    .vide { color: #555; font-style: italic; font-size: 0.85rem; }

    .tache-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1a1a3e;
        border: 1px solid #333;
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 8px;
    }
    .tache-card.expire { opacity: 0.5; border-color: #e74c3c; }
    .tache-card.faite { opacity: 0.6; }

    .tache-top { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
    .tache-nom { font-weight: bold; font-size: 0.95rem; }
    .tache-meta { font-size: 0.72rem; color: #aaa; }
    .tache-actions { display: flex; gap: 6px; flex-shrink: 0; }

    .badge { font-size: 0.68rem; padding: 2px 6px; border-radius: 10px; font-weight: bold; }
    .badge-ok     { background: #2ecc71; color: #111; }
    .badge-urgent { background: #e67e22; color: #111; }
    .badge-expire { background: #e74c3c; color: white; }
    .badge-todo   { background: #555; color: #f2f0f0; }

    .btn-add {
        background: #e94560; color: white; border: none;
        border-radius: 50%; width: 30px; height: 30px;
        font-size: 1.1rem; cursor: pointer; line-height: 1;
    }
    .btn-ok {
        background: #2ecc71; color: #111; border: none;
        border-radius: 4px; padding: 4px 10px; cursor: pointer; font-weight: bold;
    }
    .btn-ok:disabled { opacity: 0.4; cursor: default; }
    .btn-ko {
        background: #e74c3c; color: white; border: none;
        border-radius: 4px; padding: 4px 10px; cursor: pointer; font-weight: bold;
    }
    .btn-del {
        background: transparent; color: var(--text-muted); border: 1px solid #444;
        border-radius: 4px; padding: 4px 8px; cursor: pointer; font-size: 1rem; line-height: 1;
    }
    .btn-del:hover { color: #e74c3c; border-color: #e74c3c; }
    .routine-actions { display: flex; align-items: center; gap: 6px; }

    .histo-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.78rem;
        padding: 5px 0;
        border-bottom: 1px solid #222;
    }
    .histo-row.succes .statut   { color: #2ecc71; }
    .histo-row.echec .statut    { color: #e74c3c; }
    .histo-row.expire .statut   { color: #e67e22; }
    .histo-row.penalite .statut { color: #e67e22; }
    .date { color: #555; }

    .overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.75);
        display: flex; align-items: center; justify-content: center;
        z-index: 10;
    }
    .modale {
        background: #16213e;
        border: 1px solid #e94560;
        border-radius: 8px;
        padding: 20px;
        width: 280px;
        display: flex; flex-direction: column; gap: 10px;
        max-height: 80dvh;
        overflow-y: auto;
    }
    .modale h3 { margin: 0; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: #aaa; }
    input, select {
        background: #0f3460; color: white; border: 1px solid #333;
        border-radius: 4px; padding: 6px; font-size: 0.9rem;
        appearance: none; -webkit-appearance: none;
    }
    option {
        background: #0f3460; color: white;
    }
    .info-fixe { color: #aaa; font-size: 0.78rem; margin: 0; font-style: italic; }
    .erreur { color: #e74c3c; font-size: 0.78rem; margin: 0; word-break: break-all; }
    .toast-levelup {
        position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
        background: #f39c12; color: #111; padding: 10px 20px;
        border-radius: 20px; font-weight: bold; font-size: 0.9rem;
        z-index: 999; animation: fadeIn 0.3s ease;
        box-shadow: 0 4px 20px rgba(243,156,18,0.5);
        text-align: center; max-width: 90vw;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%); } }
    .modale-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
    .btn-cancel {
        background: #333; color: white; border: none;
        border-radius: 4px; padding: 6px 14px; cursor: pointer;
    }

    /* Game over */
    .gameover-modal {
        background: #16213e; border: 2px solid #e74c3c;
        border-radius: 12px; padding: 28px 24px;
        text-align: center; max-width: 280px;
        display: flex; flex-direction: column; gap: 12px;
    }
    .gameover-titre { font-size: 1.6rem; font-weight: bold; color: #e74c3c; }
    .gameover-msg { font-size: 0.9rem; color: #eee; line-height: 1.5; }
    .gameover-note { font-size: 0.75rem; color: #888; }
    .gameover-btn {
        background: #e74c3c; color: white; border: none;
        border-radius: 8px; padding: 10px 20px;
        font-size: 1rem; font-weight: bold; cursor: pointer; font-family: var(--font);
    }
    .gameover-btn:hover { background: #c0392b; }

    /* Loot box routines */
    .loot-modal {
        background: #16213e; border: 2px solid #f39c12; border-radius: 12px;
        padding: 20px 16px; width: 300px; max-width: 94vw;
        display: flex; flex-direction: column; gap: 12px;
        animation: fadeInScale 0.25s ease;
    }
    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.92); }
        to   { opacity: 1; transform: scale(1); }
    }
    .loot-titre { font-size: 1rem; font-weight: bold; text-align: center; }
    .loot-sous { font-size: 0.75rem; color: #888; text-align: center; }
    .loot-cartes { display: flex; flex-direction: column; gap: 8px; }
    .loot-carte {
        background: #0f3460; border: 2px solid; border-radius: 10px;
        padding: 12px 14px; cursor: pointer; text-align: left;
        display: flex; flex-direction: column; gap: 4px;
        transition: background 0.15s; font-family: var(--font);
    }
    .loot-carte:hover:not(:disabled) { background: #1a4a80; }
    .loot-carte:disabled { opacity: 0.6; cursor: default; }
    .loot-type  { font-size: 0.68rem; color: #888; }
    .loot-nom   { font-size: 0.95rem; font-weight: bold; color: #eee; }
    .loot-rarete { font-size: 0.72rem; font-style: italic; }
</style>
