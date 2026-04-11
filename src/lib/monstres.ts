import { base } from '$app/paths';
import type { Element, DonjonItem } from './types';

// ── Noms & éléments ───────────────────────────────────────────────────────────

export const NOMS_MONSTRES = [
    'Slime', 'Gobelin', 'Squelette', 'Loup', 'Araignée',
    'Troll', 'Bandit', 'Fantôme', 'Drake', 'Golem',
];

export const MONSTRE_ELEMENTS: Record<string, Element> = {
    'Slime':     'eau',         'Gobelin':  'terre',
    'Squelette': 'mort',        'Loup':     'air',
    'Araignée':  'tenebres',    'Troll':    'vie',
    'Bandit':    'technologie', 'Fantôme':  'surnaturel',
    'Drake':     'feu',         'Golem':    'lumiere',
};

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

// ── Move pool ─────────────────────────────────────────────────────────────────

export interface MonstreSkill {
    nom: string;
    element: Element;
    effet_type: 'physique' | 'magique';
    puissance: number;
}

type MonstrePool = { neutre_phys: MonstreSkill; neutre_mag: MonstreSkill; elem_phys: MonstreSkill; elem_mag: MonstreSkill };

export const MONSTRE_SKILLS: Record<string, MonstrePool> = {
    'Slime':     { neutre_phys: { nom: 'Bave collante',            element: 'neutre',      effet_type: 'physique', puissance: 45 },
                   neutre_mag:  { nom: 'Dissolution acide',        element: 'neutre',      effet_type: 'magique',  puissance: 35 },
                   elem_phys:   { nom: 'Vague déferlante',         element: 'eau',         effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Déluge visqueux',          element: 'eau',         effet_type: 'magique',  puissance: 60 } },
    'Gobelin':   { neutre_phys: { nom: 'Coup de massue',           element: 'neutre',      effet_type: 'physique', puissance: 50 },
                   neutre_mag:  { nom: 'Lancer de pierre',         element: 'neutre',      effet_type: 'magique',  puissance: 40 },
                   elem_phys:   { nom: 'Frappe sismique',          element: 'terre',       effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Éruption terrestre',       element: 'terre',       effet_type: 'magique',  puissance: 60 } },
    'Squelette': { neutre_phys: { nom: "Coup d'os",                element: 'neutre',      effet_type: 'physique', puissance: 45 },
                   neutre_mag:  { nom: 'Toucher de néant',         element: 'neutre',      effet_type: 'magique',  puissance: 40 },
                   elem_phys:   { nom: 'Tranchant funèbre',        element: 'mort',        effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Souffle de mort',          element: 'mort',        effet_type: 'magique',  puissance: 60 } },
    'Loup':      { neutre_phys: { nom: 'Morsure sauvage',          element: 'neutre',      effet_type: 'physique', puissance: 50 },
                   neutre_mag:  { nom: 'Rugissement',              element: 'neutre',      effet_type: 'magique',  puissance: 35 },
                   elem_phys:   { nom: 'Griffes du vent',          element: 'air',         effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Tempête hurlante',         element: 'air',         effet_type: 'magique',  puissance: 60 } },
    'Araignée':  { neutre_phys: { nom: 'Morsure venimeuse',        element: 'neutre',      effet_type: 'physique', puissance: 45 },
                   neutre_mag:  { nom: 'Filet obscur',             element: 'neutre',      effet_type: 'magique',  puissance: 35 },
                   elem_phys:   { nom: 'Étreinte des ombres',      element: 'tenebres',    effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Voile ténébreux',          element: 'tenebres',    effet_type: 'magique',  puissance: 60 } },
    'Troll':     { neutre_phys: { nom: 'Coup de massue',            element: 'neutre',      effet_type: 'physique', puissance: 50 },
                   neutre_mag:  { nom: 'Cri de guerre',            element: 'neutre',      effet_type: 'magique',  puissance: 35 },
                   elem_phys:   { nom: 'Frappe vitale',            element: 'vie',         effet_type: 'physique', puissance: 50 },
                   elem_mag:    { nom: 'Drain vital',              element: 'vie',         effet_type: 'magique',  puissance: 60 } },
    'Bandit':    { neutre_phys: { nom: 'Coup bas',                 element: 'neutre',      effet_type: 'physique', puissance: 45 },
                   neutre_mag:  { nom: 'Grenade fumigène',         element: 'neutre',      effet_type: 'magique',  puissance: 35 },
                   elem_phys:   { nom: 'Choc électrique',          element: 'technologie', effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Décharge technologique',   element: 'technologie', effet_type: 'magique',  puissance: 60 } },
    'Fantôme':   { neutre_phys: { nom: 'Coup incorporel',           element: 'neutre',      effet_type: 'physique', puissance: 45 },
                   neutre_mag:  { nom: 'Murmure hanté',            element: 'neutre',      effet_type: 'magique',  puissance: 35 },
                   elem_phys:   { nom: 'Étreinte spectrale',       element: 'surnaturel',  effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: "Cri de l'au-delà",         element: 'surnaturel',  effet_type: 'magique',  puissance: 60 } },
    'Drake':     { neutre_phys: { nom: 'Coup de queue',            element: 'neutre',      effet_type: 'physique', puissance: 50 },
                   neutre_mag:  { nom: 'Grognement menaçant',      element: 'neutre',      effet_type: 'magique',  puissance: 40 },
                   elem_phys:   { nom: 'Griffes enflammées',       element: 'feu',         effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Souffle de feu',           element: 'feu',         effet_type: 'magique',  puissance: 65 } },
    'Golem':     { neutre_phys: { nom: 'Coup de pierre',           element: 'neutre',      effet_type: 'physique', puissance: 50 },
                   neutre_mag:  { nom: 'Frappe de masse',          element: 'neutre',      effet_type: 'magique',  puissance: 40 },
                   elem_phys:   { nom: 'Poing radieux',            element: 'lumiere',     effet_type: 'physique', puissance: 55 },
                   elem_mag:    { nom: 'Rayon aveuglant',          element: 'lumiere',     effet_type: 'magique',  puissance: 65 } },
};

// ── Tables de loot ────────────────────────────────────────────────────────────

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
        { nom: "Fragment d'os",      valeur_or: 3, type: 'inutile' },
        { nom: 'Crâne fissuré',      valeur_or: 5, type: 'inutile' },
        { nom: "Poussière d'os",     valeur_or: 2, type: 'inutile' },
    ],
    'Loup':      [
        { nom: 'Griffe de loup',     valeur_or: 6, type: 'inutile' },
        { nom: 'Poil de loup',       valeur_or: 3, type: 'inutile' },
        { nom: 'Canine de loup',     valeur_or: 5, type: 'inutile' },
    ],
    'Araignée':  [
        { nom: "Toile d'araignée",   valeur_or: 4, type: 'inutile' },
        { nom: 'Croc venimeux',      valeur_or: 7, type: 'inutile' },
        { nom: "Œil d'araignée",     valeur_or: 5, type: 'inutile' },
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
        { nom: "Fragment d'âme",     valeur_or: 7, type: 'inutile' },
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
    { nom: 'Débris inconnu', valeur_or: 4, type: 'inutile' },
    { nom: 'Reste étrange',  valeur_or: 3, type: 'inutile' },
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
    { nom: 'Essence arcanique',     valeur_or: 20, type: 'consommable', description: '+20% mana',       usage: 'combat',      effet: { type: 'mana_pct',  valeur: 15 } },
];

export function lootMonstre(etage: number, room: number, nomMonstre: string): { items: DonjonItem[]; or_base: number } {
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
