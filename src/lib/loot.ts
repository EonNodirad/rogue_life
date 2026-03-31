import type { Rarete, stuff, Competence } from './types';

// Probability tables: box rarity → [commun, peu_commun, rare, epique, legendaire]
const TABLES: Record<Rarete, number[]> = {
    commun:      [0.70, 0.25, 0.05, 0.00, 0.00],
    peu_commun:  [0.40, 0.40, 0.18, 0.02, 0.00],
    rare:        [0.15, 0.35, 0.35, 0.14, 0.01],
    epique:      [0.05, 0.20, 0.35, 0.35, 0.05],
    legendaire:  [0.00, 0.05, 0.15, 0.40, 0.40],
};

const RARETE_ORDER: Rarete[] = ['commun', 'peu_commun', 'rare', 'epique', 'legendaire'];

function tirerRarete(boxRarete: Rarete): Rarete {
    const probs = TABLES[boxRarete];
    const r = Math.random();
    let cumul = 0;
    for (let i = 0; i < probs.length; i++) {
        cumul += probs[i];
        if (r < cumul) return RARETE_ORDER[i];
    }
    return RARETE_ORDER[RARETE_ORDER.length - 1];
}

export type LootOption = { type: 'stuff'; id: number; nom: string; rarete: Rarete } | { type: 'competence'; id: number; nom: string; rarete: Rarete };

/**
 * Génère `count` choix distincts de loot depuis une loot box d'une rareté donnée.
 * - stuffs : tous les stuffs disponibles
 * - comps : toutes les compétences donjon disponibles
 * - ownedCompIds : IDs des compétences déjà possédées (exclues)
 * - ownedStuffIds : IDs des stuffs déjà en inventaire (optionnel, non bloquant)
 */
export function piocherLoot(
    boxRarete: Rarete,
    stuffs: stuff[],
    comps: Competence[],
    ownedCompIds: number[],
    count = 3,
): LootOption[] {
    const results: LootOption[] = [];
    const usedKeys = new Set<string>();

    // Build pools by rarity (exclude utilitaires from loot boxes)
    const stuffPool: Record<Rarete, stuff[]> = { commun: [], peu_commun: [], rare: [], epique: [], legendaire: [] };
    for (const s of stuffs) {
        if (s.categorie !== 'utilitaire') stuffPool[s.rarete].push(s);
    }

    const compPool: Record<Rarete, Competence[]> = { commun: [], peu_commun: [], rare: [], epique: [], legendaire: [] };
    for (const c of comps) {
        if (!ownedCompIds.includes(c.id)) compPool[c.rarete].push(c);
    }

    let attempts = 0;
    while (results.length < count && attempts < 100) {
        attempts++;
        const itemRarete = tirerRarete(boxRarete);

        const availableStuffs = stuffPool[itemRarete];
        const availableComps = compPool[itemRarete];
        const total = availableStuffs.length + availableComps.length;
        if (total === 0) continue;

        const idx = Math.floor(Math.random() * total);
        let option: LootOption;
        if (idx < availableStuffs.length) {
            const s = availableStuffs[idx];
            const key = `stuff_${s.id}`;
            if (usedKeys.has(key)) continue;
            usedKeys.add(key);
            option = { type: 'stuff', id: s.id, nom: s.nom, rarete: s.rarete };
        } else {
            const c = availableComps[idx - availableStuffs.length];
            const key = `comp_${c.id}`;
            if (usedKeys.has(key)) continue;
            usedKeys.add(key);
            option = { type: 'competence', id: c.id, nom: c.nom, rarete: c.rarete };
        }
        results.push(option);
    }

    return results;
}

/**
 * Calcule la rareté de la loot box donjon selon le compteur.
 * Multiples de 50 → légendaire.
 * Sinon : compteur 1-3 → peu_commun, 4-6 → rare, 7+ → epique (cycle de 3 dans rare/epique).
 */
export function rareteBoiteDonjon(compteur: number): Rarete {
    if (compteur % 50 === 0) return 'legendaire';
    const idx = Math.floor((compteur - 1) / 3) % 3;
    // 0 → peu_commun, 1 → rare, 2 → epique
    return (['peu_commun', 'rare', 'epique'] as Rarete[])[idx];
}

/**
 * Calcule la rareté de la loot box routine selon le total de routines complétées.
 */
export function rareteBoiteRoutine(compteurRoutines: number): Rarete {
    if (compteurRoutines >= 20) return 'epique';
    if (compteurRoutines >= 15) return 'rare';
    if (compteurRoutines >= 10) return 'peu_commun';
    return 'commun';
}

export { RARETE_ORDER };
