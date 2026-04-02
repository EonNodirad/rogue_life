import type { Competence, Element } from './types';

// ── Matrice des types (attaque → défense) ─────────────────────────────────────
// Ligne = élément de l'attaque, Colonne = élément du défenseur
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

// ── Types internes ────────────────────────────────────────────────────────────

export interface StatusEffect {
    type: 'poison' | 'stun';
    valeur: number;
    tours_restants: number;
}

export interface BuffEffect {
    stat: 'attq' | 'def' | 'vitesse';
    valeur: number;
    tours_restants: number;
}

export interface CombatUnit {
    nom: string;
    pv_max: number;
    pv_actuels: number;
    attq: number;
    attq_spe: number;
    def: number;
    def_spe: number;
    vitesse: number;
    niveau: number;
    element: Element;
    affinites: Partial<Record<Element, number>>;  // bonus offensif % par élément
    statuts: StatusEffect[];
    buffs: BuffEffect[];
}

export interface DonjonItem {
    nom: string;
    valeur_or: number;
    type: 'inutile' | 'consommable' | 'rare';
    description?: string;
    usage?: 'combat' | 'hors_combat';
    prix_achat?: number;
    effet?: {
        type: 'boost_attq' | 'poison' | 'stun' | 'soin_pct';
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
    'Slime':     '/monstres/slime.png',
    'Gobelin':   '/monstres/gobelin.png',
    'Squelette': '/monstres/squelette.png',
    'Loup':      '/monstres/loup.png',
    'Araignée':  '/monstres/araignee.png',
    'Troll':     '/monstres/troll.png',
    'Bandit':    '/monstres/bandit.png',
    'Fantôme':   '/monstres/fantome.png',
    'Drake':     '/monstres/dragon_feu.png',
    'Golem':     '/monstres/golem_lumier.png',
};


const ITEMS_INUTILES: DonjonItem[] = [
    { nom: 'Cristal brisé',   valeur_or: 8, type: 'inutile' },
    { nom: 'Dent de monstre', valeur_or: 5, type: 'inutile' },
    { nom: 'Os étrange',      valeur_or: 4, type: 'inutile' },
    { nom: 'Écaille terne',   valeur_or: 6, type: 'inutile' },
    { nom: 'Bave séchée',     valeur_or: 3, type: 'inutile' },
    { nom: 'Griffe cassée',   valeur_or: 5, type: 'inutile' },
];

export const ITEMS_CONSOMMABLES: DonjonItem[] = [
    { nom: 'Fiole de rage',            valeur_or: 8,  type: 'consommable', description: '+8 ATQ — 2 tours',      usage: 'combat',      prix_achat: 15, effet: { type: 'boost_attq', valeur: 8,  duree: 2 } },
    { nom: 'Parchemin de poison',      valeur_or: 10, type: 'consommable', description: 'Empoisonne ennemi 3t',  usage: 'combat',      prix_achat: 18, effet: { type: 'poison',     valeur: 8,  duree: 3 } },
    { nom: "Poudre d'étourdissement",  valeur_or: 12, type: 'consommable', description: 'Étourdit ennemi 1t',   usage: 'combat',      prix_achat: 20, effet: { type: 'stun',       duree: 1 } },
    { nom: 'Bandage de fortune',       valeur_or: 6,  type: 'consommable', description: '+10% PV max',           usage: 'hors_combat', prix_achat: 12, effet: { type: 'soin_pct',   valeur: 10 } },
];

const ITEMS_RARES: DonjonItem[] = [
    { nom: 'Herbe mystérieuse', valeur_or: 25, type: 'rare' },
    { nom: 'Pierre magique',    valeur_or: 28, type: 'rare' },
    { nom: 'Plume rare',        valeur_or: 22, type: 'rare' },
    { nom: 'Gemme de donjon',   valeur_or: 35, type: 'rare' },
];

export function genererMonstre(etage: number, room: number): CombatUnit {
    // Budget conçu pour des combats de 5-8 tours :
    // étage 1 salle 1 → 60 | étage 1 salle 10 → 123 | étage 5 salle 10 → 323
    const budget = 60 + (etage - 1) * 50 + (room - 1) * 7;
    const pv_base = Math.floor(budget * 0.55) + Math.floor(Math.random() * 10);

    let reste = budget - Math.floor(budget * 0.1);
    const attq     = 2 + pick(reste, 0.28); reste -= (attq - 2);
    const attq_spe = 2 + pick(reste, 0.18); reste -= (attq_spe - 2);
    const def      = 2 + pick(reste, 0.24); reste -= (def - 2);
    const def_spe  = 2 + pick(reste, 0.14); reste -= (def_spe - 2);
    const vitesse  = 2 + Math.max(0, Math.min(reste, Math.floor(Math.random() * 5)));

    const MONSTRE_ELEMENTS: Record<string, Element> = {
        'Slime':     'eau',
        'Gobelin':   'terre',
        'Squelette': 'mort',
        'Loup':      'air',
        'Araignée':  'tenebres',
        'Troll':     'vie',
        'Bandit':    'technologie',
        'Fantôme':   'surnaturel',
        'Drake':     'feu',
        'Golem':     'lumiere',
    };
    const nom = NOMS_MONSTRES[Math.floor(Math.random() * NOMS_MONSTRES.length)];
    const element = MONSTRE_ELEMENTS[nom];

    return {
        nom: nom,
        pv_max: pv_base,
        pv_actuels: pv_base,
        attq, attq_spe, def, def_spe, vitesse,
        niveau: etage,
        element,
        affinites: { [element]: 50 },  // +50% offensif sur son propre élément
        statuts: [],
        buffs: [],
    };
}

function pick(budget: number, ratio: number): number {
    const max = Math.floor(budget * ratio);
    return max <= 0 ? 0 : Math.floor(Math.random() * (max + 1));
}

export function lootMonstre(etage: number, room: number): { items: DonjonItem[]; or_base: number } {
    const r = Math.random();
    let item: DonjonItem;
    if (r < 0.60) {
        item = ITEMS_INUTILES[Math.floor(Math.random() * ITEMS_INUTILES.length)];
    } else if (r < 0.90) {
        item = ITEMS_CONSOMMABLES[Math.floor(Math.random() * ITEMS_CONSOMMABLES.length)];
    } else {
        item = ITEMS_RARES[Math.floor(Math.random() * ITEMS_RARES.length)];
    }
    const or_base = Math.floor(2 + etage * 1.5 + room * 0.5 + Math.random() * 5);
    return { items: [item], or_base };
}

// ── Initialisation du combat ──────────────────────────────────────────────────

export function initCombat(
    nom_joueur: string,
    pv_actuels: number,
    pv_max: number,
    attq: number,
    attq_spe: number,
    def: number,
    def_spe: number,
    vitesse: number,
    niveau: number,
    element: Element,
    affinites: Partial<Record<Element, number>>,
    monstre: CombatUnit,
): CombatState {
    const joueur: CombatUnit = {
        nom: nom_joueur,
        pv_max, pv_actuels,
        attq, attq_spe, def, def_spe, vitesse,
        niveau, element, affinites,
        statuts: [], buffs: [],
    };

    return {
        joueur,
        monstre: { ...monstre, statuts: [], buffs: [] },
        tour: 1,
        log: [],
        termine: false,
        vainqueur: null,
        or_donjon_gagne: 0,
        items_droppes: [],
        joueur_stunne: false,
        monstre_stunne: false,
    };
}

// ── Helpers stats avec buffs ──────────────────────────────────────────────────

function statEffective(unit: CombatUnit, stat: 'attq' | 'def' | 'vitesse'): number {
    const base = unit[stat];
    const bonus = unit.buffs.filter(b => b.stat === stat).reduce((s, b) => s + b.valeur, 0);
    return Math.max(0, base + bonus);
}

// ── Formule de dégâts ─────────────────────────────────────────────────────────

function calculerDegats(
    attaquant: CombatUnit,
    defenseur: CombatUnit,
    typeAttaque: 'physique' | 'magique',
    elementAttaque: Element,
): { degats: number; typeMulti: number } {
    const statOff = typeAttaque === 'physique' ? statEffective(attaquant, 'attq') : attaquant.attq_spe;
    const statDef = typeAttaque === 'physique' ? defenseur.def : defenseur.def_spe;

    const typeMulti = getTypeMulti(elementAttaque, defenseur.element);
    const bonusOff  = (attaquant.affinites[elementAttaque] ?? 0) / 100;
    const rng       = 0.85 + Math.random() * 0.15;

    const degats = Math.max(1, Math.floor(
        (attaquant.niveau / 10 + 1) * 40 * (statOff / Math.max(1, statDef))
        * typeMulti * (1 + bonusOff) * rng / 5
    ));
    return { degats, typeMulti };
}

function calculerDegatsCompetence(
    attaquant: CombatUnit,
    defenseur: CombatUnit,
    competence: Competence,
): { degats: number; typeMulti: number } {
    const typeAttaque = competence.effet_type === 'magique' ? 'magique' : 'physique';
    const statOff = typeAttaque === 'physique' ? statEffective(attaquant, 'attq') : attaquant.attq_spe;
    const statDef = typeAttaque === 'physique' ? defenseur.def : defenseur.def_spe;

    const typeMulti = getTypeMulti(competence.element, defenseur.element);
    const bonusOff  = (attaquant.affinites[competence.element] ?? 0) / 100;
    const rng       = 0.85 + Math.random() * 0.15;

    const degats = Math.max(1, Math.floor(
        (attaquant.niveau / 10 + 1) * competence.valeur * (statOff / Math.max(1, statDef))
        * typeMulti * (1 + bonusOff) * rng / 5
    ));
    return { degats, typeMulti };
}

function typeMultiLabel(multi: number): string {
    if (multi >= 1.5) return ' ⚡ Super efficace !';
    if (multi <= 0.5) return ' 🛡 Pas très efficace...';
    return '';
}

// ── Application des statuts ───────────────────────────────────────────────────

function tickStatuts(unit: CombatUnit, log: string[]): { unit: CombatUnit; stun: boolean } {
    let stun = false;
    let pv = unit.pv_actuels;
    const nouveaux_statuts: StatusEffect[] = [];

    for (const s of unit.statuts) {
        if (s.type === 'poison') {
            pv = Math.max(0, pv - s.valeur);
            log.push(`☠ ${unit.nom} subit ${s.valeur} dégâts de poison`);
        } else if (s.type === 'stun') {
            stun = true;
            log.push(`💫 ${unit.nom} est étourdi et passe son tour`);
        }
        if (s.tours_restants - 1 > 0) {
            nouveaux_statuts.push({ ...s, tours_restants: s.tours_restants - 1 });
        }
    }

    const nouveaux_buffs = unit.buffs
        .map(b => ({ ...b, tours_restants: b.tours_restants - 1 }))
        .filter(b => b.tours_restants > 0);

    return {
        unit: { ...unit, pv_actuels: pv, statuts: nouveaux_statuts, buffs: nouveaux_buffs },
        stun,
    };
}

// ── Tour du joueur ────────────────────────────────────────────────────────────

function tourJoueur(state: CombatState, action: ActionCombat): CombatState {
    const log = [...state.log];
    let { joueur, monstre } = state;

    if (action.type === 'attaque_base') {
        const { degats, typeMulti } = calculerDegats(joueur, monstre, 'physique', joueur.element);
        monstre = { ...monstre, pv_actuels: Math.max(0, monstre.pv_actuels - degats) };
        log.push(`⚔ ${joueur.nom} attaque pour ${degats} dégâts${typeMultiLabel(typeMulti)}`);

    } else if (action.type === 'competence' && action.competence) {
        const c = action.competence;

        if (c.type === 'attaque') {
            const { degats, typeMulti } = calculerDegatsCompetence(joueur, monstre, c);
            monstre = { ...monstre, pv_actuels: Math.max(0, monstre.pv_actuels - degats) };
            log.push(`✨ ${c.nom} inflige ${degats} dégâts${typeMultiLabel(typeMulti)}`);

        } else if (c.type === 'buff') {
            const stat = c.effet_type.replace('buff_', '') as 'attq' | 'def' | 'vitesse';
            joueur = {
                ...joueur,
                buffs: [...joueur.buffs, { stat, valeur: c.valeur, tours_restants: c.duree_tours }],
            };
            log.push(`💪 ${c.nom} : +${c.valeur} ${stat} pendant ${c.duree_tours} tours`);

        } else if (c.type === 'statut') {
            if (c.effet_type === 'stun') {
                monstre = {
                    ...monstre,
                    statuts: [...monstre.statuts, { type: 'stun', valeur: 0, tours_restants: 1 }],
                };
                log.push(`💫 ${c.nom} — ${monstre.nom} sera étourdi`);
            } else if (c.effet_type === 'poison') {
                const dejaPoisonne = monstre.statuts.some(s => s.type === 'poison');
                if (!dejaPoisonne) {
                    monstre = {
                        ...monstre,
                        statuts: [...monstre.statuts, { type: 'poison', valeur: c.valeur, tours_restants: c.duree_tours }],
                    };
                    log.push(`☠ ${c.nom} — ${monstre.nom} est empoisonné`);
                } else {
                    log.push(`☠ ${monstre.nom} est déjà empoisonné`);
                }
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
        }
    }

    return { ...state, joueur, monstre, log };
}

// ── Tour du monstre (IA) ──────────────────────────────────────────────────────

function tourMonstre(state: CombatState): CombatState {
    const log = [...state.log];
    let { joueur, monstre } = state;

    const { degats, typeMulti } = calculerDegats(monstre, joueur, 'physique', monstre.element);
    joueur = { ...joueur, pv_actuels: Math.max(0, joueur.pv_actuels - degats) };
    log.push(`👹 ${monstre.nom} attaque pour ${degats} dégâts${typeMultiLabel(typeMulti)}`);

    return { ...state, joueur, monstre, log };
}

// ── Exécuter un tour complet ──────────────────────────────────────────────────

export function executerTour(state: CombatState, action: ActionCombat): CombatState {
    if (state.termine) return state;

    let logTour = [`── Tour ${state.tour} ──`];

    // Initiative : plus rapide agit en premier
    const vJoueur  = statEffective(state.joueur,  'vitesse');
    const vMonstre = statEffective(state.monstre, 'vitesse');
    if (state.tour === 1) {
        if (vJoueur > vMonstre)       logTour.push(`⚡ ${state.joueur.nom} est plus rapide !`);
        else if (vMonstre > vJoueur)  logTour.push(`⚡ ${state.monstre.nom} est plus rapide !`);
    }
    const joueurPremier = vJoueur >= vMonstre;

    let s = { ...state, log: [...state.log, ...logTour] };

    const tickJ = tickStatuts(s.joueur, s.log);
    s = { ...s, joueur: tickJ.unit, joueur_stunne: tickJ.stun };

    const tickM = tickStatuts(s.monstre, s.log);
    s = { ...s, monstre: tickM.unit, monstre_stunne: tickM.stun };

    s = verifierFin(s);
    if (s.termine) return s;

    if (joueurPremier) {
        if (!s.joueur_stunne) {
            s = tourJoueur(s, action);
            s = verifierFin(s);
            if (s.termine) return { ...s, log: [...s.log, `🏆 ${s.joueur.nom} a vaincu ${s.monstre.nom} !`] };
        }
        if (!s.monstre_stunne) {
            s = tourMonstre(s);
            s = verifierFin(s);
        }
    } else {
        if (!s.monstre_stunne) {
            s = tourMonstre(s);
            s = verifierFin(s);
            if (s.termine) return s;
        }
        if (!s.joueur_stunne) {
            s = tourJoueur(s, action);
            s = verifierFin(s);
            if (s.termine) return { ...s, log: [...s.log, `🏆 ${s.joueur.nom} a vaincu ${s.monstre.nom} !`] };
        }
    }

    return { ...s, tour: s.tour + 1 };
}

function verifierFin(state: CombatState): CombatState {
    if (state.monstre.pv_actuels <= 0) return { ...state, termine: true, vainqueur: 'joueur' };
    if (state.joueur.pv_actuels <= 0)  return { ...state, termine: true, vainqueur: 'monstre' };
    return state;
}

// ── Loot box de fin d'étage ───────────────────────────────────────────────────

export function genererLootBox(
    stuffIds: number[],
    donjonCompIds: number[],  // compétences source='donjon' uniquement
    ownedCompIds: number[],   // compétences déjà possédées par le joueur
    count = 3,
): { type: 'stuff' | 'competence'; id: number }[] {
    const availableComps = donjonCompIds.filter(id => !ownedCompIds.includes(id));
    const pool: { type: 'stuff' | 'competence'; id: number }[] = [
        ...stuffIds.map(id => ({ type: 'stuff' as const, id })),
        ...availableComps.map(id => ({ type: 'competence' as const, id })),
    ];
    if (pool.length === 0) return [{ type: 'stuff', id: stuffIds[0] ?? 1 }];
    // Piocher `count` éléments distincts
    const result: { type: 'stuff' | 'competence'; id: number }[] = [];
    const remaining = [...pool];
    while (result.length < count && remaining.length > 0) {
        const i = Math.floor(Math.random() * remaining.length);
        result.push(remaining.splice(i, 1)[0]);
    }
    return result;
}
