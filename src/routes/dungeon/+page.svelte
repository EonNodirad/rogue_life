<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import { beforeNavigate } from '$app/navigation';
    import {
        getPersonnage, getCaracteristique, getInventaire, getStuffs,
        getPersonnageCompetences, ajouterRecompenseDonjon, resetPvCombat, updatePvCombat,
        getCompetencesDonjon, getPersonnageAffinites, incrementerLootDonjon,
        updateManaActuels, regenMana,
    } from '$lib/db';
    import { piocherLoot } from '$lib/loot';
    import type { LootOption } from '$lib/loot';
    import { refreshCharacterStore } from '$lib/stores';
    import {
        genererMonstre, initCombat, executerTour, lootMonstre, ITEMS_CONSOMMABLES, MONSTRE_IMAGES,
        type CombatState, type ActionCombat, type CombatUnit,
    } from '$lib/combat';
    import type { Competence, PersonnageCompetence, stuff, Element, Rarete, DonjonItem } from '$lib/types';
    import { ELEMENT_ICONS } from '$lib/icons';
    import PixelEmoji from '$lib/PixelEmoji.svelte';
    import { CLASSES, getBonusCumulatif, debloquerClasse, type ClasseDef } from '$lib/classes';

    // ── Gacha ────────────────────────────────────────────────────────────────
    interface BonusDonjon {
        id: string;
        label: string;
        description: string;
        type: 'affinite' | 'stat' | 'pv_max';
        rarete: Rarete;
        element?: string;
        stat?: 'attq' | 'def' | 'attq_spe' | 'def_spe' | 'vitesse';
        valeur: number; // toujours un %
    }

    // Taux de drop [commun, peu_commun, rare, epique, legendaire]
    const GACHA_TAUX: Record<'peu_commun' | 'rare', number[]> = {
        peu_commun: [0.40, 0.40, 0.18, 0.02, 0.00],
        rare:       [0.15, 0.35, 0.35, 0.14, 0.01],
    };
    const GACHA_RARETES: Rarete[] = ['commun', 'peu_commun', 'rare', 'epique', 'legendaire'];
    const GACHA_VALEUR: Record<Rarete, number> = { commun: 5, peu_commun: 10, rare: 15, epique: 20, legendaire: 25 };

    const GACHA_STATS = [
        { id: 'attq',     label: '⚔️ ATQ',     type: 'stat' as const, stat: 'attq'     as const },
        { id: 'def',      label: '🛡️ DEF',     type: 'stat' as const, stat: 'def'      as const },
        { id: 'attq_spe', label: '✨ ATQ SPÉ', type: 'stat' as const, stat: 'attq_spe' as const },
        { id: 'def_spe',  label: '🔮 DEF SPÉ', type: 'stat' as const, stat: 'def_spe'  as const },
        { id: 'vitesse',  label: '💨 VIT',     type: 'stat' as const, stat: 'vitesse'  as const },
        { id: 'pv_max',   label: '💗 PV max',  type: 'pv_max' as const },
    ];
    const GACHA_ELEMS = [
        { id: 'feu',         label: '🔥 Feu',         element: 'feu'         },
        { id: 'eau',         label: '💧 Eau',         element: 'eau'         },
        { id: 'terre',       label: '🪨 Terre',       element: 'terre'       },
        { id: 'air',         label: '🌪️ Air',         element: 'air'         },
        { id: 'lumiere',     label: '☀️ Lumière',     element: 'lumiere'     },
        { id: 'tenebres',    label: '🌑 Ténèbres',    element: 'tenebres'    },
        { id: 'mort',        label: '💀 Mort',        element: 'mort'        },
        { id: 'vie',         label: '🌿 Vie',         element: 'vie'         },
        { id: 'surnaturel',  label: '🌀 Surnaturel',  element: 'surnaturel'  },
        { id: 'technologie', label: '⚙️ Techno',     element: 'technologie' },
    ];

    function tirerRareteGacha(etageActuel: number): Rarete {
        const taux = etageActuel >= 3 ? GACHA_TAUX.rare : GACHA_TAUX.peu_commun;
        const r = Math.random();
        let cumul = 0;
        for (let i = 0; i < GACHA_RARETES.length; i++) {
            cumul += taux[i];
            if (r < cumul) return GACHA_RARETES[i];
        }
        return 'commun';
    }

    function genererUnBonus(rarete: Rarete, exclus: string[]): BonusDonjon {
        const valeur = GACHA_VALEUR[rarete];
        const pool = [...GACHA_STATS, ...GACHA_ELEMS].filter(e => !exclus.includes(e.id));
        const src = pool[Math.floor(Math.random() * pool.length)];
        if ('stat' in src && src.type === 'stat') {
            return { id: src.id, label: src.label, type: 'stat', rarete, stat: src.stat, valeur,
                description: `+${valeur}% ${src.label.split(' ').slice(1).join(' ')}` };
        } else if ('type' in src && src.type === 'pv_max') {
            return { id: src.id, label: src.label, type: 'pv_max', rarete, valeur,
                description: `+${valeur}% PV Combat max` };
        } else {
            const e = src as typeof GACHA_ELEMS[0];
            return { id: e.id, label: e.label, type: 'affinite', rarete, element: e.element, valeur,
                description: `+${valeur}% affinité ${e.label.split(' ').slice(1).join(' ')}` };
        }
    }

    // ── État global donjon ──────────────────────────────────────────────────
    type Phase = 'lobby' | 'combat' | 'inter_salle' | 'ravito' | 'gacha' | 'loot_box' | 'donjon_shop' | 'mort';

    let phase = $state<Phase>('lobby');
    let etage = $state(1);
    let salle = $state(0);

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

    let itemsDonjon = $state<DonjonItem[]>([]);
    let inventaireDonjon = $state<DonjonItem[]>([]);
    let inventaireOuvert = $state(false);

    let lootBoxRarete = $state('peu_commun');
    let lootChoix = $state<LootOption[]>([]);
    let lootClaimed = $state(false);

    let combatState = $state<CombatState | null>(null);
    let textBox = $state('');
    let combatBloquer = $state(false);
    let damageAnim = $state<{ val: number; cible: 'joueur' | 'monstre' } | null>(null);

    let pvCombatActuels = $state(0);
    let pvCombatMax = $state(1);
    let manaActuels = $state(0);
    let manaMax = $state(150);
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

    let ownedCompIds = $state<number[]>([]);    // comps possédées par le joueur
    let etageEnCours = $state(false);           // entre deux étages (pas nouvelle run)
    let classeIdJoueur = $state<number | null>(null);
    let classeUnlockChoix = $state<ClasseDef[]>([]);
    let classeUnlockModal = $state(false);
    let classeUnlockErreur = $state('');

    async function chargerPerso() {
        const p = await getPersonnage(1);
        if (!p) return;

        // Si la DB a été effacée (compteur_loot_donjon = 0) mais localStorage a des étages marqués → reset
        if ((p.compteur_loot_donjon ?? 0) === 0) {
            const raw = localStorage.getItem(CLEARED_KEY);
            if (raw && JSON.parse(raw).length > 0) localStorage.removeItem(CLEARED_KEY);
        }

        nomJoueur = p.nom;
        niveauJoueur = p.level_id;
        classeIdJoueur = p.classe_id ?? null;

        const c = await getCaracteristique(p.caracteristique_id);
        if (!c) return;
        pvCombatActuels = c.pv_combat_actuels;
        pvCombatMax = c.pv_combat_max;
        manaActuels = c.mana_actuels ?? 150;
        manaMax = c.mana_max ?? 150;

        const inv = await getInventaire(1);
        const stuffs = await getStuffs();
        const equipes = inv
            .filter(i => i.est_equipe)
            .map(i => stuffs.find(s => s.id === i.stuff_id)!)
            .filter(Boolean) as stuff[];

        const bonusClasse = getBonusCumulatif(p.classe_id ?? null);
        attqJoueur    = c.attq    + equipes.reduce((s, st) => s + (st.bonus_attq ?? 0), 0)    + bonusClasse.attq;
        attqSpeJoueur = c.attq_spe + equipes.reduce((s, st) => s + (st.bonus_attq_spe ?? 0), 0) + bonusClasse.attq_spe;
        defJoueur     = c.def     + equipes.reduce((s, st) => s + (st.bonus_def ?? 0), 0)     + bonusClasse.def;
        defSpeJoueur  = c.def_spe + equipes.reduce((s, st) => s + (st.bonus_def_spe ?? 0), 0)  + bonusClasse.def_spe;
        vitesseJoueur = c.vitesse + equipes.reduce((s, st) => s + (st.bonus_vitesse ?? 0), 0)  + bonusClasse.vit;
        if (bonusClasse.pv_max > 0) pvCombatMax = c.pv_combat_max + bonusClasse.pv_max;

        try {
            const affinites = await getPersonnageAffinites(1);
            const baseAffinites = Object.fromEntries(affinites.map(a => [a.element, a.bonus_pct]));
            // Appliquer bonus aff_elem de la classe (cumul sur tous éléments)
            const bonusC = getBonusCumulatif(p.classe_id ?? null);
            if (bonusC.aff_elem > 0) {
                for (const el of Object.keys(baseAffinites)) {
                    baseAffinites[el] = (baseAffinites[el] ?? 0) + bonusC.aff_elem;
                }
            }
            // Appliquer bonus affinité élémentaire des équipements équipés
            for (const eq of equipes) {
                if ((eq.bonus_aff_elem ?? 0) > 0 && eq.element && eq.element !== 'neutre') {
                    baseAffinites[eq.element] = (baseAffinites[eq.element] ?? 0) + eq.bonus_aff_elem;
                }
            }
            affinitesJoueur = baseAffinites;
        } catch { /* migration 0008 pas encore appliquée */ }

        try {
            const pcs = await getPersonnageCompetences(1);
            competencesEquipees = pcs.filter(pc => pc.est_equipee);
            ownedCompIds = pcs.map(pc => pc.competence_id);
            await getCompetencesDonjon();
        } catch { /* migration 0007/0009 pas encore appliquée */ }

    }

    const SAVE_KEY = 'donjon_save_1';

    function sauvegarderProgression() {
        const save = { etage, salle, orDonjon, bonusDonjonActifs, itemsDonjon, inventaireDonjon,
            pvCombatActuels, pvCombatMax, manaActuels, manaMax, phase, lootBoxRarete, lootClaimed,
            cs: (phase === 'combat' && combatState) ? JSON.stringify(combatState) : null };
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
            inventaireDonjon   = s.inventaireDonjon ?? [];
            if (s.pvCombatMax) pvCombatMax = s.pvCombatMax;
            if (s.pvCombatActuels != null) pvCombatActuels = s.pvCombatActuels;
            if (s.manaMax) manaMax = s.manaMax;
            if (s.manaActuels != null) manaActuels = s.manaActuels;
            if (s.lootBoxRarete) lootBoxRarete = s.lootBoxRarete;
            lootClaimed = s.lootClaimed ?? false;
            if (s.cs) { try { combatState = JSON.parse(s.cs); } catch {} }
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
            if (savedPhase === 'loot_box') {
                if (lootClaimed) {
                    phase = 'loot_box';
                } else {
                    lootDisponible = true;
                    await preparerLootBox(false);
                    phase = 'loot_box';
                }
            } else if (savedPhase === 'combat' && combatState) {
                phase = 'combat';
            }
        }
    });

    // Auto-sauvegarder au départ de la page si une run est en cours
    // Ne pas sauvegarder si phase='lobby' : la sauvegarde correcte a déjà été faite
    // (quitterDonjon/continuerApresLoot l'ont écrite), et sauvegarder à nouveau ici
    // écraserait la phase correcte (ex: 'gacha' salle 10) avec 'lobby' salle 10.
    beforeNavigate(() => {
        if ((salle > 0 || etageEnCours) && phase !== 'mort' && phase !== 'lobby') {
            sauvegarderProgression();
            aSauvegarde = true;
        }
    });

    // ── Lobby ───────────────────────────────────────────────────────────────
    async function reprendre() {
        await chargerPerso();
        const { savedPhase } = chargerSauvegarde();
        if (savedPhase === 'loot_box') {
            if (lootClaimed) {
                phase = 'loot_box';
            } else {
                lootDisponible = true;
                await preparerLootBox(false);
                phase = 'loot_box';
            }
        } else if (savedPhase === 'gacha') {
            gachaEstFinEtage = (salle === 10);
            genererGachaChoix();
            phase = 'gacha';
        } else if (savedPhase === 'ravito') {
            genererGachaChoix(); // gachaChoix n'est pas persisté, doit être régénéré
            phase = 'ravito';
        } else if (savedPhase === 'inter_salle' || savedPhase === 'donjon_shop') {
            phase = savedPhase;
        } else if (savedPhase === 'lobby') {
            // Entre deux étages (salle=0) : lancer la salle 1 du nouvel étage
            lancerSalle();
        } else {
            // combat → utiliser l'état sauvegardé si disponible, sinon relancer
            if (combatState) {
                phase = 'combat';
            } else {
                lancerCombat();
            }
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
            inventaireDonjon = [];
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
        vitesse: number; pvMax: number; affinites: Partial<Record<string, number>>
    } {
        // valeurs de base (avant bonus gacha)
        const baseAttq    = attqJoueur;
        const baseAttqSpe = attqSpeJoueur;
        const baseDef     = defJoueur;
        const baseDefSpe  = defSpeJoueur;
        const baseVit     = vitesseJoueur;

        let attq    = baseAttq,    attqSpe = baseAttqSpe;
        let def     = baseDef,     defSpe  = baseDefSpe;
        let vitesse = baseVit;
        let pvMax   = pvCombatMax;
        const affinites: Partial<Record<string, number>> = { ...affinitesJoueur };

        for (const b of bonusDonjonActifs) {
            if (b.type === 'stat') {
                const pct = b.valeur / 100;
                if (b.stat === 'attq')     attq    += Math.floor(baseAttq    * pct);
                if (b.stat === 'def')      def     += Math.floor(baseDef     * pct);
                if (b.stat === 'attq_spe') attqSpe += Math.floor(baseAttqSpe * pct);
                if (b.stat === 'def_spe')  defSpe  += Math.floor(baseDefSpe  * pct);
                if (b.stat === 'vitesse')  vitesse += Math.floor(baseVit     * pct);
            } else if (b.type === 'affinite' && b.element) {
                affinites[b.element] = (affinites[b.element] ?? 0) + b.valeur;
            }
        }
        return { attq, attqSpe, def, defSpe, vitesse, pvMax, affinites };
    }

    function lancerCombat() {
        // Démarre le combat à la salle courante SANS incrémenter
        const stats = appliquerBonusSurStats();
        const monstre = genererMonstre(etage, salle);
        combatState = initCombat(
            nomJoueur, pvCombatActuels, stats.pvMax,
            manaActuels, manaMax,
            stats.attq, stats.attqSpe, stats.def, stats.defSpe, stats.vitesse,
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
        const choix: BonusDonjon[] = [];
        const exclus: string[] = [];
        while (choix.length < 3) {
            const rarete = tirerRareteGacha(etage);
            const bonus = genererUnBonus(rarete, exclus);
            choix.push(bonus);
            exclus.push(bonus.id);
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
    function monstreImage(nom: string): string {
        return MONSTRE_IMAGES[nom] ?? '/monstres/slime.png';
    }

    async function afficherLog(logs: string[], onFin: () => void): Promise<void> {
        combatBloquer = true;
        for (const ligne of logs) {
            textBox = ligne;
            await new Promise<void>(r => setTimeout(r, 700));
        }
        combatBloquer = false;
        onFin();
    }

    function transitionPhase(state: CombatState): void {
        if (!state.termine) return;
        if (state.vainqueur === 'joueur') {
            pvCombatActuels = state.joueur.pv_actuels;
            manaActuels = state.joueur.mana;
            const loot = lootMonstre(etage, salle, state.monstre.nom);
            itemsDonjon = loot.items;
            orDonjon += loot.or_base;
            updatePvCombat(1, pvCombatActuels);
            updateManaActuels(1, manaActuels);
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

    function agir(action: ActionCombat) {
        if (!combatState || combatState.termine || combatBloquer) return;
        const oldLen = combatState.log.length;
        const newState = executerTour(combatState, action);
        combatState = newState;
        const nouvLogs = newState.log.slice(oldLen);
        const ligneAvecDegat = [...nouvLogs].reverse().find(l => /(\d+) dégât/.test(l));
        if (ligneAvecDegat) {
            const match = ligneAvecDegat.match(/(\d+) dégât/);
            if (match) {
                const cible: 'joueur' | 'monstre' =
                    ligneAvecDegat.startsWith(`⚔ ${newState.monstre.nom}`) ||
                    ligneAvecDegat.startsWith(`✨ ${newState.monstre.nom}`) ||
                    ligneAvecDegat.startsWith(`☠ ${newState.monstre.nom}`)
                        ? 'joueur' : 'monstre';
                damageAnim = { val: parseInt(match[1]), cible };
                setTimeout(() => damageAnim = null, 800);
            }
        }
        afficherLog(nouvLogs, () => transitionPhase(newState));
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
        lootClaimed = true;
        sauvegarderProgression();
        lootEnCours = false;
    }

    async function continuerApresLoot() {
        etage += 1;
        salle = 0;
        lootChoix = [];
        lootClaimed = false;
        etageEnCours = true;
        effacerSauvegarde();
        aSauvegarde = false;
        await chargerPerso();
        pvCombatMax = pvCombatMaxAvecBonus(pvCombatMax);
        pvCombatActuels = Math.min(pvCombatActuels, pvCombatMax);
        // Régénération 50% mana au début de chaque nouvel étage
        const manaRegen = Math.floor(manaMax * 0.5);
        manaActuels = Math.min(manaMax, manaActuels + manaRegen);
        await regenMana(1, manaRegen);

        // Unlock de classe à l'étage 4 (depuis palier 1) et 7 (depuis palier 4)
        if ((etage === 4 || etage === 7) && classeIdJoueur) {
            const classeActuelle = CLASSES.find(c => c.id === classeIdJoueur);
            const palierRequis = etage === 4 ? 1 : 4;
            if (classeActuelle && classeActuelle.palier === palierRequis) {
                const enfants = CLASSES.filter(c => c.parent_id === classeIdJoueur);
                if (enfants.length > 0) {
                    classeUnlockChoix = enfants;
                    classeUnlockModal = true;
                    return; // attendre le choix avant de retourner au lobby
                }
            }
        }

        phase = 'lobby';
        sauvegarderProgression();
        aSauvegarde = true;
    }

    async function choisirClasseUnlock(c: ClasseDef) {
        classeUnlockErreur = '';
        try {
            await debloquerClasse(1, c.id);
            classeUnlockModal = false;
            classeUnlockChoix = [];
            phase = 'lobby';
            sauvegarderProgression();
            aSauvegarde = true;
        } catch (e: any) {
            const msg = e?.message ?? String(e);
            console.error('choisirClasseUnlock erreur:', msg, e);
            classeUnlockErreur = msg;
        }
    }

    // ── Inter-salle ─────────────────────────────────────────────────────────
    function vendre(item: DonjonItem) {
        orDonjon += item.valeur_or;
        itemsDonjon = itemsDonjon.filter(i => i !== item);
    }

    function toutVendre() {
        orDonjon += itemsDonjon.reduce((s, i) => s + i.valeur_or, 0);
        itemsDonjon = [];
    }

    function garder(item: DonjonItem) {
        inventaireDonjon = [...inventaireDonjon, item];
        itemsDonjon = itemsDonjon.filter(i => i !== item);
        sauvegarderProgression();
    }

    function vendreInventaire(item: DonjonItem) {
        orDonjon += item.valeur_or;
        inventaireDonjon = inventaireDonjon.filter(i => i !== item);
        sauvegarderProgression();
    }

    function utiliserHorsCombat(item: DonjonItem) {
        if (item.effet?.type === 'soin_pct') {
            const soin = Math.floor(pvCombatMax * (item.effet.valeur! / 100));
            pvCombatActuels = Math.min(pvCombatMax, pvCombatActuels + soin);
            updatePvCombat(1, pvCombatActuels);
        } else if (item.effet?.type === 'mana_pct') {
            const gain = Math.floor(manaMax * (item.effet.valeur! / 100));
            manaActuels = Math.min(manaMax, manaActuels + gain);
            updateManaActuels(1, manaActuels);
        }
        inventaireDonjon = inventaireDonjon.filter(i => i !== item);
        sauvegarderProgression();
    }

    function acheterElixirMana() {
        if (orDonjon < 20 || manaActuels >= manaMax) return;
        orDonjon -= 20;
        const gain = Math.floor(manaMax * 0.20);
        manaActuels = Math.min(manaMax, manaActuels + gain);
        updateManaActuels(1, manaActuels);
    }

    function acheterConsommable(item: DonjonItem) {
        if (orDonjon < (item.prix_achat ?? 99)) return;
        orDonjon -= item.prix_achat!;
        inventaireDonjon = [...inventaireDonjon, { ...item }];
        sauvegarderProgression();
    }

    function utiliserConsommableEnCombat(item: DonjonItem) {
        if (combatBloquer) return;
        inventaireDonjon = inventaireDonjon.filter(i => i !== item);
        agir({ type: 'consommable', itemConsommable: item });
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
    function statutEmoji(type: string): string {
        const map: Record<string, string> = {
            poison: '☠', stun: '💫', brulure: '🔥', froid: '❄️',
            regen_pv: '💚', anti_heal: '🚫', marque: '💣',
            riposte: '🛡', reduction_degats: '🛡', prochain_attq_mult: '⚡',
        };
        return map[type] ?? '✦';
    }

    function pvPct(unit: CombatUnit) {
        return Math.max(0, Math.round((unit.pv_actuels / unit.pv_max) * 100));
    }

    function pvColor(pct: number) {
        if (pct > 60) return '#2ecc71';
        if (pct > 30) return '#f39c12';
        return '#e74c3c';
    }

    const RARETE_LABEL: Record<string, string> = {
        commun: 'Commun', peu_commun: 'Peu commun', rare: 'Rare', epique: 'Épique', legendaire: 'Légendaire'
    };
    const RARETE_COLORS: Record<string, string> = {
        commun: '#aaa', peu_commun: '#2ecc71', rare: '#3498db', epique: '#9b59b6', legendaire: '#f39c12',
    };

    const ELEMENT_COLORS: Record<string, string> = {
        neutre: '#888', surnaturel: '#9b59b6', technologie: '#3498db',
        feu: '#e74c3c', eau: '#1abc9c', terre: '#8B6914',
        air: '#bdc3c7', vie: '#2ecc71', mort: '#555',
        tenebres: '#6c3483', lumiere: '#f1c40f',
    };


</script>

<div class="donjon">

    <!-- ── LOBBY ─────────────────────────────────────────────────────────── -->
    {#if phase === 'lobby'}
    <div class="lobby">
        <div class="etage-badge">{labelEtage(etage)} · {salle === 0 ? 'Début' : `Salle ${salle}/10`}</div>

        <div class="stat-row">
            <span class="stat-label">PV Combat</span>
            <div class="barre-wrap">
                <div class="barre" style="width:{Math.round(pvCombatActuels/pvCombatMax*100)}%; color:{pvColor(Math.round(pvCombatActuels/pvCombatMax*100))}"></div>
            </div>
            <span class="stat-val">{pvCombatActuels}/{pvCombatMax}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Mana</span>
            <div class="barre-wrap">
                <div class="barre mana-barre" style="width:{Math.round(manaActuels/manaMax*100)}%"></div>
            </div>
            <span class="stat-val">{manaActuels}/{manaMax}</span>
        </div>

        {#if orDonjon > 0}
        <div class="or-donjon"><PixelEmoji char="💰" size={14} /> Or donjon : {orDonjon}</div>
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
                <p class="vide">Aucune — <a href="{base}/shop" class="lien">achetez-en en boutique</a></p>
            {:else}
                <div class="comp-grid">
                    {#each competencesEquipees as pc}
                    <div class="comp-chip" style="border-color:{ELEMENT_COLORS[pc.competence.element] ?? '#555'}"><img class="pixel-icon" src={ELEMENT_ICONS[pc.competence.element] ?? ''} alt={pc.competence.element} /> {pc.competence.nom}</div>
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
            {#if (raw.salle ?? 0) === 0}
            ▶ Entrer {labelEtage(raw.etage ?? 1)}
            {:else}
            ▶ Reprendre ({labelEtage(raw.etage ?? 1)}, Salle {raw.salle}/10)
            {/if}
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
        <span class="or-chip"><PixelEmoji char="💰" size={14} /> {orDonjon} od</span>
    </div>

    <div class="combat-scene" style="--bg-combat: url('{base}/fond_donjon/fond_donjon_combat.png')">
        <!-- Zone monstre : image pleine largeur, infos en overlay bas -->
        <div class="zone-monstre">
            <img class="ennemi-img" src={monstreImage(cs.monstre.nom)} alt={cs.monstre.nom} />
            {#if damageAnim?.cible === 'monstre'}<span class="damage-float">-{damageAnim.val}</span>{/if}
            <div class="info-overlay monstre-overlay">
                <div class="unit-plaque-nom">{cs.monstre.nom} Lv{cs.monstre.niveau}</div>
                <div class="hp-row">
                    <span class="hp-coeur"><PixelEmoji char="❤" size={12} /></span>
                    <div class="hp-track"><div class="hp-fill" style="width:{pvPct(cs.monstre)}%; color:{pvColor(pvPct(cs.monstre))}"></div></div>
                    <span class="hp-nums">{cs.monstre.pv_actuels}/{cs.monstre.pv_max}</span>
                </div>
                <div class="hp-row">
                    <span class="hp-coeur atb-icon">⚡</span>
                    <div class="hp-track"><div class="hp-fill atb-fill-monstre" style="width:{cs.gauge_monstre}%"></div></div>
                    <span class="hp-nums">{Math.round(cs.gauge_monstre)}/100</span>
                </div>
                {#if cs.monstre.statuts.length || cs.monstre.buffs.length}
                <div class="statuts-row">
                    {#each cs.monstre.statuts as st}<span class="statut-chip statut-{st.type}"><PixelEmoji char={statutEmoji(st.type)} size={12} /> {st.tours_restants === 99 ? '∞' : st.tours_restants+'t'}{st.valeur ? ' '+st.valeur : ''}</span>{/each}
                    {#each cs.monstre.buffs as b}<span class="buff-chip {b.valeur < 0 ? 'debuff-chip' : ''}">{b.valeur < 0 ? '↓' : '↑'}{b.stat} {b.tours_restants}t</span>{/each}
                </div>
                {/if}
            </div>
        </div>

        <!-- Zone joueur : image héros déborde sur monstre, HP en dessous -->
        <div class="zone-joueur">
            <div class="joueur-sprite-wrap">
                <img class="joueur-img" src="{base}/heroe.png" alt="Héros" />
                {#if damageAnim?.cible === 'joueur'}<span class="damage-float">-{damageAnim.val}</span>{/if}
            </div>
            <div class="joueur-overlay">
                <div class="unit-plaque-nom">{cs.joueur.nom} Lv{cs.joueur.niveau}</div>
                <div class="hp-row">
                    <span class="hp-coeur"><PixelEmoji char="❤" size={12} /></span>
                    <div class="hp-track"><div class="hp-fill" style="width:{pvPct(cs.joueur)}%; color:{pvColor(pvPct(cs.joueur))}"></div></div>
                    <span class="hp-nums">{cs.joueur.pv_actuels}/{cs.joueur.pv_max}</span>
                </div>
                <div class="hp-row">
                    <span class="hp-coeur" style="color:#3498db">💧</span>
                    <div class="hp-track"><div class="hp-fill mana-fill" style="width:{Math.round(cs.joueur.mana/Math.max(1,cs.joueur.mana_max)*100)}%"></div></div>
                    <span class="hp-nums">{cs.joueur.mana}/{cs.joueur.mana_max}</span>
                </div>
                <div class="hp-row">
                    <span class="hp-coeur atb-icon">⚡</span>
                    <div class="hp-track"><div class="hp-fill atb-fill-joueur" style="width:{cs.gauge_joueur}%"></div></div>
                    <span class="hp-nums">{Math.round(cs.gauge_joueur)}/100</span>
                </div>
                {#if cs.joueur.statuts.length || cs.joueur.buffs.length || cs.joueur.surchauffe > 0 || cs.joueur.charges_sismiques > 0}
                <div class="statuts-row">
                    {#each cs.joueur.statuts as st}<span class="statut-chip statut-{st.type}"><PixelEmoji char={statutEmoji(st.type)} size={12} /> {st.tours_restants === 99 ? '∞' : st.tours_restants+'t'}{st.valeur ? ' '+st.valeur : ''}</span>{/each}
                    {#each cs.joueur.buffs as b}<span class="buff-chip {b.valeur < 0 ? 'debuff-chip' : ''}">{b.valeur < 0 ? '↓' : '↑'}{b.stat} {b.tours_restants}t</span>{/each}
                    {#if cs.joueur.surchauffe > 0}<span class="statut-chip statut-surchauffe">⚙️ {cs.joueur.surchauffe}/5</span>{/if}
                    {#if cs.joueur.charges_sismiques > 0}<span class="statut-chip statut-sismique">⛏️ ×{cs.joueur.charges_sismiques}</span>{/if}
                </div>
                {/if}
            </div>
        </div>
    </div>

    <div class="text-box px-frame">
        <span class="text-cursor">▶</span>
        <span class="text-content">
            {#if textBox}{textBox}
            {:else if cs.log.length === 0}Le combat commence…
            {:else}{cs.log.at(-1) ?? ''}{/if}
        </span>
    </div>

    {#if !cs.termine}
    <div class="actions-grid" class:bloque={combatBloquer}>
        <button class="btn-nes attaque" onclick={() => agir({ type: 'attaque_base' })} disabled={combatBloquer}>
            <img class="pixel-icon" src={ELEMENT_ICONS['neutre']} alt="normal" /> ATTAQUE
        </button>
        {#each competencesEquipees as pc}
        {@const coutMana = pc.competence.cout_mana === -1 ? (combatState?.joueur.mana ?? 0) : (pc.competence.cout_mana ?? 0)}
        {@const manaInsuffisant = (combatState?.joueur.mana ?? 0) < coutMana}
        <button class="btn-nes competence"
            style="--elem-color:{ELEMENT_COLORS[pc.competence.element] ?? '#3498db'}"
            onclick={() => agir({ type: 'competence', competence: pc.competence })}
            disabled={combatBloquer || manaInsuffisant}
            title={manaInsuffisant ? `Mana insuffisant (${combatState?.joueur.mana}/${coutMana})` : ''}>
            <img class="pixel-icon" src={ELEMENT_ICONS[pc.competence.element] ?? ''} alt={pc.competence.element} /> {pc.competence.nom}
            {#if coutMana > 0}<span class="mana-cost">💧{coutMana}</span>{/if}
        </button>
        {/each}
        {#each inventaireDonjon.filter(i => i.usage === 'combat' || i.usage === 'les_deux') as item}
        <button class="btn-nes consommable-btn" onclick={() => utiliserConsommableEnCombat(item)} disabled={combatBloquer}>
            <PixelEmoji char="⚗️" size={14} /> {item.nom}
        </button>
        {/each}
    </div>
    {/if}

    <!-- ── INTER-SALLE ────────────────────────────────────────────────────── -->
    {:else if phase === 'inter_salle' || phase === 'ravito'}
    <div class="inter-salle">
        {#if phase === 'ravito'}
            <div class="victoire-titre">💊 Mi-étage — Ravitaillement !</div>
        {:else}
            <div class="victoire-titre">✅ Monstre vaincu !</div>
        {/if}

        <div class="salle-info">{labelEtage(etage)} · Salle {salle}/10 · <PixelEmoji char="💰" size={14} /> {orDonjon} od</div>

        <div class="pv-inter">
            <span class="hp-coeur">❤</span>
            <div class="hp-track">
                <div class="hp-fill" style="width:{Math.round(pvCombatActuels/pvCombatMax*100)}%; color:{pvColor(Math.round(pvCombatActuels/pvCombatMax*100))}"></div>
            </div>
            <span class="hp-nums">{pvCombatActuels}/{pvCombatMax}</span>
        </div>
        <div class="pv-inter">
            <span class="hp-coeur" style="color:#3498db">💧</span>
            <div class="hp-track"><div class="hp-fill mana-fill" style="width:{Math.round(manaActuels/Math.max(1,manaMax)*100)}%"></div></div>
            <span class="hp-nums">{manaActuels}/{manaMax}</span>
        </div>

        {#if itemsDonjon.length > 0}
        <div class="section-titre">Butin</div>
        {#each itemsDonjon as item}
        <div class="item-drop">
            {#if item.type === 'consommable'}
                <span class="item-badge conso">✨</span>
            {:else if item.type === 'rare'}
                <span class="item-badge rare">⭐</span>
            {:else}
                <span class="item-badge">🗑️</span>
            {/if}
            <div class="item-info">
                <span class="item-nom">{item.nom}</span>
                {#if item.description}<span class="item-desc">{item.description}</span>{/if}
            </div>
            {#if item.type === 'consommable'}
                <button class="btn-garder" onclick={() => garder(item)}>Garder</button>
            {/if}
            <button class="btn-vendre" onclick={() => vendre(item)}>{item.valeur_or} od</button>
        </div>
        {/each}
        <button class="btn-vendre-tout" onclick={toutVendre}>Tout vendre</button>
        {/if}

        {#if inventaireDonjon.length > 0}
        <button class="btn-inventaire" onclick={() => inventaireOuvert = !inventaireOuvert}>
            📦 Inventaire ({inventaireDonjon.length}) {inventaireOuvert ? '▲' : '▼'}
        </button>
        {#if inventaireOuvert}
        <div class="inventaire-panel px-frame">
            {#each inventaireDonjon as item}
            <div class="inv-item">
                <div class="inv-item-info">
                    <span class="inv-item-nom">{item.nom}</span>
                    {#if item.description}<span class="item-desc">{item.description}</span>{/if}
                    <span class="inv-usage-badge">{item.usage === 'combat' ? '⚔️ combat' : item.usage === 'les_deux' ? '⚔️🏕️ partout' : '🏕️ hors combat'}</span>
                </div>
                <div class="inv-item-btns">
                    {#if item.usage === 'hors_combat' || item.usage === 'les_deux'}
                    <button class="btn-utiliser" onclick={() => utiliserHorsCombat(item)}>Utiliser</button>
                    {/if}
                    <button class="btn-vendre" onclick={() => vendreInventaire(item)}>{item.valeur_or} od</button>
                </div>
            </div>
            {/each}
        </div>
        {/if}
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
        <div class="mini-shop-item">
            <div>
                <div class="mini-shop-nom">💧 Élixir de mana (+20%)</div>
                <div class="mini-shop-desc">{manaActuels}/{manaMax} mana</div>
            </div>
            <button class="btn-soin" onclick={acheterElixirMana} disabled={orDonjon < 20 || manaActuels >= manaMax}>
                20 od
            </button>
        </div>
        {#each ITEMS_CONSOMMABLES as item}
        <div class="mini-shop-item">
            <div>
                <div class="mini-shop-nom">✨ {item.nom}</div>
                <div class="mini-shop-desc">{item.description}</div>
            </div>
            <button class="btn-soin" onclick={() => acheterConsommable(item)} disabled={orDonjon < (item.prix_achat ?? 99)}>
                {item.prix_achat} od
            </button>
        </div>
        {/each}

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
            <button class="gacha-carte" style="border-color:{RARETE_COLORS[bonus.rarete] ?? '#aaa'}" onclick={() => choisirBonus(bonus)}>
                <div class="gacha-rarete" style="color:{RARETE_COLORS[bonus.rarete] ?? '#aaa'}">{RARETE_LABEL[bonus.rarete]}</div>
                <div class="gacha-label">{bonus.label}</div>
                <div class="gacha-desc">{bonus.description}</div>
            </button>
            {/each}
        </div>
        <button class="btn-quitter" onclick={quitterDonjon}>🚪 Quitter et sauvegarder</button>
    </div>

    <!-- ── LOOT BOX ───────────────────────────────────────────────────────── -->
    {:else if phase === 'loot_box'}
    <div class="loot-box">
        <div class="victoire-titre">🎉 {labelEtage(etage)} terminé !</div>

        {#if lootDisponible}
        <div class="loot-badge" style="color:{RARETE_COLORS[lootBoxRarete] ?? '#aaa'}; border-color:{RARETE_COLORS[lootBoxRarete] ?? '#aaa'}">
            📦 Coffre {RARETE_LABEL[lootBoxRarete] ?? lootBoxRarete}
        </div>
        {/if}

        {#if lootChoix.length === 0 && lootDisponible}
            <div class="loot-chargement">Génération des récompenses…</div>
        {:else if lootChoix.length === 0 && !lootDisponible}
            <div class="loot-deja-obtenu">Récompense déjà récupérée pour cet étage.</div>
            <button class="btn-entrer" onclick={() => { phase = 'donjon_shop'; sauvegarderProgression(); }}>🛒 Boutique d'étage</button>
        {:else if lootChoix.length > 1}
            <!-- Choix des 3 items -->
            <div class="loot-sous-titre">Choisissez votre récompense</div>
            <div class="loot-options">
                {#each lootChoix as opt}
                <button class="loot-carte" style="border-color:{RARETE_COLORS[opt.rarete] ?? '#aaa'}"
                    onclick={() => choisirLoot(opt)} disabled={lootEnCours}>
                    <div class="loot-type">{opt.type === 'stuff' ? '🗡️ Équipement' : '⚡ Compétence'}</div>
                    <div class="loot-nom" style="color:{RARETE_COLORS[opt.rarete] ?? '#aaa'}">{opt.nom}</div>
                    <div class="loot-rarete">{RARETE_LABEL[opt.rarete] ?? opt.rarete}</div>
                </button>
                {/each}
            </div>
        {:else}
            <!-- Item choisi -->
            <div class="loot-reveal" style="border-color:{RARETE_COLORS[lootChoix[0].rarete] ?? '#aaa'}">
                <div class="loot-type">{lootChoix[0].type === 'stuff' ? '🗡️ Équipement' : '⚡ Compétence'}</div>
                <div class="loot-nom" style="color:{RARETE_COLORS[lootChoix[0].rarete] ?? '#aaa'}">{lootChoix[0].nom}</div>
                <div class="loot-rarete">{RARETE_LABEL[lootChoix[0].rarete] ?? lootChoix[0].rarete}</div>
                <div class="loot-note">Ajouté à votre inventaire !</div>
            </div>
            <button class="btn-entrer" onclick={() => { phase = 'donjon_shop'; sauvegarderProgression(); }}>🛒 Boutique d'étage</button>
        {/if}
    </div>

    <!-- ── BOUTIQUE INTER-ÉTAGE ─────────────────────────────────────────── -->
    {:else if phase === 'donjon_shop'}
    <div class="inter-salle">
        <div class="victoire-titre">🛒 Boutique d'étage</div>
        <div class="salle-info">{labelEtage(etage)} terminé · <PixelEmoji char="💰" size={14} /> {orDonjon} od</div>

        <div class="pv-inter">
            <span class="hp-coeur">❤</span>
            <div class="hp-track">
                <div class="hp-fill" style="width:{Math.round(pvCombatActuels/pvCombatMax*100)}%; color:{pvColor(Math.round(pvCombatActuels/pvCombatMax*100))}"></div>
            </div>
            <span class="hp-nums">{pvCombatActuels}/{pvCombatMax}</span>
        </div>
        <div class="pv-inter">
            <span class="hp-coeur" style="color:#3498db">💧</span>
            <div class="hp-track"><div class="hp-fill mana-fill" style="width:{Math.round(manaActuels/Math.max(1,manaMax)*100)}%"></div></div>
            <span class="hp-nums">{manaActuels}/{manaMax}</span>
        </div>

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
        <div class="mini-shop-item">
            <div>
                <div class="mini-shop-nom">💧 Élixir de mana (+20%)</div>
                <div class="mini-shop-desc">{manaActuels}/{manaMax} mana</div>
            </div>
            <button class="btn-soin" onclick={acheterElixirMana} disabled={orDonjon < 20 || manaActuels >= manaMax}>
                20 od
            </button>
        </div>
        {#each ITEMS_CONSOMMABLES as item}
        <div class="mini-shop-item">
            <div>
                <div class="mini-shop-nom">✨ {item.nom}</div>
                <div class="mini-shop-desc">{item.description}</div>
            </div>
            <button class="btn-soin" onclick={() => acheterConsommable(item)} disabled={orDonjon < (item.prix_achat ?? 99)}>
                {item.prix_achat} od
            </button>
        </div>
        {/each}

        <button class="btn-entrer" onclick={continuerApresLoot}>▶ {labelEtage(etage + 1)}</button>
        <button class="btn-quitter" onclick={quitterDonjon}>🚪 Quitter et sauvegarder</button>
    </div>

    <!-- ── MORT ───────────────────────────────────────────────────────────── -->
    {:else if phase === 'mort'}
    <div class="mort-ecran">
        <div class="mort-titre">💀 Défaite</div>
        <div class="mort-msg">Vaincu au {labelEtage(etage)}, salle {salle}.</div>
        <div class="mort-or">Or donjon accumulé : {orDonjon} od</div>
        <button class="btn-entrer" onclick={() => { phase = 'lobby'; salle = 0; etage = 1; orDonjon = 0; etageEnCours = false; inventaireDonjon = []; chargerPerso(); }}>
            🏠 Retour au lobby
        </button>
    </div>
    {/if}

</div>

<!-- ── UNLOCK CLASSE ──────────────────────────────────────────────────── -->
{#if classeUnlockModal}
<div class="unlock-overlay">
    <div class="unlock-modal px-frame-gold">
        <div class="unlock-titre">🏆 Nouvelle classe débloquée !</div>
        <div class="unlock-sous">Choisissez une classe à débloquer pour votre arbre :</div>
        {#if classeUnlockErreur}<div style="color:#e74c3c;font-size:0.6rem;text-align:center">{classeUnlockErreur}</div>{/if}
        {#each classeUnlockChoix as c}
        {@const bonus = getBonusCumulatif(c.id)}
        <button class="btn-unlock" onclick={() => choisirClasseUnlock(c)}>
            <div class="unlock-nom">{c.nom}</div>
            <div class="unlock-bonus">
                {#if bonus.attq > 0}ATQ +{bonus.attq} {/if}
                {#if bonus.def > 0}DEF +{bonus.def} {/if}
                {#if bonus.attq_spe > 0}ATQ SPÉ +{bonus.attq_spe} {/if}
                {#if bonus.def_spe > 0}DEF SPÉ +{bonus.def_spe} {/if}
                {#if bonus.vit > 0}VIT +{bonus.vit} {/if}
                {#if bonus.pv_max > 0}PV +{bonus.pv_max} {/if}
                {#if bonus.aff_elem > 0}Tous éléments +{bonus.aff_elem}% {/if}
            </div>
        </button>
        {/each}
    </div>
</div>
{/if}

<style>

    .donjon {
        color: #eee;
        font-family: var(--font);
        width: calc(100% + 30px);
        margin: -15px; /* Counter main 15px padding from layout */
        box-sizing: border-box;
        overflow-x: hidden;
        padding: 15px 6px; /* Re-add top/bottom padding, keep left/right thin */
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
        flex: 1; height: 12px;
        background: #222; border: 1px solid #555; overflow: hidden;
    }
    .barre {
        height: 100%; transition: width 0.3s;
        background: repeating-linear-gradient(
            90deg, currentColor 0, currentColor 7px, transparent 7px, transparent 9px
        );
    }
    .or-donjon { font-size: 0.82rem; color: #f39c12; }
    .comp-block { background: #1a1a3e; border-radius: 8px; padding: 10px 12px; }
    .comp-title { font-size: 0.72rem; color: #888; margin-bottom: 6px; }
    .comp-grid  { display: flex; flex-wrap: wrap; gap: 4px; }
    .comp-chip {
        background: #0f3460; border: 1px solid #555;
        border-radius: 12px; padding: 3px 8px;
        font-size: 1,5rem; color: #eee;
    }
    .comp-chip .pixel-icon, .btn-nes .pixel-icon { width: 25px; height: 25px; }
    .vide { color: #555; font-style: italic; font-size: 0.8rem; margin: 0; }
    .lien { color: #e94560; }
    .btn-entrer {
        background: #e94560; color: white; border: none;
        border-radius: 6px; padding: 12px;
        cursor: pointer; font-size: 0.9rem; font-weight: bold;
        width: 100%; margin-top: 4px; font-family: var(--font);
    }

    /* ── Combat ── */
    .combat-header {
        display: flex; justify-content: space-between;
        align-items: center; margin-bottom: 10px;
    }
    .salle-badge { font-size: 0.72rem; color: #888; text-transform: uppercase; }
    .or-chip     { font-size: 0.78rem; color: #f39c12; }

    /* ── Combat ── */
    .combat-scene { 
        display: flex; 
        flex-direction: column; 
        margin-bottom: 8px; 
        background-image: var(--bg-combat);
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        margin-left: -6px;
        margin-right: -6px;
        padding-left: 6px;
        padding-right: 6px;
    }

    /* Zone monstre : image pleine largeur, HUD en overlay */
    .zone-monstre { position: relative; }
    .ennemi-img { width: 125%;height: auto; display: block; margin-top: 20px; }
    .monstre-overlay {
        position: absolute; top: 0; left: 0; right: 0;
        padding: 10px 8px;
    }

    /* Zone joueur : image héros déborde sur monstre, HP en dessous */
    .zone-joueur { position: relative; display: flex; gap: 8px; padding: 0px 0; z-index: 10;}
    .joueur-sprite-wrap {
        position: absolute;
        bottom: 100%;
        left: 0; /* L'image reste collée à gauche */
        pointer-events: none;
        display: flex;
        margin-bottom: -9px;
        z-index: 20;

    }
    .joueur-img { width: 85%;height: auto; display: flex;}
    .joueur-overlay { flex: 1; min-width: 0; position: relative; z-index: 25; }

    /* HUD commun */
    .unit-plaque-nom {
    display: block;        
    width: fit-content;    
    
    margin-left: auto;
    margin-right: 0;  
    text-align: right;     
    
    font-size: 0.72rem; 
    text-transform: uppercase;
    letter-spacing: 1px; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    max-width: 100%;       
    }
    .hp-row { display: flex; align-items: center; gap: 4px; }
    .hp-coeur { font-size: 0.75rem; }
    .hp-track {
        flex: 1; height: 11px;
        background: #222; border: 1px solid #555; overflow: hidden;
    }
    .hp-fill {
        height: 100%; transition: width 0.3s;
        background: repeating-linear-gradient(
            90deg, currentColor 0, currentColor 7px, transparent 7px, transparent 9px
        );
    }
    .mana-fill {
        height: 100%; transition: width 0.3s;
        background: repeating-linear-gradient(
            90deg, #3498db 0, #3498db 7px, transparent 7px, transparent 9px
        );
    }
    .atb-fill-joueur {
        height: 100%; transition: width 0.25s;
        background: repeating-linear-gradient(
            90deg, #f1c40f 0, #f1c40f 7px, transparent 7px, transparent 9px
        );
    }
    .atb-fill-monstre {
        height: 100%; transition: width 0.25s;
        background: repeating-linear-gradient(
            90deg, #e74c3c 0, #e74c3c 7px, transparent 7px, transparent 9px
        );
    }
    .atb-icon { font-size: 10px; }
    .mana-barre {
        height: 100%; transition: width 0.3s;
        background: repeating-linear-gradient(
            90deg, #3498db 0, #3498db 7px, transparent 7px, transparent 9px
        );
    }
    .mana-cost {
        font-size: 0.6rem; color: #3498db; margin-left: 4px;
        opacity: 0.85;
    }
    .hp-nums { font-size: 0.65rem; color: var(--text-muted); white-space: nowrap; }

    .statuts-row { display: flex; gap: 4px; margin-top: 3px; flex-wrap: wrap; }
    .statut-chip { font-size: 0.65rem; padding: 1px 5px; background: rgba(231,76,60,0.2); color: #e74c3c; border-radius: 3px; }
    .statut-brulure   { background: rgba(230,126,34,0.25); color: #e67e22; }
    .statut-froid     { background: rgba(52,152,219,0.25); color: #5dade2; }
    .statut-poison    { background: rgba(125,60,152,0.25); color: #a569bd; }
    .statut-regen_pv  { background: rgba(46,204,113,0.25); color: #2ecc71; }
    .statut-marque    { background: rgba(236,240,21,0.2);  color: #f1c40f; }
    .statut-riposte,.statut-reduction_degats { background: rgba(52,73,94,0.35); color: #95a5a6; }
    .statut-surchauffe { background: rgba(231,76,60,0.3); color: #ff6b47; }
    .statut-sismique   { background: rgba(149,117,55,0.3); color: #d4a843; }
    .statut-prochain_attq_mult { background: rgba(241,196,15,0.2); color: #f39c12; }
    .buff-chip   { font-size: 0.65rem; padding: 1px 5px; background: rgba(46,204,113,0.2); color: #2ecc71; border-radius: 3px; }
    .debuff-chip { background: rgba(192,57,43,0.2); color: #c0392b; }

    .damage-float {
        position: absolute; top: -8px; left: 50%;
        transform: translateX(-50%);
        font-size: 1rem; font-weight: bold;
        color: var(--danger); pointer-events: none;
        animation: floatUp 0.8s ease-out forwards; z-index: 10;
    }
    @keyframes floatUp {
        0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }

    .text-box {
        background: #f0e8d0; color: #1a0a00;
        font-size: 0.75rem; line-height: 1.8;
        padding: 8px 10px; min-height: 52px;
        display: flex; align-items: flex-start; gap: 6px;
        margin-bottom: 16px;
        margin-top: 10px;
    }
    .text-cursor { animation: blink 0.8s step-end infinite; flex-shrink: 0; font-size: 0.75rem; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .text-content { flex: 1; word-break: break-word; }

    .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; margin-bottom: 8px;}
    .actions-grid.bloque { opacity: 0.4; pointer-events: none; }
    .btn-nes {
        font-family: var(--font); font-size: 0.72rem;
        padding: 10px 8px; cursor: pointer;
        border: var(--px-border); box-shadow: var(--px-shadow);
        background: var(--bg-card); color: var(--text);
        text-transform: uppercase;
        white-space: normal; word-break: break-word;
        line-height: 1.3; text-align: center;
    }
    .btn-nes.attaque {
        background: var(--accent); color: white; border-color: var(--accent);
        box-shadow: 0 0 0 var(--px-gap) var(--bg-card),
                    0 0 0 calc(var(--px-gap) + var(--px-border-size)) var(--accent);
    }
    .btn-nes.competence {
        background: var(--bg-header);
        border-color: var(--elem-color, #3498db);
        box-shadow: 0 0 0 var(--px-gap) var(--bg-card),
                    0 0 0 calc(var(--px-gap) + var(--px-border-size)) var(--elem-color, #3498db);
    }

    /* ── Inter-salle / Ravito ── */
    .inter-salle { display: flex; flex-direction: column; gap: 10px; }
    .victoire-titre { font-size: 1rem; font-weight: bold; color: #2ecc71; text-align: center; }
    .ravito-msg {
        background: rgba(46,204,113,0.1); border: 1px solid #2ecc7155;
        border-radius: 6px; padding: 10px;
        font-size: 0.82rem; color: #2ecc71; text-align: center;
    }
    .salle-info { font-size: 0.75rem; color: #888; text-align: center; }
    .pv-inter { display: flex; align-items: center; gap: 6px; }
    .section-titre { font-size: 0.72rem; color: #888; text-transform: uppercase; margin-top: 4px; }
    .item-drop {
        display: flex; align-items: center;
        background: #1a1a3e; border-radius: 6px; padding: 6px 10px;
        font-size: 0.8rem; gap: 8px;
    }
    .item-badge { font-size: 0.85rem; flex-shrink: 0; }
    .item-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .item-nom { font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .item-desc { font-size: 0.62rem; color: #9b59b6; }
    .item-val { color: #f39c12; font-size: 0.75rem; }
    .btn-garder {
        background: #9b59b6; color: white; border: none;
        padding: 3px 8px; cursor: pointer; font-size: 0.65rem; font-family: var(--font);
        flex-shrink: 0;
    }
    .btn-inventaire {
        background: #1a1a3e; color: #9b59b6;
        border: 1px solid #9b59b6; padding: 6px 12px;
        cursor: pointer; font-size: 0.72rem; font-family: var(--font);
        width: 100%; text-align: left;
    }
    .inventaire-panel {
        background: var(--bg-card); padding: 8px; display: flex; flex-direction: column; gap: 6px;
    }
    .inv-item {
        display: flex; align-items: center; gap: 6px;
        padding: 5px 6px; background: #16213e;
    }
    .inv-item-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .inv-item-nom { font-size: 0.72rem; }
    .inv-usage-badge { font-size: 0.58rem; color: #888; }
    .inv-item-btns { display: flex; gap: 4px; flex-shrink: 0; }
    .btn-utiliser {
        background: #2ecc71; color: #111; border: none;
        padding: 3px 8px; cursor: pointer; font-size: 0.65rem; font-family: var(--font);
    }
    .btn-nes.consommable-btn {
        background: #6c3483; color: white;
        border-color: #9b59b6;
        box-shadow: 0 0 0 var(--px-gap) var(--bg-card),
                    0 0 0 calc(var(--px-gap) + var(--px-border-size)) #9b59b6;
    }
    .btn-vendre {
        background: #f39c12; color: #111; border: none;
        border-radius: 4px; padding: 3px 8px;
        cursor: pointer; font-size: 0.72rem; font-weight: bold; font-family: var(--font);
    }
    .btn-vendre-tout {
        background: #e67e22; color: white; border: none;
        border-radius: 4px; padding: 6px 12px;
        cursor: pointer; font-size: 0.78rem; font-family: var(--font);
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
        cursor: pointer; font-size: 0.78rem; font-weight: bold; font-family: var(--font); flex-shrink: 0;
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
    .coffre-txt   { font-size: 0.9rem; color: #f39c12; font-family: var(--font); }
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
        cursor: pointer; text-align: left; font-family: var(--font);
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
        cursor: pointer; font-size: 0.78rem; font-family: var(--font);
        width: 100%; text-align: center;
    }
    .btn-quitter {
        background: none; color: #888; border: 1px solid #444;
        border-radius: 6px; padding: 8px;
        cursor: pointer; font-size: 0.75rem; font-family: var(--font);
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
        cursor: pointer; text-align: left; font-family: var(--font);
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
        width: 100%; font-family: var(--font); margin-top: 4px;
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

    /* ── Unlock classe ── */
    .unlock-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.88);
        display: flex; align-items: center; justify-content: center;
        z-index: 200;
    }
    .unlock-modal {
        background: #16213e; padding: 20px 16px;
        max-width: 300px; width: 94%;
        display: flex; flex-direction: column; gap: 10px;
        animation: fadeInScale 0.3s ease;
    }
    .unlock-titre {
        font-size: 0.85rem; font-weight: bold; color: #f39c12;
        text-align: center;
    }
    .unlock-sous {
        font-size: 0.60rem; color: #aaa; text-align: center;
    }
    .btn-unlock {
        width: 100%; background: #0f3460; border: 1px solid #f39c12;
        padding: 10px 12px; cursor: pointer; font-family: var(--font);
        text-align: left; display: flex; flex-direction: column; gap: 4px;
        transition: background 0.15s;
    }
    .btn-unlock:hover { background: #1a4a80; }
    .unlock-nom   { font-size: 0.70rem; color: #eee; }
    .unlock-bonus { font-size: 0.60rem; color: #2ecc71; }
</style>
