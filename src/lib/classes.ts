import { _classesSelect, _classesRun } from './db';

export interface ClasseDef {
    id: number;
    nom: string;
    arbre: string;
    palier: number;
    parent_id: number | null;
    bonus_attq: number;
    bonus_def: number;
    bonus_attq_spe: number;
    bonus_def_spe: number;
    bonus_vit: number;
    bonus_pv_max: number;
    bonus_aff_elem: number;
}

export interface BonusClasse {
    attq: number;
    def: number;
    attq_spe: number;
    def_spe: number;
    vit: number;
    pv_max: number;
    aff_elem: number;
}

export const CLASSES: ClasseDef[] = [
    // Palier 1
    { id:1,  nom:'Guerrier',           arbre:'guerrier', palier:1, parent_id:null, bonus_attq:3, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:2,  nom:'Vagabond',           arbre:'vagabond', palier:1, parent_id:null, bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:3, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:3,  nom:'Sorcier',            arbre:'sorcier',  palier:1, parent_id:null, bonus_attq:0, bonus_def:0, bonus_attq_spe:3, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 4 — Guerrier
    { id:4,  nom:'Paladin',            arbre:'guerrier', palier:4, parent_id:1,    bonus_attq:0, bonus_def:0, bonus_attq_spe:3, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:5,  nom:'Tank',               arbre:'guerrier', palier:4, parent_id:1,    bonus_attq:0, bonus_def:3, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:6,  nom:'Barbare',            arbre:'guerrier', palier:4, parent_id:1,    bonus_attq:3, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 4 — Vagabond
    { id:7,  nom:'Archer',             arbre:'vagabond', palier:4, parent_id:2,    bonus_attq:0, bonus_def:0, bonus_attq_spe:3, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:8,  nom:'Moine',              arbre:'vagabond', palier:4, parent_id:2,    bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:3, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:9,  nom:'Assassin',           arbre:'vagabond', palier:4, parent_id:2,    bonus_attq:3, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 4 — Sorcier
    { id:10, nom:'Mage',               arbre:'sorcier',  palier:4, parent_id:3,    bonus_attq:0, bonus_def:0, bonus_attq_spe:3, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:11, nom:'Occultiste',         arbre:'sorcier',  palier:4, parent_id:3,    bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:3, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:12, nom:'Sorceleur',          arbre:'sorcier',  palier:4, parent_id:3,    bonus_attq:3, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 7 — Paladin
    { id:13, nom:'Guerrier elem',      arbre:'guerrier', palier:7, parent_id:4,    bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:5 },
    { id:14, nom:'Guerrier runique',   arbre:'guerrier', palier:7, parent_id:4,    bonus_attq:0, bonus_def:0, bonus_attq_spe:3, bonus_def_spe:3, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 7 — Tank
    { id:15, nom:'Tank absolu',        arbre:'guerrier', palier:7, parent_id:5,    bonus_attq:0, bonus_def:3, bonus_attq_spe:0, bonus_def_spe:3, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:16, nom:'Antimage',           arbre:'guerrier', palier:7, parent_id:5,    bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:6, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 7 — Barbare
    { id:17, nom:'Géant barbare',      arbre:'guerrier', palier:7, parent_id:6,    bonus_attq:0, bonus_def:3, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:15, bonus_aff_elem:0 },
    { id:18, nom:'Berserk',            arbre:'guerrier', palier:7, parent_id:6,    bonus_attq:6, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 7 — Archer
    { id:19, nom:'Ranger',             arbre:'vagabond', palier:7, parent_id:7,    bonus_attq:0, bonus_def:0, bonus_attq_spe:3, bonus_def_spe:0, bonus_vit:3, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:20, nom:'Archer lourd',       arbre:'vagabond', palier:7, parent_id:7,    bonus_attq:0, bonus_def:0, bonus_attq_spe:6, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 7 — Moine
    { id:21, nom:'Moine itinérant',    arbre:'vagabond', palier:7, parent_id:8,    bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:6, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:22, nom:'Moine elem',         arbre:'vagabond', palier:7, parent_id:8,    bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:5 },
    // Palier 7 — Assassin
    { id:23, nom:"Assassin de l'ombre", arbre:'vagabond', palier:7, parent_id:9,   bonus_attq:0, bonus_def:0, bonus_attq_spe:6, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:24, nom:'Assassin dégourdit', arbre:'vagabond', palier:7, parent_id:9,    bonus_attq:3, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:3, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 7 — Mage
    { id:25, nom:'Archimage',          arbre:'sorcier',  palier:7, parent_id:10,   bonus_attq:0, bonus_def:0, bonus_attq_spe:6, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:26, nom:'Élémentaliste',      arbre:'sorcier',  palier:7, parent_id:10,   bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:5 },
    // Palier 7 — Occultiste
    { id:27, nom:'Incanteur',          arbre:'sorcier',  palier:7, parent_id:11,   bonus_attq:0, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:3, bonus_vit:0, bonus_pv_max:15, bonus_aff_elem:0 },
    { id:28, nom:'Mage runique',       arbre:'sorcier',  palier:7, parent_id:11,   bonus_attq:0, bonus_def:3, bonus_attq_spe:0, bonus_def_spe:3, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
    // Palier 7 — Sorceleur
    { id:29, nom:'Chasseur de monstre', arbre:'sorcier', palier:7, parent_id:12,   bonus_attq:3, bonus_def:0, bonus_attq_spe:0, bonus_def_spe:0, bonus_vit:3, bonus_pv_max:0,  bonus_aff_elem:0 },
    { id:30, nom:'Guerrier mage',      arbre:'sorcier',  palier:7, parent_id:12,   bonus_attq:3, bonus_def:0, bonus_attq_spe:3, bonus_def_spe:0, bonus_vit:0, bonus_pv_max:0,  bonus_aff_elem:0 },
];

export function getBonusCumulatif(classeId: number | null): BonusClasse {
    const zero: BonusClasse = { attq:0, def:0, attq_spe:0, def_spe:0, vit:0, pv_max:0, aff_elem:0 };
    if (!classeId) return zero;
    const c = CLASSES.find(x => x.id === classeId);
    if (!c) return zero;
    const parent = getBonusCumulatif(c.parent_id);
    return {
        attq:     parent.attq     + c.bonus_attq,
        def:      parent.def      + c.bonus_def,
        attq_spe: parent.attq_spe + c.bonus_attq_spe,
        def_spe:  parent.def_spe  + c.bonus_def_spe,
        vit:      parent.vit      + c.bonus_vit,
        pv_max:   parent.pv_max   + c.bonus_pv_max,
        aff_elem: parent.aff_elem + c.bonus_aff_elem,
    };
}

export async function getClassesDebloquees(personnage_id: number): Promise<number[]> {
    const rows = await _classesSelect<{ classe_id: number }>(
        'SELECT classe_id FROM personnage_classe_debloquee WHERE personnage_id = $1',
        [personnage_id]
    );
    return rows.map(r => r.classe_id);
}

export async function debloquerClasse(personnage_id: number, classe_id: number): Promise<void> {
    await _classesRun(
        'INSERT OR IGNORE INTO personnage_classe_debloquee (personnage_id, classe_id) VALUES ($1, $2)',
        [personnage_id, classe_id]
    );
}

export async function equiperClasse(personnage_id: number, classe_id: number | null): Promise<void> {
    await _classesRun(
        'UPDATE personnage SET classe_id = $1 WHERE id = $2',
        [classe_id, personnage_id]
    );
}
