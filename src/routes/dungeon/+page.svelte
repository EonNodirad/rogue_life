<script lang="ts">
    import { onMount } from 'svelte';
    import { beforeNavigate } from '$app/navigation';
    import {
        getPersonnage, getCaracteristique, getInventaire, getStuffs,
        getPersonnageCompetences, ajouterRecompenseDonjon, resetPvCombat, updatePvCombat,
        getCompetences, getCompetencesDonjon, getPersonnageAffinites, incrementerLootDonjon,
    } from '$lib/db';
    import { piocherLoot } from '$lib/loot';
    import type { LootOption } from '$lib/loot';
    import { refreshCharacterStore } from '$lib/stores';
    import {
        genererMonstre, initCombat, executerTour, lootMonstre,
        type CombatState, type ActionCombat, type CombatUnit,
    } from '$lib/combat';
    import type { Competence, PersonnageCompetence, stuff, Element, Rarete } from '$lib/types';

    // ── Gacha ────────────────────────────────────────────────────────────────
    interface BonusDonjon {
        id: string
        label: string
        description: string
        type: 'affinite' | 'stat' | 'pv_max'
        element?: string
        stat?: 'attq' | 'def' | 'attq_spe' | 'def_spe'
        valeur: number
    }

    const GACHA_POOL: BonusDonjon[] = [
        { id: 'attq+8',      label: '⚔ Rage Guerrière',    description: '+8 ATQ pour cette run',        type: 'stat',    stat: 'attq',    valeur: 8  },
        { id: 'def+8',       label: '🛡 Peau de Pierre',    description: '+8 DEF pour cette run',        type: 'stat',    stat: 'def',     valeur: 8  },
        { id: 'attq_spe+8',  label: '✨ Génie Arcanique',   description: '+8 ATQ SPÉ pour cette run',    type: 'stat',    stat: 'attq_spe', valeur: 8  },
        { id: 'def_spe+8',   label: '🔮 Bouclier Mystique', description: '+8 DEF SPÉ pour cette run',    type: 'stat',    stat: 'def_spe', valeur: 8  },
        { id: 'pv+20',       label: '💗 Vitalité+',         description: '+20% PV Combat max',           type: 'pv_max',                   valeur: 20 },
        { id: 'attq+15',     label: '⚔ Berserk',            description: '+15 ATQ, -5 DEF',              type: 'stat',    stat: 'attq',    valeur: 15 },
        { id: 'feu+25',      label: '🔥 Affinité Feu',       description: '+25% dégâts Feu',              type: 'affinite', element: 'feu',         valeur: 25 },
        { id: 'eau+25',      label: '💧 Affinité Eau',       description: '+25% dégâts Eau',              type: 'affinite', element: 'eau',         valeur: 25 },
        { id: 'terre+25',    label: '🪨 Affinité Terre',     description: '+25% dégâts Terre',            type: 'affinite', element: 'terre',       valeur: 25 },
        { id: 'feu+25b',     label: '🔥 Maîtrise du Feu',    description: '+40% dégâts Feu, -10 DEF',    type: 'affinite', element: 'feu',         valeur: 40 },
        { id: 'lumiere+25',  label: '☀️ Lumière Sacrée',     description: '+25% dégâts Lumière',          type: 'affinite', element: 'lumiere',     valeur: 25 },
        { id: 'tenebres+25', label: '🌑 Ombre Éternelle',    description: '+25% dégâts Ténèbres',         type: 'affinite', element: 'tenebres',    valeur: 25 },
        { id: 'mort+25',     label: '💀 Pacte de Mort',      description: '+25% dégâts Mort',             type: 'affinite', element: 'mort',        valeur: 25 },
        { id: 'vie+25',      label: '🌿 Harmonie Naturelle', description: '+25% dégâts Vie',              type: 'affinite', element: 'vie',         valeur: 25 },
        { id: 'air+25',      label: '🌪 Tempête',            description: '+25% dégâts Air',              type: 'affinite', element: 'air',         valeur: 25 },
        { id: 'pv+35',       label: '💗 Titan',              description: '+35% PV Combat max',           type: 'pv_max',                   valeur: 35 },
    ];

    // ── État global donjon ──────────────────────────────────────────────────
    type Phase = 'lobby' | 'combat' | 'inter_salle' | 'ravito' | 'gacha' | 'loot_box' | 'mort';

    let phase = $state<Phase>('lobby');
    let etage = $state(1);
    let salle = $state(0);

    // Monde = groupe de 10 étages (1-10 → Monde 1, 11-20 → Monde 2…)
    let monde = $derived(Math.ceil(etage / 10));
    let etageInMonde = $derived(((etage - 1) % 10) + 1);
    function labelEtage(n: number) {
        const m = Math.ceil(n / 10);
        const e = ((n - 1) % 10) + 1;
        return m === 1 ? `Étage ${e}` : `Monde ${m} · Étage ${e}`;
    }
    let orDonjon = $state(0);
    let bonusDonjonActifs = $state<BonusDonjon[]>([]);
    let gachaChoix = $state<BonusDonjon[]>([]);
    let lootDisponible = $state(false); // true = première fois cet étage → choix de loot
    let gachaEstFinEtage = $state(false); // true = gacha salle 10, false = gacha salle 5

    const BEST_KEY = 'donjon_best_1';
    let meilleurScore = $state<{ etage: number; salle: number } | null>(null);

    function mettreAJourMeilleurScore() {
        const best = meilleurScore;
        if (!best || etage > best.etage || (etage === best.etage && salle > best.salle)) {
            meilleurScore = { etage, salle };
            localStorage.setItem(BEST_KEY, JSON.stringify(meilleurScore));
        }
    }

    let itemsDonjon = $state<{ nom: string; valeur_or: number }[]>([]);

    let lootBoxRarete = $state('peu_commun');
    let lootChoix = $state<LootOption[]>([]);

    let combatState = $state<CombatState | null>(null);

    let pvCombatActuels = $state(0);
    let pvCombatMax = $state(1);
    let nomJoueur = $state('Héros');
    let niveauJoueur = $state(1);
    let elementJoueur = $state<Element>('neutre');
    let affinitesJoueur = $state<Partial<Record<Element, number>>>({});
    let attqJoueur = $state(1);
    let attqSpeJoueur = $state(1);
    let defJoueur = $state(0);
    let defSpeJoueur = $state(0);
    let vitesseJoueur = $state(1);
    let competencesEquipees = $state<(PersonnageCompetence & { competence: Competence })[]>([]);

    let allStuffIds = $state<number[]>([]);
    let donjonCompIds = $state<number[]>([]);   // comps source='donjon'
    let ownedCompIds = $state<number[]>([]);    // comps possédées par le joueur
    let etageEnCours = $state(false);           // entre deux étages (pas nouvelle run)

    async function chargerPerso() {
        const p = await getPersonnage(1);
        if (!p) return;
        nomJoueur = p.nom;
        niveauJoueur = p.level_id;

        const c = await getCaracteristique(p.caracteristique_id);
        if (!c) return;
        pvCombatActuels = c.pv_combat_actuels;
        pvCombatMax = c.pv_combat_max;

        const inv = await getInventaire(1);
        const stuffs = await getStuffs();
        const equipes = inv
            .filter(i => i.est_equipe)
            .map(i => stuffs.find(s => s.id === i.stuff_id)!)
            .filter(Boolean) as stuff[];

        attqJoueur    = c.attq    + equipes.reduce((s, st) => s + (st.bonus_attq ?? 0), 0);
        attqSpeJoueur = c.attq_spe + equipes.reduce((s, st) => s + (st.bonus_attq_spe ?? 0), 0);
        defJoueur     = c.def     + equipes.reduce((s, st) => s + (st.bonus_def ?? 0), 0);
        defSpeJoueur  = c.def_spe + equipes.reduce((s, st) => s + (st.bonus_def_spe ?? 0), 0);
        vitesseJoueur = c.vitesse + equipes.reduce((s, st) => s + (st.bonus_vitesse ?? 0), 0);

        try {
            const affinites = await getPersonnageAffinites(1);
            affinitesJoueur = Object.fromEntries(affinites.map(a => [a.element, a.bonus_pct]));
        } catch { /* migration 0008 pas encore appliquée */ }

        try {
            const pcs = await getPersonnageCompetences(1);
            competencesEquipees = pcs.filter(pc => pc.est_equipee);
            ownedCompIds = pcs.map(pc => pc.competence_id);
            const donjonComps = await getCompetencesDonjon();
            donjonCompIds = donjonComps.map(c => c.id);
        } catch { /* migration 0007/0009 pas encore appliquée */ }

        allStuffIds = stuffs.map(s => s.id);
    }

    const SAVE_KEY = 'donjon_save_1';

    function sauvegarderProgression() {
        const save = { etage, salle, orDonjon, bonusDonjonActifs, itemsDonjon, pvCombatActuels, pvCombatMax, phase, lootBoxRarete };
        localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    }

    function chargerSauvegarde(): { savedPhase: Phase } {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return { savedPhase: 'lobby' };
        try {
            const s = JSON.parse(raw);
            etage              = s.etage ?? 1;
            salle              = s.salle ?? 0;
            orDonjon           = s.orDonjon ?? 0;
            bonusDonjonActifs  = s.bonusDonjonActifs ?? [];
            itemsDonjon        = s.itemsDonjon ?? [];
            if (s.pvCombatMax) pvCombatMax = s.pvCombatMax;
            if (s.pvCombatActuels != null) pvCombatActuels = s.pvCombatActuels;
            if (s.lootBoxRarete) lootBoxRarete = s.lootBoxRarete;
            return { savedPhase: s.phase ?? 'lobby' };
        } catch { return { savedPhase: 'lobby' }; }
    }

    function effacerSauvegarde() {
        localStorage.removeItem(SAVE_KEY);
    }

    const CLEARED_KEY = 'donjon_cleared_1';

    function etageDejaTermine(n: number): boolean {
        try {
            const raw = localStorage.getItem(CLEARED_KEY);
            const cleared: number[] = raw ? JSON.parse(raw) : [];
            return cleared.includes(n);
        } catch { return false; }
    }

    function marquerEtageTermine(n: number) {
        try {
            const raw = localStorage.getItem(CLEARED_KEY);
            const cleared: number[] = raw ? JSON.parse(raw) : [];
            if (!cleared.includes(n)) {
                cleared.push(n);
                localStorage.setItem(CLEARED_KEY, JSON.stringify(cleared));
            }
        } catch {}
    }

    // pvCombatMax avec bonus gacha appliqués (calculé depuis la base DB + bonusDonjonActifs)
    function pvCombatMaxAvecBonus(base: number): number {
        let max = base;
        for (const b of bonusDonjonActifs) {
            if (b.type === 'pv_max') max = Math.floor(max * (1 + b.valeur / 100));
        }
        return max;
    }

    let aSauvegarde = $state(false);

    onMount(async () => {
        const hasSave = localStorage.getItem(SAVE_KEY) !== null;
        aSauvegarde = hasSave;
        const bestRaw = localStorage.getItem(BEST_KEY);
        meilleurScore = bestRaw ? JSON.parse(bestRaw) : null;
        await chargerPerso();
        if (hasSave) {
            const { savedPhase } = chargerSauvegarde();
            // Si on était en loot_box, régénérer les choix sans ré-incrémenter le compteur
            if (savedPhase === 'loot_box') {
                lootDisponible = true; // restore to allow regeneration
                await preparerLootBox(false);
                phase = 'loot_box';
            }
        }
    });

    // Auto-sauvegarder au départ de la page si une run est en cours
    beforeNavigate(() => {
        if (salle > 0 && phase !== 'mort') {
            sauvegarderProgression();
            aSauvegarde = true;
        }
    });

    // ── Lobby ───────────────────────────────────────────────────────────────
    async function reprendre() {
        await chargerPerso();
        const { savedPhase } = chargerSauvegarde();
        if (savedPhase === 'loot_box') {
            lootDisponible = true; // restore to allow regeneration
            await preparerLootBox(false);
            phase = 'loot_box';
        } else if (savedPhase === 'gacha') {
            genererGachaChoix();
            phase = 'gacha';
        } else if (savedPhase === 'ravito' || savedPhase === 'inter_salle') {
            phase = savedPhase;
        } else {
            // combat ou lobby → relancer le combat à la salle sauvegardée SANS incrémenter
            lancerCombat();
        }
    }

    async function entrerDonjon() {
        try {
            await resetPvCombat(1);
            await chargerPerso();
            etage = 1;
            salle = 0;
            orDonjon = 0;
            bonusDonjonActifs = [];
            etageEnCours = false;
            effacerSauvegarde();
            aSauvegarde = false;
            lancerSalle();
        } catch (e) {
            console.error('entrerDonjon:', e);
        }
    }

    function quitterDonjon() {
        sauvegarderProgression();
        aSauvegarde = true;
        phase = 'lobby';
    }

    function appliquerBonusSurStats(): {
        attq: number; attqSpe: number; def: number; defSpe: number;
        pvMax: number; affinites: Partial<Record<string, number>>
    } {
        let attq = attqJoueur, attqSpe = attqSpeJoueur;
        let def = defJoueur, defSpe = defSpeJoueur;
        let pvMax = pvCombatMax;
        const affinites: Partial<Record<string, number>> = { ...affinitesJoueur };

        for (const b of bonusDonjonActifs) {
            if (b.type === 'stat') {
                if (b.stat === 'attq')    attq    += b.valeur;
                if (b.stat === 'def')     def     += b.valeur;
                if (b.stat === 'attq_spe') attqSpe += b.valeur;
                if (b.stat === 'def_spe') defSpe  += b.valeur;
            } else if (b.type === 'pv_max') {
                pvMax = Math.floor(pvMax * (1 + b.valeur / 100));
            } else if (b.type === 'affinite' && b.element) {
                affinites[b.element] = (affinites[b.element] ?? 0) + b.valeur;
            }
        }
        return { attq, attqSpe, def, defSpe, pvMax, affinites };
    }

    function lancerCombat() {
        // Démarre le combat à la salle courante SANS incrémenter
        const stats = appliquerBonusSurStats();
        const monstre = genererMonstre(etage, salle);
        combatState = initCombat(
            nomJoueur, pvCombatActuels, stats.pvMax,
            stats.attq, stats.attqSpe, stats.def, stats.defSpe, vitesseJoueur,
            niveauJoueur, elementJoueur, stats.affinites,
            monstre,
        );
        itemsDonjon = [];
        phase = 'combat';
    }

    function lancerSalle() {
        salle += 1;
        lancerCombat();
    }

    function genererGachaChoix() {
        const pool = [...GACHA_POOL];
        const choix: BonusDonjon[] = [];
        while (choix.length < 3 && pool.length > 0) {
            const i = Math.floor(Math.random() * pool.length);
            choix.push(pool.splice(i, 1)[0]);
        }
        gachaChoix = choix;
    }

    function choisirBonus(bonus: BonusDonjon) {
        bonusDonjonActifs = [...bonusDonjonActifs, bonus];
        // Appliquer pv_max immédiatement (avec soin proportionnel)
        if (bonus.type === 'pv_max') {
            const ancien = pvCombatMax;
            pvCombatMax = Math.floor(pvCombatMax * (1 + bonus.valeur / 100));
            const gain = pvCombatMax - ancien;
            pvCombatActuels = Math.min(pvCombatMax, pvCombatActuels + gain);
            updatePvCombat(1, pvCombatActuels);
        }
        if (gachaEstFinEtage) {
            preparerLootBox();
            phase = 'loot_box';
        } else {
            phase = 'inter_salle';
        }
        sauvegarderProgression();
    }

    // ── Combat ──────────────────────────────────────────────────────────────
    function agir(action: ActionCombat) {
        if (!combatState || combatState.termine) return;
        combatState = executerTour(combatState, action);

        if (combatState.termine) {
            if (combatState.vainqueur === 'joueur') {
                pvCombatActuels = combatState.joueur.pv_actuels;
                const loot = lootMonstre(etage, salle);
                itemsDonjon = loot.items;
                orDonjon += loot.or_base;
                updatePvCombat(1, pvCombatActuels);
                mettreAJourMeilleurScore();

                if (salle === 5) {
                    const soin = Math.floor(pvCombatMax * 0.3);
                    pvCombatActuels = Math.min(pvCombatMax, pvCombatActuels + soin);
                    updatePvCombat(1, pvCombatActuels);
                    genererGachaChoix();
                    gachaEstFinEtage = false;
                    phase = 'ravito';
                } else if (salle === 10) {
                    mettreAJourMeilleurScore();
                    const premiereFois = !etageDejaTermine(etage);
                    lootDisponible = premiereFois;
                    if (premiereFois) marquerEtageTermine(etage);
                    genererGachaChoix();
                    gachaEstFinEtage = true;
                    phase = 'gacha';
                } else {
                    phase = 'inter_salle';
                }
                sauvegarderProgression();
            } else {
                pvCombatActuels = 0;
                updatePvCombat(1, 0);
                effacerSauvegarde();
                aSauvegarde = false;
                phase = 'mort';
            }
        }
    }

    async function preparerLootBox(increment = true) {
        if (!lootDisponible && increment) {
            lootChoix = [];
            return;
        }
        if (increment) {
            lootBoxRarete = await incrementerLootDonjon(1);
        }
        const stuffs = await getStuffs();
        const comps = await getCompetencesDonjon();
        lootChoix = piocherLoot(lootBoxRarete as Rarete, stuffs, comps, ownedCompIds, 3);
    }

    let lootEnCours = $state(false);
    async function choisirLoot(option: LootOption) {
        if (lootEnCours) return;
        lootEnCours = true;
        await ajouterRecompenseDonjon(1, option.type, option.id);
        await refreshCharacterStore();
        lootChoix = [option]; // n'afficher que le choix retenu
        lootEnCours = false;
    }

    async function continuerApresLoot() {
        etage += 1;
        salle = 0;
        lootChoix = [];
        etageEnCours = true;
        effacerSauvegarde();
        aSauvegarde = false;
        await chargerPerso();
        pvCombatMax = pvCombatMaxAvecBonus(pvCombatMax);
        pvCombatActuels = Math.min(pvCombatActuels, pvCombatMax);
        phase = 'lobby';
    }

    // ── Inter-salle ─────────────────────────────────────────────────────────
    function vendre(item: { nom: string; valeur_or: number }) {
        orDonjon += item.valeur_or;
        itemsDonjon = itemsDonjon.filter(i => i !== item);
    }

    function toutVendre() {
        orDonjon += itemsDonjon.reduce((s, i) => s + i.valeur_or, 0);
        itemsDonjon = [];
    }

    function acheterSoin() {
        if (orDonjon < 20 || pvCombatActuels >= pvCombatMax) return;
        orDonjon -= 20;
        pvCombatActuels = Math.min(pvCombatMax, pvCombatActuels + Math.floor(pvCombatMax * 0.25));
        updatePvCombat(1, pvCombatActuels);
    }

    function continuerSalle() {
        lancerSalle();
    }

    // ── Helpers ─────────────────────────────────────────────────────────────
    function pvPct(unit: CombatUnit) {
        return Math.max(0, Math.round((unit.pv_actuels / unit.pv_max) * 100));
    }

    function pvColor(pct: number) {
        if (pct > 60) return '#2ecc71';
        if (pct > 30) return '#f39c12';
        return '#e74c3c';
    }

    const RARETE_COLORS: Record<string, string> = {
        commun: '#aaa', peu_commun: '#2ecc71', rare: '#3498db', epique: '#9b59b6', legendaire: '#f39c12',
    };

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

    const effetLabel: Record<string, string> = {
        physique: '⚔', magique: '✨', buff_attq: '💪', buff_def: '🛡', buff_vitesse: '💨', poison: '☠', stun: '💫',
    };

    function logRecent(state: CombatState) {
        return state.log.slice(-6);
    }
</script>

<div class="donjon">

    <!-- ── LOBBY ─────────────────────────────────────────────────────────── -->
    {#if phase === 'lobby'}
    <div class="lobby">
        <div class="etage-badge">{labelEtage(etage)} · {salle === 0 ? 'Début' : `Salle ${salle}/10`}</div>

        <div class="stat-row">
            <span class="stat-label">PV Combat</span>
            <div class="barre-wrap">
                <div class="barre" style="width:{Math.round(pvCombatActuels/pvCombatMax*100)}%; background:{pvColor(Math.round(pvCombatActuels/pvCombatMax*100))}"></div>
            </div>
            <span class="stat-val">{pvCombatActuels}/{pvCombatMax}</span>
        </div>

        {#if orDonjon > 0}
        <div class="or-donjon">💰 Or donjon : {orDonjon}</div>
        {/if}

        {#if bonusDonjonActifs.length > 0}
        <div class="bonus-actifs">
            <div class="bonus-actifs-titre">✨ Bonus de run actifs</div>
            <div class="bonus-actifs-list">
                {#each bonusDonjonActifs as b}
                <span class="bonus-chip">{b.label}</span>
                {/each}
            </div>
        </div>
        {/if}

        <div class="comp-block">
            <div class="comp-title">Compétences équipées ({competencesEquipees.length}/6)</div>
            {#if competencesEquipees.length === 0}
                <p class="vide">Aucune — <a href="/shop" class="lien">achetez-en en boutique</a></p>
            {:else}
                <div class="comp-grid">
                    {#each competencesEquipees as pc}
                    <div class="comp-chip" style="border-color:{ELEMENT_COLORS[pc.competence.element] ?? '#555'}">{ELEMENT_ICONS[pc.competence.element] ?? '○'} {pc.competence.nom}</div>
                    {/each}
                </div>
            {/if}
        </div>

        {#if meilleurScore}
        <div class="meilleur-score">🏆 Meilleur score : {labelEtage(meilleurScore.etage)}, Salle {meilleurScore.salle}/10</div>
        {/if}

        {#if aSauvegarde}
        {@const raw = JSON.parse(localStorage.getItem(SAVE_KEY) ?? '{}')}
        <button class="btn-entrer" onclick={reprendre}>
            ▶ Reprendre ({labelEtage(raw.etage ?? 1)}, Salle {raw.salle}/10)
        </button>
        <button class="btn-recommencer" onclick={entrerDonjon}>
            🔄 Nouvelle run (Étage 1)
        </button>
        {:else if etageEnCours}
        <button class="btn-entrer" onclick={lancerSalle}>
            ▶ Entrer {labelEtage(etage)}
        </button>
        <button class="btn-recommencer" onclick={entrerDonjon}>
            🔄 Nouvelle run (Étage 1)
        </button>
        {:else}
        <button class="btn-entrer" onclick={entrerDonjon}>
            ⚔️ Entrer dans le donjon
        </button>
        {/if}
    </div>

    <!-- ── COMBAT ────────────────────────────────────────────────────────── -->
    {:else if phase === 'combat' && combatState}
    {@const cs = combatState}

    <div class="combat-header">
        <span class="salle-badge">{labelEtage(etage)} · Salle {salle}/10</span>
        <span class="or-chip">💰 {orDonjon} od</span>
    </div>

    <div class="unit-card monstre-card" style="border-left-color:{ELEMENT_COLORS[cs.monstre.element] ?? '#e74c3c'}">
        <div class="unit-top">
            <span class="unit-nom">👹 {cs.monstre.nom}</span>
            <span class="element-badge" style="background:{ELEMENT_COLORS[cs.monstre.element] ?? '#888'}22; color:{ELEMENT_COLORS[cs.monstre.element] ?? '#888'}; border-color:{ELEMENT_COLORS[cs.monstre.element] ?? '#888'}">
                {ELEMENT_ICONS[cs.monstre.element] ?? '○'} {cs.monstre.element}
            </span>
            <span class="unit-pv">{cs.monstre.pv_actuels}/{cs.monstre.pv_max} PV</span>
        </div>
        <div class="barre-wrap">
            <div class="barre" style="width:{pvPct(cs.monstre)}%; background:{pvColor(pvPct(cs.monstre))}"></div>
        </div>
        <div class="statuts-row">
            {#each cs.monstre.statuts as st}
                <span class="statut-chip">{st.type === 'poison' ? '☠' : '💫'} {st.tours_restants}t</span>
            {/each}
            {#each cs.monstre.buffs as b}
                <span class="buff-chip">↑{b.stat} {b.tours_restants}t</span>
            {/each}
        </div>
    </div>

    <div class="log-box">
        {#each logRecent(cs) as ligne}
            <div class="log-ligne">{ligne}</div>
        {/each}
        {#if cs.log.length === 0}
            <div class="log-ligne vide">Le combat commence…</div>
        {/if}
    </div>

    <div class="unit-card joueur-card">
        <div class="unit-top">
            <span class="unit-nom">🧙 {cs.joueur.nom}</span>
            <span class="unit-pv">{cs.joueur.pv_actuels}/{cs.joueur.pv_max} PV</span>
        </div>
        <div class="barre-wrap">
            <div class="barre" style="width:{pvPct(cs.joueur)}%; background:{pvColor(pvPct(cs.joueur))}"></div>
        </div>
        <div class="statuts-row">
            {#each cs.joueur.statuts as st}
                <span class="statut-chip">{st.type === 'poison' ? '☠' : '💫'} {st.tours_restants}t</span>
            {/each}
            {#each cs.joueur.buffs as b}
                <span class="buff-chip">↑{b.stat} {b.tours_restants}t</span>
            {/each}
        </div>
    </div>

    {#if !cs.termine}
    <div class="actions">
        <button class="btn-action attaque" onclick={() => agir({ type: 'attaque_base' })}>⚔️ Attaque</button>
        {#each competencesEquipees as pc}
        <button class="btn-action competence"
            style="border-color:{ELEMENT_COLORS[pc.competence.element] ?? '#555'}"
            onclick={() => agir({ type: 'competence', competence: pc.competence })}>
            {ELEMENT_ICONS[pc.competence.element] ?? '✨'} {pc.competence.nom}
        </button>
        {/each}
    </div>
    {/if}

    <!-- ── INTER-SALLE ────────────────────────────────────────────────────── -->
    {:else if phase === 'inter_salle' || phase === 'ravito'}
    <div class="inter-salle">
        {#if phase === 'ravito'}
            <div class="victoire-titre">💊 Mi-étage — Ravitaillement !</div>
            <div class="ravito-msg">+30% PV combat récupérés<br>PV : {pvCombatActuels}/{pvCombatMax}</div>
        {:else}
            <div class="victoire-titre">✅ Monstre vaincu !</div>
        {/if}

        <div class="salle-info">{labelEtage(etage)} · Salle {salle}/10 · 💰 {orDonjon} od</div>

        {#if itemsDonjon.length > 0}
        <div class="section-titre">Butin</div>
        {#each itemsDonjon as item}
        <div class="item-drop">
            <span class="item-nom">{item.nom}</span>
            <span class="item-val">{item.valeur_or} od</span>
            <button class="btn-vendre" onclick={() => vendre(item)}>Vendre</button>
        </div>
        {/each}
        <button class="btn-vendre-tout" onclick={toutVendre}>Tout vendre</button>
        {/if}

        <div class="section-titre">Mini-boutique</div>
        <div class="mini-shop-item">
            <div>
                <div class="mini-shop-nom">Soin (+25% PV combat)</div>
                <div class="mini-shop-desc">{pvCombatActuels}/{pvCombatMax} PV</div>
            </div>
            <button class="btn-soin" onclick={acheterSoin} disabled={orDonjon < 20 || pvCombatActuels >= pvCombatMax}>
                20 od
            </button>
        </div>

        {#if phase === 'ravito'}
        <button class="btn-gacha" onclick={() => { phase = 'gacha'; }}>🎲 Choisir votre bonus !</button>
        {:else}
        <button class="btn-entrer" onclick={continuerSalle}>▶ Salle suivante</button>
        {/if}
        <button class="btn-quitter" onclick={quitterDonjon}>🚪 Quitter et sauvegarder</button>
    </div>

    <!-- ── GACHA ─────────────────────────────────────────────────────────── -->
    {:else if phase === 'gacha'}
    <div class="gacha-phase">
        <div class="gacha-titre">🎲 Bonus de Donjon</div>
        <div class="gacha-sous-titre">Choisissez un bonus permanent pour cette run</div>

        <div class="gacha-choix">
            {#each gachaChoix as bonus}
            <button class="gacha-carte {bonus.type}" onclick={() => choisirBonus(bonus)}>
                <div class="gacha-label">{bonus.label}</div>
                <div class="gacha-desc">{bonus.description}</div>
            </button>
            {/each}
        </div>
        <button class="btn-quitter" onclick={quitterDonjon}>🚪 Quitter et sauvegarder</button>
    </div>

    <!-- ── LOOT BOX ───────────────────────────────────────────────────────── -->
    {:else if phase === 'loot_box'}
    {@const RARETE_LABELS: Record<string, string> = { commun:'Commun', peu_commun:'Peu commun', rare:'Rare', epique:'Épique', legendaire:'Légendaire' }}
    <div class="loot-box">
        <div class="victoire-titre">🎉 {labelEtage(etage)} terminé !</div>

        {#if lootDisponible}
        <div class="loot-badge" style="color:{RARETE_COLORS[lootBoxRarete] ?? '#aaa'}; border-color:{RARETE_COLORS[lootBoxRarete] ?? '#aaa'}">
            📦 Coffre {RARETE_LABELS[lootBoxRarete] ?? lootBoxRarete}
        </div>
        {/if}

        {#if lootChoix.length === 0 && lootDisponible}
            <div class="loot-chargement">Génération des récompenses…</div>
        {:else if lootChoix.length === 0 && !lootDisponible}
            <div class="loot-deja-obtenu">Récompense déjà récupérée pour cet étage.</div>
            <button class="btn-entrer" onclick={continuerApresLoot}>▶ {labelEtage(etage + 1)}</button>
        {:else if lootChoix.length > 1}
            <!-- Choix des 3 items -->
            <div class="loot-sous-titre">Choisissez votre récompense</div>
            <div class="loot-options">
                {#each lootChoix as opt}
                <button class="loot-carte" style="border-color:{RARETE_COLORS[opt.rarete] ?? '#aaa'}"
                    onclick={() => choisirLoot(opt)} disabled={lootEnCours}>
                    <div class="loot-type">{opt.type === 'stuff' ? '🗡️ Équipement' : '⚡ Compétence'}</div>
                    <div class="loot-nom" style="color:{RARETE_COLORS[opt.rarete] ?? '#aaa'}">{opt.nom}</div>
                    <div class="loot-rarete">{RARETE_LABELS[opt.rarete] ?? opt.rarete}</div>
                </button>
                {/each}
            </div>
        {:else}
            <!-- Item choisi -->
            <div class="loot-reveal" style="border-color:{RARETE_COLORS[lootChoix[0].rarete] ?? '#aaa'}">
                <div class="loot-type">{lootChoix[0].type === 'stuff' ? '🗡️ Équipement' : '⚡ Compétence'}</div>
                <div class="loot-nom" style="color:{RARETE_COLORS[lootChoix[0].rarete] ?? '#aaa'}">{lootChoix[0].nom}</div>
                <div class="loot-rarete">{RARETE_LABELS[lootChoix[0].rarete] ?? lootChoix[0].rarete}</div>
                <div class="loot-note">Ajouté à votre inventaire !</div>
            </div>
            <button class="btn-entrer" onclick={continuerApresLoot}>▶ {labelEtage(etage + 1)}</button>
        {/if}
    </div>

    <!-- ── MORT ───────────────────────────────────────────────────────────── -->
    {:else if phase === 'mort'}
    <div class="mort-ecran">
        <div class="mort-titre">💀 Défaite</div>
        <div class="mort-msg">Vaincu au {labelEtage(etage)}, salle {salle}.</div>
        <div class="mort-or">Or donjon accumulé : {orDonjon} od</div>
        <button class="btn-entrer" onclick={() => { phase = 'lobby'; salle = 0; etage = 1; orDonjon = 0; etageEnCours = false; chargerPerso(); }}>
            🏠 Retour au lobby
        </button>
    </div>
    {/if}

</div>

<style>
    .donjon {
        color: #eee;
        font-family: monospace;
    }

    /* ── Lobby ── */
    .lobby { display: flex; flex-direction: column; gap: 12px; }
    .etage-badge {
        font-size: 0.78rem; color: #888;
        text-align: center; text-transform: uppercase; letter-spacing: 1px;
    }
    .stat-row { display: flex; align-items: center; gap: 8px; }
    .stat-label { font-size: 0.75rem; color: #aaa; white-space: nowrap; }
    .stat-val   { font-size: 0.75rem; color: #eee; white-space: nowrap; }
    .barre-wrap {
        flex: 1; height: 8px;
        background: #333; border-radius: 4px; overflow: hidden;
    }
    .barre { height: 100%; border-radius: 4px; transition: width 0.3s; }
    .or-donjon { font-size: 0.82rem; color: #f39c12; }
    .comp-block { background: #1a1a3e; border-radius: 8px; padding: 10px 12px; }
    .comp-title { font-size: 0.72rem; color: #888; margin-bottom: 6px; }
    .comp-grid  { display: flex; flex-wrap: wrap; gap: 4px; }
    .comp-chip {
        background: #0f3460; border: 1px solid #555;
        border-radius: 12px; padding: 3px 8px;
        font-size: 0.7rem; color: #eee;
    }
    .vide { color: #555; font-style: italic; font-size: 0.8rem; margin: 0; }
    .lien { color: #e94560; }
    .btn-entrer {
        background: #e94560; color: white; border: none;
        border-radius: 6px; padding: 12px;
        cursor: pointer; font-size: 0.9rem; font-weight: bold;
        width: 100%; margin-top: 4px; font-family: monospace;
    }

    /* ── Combat ── */
    .combat-header {
        display: flex; justify-content: space-between;
        align-items: center; margin-bottom: 10px;
    }
    .salle-badge { font-size: 0.72rem; color: #888; text-transform: uppercase; }
    .or-chip     { font-size: 0.78rem; color: #f39c12; }

    .unit-card {
        background: #1a1a3e; border: 1px solid #333;
        border-radius: 8px; padding: 10px 12px; margin-bottom: 10px;
    }
    .monstre-card { border-left: 3px solid #e74c3c; }
    .joueur-card  { border-left: 3px solid #2ecc71; }
    .unit-top { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 4px; }
    .unit-nom { font-weight: bold; font-size: 0.9rem; flex: 1; }
    .unit-pv  { font-size: 0.75rem; color: #aaa; margin-left: auto; }
    .element-badge {
        font-size: 0.62rem; padding: 1px 6px;
        border: 1px solid; border-radius: 8px;
        white-space: nowrap; text-transform: capitalize;
    }
    .statuts-row { display: flex; gap: 4px; margin-top: 4px; flex-wrap: wrap; }
    .statut-chip {
        font-size: 0.62rem; padding: 1px 6px;
        background: rgba(231,76,60,0.2); color: #e74c3c; border-radius: 8px;
    }
    .buff-chip {
        font-size: 0.62rem; padding: 1px 6px;
        background: rgba(46,204,113,0.2); color: #2ecc71; border-radius: 8px;
    }

    .log-box {
        background: #0d0d1e; border: 1px solid #222;
        border-radius: 6px; padding: 8px 10px;
        margin-bottom: 10px; min-height: 90px; max-height: 120px;
        overflow-y: auto;
    }
    .log-ligne { font-size: 0.72rem; color: #ccc; line-height: 1.7; }

    .actions { display: flex; flex-wrap: wrap; gap: 6px; }
    .btn-action {
        flex: 1; min-width: 90px; border: none;
        border-radius: 6px; padding: 10px 6px;
        cursor: pointer; font-size: 0.75rem; font-weight: bold; font-family: monospace;
    }
    .btn-action.attaque    { background: #e94560; color: white; }
    .btn-action.competence { background: #0f3460; color: #eee; border: 1px solid #555; }

    /* ── Inter-salle / Ravito ── */
    .inter-salle { display: flex; flex-direction: column; gap: 10px; }
    .victoire-titre { font-size: 1rem; font-weight: bold; color: #2ecc71; text-align: center; }
    .ravito-msg {
        background: rgba(46,204,113,0.1); border: 1px solid #2ecc7155;
        border-radius: 6px; padding: 10px;
        font-size: 0.82rem; color: #2ecc71; text-align: center;
    }
    .salle-info { font-size: 0.75rem; color: #888; text-align: center; }
    .section-titre { font-size: 0.72rem; color: #888; text-transform: uppercase; margin-top: 4px; }
    .item-drop {
        display: flex; align-items: center; justify-content: space-between;
        background: #1a1a3e; border-radius: 6px; padding: 6px 10px;
        font-size: 0.8rem; gap: 8px;
    }
    .item-nom { flex: 1; }
    .item-val { color: #f39c12; font-size: 0.75rem; }
    .btn-vendre {
        background: #f39c12; color: #111; border: none;
        border-radius: 4px; padding: 3px 8px;
        cursor: pointer; font-size: 0.72rem; font-weight: bold; font-family: monospace;
    }
    .btn-vendre-tout {
        background: #e67e22; color: white; border: none;
        border-radius: 4px; padding: 6px 12px;
        cursor: pointer; font-size: 0.78rem; font-family: monospace;
        align-self: flex-start;
    }
    .mini-shop-item {
        display: flex; justify-content: space-between; align-items: center;
        background: #1a1a3e; border-radius: 6px; padding: 8px 10px;
    }
    .mini-shop-nom  { font-size: 0.8rem; }
    .mini-shop-desc { font-size: 0.68rem; color: #888; }
    .btn-soin {
        background: #27ae60; color: white; border: none;
        border-radius: 4px; padding: 6px 10px;
        cursor: pointer; font-size: 0.78rem; font-weight: bold; font-family: monospace; flex-shrink: 0;
    }
    .btn-soin:disabled { background: #555; color: #888; cursor: not-allowed; }

    /* ── Loot box ── */
    .loot-box { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 12px 0; width: 100%; }
    .loot-badge {
        font-size: 0.82rem; font-weight: bold;
        border: 1px solid; border-radius: 20px;
        padding: 4px 14px;
    }
    .coffre {
        display: flex; flex-direction: column; align-items: center;
        cursor: pointer; gap: 8px; background: none; border: none;
        animation: pulse 1.5s infinite;
    }
    .coffre-icone { font-size: 3.5rem; }
    .coffre-txt   { font-size: 0.9rem; color: #f39c12; font-family: monospace; }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.06); }
    }
    .meilleur-score {
        font-size: 0.78rem; color: #f39c12;
        text-align: center; padding: 6px 10px;
        background: rgba(243,156,18,0.1); border: 1px solid rgba(243,156,18,0.3);
        border-radius: 8px;
    }
    .loot-deja-obtenu { font-size: 0.82rem; color: #888; font-style: italic; text-align: center; }
    .loot-chargement { color: #888; font-style: italic; font-size: 0.82rem; }
    .loot-sous-titre { font-size: 0.78rem; color: #888; }
    .loot-options {
        display: flex; flex-direction: column; gap: 10px; width: 100%;
    }
    .loot-carte {
        display: flex; flex-direction: column; gap: 4px;
        background: #1a1a3e; border: 2px solid #555;
        border-radius: 10px; padding: 14px 16px;
        cursor: pointer; text-align: left; font-family: monospace;
        width: 100%; transition: transform 0.1s, background 0.15s;
        animation: fadeIn 0.3s ease;
    }
    .loot-carte:hover:not(:disabled) { transform: translateY(-2px); background: #222250; }
    .loot-carte:disabled { opacity: 0.5; cursor: not-allowed; }

    .loot-reveal {
        border: 2px solid #aaa; border-radius: 10px;
        padding: 20px; text-align: center; width: 100%;
        animation: fadeIn 0.4s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; } }
    .loot-type   { font-size: 0.75rem; color: #888; margin-bottom: 6px; }
    .loot-nom    { font-size: 1.2rem; font-weight: bold; margin-bottom: 4px; }
    .loot-rarete { font-size: 0.72rem; font-style: italic; color: #888; margin-bottom: 10px; }
    .loot-note   { font-size: 0.78rem; color: #2ecc71; }

    /* ── Lobby save/reprendre ── */
    .btn-recommencer {
        background: #333; color: #aaa; border: 1px solid #555;
        border-radius: 6px; padding: 8px;
        cursor: pointer; font-size: 0.78rem; font-family: monospace;
        width: 100%; text-align: center;
    }
    .btn-quitter {
        background: none; color: #888; border: 1px solid #444;
        border-radius: 6px; padding: 8px;
        cursor: pointer; font-size: 0.75rem; font-family: monospace;
        width: 100%; text-align: center;
        margin-top: 2px;
    }
    .btn-quitter:hover { color: #ccc; border-color: #666; }

    /* ── Lobby bonuses ── */
    .bonus-actifs {
        background: #1a1a3e; border: 1px solid #9b59b655;
        border-radius: 8px; padding: 8px 12px;
    }
    .bonus-actifs-titre { font-size: 0.68rem; color: #9b59b6; text-transform: uppercase; margin-bottom: 5px; }
    .bonus-actifs-list  { display: flex; flex-wrap: wrap; gap: 4px; }
    .bonus-chip {
        font-size: 0.65rem; padding: 2px 8px;
        background: rgba(155,89,182,0.15); color: #c39bd3;
        border: 1px solid #9b59b655; border-radius: 10px;
    }

    /* ── Gacha ── */
    .gacha-phase {
        display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 8px 0;
    }
    .gacha-titre { font-size: 1.2rem; font-weight: bold; color: #f39c12; }
    .gacha-sous-titre { font-size: 0.75rem; color: #888; }
    .gacha-choix { display: flex; flex-direction: column; gap: 10px; width: 100%; }
    .gacha-carte {
        display: flex; flex-direction: column; gap: 4px;
        background: #1a1a3e; border: 2px solid #555;
        border-radius: 10px; padding: 14px 16px;
        cursor: pointer; text-align: left; font-family: monospace;
        transition: border-color 0.2s, transform 0.1s;
    }
    .gacha-carte:hover { transform: translateY(-2px); }
    .gacha-carte.stat     { border-color: #e74c3c; }
    .gacha-carte.pv_max   { border-color: #2ecc71; }
    .gacha-carte.affinite { border-color: #9b59b6; }
    .gacha-label { font-size: 0.92rem; font-weight: bold; color: #eee; }
    .gacha-desc  { font-size: 0.75rem; color: #aaa; }
    .btn-gacha {
        background: #9b59b6; color: white; border: none;
        border-radius: 6px; padding: 12px;
        cursor: pointer; font-size: 0.9rem; font-weight: bold;
        width: 100%; font-family: monospace; margin-top: 4px;
        animation: pulse 1.5s infinite;
    }

    /* ── Mort ── */
    .mort-ecran {
        display: flex; flex-direction: column; align-items: center;
        gap: 12px; padding: 24px 0; text-align: center;
    }
    .mort-titre { font-size: 2.5rem; }
    .mort-msg   { font-size: 0.85rem; color: #aaa; }
    .mort-or    { font-size: 0.82rem; color: #f39c12; }
</style>
