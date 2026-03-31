<script lang="ts">
    import { onMount } from 'svelte';
    import { getStatsResume, getHistoriqueActivite, getPersonnage } from '$lib/db';
    import type { historique_activite, Personnage } from '$lib/types';

    let resume = $state({ taches_succes: 0, taches_echec: 0, routines_faites: 0, penalites: 0 });
    let historique = $state<historique_activite[]>([]);
    let personnage = $state<Personnage | null>(null);

    onMount(async () => {
        personnage = await getPersonnage(1);
        resume = await getStatsResume(1);
        historique = await getHistoriqueActivite(1);
    });

    function formatDate(d: Date | string) {
        const date = new Date(d);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }

    const STATUT_ICON: Record<string, string> = {
        succes: '✅', echec: '❌', penalite: '⚠️', expire: '⏰', joker: '🃏'
    };

    function meilleurEtage(): number {
        try {
            const save = localStorage.getItem('donjon_save_1');
            if (!save) return 0;
            const data = JSON.parse(save);
            return data.etage ?? 0;
        } catch { return 0; }
    }

    let meilEtage = $state(0);
    onMount(() => { meilEtage = meilleurEtage(); });
</script>

<div class="stats-page">
    <h2 class="titre">📊 Statistiques</h2>

    {#if personnage}
    <div class="perso-info">
        <span class="perso-nom">{personnage.nom}</span>
        <span class="perso-level">Niveau {personnage.level_id}</span>
    </div>
    {/if}

    <!-- Résumé -->
    <div class="resume-grid">
        <div class="resume-card">
            <div class="resume-icon">✅</div>
            <div class="resume-val">{resume.taches_succes}</div>
            <div class="resume-label">Tâches réussies</div>
        </div>
        <div class="resume-card">
            <div class="resume-icon">❌</div>
            <div class="resume-val">{resume.taches_echec}</div>
            <div class="resume-label">Tâches échouées</div>
        </div>
        <div class="resume-card">
            <div class="resume-icon">🔄</div>
            <div class="resume-val">{resume.routines_faites}</div>
            <div class="resume-label">Routines accomplies</div>
        </div>
        <div class="resume-card">
            <div class="resume-icon">⚠️</div>
            <div class="resume-val">{resume.penalites}</div>
            <div class="resume-label">Pénalités reçues</div>
        </div>
        <div class="resume-card">
            <div class="resume-icon">🏆</div>
            <div class="resume-val">{meilEtage > 0 ? `Étage ${meilEtage}` : '—'}</div>
            <div class="resume-label">Meilleur donjon</div>
        </div>
        {#if personnage && (personnage.mode ?? 'normal') !== 'normal'}
        <div class="resume-card mode-card-{personnage.mode}">
            <div class="resume-icon">{personnage.mode === 'hard' ? '🔥' : '💀'}</div>
            <div class="resume-val">{personnage.mode === 'hard' ? 'Hard' : 'Cauchemar'}</div>
            <div class="resume-label">Depuis {personnage.mode_debut ?? '?'}</div>
        </div>
        {/if}
    </div>

    <!-- Historique complet -->
    <h3 class="section-titre">Activité récente</h3>

    {#if historique.length === 0}
    <p class="vide">Aucune activité enregistrée.</p>
    {:else}
    <div class="historique">
        {#each historique as h}
        <div class="histo-row" class:succes={h.statut === 'succes'} class:echec={h.statut === 'echec' || h.statut === 'expire'} class:penalite={h.statut === 'penalite'}>
            <span class="histo-icon">{STATUT_ICON[h.statut] ?? '•'}</span>
            <span class="histo-nom">{h.nom_tache || '—'}</span>
            <span class="histo-date">{formatDate(h.date_action)}</span>
        </div>
        {/each}
    </div>
    {/if}
</div>

<style>
    .stats-page {
        padding: 16px;
        font-family: var(--font, monospace);
        color: var(--text, #eee);
        min-height: 100vh;
    }
    .titre {
        font-size: 1.2rem; margin: 0 0 8px; color: var(--text, #eee);
    }
    .perso-info {
        display: flex; align-items: baseline; gap: 10px;
        margin-bottom: 18px;
    }
    .perso-nom   { font-size: 1rem; font-weight: bold; }
    .perso-level { font-size: 0.8rem; color: var(--text-muted, #aaa); }

    .resume-grid {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 10px; margin-bottom: 24px;
    }
    .resume-card {
        background: var(--bg-card, #1a1a2e);
        border: 1px solid #333; border-radius: var(--radius, 8px);
        padding: 12px; text-align: center;
        display: flex; flex-direction: column; gap: 4px;
    }
    .resume-icon  { font-size: 1.4rem; }
    .resume-val   { font-size: 1.2rem; font-weight: bold; }
    .resume-label { font-size: 0.72rem; color: var(--text-muted, #aaa); }
    .mode-card-hard      { border-color: var(--warning, #e67e22); }
    .mode-card-cauchemar { border-color: var(--danger,  #e74c3c); }

    .section-titre {
        font-size: 0.9rem; color: var(--text-muted, #aaa);
        margin: 0 0 10px; font-weight: normal; text-transform: uppercase; letter-spacing: 1px;
    }
    .vide { color: var(--text-muted, #aaa); font-size: 0.85rem; }

    .historique {
        display: flex; flex-direction: column; gap: 4px;
    }
    .histo-row {
        display: flex; align-items: center; gap: 8px;
        padding: 7px 10px; border-radius: var(--radius, 8px);
        background: var(--bg-card, #1a1a2e);
        border-left: 3px solid #333; font-size: 0.83rem;
    }
    .histo-row.succes   { border-left-color: var(--success, #2ecc71); }
    .histo-row.echec    { border-left-color: var(--danger,  #e74c3c); }
    .histo-row.penalite { border-left-color: var(--warning, #e67e22); }
    .histo-icon  { font-size: 1rem; flex-shrink: 0; }
    .histo-nom   { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .histo-date  { font-size: 0.72rem; color: var(--text-muted, #aaa); flex-shrink: 0; }
</style>
