import { base } from '$app/paths';
import type { Competence, Element } from './types';
import type { StatusEffect, BuffEffect } from './types';

// ── Matrice des types (attaque → défense) ─────────────────────────────────────
export const TYPE_MATRIX: Record<Element, Partial<Record<Element, number>>> = {
    neutre:      {},
    surnaturel:  { surnaturel:1,   technologie:1.5, feu:1,   eau:1,   terre:1,   air:1.5, vie:1,   mort:0.5, tenebres:0.5, lumiere:1   },
    technologie: { surnaturel:0.5, technologie:1,   feu:0.5, eau:1,   terre:1,   air:1,   vie:1,   mort:1.5, tenebres:1,   lumiere:1.5 },
    feu:         { surnaturel:1,   technologie:1.5, feu:1,   eau:0.5, terre:0.5, air:1,   vie:1,   mort:1,   tenebres:1.5, lumiere:1   },
    eau:         { surnaturel:1,   technologie:1,   feu:1.5, eau:1,   terre:1.5, air:0.5, vie:0.5, mort:1,   tenebres:1,   lumiere:1   },
    terre:       { surnaturel:1,   technologie:1,   feu:1.5, eau:0.5, terre:1,   air:1.5, vie:0.5, mort:1,   tenebres:1,   lumiere:1   },
    air:         { surnaturel:0.5, technologie:1,   feu:1,   eau:1.5, terre:0.5, air:1,   vie:1,   mort:1,   tenebres:1,   lumiere:1.5 },
    vie:         { surnaturel:1,   technologie:1,   feu:1,   eau:1.5, terre:1.5, air:1,   vie:1,   mort:0.5, tenebres:0.5, lumiere:1   },
    mort:        { surnaturel:1.5, technologie:0.5, feu:1,   eau:1,   terre:1,   air:1,   vie:1.5, mort:1,   tenebres:1,   lumiere:0.5 },
    tenebres:    { surnaturel:1.5, technologie:1,   feu:0.5, eau:1,   terre:1,   air:1,   vie:1.5, mort:1,   tenebres:1,   lumiere:0.5 },
    lumiere:     { surnaturel:1,   technologie:0.5, feu:1,   eau:1,   terre:1,   air:0.5, vie:1,   mort:1.5, tenebres:1.5, lumiere:1   },
};

export function getTypeMulti(attaque: Element, defense: Element): number {
    if (attaque === 'neutre') return 1;
    return TYPE_MATRIX[attaque]?.[defense] ?? 1;
}

// ── Types combat ──────────────────────────────────────────────────────────────

export interface CombatUnit {
    nom: string;
    pv_max: number;
    pv_actuels: number;
    mana: number;
    mana_max: number;
    attq: number;
    attq_spe: number;
    def: number;
    def_spe: number;
    vitesse: number;
    precision: number;
    esquive: number;
    surchauffe: number;        // techno : 0–4, overflow à 5 → stun + dégâts
    charges_sismiques: number; // terre : charges consommables
    niveau: number;
    element: Element;
    affinites: Partial<Record<Element, number>>;
    statuts: StatusEffect[];
    buffs: BuffEffect[];
}

export interface DonjonItem {
    nom: string;
    valeur_or: number;
    type: 'inutile' | 'consommable' | 'rare';
    description?: string;
    usage?: 'combat' | 'hors_combat' | 'les_deux';
    prix_achat?: number;
    effet?: {
        type: 'boost_attq' | 'poison' | 'stun' | 'soin_pct' | 'mana_pct';
        valeur?: number;
        duree?: number;
    };
}

export interface CombatState {
    joueur: CombatUnit;
    monstre: CombatUnit;
    tour: number;
    log: string[];
    termine: boolean;
    vainqueur: 'joueur' | 'monstre' | null;
    or_donjon_gagne: number;
    items_droppes: DonjonItem[];
    joueur_stunne: boolean;
    monstre_stunne: boolean;
    gauge_joueur: number;   // 0-100 : jauge ATB du joueur
    gauge_monstre: number;  // 0-100 : jauge ATB du monstre
}

export interface ActionCombat {
    type: 'attaque_base' | 'competence' | 'consommable';
    competence?: Competence;
    itemConsommable?: DonjonItem;
}

// ── Génération de monstre ─────────────────────────────────────────────────────

const NOMS_MONSTRES = [
    'Slime', 'Gobelin', 'Squelette', 'Loup', 'Araignée',
    'Troll', 'Bandit', 'Fantôme', 'Drake', 'Golem',
];

export const MONSTRE_IMAGES: Record<string, string> = {
    'Slime':     `${base}/monstres/slime.png`,
    'Gobelin':   `${base}/monstres/gobelin.png`,
    'Squelette': `${base}/monstres/squelette.png`,
    'Loup':      `${base}/monstres/loup.png`,
    'Araignée':  `${base}/monstres/araignee.png`,
    'Troll':     `${base}/monstres/troll.png`,
    'Bandit':    `${base}/monstres/bandit.png`,
    'Fantôme':   `${base}/monstres/fantome.png`,
    'Drake':     `${base}/monstres/dragon_feu.png`,
    'Golem':     `${base}/monstres/golem_lumier.png`,
};

const ITEMS_INUTILES: Record<string, DonjonItem[]> = {
    'Slime':     [
        { nom: 'Bave de slime',      valeur_or: 4, type: 'inutile' },
        { nom: 'Résidu gélatineux',  valeur_or: 3, type: 'inutile' },
        { nom: 'Noyau visqueux',     valeur_or: 6, type: 'inutile' },
    ],
    'Gobelin':   [
        { nom: 'Oreille de gobelin', valeur_or: 4, type: 'inutile' },
        { nom: 'Dent de gobelin',    valeur_or: 3, type: 'inutile' },
        { nom: 'Couteau rouillé',    valeur_or: 7, type: 'inutile' },
    ],
    'Squelette': [
        { nom: 'Fragment d\'os',     valeur_or: 3, type: 'inutile' },
        { nom: 'Crâne fissuré',      valeur_or: 5, type: 'inutile' },
        { nom: 'Poussière d\'os',    valeur_or: 2, type: 'inutile' },
    ],
    'Loup':      [
        { nom: 'Griffe de loup',     valeur_or: 6, type: 'inutile' },
        { nom: 'Poil de loup',       valeur_or: 3, type: 'inutile' },
        { nom: 'Canine de loup',     valeur_or: 5, type: 'inutile' },
    ],
    'Araignée':  [
        { nom: 'Toile d\'araignée',  valeur_or: 4, type: 'inutile' },
        { nom: 'Croc venimeux',      valeur_or: 7, type: 'inutile' },
        { nom: 'Œil d\'araignée',    valeur_or: 5, type: 'inutile' },
    ],
    'Troll':     [
        { nom: 'Peau de troll',      valeur_or: 8, type: 'inutile' },
        { nom: 'Ongle de troll',     valeur_or: 5, type: 'inutile' },
        { nom: 'Mucus de troll',     valeur_or: 3, type: 'inutile' },
    ],
    'Bandit':    [
        { nom: 'Pièce rouillée',     valeur_or: 6, type: 'inutile' },
        { nom: 'Chiffon sale',       valeur_or: 2, type: 'inutile' },
        { nom: 'Lame émoussée',      valeur_or: 8, type: 'inutile' },
    ],
    'Fantôme':   [
        { nom: 'Éther condensé',     valeur_or: 9, type: 'inutile' },
        { nom: 'Fragment d\'âme',    valeur_or: 7, type: 'inutile' },
        { nom: 'Brume spectrale',    valeur_or: 5, type: 'inutile' },
    ],
    'Drake':     [
        { nom: 'Écaille de drake',   valeur_or: 9, type: 'inutile' },
        { nom: 'Dent de drake',      valeur_or: 7, type: 'inutile' },
        { nom: 'Griffe de drake',    valeur_or: 8, type: 'inutile' },
    ],
    'Golem':     [
        { nom: 'Fragment de pierre', valeur_or: 5, type: 'inutile' },
        { nom: 'Éclat cristallin',   valeur_or: 8, type: 'inutile' },
        { nom: 'Poussière de golem', valeur_or: 3, type: 'inutile' },
    ],
};
const ITEMS_INUTILES_FALLBACK: DonjonItem[] = [
    { nom: 'Débris inconnu',   valeur_or: 4, type: 'inutile' },
    { nom: 'Reste étrange',    valeur_or: 3, type: 'inutile' },
];

export const ITEMS_CONSOMMABLES: DonjonItem[] = [
    { nom: 'Fiole de rage',            valeur_or: 8,  type: 'consommable', description: '+8 ATQ — 2 tours',      usage: 'combat',      prix_achat: 15, effet: { type: 'boost_attq', valeur: 8,  duree: 2 } },
    { nom: 'Parchemin de poison',      valeur_or: 10, type: 'consommable', description: 'Empoisonne ennemi 3t',  usage: 'combat',      prix_achat: 18, effet: { type: 'poison',     valeur: 8,  duree: 3 } },
    { nom: "Poudre d'étourdissement",  valeur_or: 12, type: 'consommable', description: 'Étourdit ennemi 1t',   usage: 'combat',      prix_achat: 20, effet: { type: 'stun',       duree: 1 } },
    { nom: 'Bandage de fortune',       valeur_or: 6,  type: 'consommable', description: '+10% PV combat',        usage: 'les_deux',    prix_achat: 12, effet: { type: 'soin_pct',   valeur: 10 } },
    { nom: 'Fiole de mana',            valeur_or: 7,  type: 'consommable', description: '+10% mana',             usage: 'combat',      prix_achat: 12, effet: { type: 'mana_pct',   valeur: 10 } },
];

const ITEMS_RARES: DonjonItem[] = [
    { nom: 'Herbe de régénération', valeur_or: 14, type: 'consommable', description: '+15% PV combat',  usage: 'hors_combat', effet: { type: 'soin_pct',  valeur: 15 } },
    { nom: 'Cristal de mana',       valeur_or: 14, type: 'consommable', description: '+15% mana',       usage: 'hors_combat', effet: { type: 'mana_pct',  valeur: 15 } },
    { nom: 'Élixir de puissance',   valeur_or: 16, type: 'consommable', description: '+15% PV combat',  usage: 'les_deux',    effet: { type: 'soin_pct',  valeur: 15 } },
    { nom: 'Ampoule de mana pur',   valeur_or: 16, type: 'consommable', description: '+15% mana',       usage: 'combat',      effet: { type: 'mana_pct',  valeur: 15 } },
    { nom: 'Potion de sang',        valeur_or: 20, type: 'consommable', description: '+20% PV combat',  usage: 'les_deux',    effet: { type: 'soin_pct',  valeur: 20 } },
    { nom: 'Essence arcanique',     valeur_or: 20, type: 'consommable', description: '+20% mana',       usage: 'combat',      effet: { type: 'mana_pct',  valeur: 20 } },
];

export function genererMonstre(etage: number, room: number): CombatUnit {
    const budget = 60 + (etage - 1) * 50 + (room - 1) * 7;
    const pv_base = Math.floor(budget * 0.55) + Math.floor(Math.random() * 10);

    let reste = budget - Math.floor(budget * 0.1);
    const attq     = 2 + pick(reste, 0.28); reste -= (attq - 2);
    const attq_spe = 2 + pick(reste, 0.18); reste -= (attq_spe - 2);
    const def      = 2 + pick(reste, 0.24); reste -= (def - 2);
    const def_spe  = 2 + pick(reste, 0.14); reste -= (def_spe - 2);
    const vitesse  = 2 + Math.max(0, Math.min(reste, Math.floor(Math.random() * 5)));

    const MONSTRE_ELEMENTS: Record<string, Element> = {
        'Slime':     'eau',     'Gobelin':   'terre',
        'Squelette': 'mort',    'Loup':      'air',
        'Araignée':  'tenebres','Troll':     'vie',
        'Bandit':    'technologie', 'Fantôme':'surnaturel',
        'Drake':     'feu',     'Golem':     'lumiere',
    };
    const nom = NOMS_MONSTRES[Math.floor(Math.random() * NOMS_MONSTRES.length)];
    const element = MONSTRE_ELEMENTS[nom];

    const mana_max = Math.floor(budget * 0.25) + Math.floor(Math.random() * 10);

    return {
        nom, pv_max: pv_base, pv_actuels: pv_base,
        mana: mana_max, mana_max,
        attq, attq_spe, def, def_spe, vitesse,
        precision: 100, esquive: 0,
        surchauffe: 0, charges_sismiques: 0,
        niveau: etage, element,
        affinites: { [element]: 50 },
        statuts: [], buffs: [],
    };
}

function pick(budget: number, ratio: number): number {
    const max = Math.floor(budget * ratio);
    return max <= 0 ? 0 : Math.floor(Math.random() * (max + 1));
}

export function lootMonstre(etage: number, room: number, nomMonstre: string): { items: DonjonItem[]; or_base: number } {
    // Taux selon l'étage : [inutile, consommable, rare]
    let taux: [number, number, number];
    if      (etage <= 2) taux = [0.65, 0.28, 0.07];
    else if (etage <= 5) taux = [0.50, 0.35, 0.15];
    else                 taux = [0.35, 0.40, 0.25];

    const inutiles = ITEMS_INUTILES[nomMonstre] ?? ITEMS_INUTILES_FALLBACK;
    const r = Math.random();
    let item: DonjonItem;
    if      (r < taux[0])              item = inutiles[Math.floor(Math.random() * inutiles.length)];
    else if (r < taux[0] + taux[1])    item = ITEMS_CONSOMMABLES[Math.floor(Math.random() * ITEMS_CONSOMMABLES.length)];
    else                               item = ITEMS_RARES[Math.floor(Math.random() * ITEMS_RARES.length)];

    const or_base = Math.floor(2 + etage * 1.5 + room * 0.5 + Math.random() * 5);
    return { items: [item], or_base };
}

// ── Initialisation du combat ──────────────────────────────────────────────────

export function initCombat(
    nom_joueur: string,
    pv_actuels: number, pv_max: number,
    mana_actuels: number, mana_max: number,
    attq: number, attq_spe: number,
    def: number, def_spe: number, vitesse: number,
    niveau: number, element: Element,
    affinites: Partial<Record<Element, number>>,
    monstre: CombatUnit,
): CombatState {
    const joueur: CombatUnit = {
        nom: nom_joueur,
        pv_max, pv_actuels,
        mana: mana_actuels, mana_max,
        attq, attq_spe, def, def_spe, vitesse,
        precision: 100, esquive: 0,
        surchauffe: 0, charges_sismiques: 0,
        niveau, element, affinites,
        statuts: [], buffs: [],
    };
    const baseState: CombatState = {
        joueur,
        monstre: { ...monstre, statuts: [], buffs: [], surchauffe: 0, charges_sismiques: 0 },
        tour: 1, log: [],
        termine: false, vainqueur: null,
        or_donjon_gagne: 0, items_droppes: [],
        joueur_stunne: false, monstre_stunne: false,
        gauge_joueur: 0, gauge_monstre: 0,
    };
    // Pré-avancer les jauges pour déterminer qui agit en premier
    return avancerJusquJoueur(baseState);
}

// ── Helpers stats ─────────────────────────────────────────────────────────────

type BuffStat = 'attq' | 'attq_spe' | 'def' | 'def_spe' | 'vitesse' | 'precision' | 'esquive';

function statEffective(unit: CombatUnit, stat: BuffStat): number {
    const base = unit[stat] as number;
    const bonus = unit.buffs.filter(b => b.stat === stat).reduce((s, b) => s + b.valeur, 0);
    let result = base + bonus;
    // Froid : -5% vitesse par cumul
    if (stat === 'vitesse') {
        const froid = unit.statuts.find(s => s.type === 'froid');
        if (froid) result = Math.floor(result * (1 - froid.valeur * 0.05));
    }
    return Math.max(0, result);
}

function chanceToucher(attaquant: CombatUnit, defenseur: CombatUnit): number {
    const prec = statEffective(attaquant, 'precision');
    const esq  = statEffective(defenseur, 'esquive');
    return Math.max(5, Math.min(100, prec - esq));
}

// ── Formule de dégâts ─────────────────────────────────────────────────────────

const MAGICAL_TYPES = new Set([
    'magique', 'vol_mana', 'surchauffe_add_mag', 'surchauffe_purge',
    'ignore_def_spe', 'def_spe_based', 'vitesse_based',
]);

function calculerDegats(
    attaquant: CombatUnit, defenseur: CombatUnit,
    typeAttaque: 'physique' | 'magique', elementAttaque: Element,
): { degats: number; typeMulti: number } {
    const statOff = typeAttaque === 'physique' ? statEffective(attaquant, 'attq') : attaquant.attq_spe;
    const statDef = typeAttaque === 'physique' ? defenseur.def : defenseur.def_spe;
    const typeMulti = getTypeMulti(elementAttaque, defenseur.element);
    const bonusOff  = (attaquant.affinites[elementAttaque] ?? 0) / 100;
    const rng = 0.85 + Math.random() * 0.15;
    const degats = Math.max(1, Math.floor(
        (attaquant.niveau / 10 + 1) * 40 * (statOff / Math.max(1, statDef))
        * typeMulti * (1 + bonusOff) * rng / 5
    ));
    return { degats, typeMulti };
}

function calculerDegatsCompetence(
    attaquant: CombatUnit, defenseur: CombatUnit, comp: Competence,
    options: { defMult?: number; statOffOverride?: number } = {},
): { degats: number; typeMulti: number } {
    // Dégâts purement aléatoires (ignorent ATQ/DEF) : puissance = max, valeur = min
    if (comp.effet_type === 'aleatoire') {
        const min = comp.valeur;
        const max = comp.puissance;
        const typeMulti = getTypeMulti(comp.element, defenseur.element);
        const degats = Math.floor(Math.random() * (max - min + 1)) + min;
        return { degats, typeMulti };
    }

    const isMag = MAGICAL_TYPES.has(comp.effet_type);
    const { defMult = 1, statOffOverride } = options;

    let statOff: number;
    if (statOffOverride !== undefined) {
        statOff = statOffOverride;
    } else {
        statOff = isMag ? attaquant.attq_spe : statEffective(attaquant, 'attq');
    }
    const statDef = (isMag ? defenseur.def_spe : defenseur.def) * defMult;
    const typeMulti = getTypeMulti(comp.element, defenseur.element);
    const bonusOff  = (attaquant.affinites[comp.element] ?? 0) / 100;
    // Bonus surchauffe : +10% par charge
    const surchBon = (comp.effet_type === 'surchauffe_add' || comp.effet_type === 'surchauffe_add_mag')
        ? (1 + attaquant.surchauffe * 0.1) : 1;
    const rng = 0.85 + Math.random() * 0.15;
    const degats = Math.max(1, Math.floor(
        (attaquant.niveau / 10 + 1) * comp.puissance * (statOff / Math.max(1, statDef))
        * typeMulti * (1 + bonusOff) * surchBon * rng / 5
    ));
    return { degats, typeMulti };
}

function typeMultiLabel(multi: number): string {
    if (multi >= 1.5) return ' ⚡ Super efficace !';
    if (multi <= 0.5) return ' 🛡 Pas très efficace...';
    return '';
}

// ── Application d'un effet secondaire sur la cible ───────────────────────────

function appliquerEffetSecondaire(
    effet: string, valeur: number, duree: number,
    cible: CombatUnit, log: string[], nomComp: string,
): CombatUnit {
    switch (effet) {
        case 'brulure':
            log.push(`🔥 ${nomComp} brûle ${cible.nom} (${valeur} PV/t, ${duree}t)`);
            return { ...cible, statuts: [...cible.statuts, { type: 'brulure', valeur, tours_restants: duree }] };
        case 'brulure_incurable':
            log.push(`🔥 ${nomComp} inflige une Brûlure Incurable (${valeur} PV/t) !`);
            return { ...cible, statuts: [...cible.statuts, { type: 'brulure', valeur, tours_restants: 99, incurable: true }] };
        case 'froid': {
            const existant = cible.statuts.find(s => s.type === 'froid');
            const cumuls = (existant?.valeur ?? 0) + valeur;
            const statuts = cible.statuts.filter(s => s.type !== 'froid');
            if (cumuls >= 3) {
                log.push(`❄️ Gel total ! ${cible.nom} est paralysé !`);
                return { ...cible, statuts: [...statuts, { type: 'stun', valeur: 0, tours_restants: 1 }] };
            }
            log.push(`❄️ ${cible.nom} : ${cumuls} cumul(s) de froid (-${cumuls * 5}% vitesse)`);
            return { ...cible, statuts: [...statuts, { type: 'froid', valeur: cumuls, tours_restants: 99 }] };
        }
        case 'stun':
            log.push(`💫 ${nomComp} étourdit ${cible.nom} (${duree}t)`);
            return { ...cible, statuts: [...cible.statuts, { type: 'stun', valeur: 0, tours_restants: duree }] };
        case 'anti_heal':
            log.push(`🚫 ${nomComp} bloque les soins de ${cible.nom} (${duree}t)`);
            return { ...cible, statuts: [...cible.statuts, { type: 'anti_heal', valeur: 0, tours_restants: duree }] };
        case 'debuff_precision':
            log.push(`👁 ${nomComp} réduit la précision de ${cible.nom} de ${valeur}`);
            return { ...cible, buffs: [...cible.buffs, { stat: 'precision', valeur: -valeur, tours_restants: duree }] };
        case 'debuff_vitesse':
            log.push(`🐢 ${nomComp} ralentit ${cible.nom} de ${valeur}`);
            return { ...cible, buffs: [...cible.buffs, { stat: 'vitesse', valeur: -valeur, tours_restants: duree }] };
        case 'debuff_def':
            log.push(`📉 ${nomComp} réduit la déf de ${cible.nom} de ${valeur}`);
            return { ...cible, buffs: [...cible.buffs, { stat: 'def', valeur: -valeur, tours_restants: duree }] };
        case 'debuff_def_spe':
            log.push(`📉 ${nomComp} réduit la déf spé de ${cible.nom} de ${valeur}`);
            return { ...cible, buffs: [...cible.buffs, { stat: 'def_spe', valeur: -valeur, tours_restants: duree }] };
        case 'debuff_attq':
            log.push(`📉 ${nomComp} réduit l'attaque de ${cible.nom} de ${valeur}`);
            return { ...cible, buffs: [...cible.buffs, { stat: 'attq', valeur: -valeur, tours_restants: duree }] };
        case 'debuff_attq_spe':
            log.push(`📉 ${nomComp} réduit l'attq spé de ${cible.nom} de ${valeur}`);
            return { ...cible, buffs: [...cible.buffs, { stat: 'attq_spe', valeur: -valeur, tours_restants: duree }] };
        case 'dissipe_buff':
            if (cible.buffs.length > 0) {
                log.push(`✨ ${nomComp} dissipe les buffs de ${cible.nom} !`);
                return { ...cible, buffs: [] };
            }
            return cible;
        case 'vol_mana':
            // handled inline in tourJoueur
            return cible;
        default:
            return cible;
    }
}

// ── Tick des statuts ─────────────────────────────────────────────────────────

function tickStatuts(unit: CombatUnit, log: string[]): { unit: CombatUnit; stun: boolean } {
    let stun = false;
    let pv = unit.pv_actuels;
    const nouveaux: StatusEffect[] = [];

    for (const s of unit.statuts) {
        switch (s.type) {
            case 'poison':
                pv = Math.max(0, pv - s.valeur);
                log.push(`☠ ${unit.nom} subit ${s.valeur} dégâts de poison`);
                break;
            case 'brulure':
                pv = Math.max(0, pv - s.valeur);
                log.push(`🔥 ${unit.nom} brûle (${s.valeur} PV)`);
                break;
            case 'stun':
                stun = true;
                log.push(`💫 ${unit.nom} est étourdi et passe son tour`);
                break;
            case 'regen_pv': {
                const gain = Math.floor(unit.pv_max * s.valeur / 100);
                pv = Math.min(unit.pv_max, pv + gain);
                log.push(`💚 ${unit.nom} régénère ${gain} PV`);
                break;
            }
            case 'marque':
                if (s.tours_restants <= 1) {
                    pv = Math.max(0, pv - s.valeur);
                    log.push(`💣 BOOM ! La marque explose sur ${unit.nom} pour ${s.valeur} dégâts !`);
                    continue; // pas de push dans nouveaux
                }
                break;
            // riposte, anti_heal, reduction_degats, froid, prochain_attq_mult : passifs, pas de tick
        }

        // Brûlure incurable : ne jamais expirer
        if (s.type === 'brulure' && s.incurable) {
            nouveaux.push(s);
        } else if (s.type === 'froid') {
            // froid géré par cumuls, pas par durée standard
            nouveaux.push(s);
        } else if (s.tours_restants - 1 > 0) {
            nouveaux.push({ ...s, tours_restants: s.tours_restants - 1 });
        }
    }

    const nouveaux_buffs = unit.buffs
        .map(b => ({ ...b, tours_restants: b.tours_restants - 1 }))
        .filter(b => b.tours_restants > 0);

    return { unit: { ...unit, pv_actuels: pv, statuts: nouveaux, buffs: nouveaux_buffs }, stun };
}

// ── Tour du joueur ────────────────────────────────────────────────────────────

function tourJoueur(state: CombatState, action: ActionCombat): CombatState {
    const log = [...state.log];
    let { joueur, monstre } = state;

    // Vérification surchauffe overflow (≥5)
    if (joueur.surchauffe >= 5) {
        const degSelf = 25;
        joueur = {
            ...joueur,
            surchauffe: 0,
            pv_actuels: Math.max(0, joueur.pv_actuels - degSelf),
            statuts: [...joueur.statuts, { type: 'stun', valeur: 0, tours_restants: 1 }],
        };
        log.push(`⚙️ Surchauffe critique ! ${joueur.nom} explose ! (${degSelf} dégâts, étourdi)`);
        return { ...state, joueur, monstre, log };
    }

    if (action.type === 'attaque_base') {
        const chance = chanceToucher(joueur, monstre);
        if (Math.random() * 100 >= chance) {
            log.push(`💨 ${joueur.nom} attaque mais ${monstre.nom} esquive ! (${chance}%)`);
        } else {
            const { degats, typeMulti } = calculerDegats(joueur, monstre, 'physique', joueur.element);
            monstre = { ...monstre, pv_actuels: Math.max(0, monstre.pv_actuels - degats) };
            log.push(`⚔ ${joueur.nom} attaque pour ${degats} dégâts${typeMultiLabel(typeMulti)}`);
        }

    } else if (action.type === 'competence' && action.competence) {
        const c = action.competence;

        // Coût mana (cout_mana = -1 → coûte tout le mana)
        const coutMana = c.cout_mana === -1 ? joueur.mana : (c.cout_mana ?? 0);
        if (joueur.mana < coutMana) {
            log.push(`💧 Mana insuffisant pour ${c.nom} ! (${joueur.mana}/${coutMana})`);
            return { ...state, joueur, monstre, log };
        }
        joueur = { ...joueur, mana: joueur.mana - coutMana };

        // ── Attaque ──
        if (c.type === 'attaque') {

            if (c.effet_type === 'multi_frappe') {
                // Frappe N fois
                const nbCoups = c.valeur;
                let totalDeg = 0; let nbTouches = 0;
                for (let i = 0; i < nbCoups; i++) {
                    const chance = chanceToucher(joueur, monstre);
                    if (Math.random() * 100 >= chance) continue;
                    nbTouches++;
                    const { degats } = calculerDegatsCompetence(joueur, monstre, c);
                    monstre = { ...monstre, pv_actuels: Math.max(0, monstre.pv_actuels - degats) };
                    totalDeg += degats;
                }
                if (nbTouches === 0) log.push(`💨 ${c.nom} rate toutes ses frappes !`);
                else log.push(`⚡ ${c.nom} : ${nbTouches}/${nbCoups} coups, ${totalDeg} dégâts au total`);

            } else {
                // Attaque simple
                const chance = chanceToucher(joueur, monstre);
                if (Math.random() * 100 >= chance) {
                    log.push(`💨 ${c.nom} rate ! ${monstre.nom} esquive. (${chance}%)`);
                } else {
                    let defMult = 1;
                    let statOffOverride: number | undefined;

                    if (c.effet_type === 'ignore_def')      defMult = 1 - c.valeur / 100;
                    if (c.effet_type === 'ignore_def_spe')  defMult = 1 - c.valeur / 100;
                    if (c.effet_type === 'def_based')       statOffOverride = statEffective(joueur, 'def');
                    if (c.effet_type === 'def_spe_based')   statOffOverride = statEffective(joueur, 'def_spe');
                    if (c.effet_type === 'vitesse_based')   statOffOverride = statEffective(joueur, 'vitesse');

                    let { degats, typeMulti } = calculerDegatsCompetence(joueur, monstre, c, { defMult, statOffOverride });

                    // Surchauffe purge : bonus par charge purgée
                    if (c.effet_type === 'surchauffe_purge') {
                        const bonusParCharge = c.valeur;
                        const bonusDeg = Math.floor(joueur.surchauffe * bonusParCharge);
                        if (bonusDeg > 0) log.push(`⚙️ Purge ${joueur.surchauffe} charge(s) → +${bonusDeg} dégâts !`);
                        degats += bonusDeg;
                        joueur = { ...joueur, surchauffe: 0 };
                    }

                    // Consommer physique_sismique
                    if (c.effet_type === 'physique_sismique' && joueur.charges_sismiques > 0) {
                        const bonusSis = Math.floor(degats * joueur.charges_sismiques * c.valeur / 100);
                        degats += bonusSis;
                        log.push(`⛏️ ${joueur.charges_sismiques} charge(s) sismique(s) → +${bonusSis} dégâts !`);
                        joueur = { ...joueur, charges_sismiques: 0 };
                    }

                    // Multiplicateur "prochain coup"
                    const multStat = joueur.statuts.find(s => s.type === 'prochain_attq_mult');
                    if (multStat) {
                        degats = Math.floor(degats * multStat.valeur / 100);
                        joueur = { ...joueur, statuts: joueur.statuts.filter(s => s.type !== 'prochain_attq_mult') };
                    }

                    // Appliquer dégâts
                    monstre = { ...monstre, pv_actuels: Math.max(0, monstre.pv_actuels - degats) };
                    log.push(`✨ ${c.nom} inflige ${degats} dégâts${typeMultiLabel(typeMulti)}`);

                    // vol_vie : soigne le joueur
                    if (c.effet_type === 'vol_vie') {
                        const bloque = joueur.statuts.some(s => s.type === 'anti_heal');
                        if (!bloque) {
                            const soin = Math.floor(degats * c.valeur / 100);
                            joueur = { ...joueur, pv_actuels: Math.min(joueur.pv_max, joueur.pv_actuels + soin) };
                            if (soin > 0) log.push(`💚 ${c.nom} soigne ${soin} PV`);
                        }
                    }

                    // vol_mana : vole du mana à l'ennemi
                    if (c.effet_type === 'vol_mana') {
                        const vole = Math.min(c.valeur, monstre.mana);
                        monstre = { ...monstre, mana: Math.max(0, monstre.mana - vole) };
                        joueur  = { ...joueur,  mana: Math.min(joueur.mana_max, joueur.mana + vole) };
                        if (vole > 0) log.push(`🔮 ${c.nom} vole ${vole} mana !`);
                    }

                    // Surchauffe add
                    if (c.effet_type === 'surchauffe_add' || c.effet_type === 'surchauffe_add_mag') {
                        joueur = { ...joueur, surchauffe: joueur.surchauffe + c.valeur };
                        log.push(`⚙️ Surchauffe : ${joueur.surchauffe}/5`);
                    }

                    // Effet secondaire sur l'ennemi
                    if (c.effet_secondaire) {
                        // vol_mana en secondaire (ex : Entaille Sinueuse)
                        if (c.effet_secondaire === 'vol_mana') {
                            const vole2 = Math.min(c.valeur, monstre.mana);
                            monstre = { ...monstre, mana: Math.max(0, monstre.mana - vole2) };
                            joueur  = { ...joueur,  mana: Math.min(joueur.mana_max, joueur.mana + vole2) };
                            if (vole2 > 0) log.push(`🔮 ${c.nom} vole ${vole2} mana !`);
                        } else {
                            monstre = appliquerEffetSecondaire(c.effet_secondaire, c.valeur, c.duree_tours, monstre, log, c.nom);
                        }
                    }
                }
            }

        // ── Buff (self) ──
        } else if (c.type === 'buff') {
            const stat = c.effet_type.replace('buff_', '') as BuffStat;
            joueur = { ...joueur, buffs: [...joueur.buffs, { stat, valeur: c.valeur, tours_restants: c.duree_tours }] };
            log.push(`💪 ${c.nom} : +${c.valeur} ${stat} pendant ${c.duree_tours} tours`);

        // ── Statut ──
        } else if (c.type === 'statut') {
            switch (c.effet_type) {
                // === Self ===
                case 'soin': {
                    const bloque = joueur.statuts.some(s => s.type === 'anti_heal');
                    if (bloque) { log.push(`🚫 Les soins sont bloqués !`); break; }
                    const soin = Math.floor(joueur.pv_max * c.valeur / 100);
                    joueur = { ...joueur, pv_actuels: Math.min(joueur.pv_max, joueur.pv_actuels + soin) };
                    log.push(`💚 ${c.nom} soigne ${soin} PV`);
                    break;
                }
                case 'regen_pv':
                    joueur = { ...joueur, statuts: [...joueur.statuts, { type: 'regen_pv', valeur: c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`💚 ${c.nom} : régénération de ${c.valeur}% PV/tour (${c.duree_tours}t)`);
                    break;
                case 'riposte':
                    joueur = { ...joueur, statuts: [...joueur.statuts, { type: 'riposte', valeur: c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`🛡 ${c.nom} : riposte ${c.valeur}% (${c.duree_tours}t)`);
                    break;
                case 'reduction_degats':
                    joueur = { ...joueur, statuts: [...joueur.statuts, { type: 'reduction_degats', valeur: c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`🛡 ${c.nom} : dégâts réduits de ${c.valeur}% (${c.duree_tours}t)`);
                    break;
                case 'prochain_attq_mult':
                    joueur = { ...joueur, statuts: [...joueur.statuts, { type: 'prochain_attq_mult', valeur: c.valeur, tours_restants: 1 }] };
                    log.push(`⚡ ${c.nom} : prochain coup x${(c.valeur / 100).toFixed(1)}`);
                    break;
                case 'charge_sismique':
                    joueur = { ...joueur, charges_sismiques: joueur.charges_sismiques + c.valeur };
                    log.push(`⛏️ ${c.nom} : ${joueur.charges_sismiques} charge(s) sismique(s)`);
                    break;
                case 'soin_restore_mana':
                    joueur = { ...joueur, mana: Math.min(joueur.mana_max, joueur.mana + c.valeur) };
                    log.push(`💧 ${c.nom} : +${c.valeur} mana`);
                    break;
                case 'surchauffe_reset_mana': {
                    const charges = joueur.surchauffe;
                    const manaGain = charges * c.valeur;
                    joueur = { ...joueur, surchauffe: 0, mana: Math.min(joueur.mana_max, joueur.mana + manaGain) };
                    log.push(`⚙️ Soupape : ${charges} charge(s) purgée(s) → +${manaGain} mana`);
                    break;
                }
                // === Ennemi ===
                case 'stun':
                    monstre = { ...monstre, statuts: [...monstre.statuts, { type: 'stun', valeur: 0, tours_restants: c.duree_tours }] };
                    log.push(`💫 ${c.nom} — ${monstre.nom} étourdi (${c.duree_tours}t)`);
                    break;
                case 'poison':
                    if (!monstre.statuts.some(s => s.type === 'poison')) {
                        monstre = { ...monstre, statuts: [...monstre.statuts, { type: 'poison', valeur: c.valeur, tours_restants: c.duree_tours }] };
                        log.push(`☠ ${c.nom} — ${monstre.nom} empoisonné`);
                    } else {
                        log.push(`☠ ${monstre.nom} est déjà empoisonné`);
                    }
                    break;
                case 'brulure':
                    monstre = { ...monstre, statuts: [...monstre.statuts, { type: 'brulure', valeur: c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`🔥 ${c.nom} — ${monstre.nom} brûle ! (${c.valeur} PV/t, ${c.duree_tours}t)`);
                    break;
                case 'marque':
                    monstre = { ...monstre, statuts: [...monstre.statuts, { type: 'marque', valeur: c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`💣 ${c.nom} — Marque posée sur ${monstre.nom} (${c.valeur} dégâts dans ${c.duree_tours}t)`);
                    break;
                case 'anti_heal':
                    monstre = { ...monstre, statuts: [...monstre.statuts, { type: 'anti_heal', valeur: 0, tours_restants: c.duree_tours }] };
                    log.push(`🚫 ${c.nom} — Soins bloqués pour ${monstre.nom} (${c.duree_tours}t)`);
                    break;
                case 'dissipe_buff':
                    if (monstre.buffs.length > 0) {
                        monstre = { ...monstre, buffs: [] };
                        log.push(`✨ ${c.nom} — Tous les buffs de ${monstre.nom} dissipés !`);
                    } else {
                        log.push(`✨ ${c.nom} — ${monstre.nom} n'a pas de buffs actifs`);
                    }
                    break;
                case 'debuff_attq':
                    monstre = { ...monstre, buffs: [...monstre.buffs, { stat: 'attq', valeur: -c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`📉 ${c.nom} : ${monstre.nom} −${c.valeur} ATQ (${c.duree_tours}t)`);
                    break;
                case 'debuff_attq_spe':
                    monstre = { ...monstre, buffs: [...monstre.buffs, { stat: 'attq_spe', valeur: -c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`📉 ${c.nom} : ${monstre.nom} −${c.valeur} ATQ SPÉ (${c.duree_tours}t)`);
                    break;
                case 'debuff_def':
                    monstre = { ...monstre, buffs: [...monstre.buffs, { stat: 'def', valeur: -c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`📉 ${c.nom} : ${monstre.nom} −${c.valeur} DEF (${c.duree_tours}t)`);
                    break;
                case 'debuff_def_spe':
                    monstre = { ...monstre, buffs: [...monstre.buffs, { stat: 'def_spe', valeur: -c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`📉 ${c.nom} : ${monstre.nom} −${c.valeur} DEF SPÉ (${c.duree_tours}t)`);
                    break;
                case 'debuff_vitesse':
                    monstre = { ...monstre, buffs: [...monstre.buffs, { stat: 'vitesse', valeur: -c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`🐢 ${c.nom} : ${monstre.nom} −${c.valeur} vitesse (${c.duree_tours}t)`);
                    break;
                case 'debuff_precision':
                    monstre = { ...monstre, buffs: [...monstre.buffs, { stat: 'precision', valeur: -c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`👁 ${c.nom} : ${monstre.nom} −${c.valeur} précision (${c.duree_tours}t)`);
                    break;
                case 'debuff_esquive':
                    monstre = { ...monstre, buffs: [...monstre.buffs, { stat: 'esquive', valeur: -c.valeur, tours_restants: c.duree_tours }] };
                    log.push(`👁 ${c.nom} : ${monstre.nom} −${c.valeur} esquive (${c.duree_tours}t)`);
                    break;
            }
        }

    } else if (action.type === 'consommable' && action.itemConsommable?.effet) {
        const eff = action.itemConsommable.effet;
        if (eff.type === 'boost_attq') {
            joueur = { ...joueur, buffs: [...joueur.buffs, { stat: 'attq', valeur: eff.valeur!, tours_restants: eff.duree! }] };
            log.push(`⚗️ ${joueur.nom} utilise ${action.itemConsommable.nom} ! +${eff.valeur} ATQ pour ${eff.duree} tours`);
        } else if (eff.type === 'poison') {
            if (!monstre.statuts.some(s => s.type === 'poison')) {
                monstre = { ...monstre, statuts: [...monstre.statuts, { type: 'poison', valeur: eff.valeur!, tours_restants: eff.duree! }] };
                log.push(`☠ ${joueur.nom} utilise ${action.itemConsommable.nom} — ${monstre.nom} est empoisonné !`);
            } else {
                log.push(`☠ ${monstre.nom} est déjà empoisonné`);
            }
        } else if (eff.type === 'stun') {
            monstre = { ...monstre, statuts: [...monstre.statuts, { type: 'stun', valeur: 0, tours_restants: 1 }] };
            log.push(`💫 ${joueur.nom} utilise ${action.itemConsommable.nom} — ${monstre.nom} est étourdi !`);
        } else if (eff.type === 'soin_pct') {
            const soin = Math.floor(joueur.pv_max * (eff.valeur! / 100));
            joueur = { ...joueur, pv_actuels: Math.min(joueur.pv_max, joueur.pv_actuels + soin) };
            log.push(`🩹 ${joueur.nom} utilise ${action.itemConsommable.nom} ! +${soin} PV`);
        } else if (eff.type === 'mana_pct') {
            const gain = Math.floor(joueur.mana_max * (eff.valeur! / 100));
            joueur = { ...joueur, mana: Math.min(joueur.mana_max, joueur.mana + gain) };
            log.push(`💧 ${joueur.nom} utilise ${action.itemConsommable.nom} ! +${gain} mana`);
        }
    }

    return { ...state, joueur, monstre, log };
}

// ── Tour du monstre (IA) ──────────────────────────────────────────────────────

function tourMonstre(state: CombatState): CombatState {
    const log = [...state.log];
    let { joueur, monstre } = state;

    const chance = chanceToucher(monstre, joueur);
    if (Math.random() * 100 >= chance) {
        log.push(`💨 ${monstre.nom} attaque mais ${joueur.nom} esquive !`);
    } else {
        let { degats, typeMulti } = calculerDegats(monstre, joueur, 'physique', monstre.element);

        // Réduction des dégâts subis
        const reduction = joueur.statuts.find(s => s.type === 'reduction_degats');
        if (reduction) {
            degats = Math.max(1, Math.floor(degats * (1 - reduction.valeur / 100)));
        }

        joueur = { ...joueur, pv_actuels: Math.max(0, joueur.pv_actuels - degats) };
        log.push(`👹 ${monstre.nom} attaque pour ${degats} dégâts${typeMultiLabel(typeMulti)}`);

        // Riposte
        const riposte = joueur.statuts.find(s => s.type === 'riposte');
        if (riposte) {
            const riposteDeg = Math.max(1, Math.floor(degats * riposte.valeur / 100));
            monstre = { ...monstre, pv_actuels: Math.max(0, monstre.pv_actuels - riposteDeg) };
            log.push(`🛡 Riposte ! ${joueur.nom} renvoie ${riposteDeg} dégâts !`);
        }
    }

    return { ...state, joueur, monstre, log };
}

// ── Système ATB — avancer les jauges jusqu'au prochain tour du joueur ─────────

function avancerJusquJoueur(state: CombatState): CombatState {
    let s = state;
    const vJ = Math.max(1, statEffective(s.joueur,  'vitesse'));
    const vM = Math.max(1, statEffective(s.monstre, 'vitesse'));

    // Ticks nécessaires pour que le joueur passe de sa jauge actuelle à 100
    const ticks = Math.ceil((100 - s.gauge_joueur) / vJ);
    // Overshoot : excédent de charge du joueur au-delà de 100 (head-start pour le tour suivant)
    const newJoueurGauge   = s.gauge_joueur + ticks * vJ - 100;
    const monstreGainTotal = s.gauge_monstre + ticks * vM;
    const monstreActions   = Math.min(5, Math.floor(monstreGainTotal / 100));
    const newMonstreGauge  = monstreGainTotal % 100;

    if (monstreActions > 0 && s.tour === 1) {
        s = { ...s, log: [...s.log,
            `⚡ ${s.monstre.nom} (Vit ${vM}) est plus rapide que ${s.joueur.nom} (Vit ${vJ}) !`] };
    } else if (monstreActions > 1) {
        s = { ...s, log: [...s.log,
            `⚡ ${s.monstre.nom} agit ${monstreActions}× de suite !`] };
    }

    for (let i = 0; i < monstreActions && !s.termine; i++) {
        const tickM = tickStatuts(s.monstre, s.log);
        s = { ...s, monstre: tickM.unit, monstre_stunne: tickM.stun };
        s = verifierFin(s);
        if (s.termine) break;

        if (!s.monstre_stunne) {
            s = tourMonstre(s);
        } else {
            s = { ...s, log: [...s.log, `💫 ${s.monstre.nom} est étourdi !`] };
        }
        s = verifierFin(s);
    }

    return { ...s, gauge_joueur: newJoueurGauge, gauge_monstre: newMonstreGauge };
}

// ── Exécuter un tour complet ──────────────────────────────────────────────────

export function executerTour(state: CombatState, action: ActionCombat): CombatState {
    if (state.termine) return state;

    let s = { ...state, log: [...state.log, `── Tour ${state.tour} ──`] };

    // Ticks statuts du joueur avant son action
    const tickJ = tickStatuts(s.joueur, s.log);
    s = { ...s, joueur: tickJ.unit, joueur_stunne: tickJ.stun };

    // Joueur agit (ou passe si étourdi)
    if (!s.joueur_stunne) {
        s = tourJoueur(s, action);
        s = verifierFin(s);
        if (s.termine) return { ...s, log: [...s.log, `🏆 ${s.joueur.nom} a vaincu ${s.monstre.nom} !`] };
    } else {
        s = { ...s, log: [...s.log, `💫 ${s.joueur.nom} est étourdi, passe son tour !`] };
    }

    // Avancer les jauges jusqu'au prochain tour joueur (l'overshoot du joueur sert de head-start)
    s = { ...s, tour: s.tour + 1 };
    s = avancerJusquJoueur(s);

    return s;
}

function verifierFin(state: CombatState): CombatState {
    if (state.monstre.pv_actuels <= 0) return { ...state, termine: true, vainqueur: 'joueur' };
    if (state.joueur.pv_actuels <= 0)  return { ...state, termine: true, vainqueur: 'monstre' };
    return state;
}

// ── Loot box de fin d'étage ───────────────────────────────────────────────────

export function genererLootBox(
    stuffIds: number[],
    donjonCompIds: number[],
    ownedCompIds: number[],
    count = 3,
): { type: 'stuff' | 'competence'; id: number }[] {
    const availableComps = donjonCompIds.filter(id => !ownedCompIds.includes(id));
    const pool: { type: 'stuff' | 'competence'; id: number }[] = [
        ...stuffIds.map(id => ({ type: 'stuff' as const, id })),
        ...availableComps.map(id => ({ type: 'competence' as const, id })),
    ];
    if (pool.length === 0) return [{ type: 'stuff', id: stuffIds[0] ?? 1 }];
    const result: { type: 'stuff' | 'competence'; id: number }[] = [];
    const remaining = [...pool];
    while (result.length < count && remaining.length > 0) {
        const i = Math.floor(Math.random() * remaining.length);
        result.push(remaining.splice(i, 1)[0]);
    }
    return result;
}
