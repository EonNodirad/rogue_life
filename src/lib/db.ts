import Database from '@tauri-apps/plugin-sql';
import type {
    Personnage, Caracteristique, Level, Titre, Classe,
    Monstre, Donjon, Donjon_Monstre, historique_poids,
    stuff, inventaire, magasin, magasin_inventaire,
    tache, historique_activite,
    Competence, PersonnageCompetence, PersonnageAffinite, Rarete, GameMode
} from './types';

let db: Database;

export const ROUTINE_STATS: Record<number, { xp: number; gold: number; pv: number }> = {
    1: { xp: 15, gold: 8,  pv: 5  },
    2: { xp: 30, gold: 15, pv: 10 },
    3: { xp: 50, gold: 25, pv: 20 },
};

export function getModeMultiplier(mode: GameMode): number {
    if (mode === 'cauchemar') return 2;
    if (mode === 'hard')      return 1.5;
    return 1;
}

export async function getDb(): Promise<Database> {
    if (!db) {
        db = await Database.load('sqlite:rogue_life.db');
    }
    return db;
}

// --- Personnage ---
export async function getPersonnage(id: number): Promise<Personnage | null> {
    const db = await getDb();
    const result = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [id]);
    return result[0] ?? null;
}

export async function updatePersonnage(p: Partial<Personnage> & { id: number }): Promise<void> {
    const db = await getDb();
    await db.execute(
        'UPDATE personnage SET experience_actuelle = $1, gold_actuel = $2, level_id = $3 WHERE id = $4',
        [p.experience_actuelle, p.gold_actuel, p.level_id, p.id]
    );
}

// --- Caracteristique ---
export async function getCaracteristique(id: number): Promise<Caracteristique | null> {
    const db = await getDb();
    const result = await db.select<Caracteristique[]>('SELECT * FROM caracteristique WHERE id = $1', [id]);
    return result[0] ?? null;
}

export async function updateCaracteristique(c: Caracteristique): Promise<void> {
    const db = await getDb();
    await db.execute(
        `UPDATE caracteristique SET
            pv_vie_max=$1, pv_vie_actuels=$2,
            pv_combat_max=$3, pv_combat_actuels=$4,
            attq=$5, attq_spe=$6,
            def=$7, def_spe=$8, vitesse=$9
         WHERE id=$10`,
        [c.pv_vie_max, c.pv_vie_actuels, c.pv_combat_max, c.pv_combat_actuels,
         c.attq, c.attq_spe, c.def, c.def_spe, c.vitesse, c.id]
    );
}

// --- Level ---
export async function getLevels(): Promise<Level[]> {
    const db = await getDb();
    return db.select<Level[]>('SELECT * FROM level ORDER BY id');
}

// --- Classe ---
export async function getClasses(): Promise<Classe[]> {
    const db = await getDb();
    return db.select<Classe[]>('SELECT * FROM classe');
}

// --- Titre ---
export async function getTitres(): Promise<Titre[]> {
    const db = await getDb();
    return db.select<Titre[]>('SELECT * FROM titre');
}

// --- Monstre ---
export async function getMonstres(): Promise<Monstre[]> {
    const db = await getDb();
    return db.select<Monstre[]>('SELECT * FROM monstre');
}

// --- Donjon ---
export async function getDonjons(): Promise<Donjon[]> {
    const db = await getDb();
    return db.select<Donjon[]>('SELECT * FROM donjon');
}

export async function getDonjonMonstres(donjon_id: number): Promise<Donjon_Monstre[]> {
    const db = await getDb();
    return db.select<Donjon_Monstre[]>(
        'SELECT * FROM donjon_monstre WHERE donjon_id = $1',
        [donjon_id]
    );
}

// --- Historique poids ---
export async function getHistoriquePoids(personnage_id: number): Promise<historique_poids[]> {
    const db = await getDb();
    return db.select<historique_poids[]>(
        'SELECT * FROM historique_poids WHERE personnage_id = $1 ORDER BY date_mesure DESC',
        [personnage_id]
    );
}

export async function addHistoriquePoids(personnage_id: number, valeur_poids: number): Promise<void> {
    const db = await getDb();
    await db.execute(
        'INSERT INTO historique_poids (personnage_id, valeur_poids) VALUES ($1, $2)',
        [personnage_id, valeur_poids]
    );
}

// --- Stuff ---
export async function getStuffs(): Promise<stuff[]> {
    const db = await getDb();
    return db.select<stuff[]>('SELECT * FROM stuff');
}

// --- Inventaire ---
export async function getInventaire(personnage_id: number): Promise<inventaire[]> {
    const db = await getDb();
    return db.select<inventaire[]>(
        'SELECT * FROM inventaire WHERE personnage_id = $1',
        [personnage_id]
    );
}

export async function addToInventaire(personnage_id: number, stuff_id: number): Promise<void> {
    const db = await getDb();
    await db.execute(
        `INSERT INTO inventaire (personnage_id, stuff_id, quantite, est_equipe)
         VALUES ($1, $2, 1, 0)
         ON CONFLICT DO UPDATE SET quantite = quantite + 1`,
        [personnage_id, stuff_id]
    );
}

const SLOTS_MAIN = ['arme_1main', 'arme_2mains', 'bouclier_1main', 'bouclier_2mains'];
const poidsSlot = (slot: string) => slot.includes('2mains') ? 2 : 1;

export async function equiperItem(personnage_id: number, inventaire_id: number): Promise<void> {
    const db = await getDb();

    const rows = await db.select<{ slot: string }[]>(
        `SELECT s.slot FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1`,
        [inventaire_id]
    );
    const slot = rows[0]?.slot;
    if (!slot) return;

    if (SLOTS_MAIN.includes(slot)) {
        // Logique des 2 mains
        const poids = poidsSlot(slot);
        const equipes = await db.select<{ id: number; slot: string }[]>(
            `SELECT i.id, s.slot FROM inventaire i
             JOIN stuff s ON s.id = i.stuff_id
             WHERE i.personnage_id = $1 AND i.est_equipe = 1 AND s.slot IN ('arme_1main','arme_2mains','bouclier_1main','bouclier_2mains')`,
            [personnage_id]
        );
        let poidsActuel = equipes.reduce((sum, e) => sum + poidsSlot(e.slot), 0);
        // Déséquiper les plus anciens jusqu'à avoir de la place
        for (const e of equipes) {
            if (poidsActuel + poids <= 2) break;
            await db.execute('UPDATE inventaire SET est_equipe = 0 WHERE id = $1', [e.id]);
            poidsActuel -= poidsSlot(e.slot);
        }
    } else {
        // Armure/utilitaire : déséquiper le même slot
        await db.execute(
            `UPDATE inventaire SET est_equipe = 0
             WHERE personnage_id = $1 AND est_equipe = 1
             AND stuff_id IN (SELECT id FROM stuff WHERE slot = $2)`,
            [personnage_id, slot]
        );
    }

    await db.execute('UPDATE inventaire SET est_equipe = 1 WHERE id = $1', [inventaire_id]);
}

export async function utiliserConsommable(personnage_id: number, inventaire_id: number): Promise<void> {
    const db = await getDb();

    const rows = await db.select<{ slot: string; soin_pv: number; stuff_id: number }[]>(
        `SELECT s.slot, s.soin_pv, i.stuff_id FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1`,
        [inventaire_id]
    );
    const item = rows[0];
    if (!item) return;

    const perso = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = perso[0];
    if (!p) return;

    const mode = p.mode ?? 'normal';
    if (mode === 'hard' || mode === 'cauchemar') {
        throw new Error('Utilitaires interdits en mode Hard / Cauchemar');
    }

    if (item.slot === 'consommable' && item.soin_pv > 0) {
        await db.execute(
            `UPDATE caracteristique SET pv_vie_actuels = MIN(pv_vie_max, pv_vie_actuels + $1) WHERE id = $2`,
            [item.soin_pv, p.caracteristique_id]
        );
    } else if (item.slot === 'joker') {
        await db.execute(
            `UPDATE personnage SET jokers_disponibles = jokers_disponibles + 1 WHERE id = $1`,
            [personnage_id]
        );
    }

    // Consommer 1 exemplaire
    await db.execute(`UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1`, [inventaire_id]);
    await db.execute(`DELETE FROM inventaire WHERE id = $1 AND quantite <= 0`, [inventaire_id]);
}

export async function desequiperItem(inventaire_id: number): Promise<void> {
    const db = await getDb();
    await db.execute('UPDATE inventaire SET est_equipe = 0 WHERE id = $1', [inventaire_id]);
}

export async function acheterItem(personnage_id: number, magasin_id: number, stuff_id: number): Promise<void> {
    const db = await getDb();

    const prix_rows = await db.select<{ prix_vente_local: number }[]>(
        'SELECT prix_vente_local FROM magasin_inventaire WHERE magasin_id = $1 AND stuff_id = $2',
        [magasin_id, stuff_id]
    );
    if (!prix_rows[0]) throw new Error('Item introuvable dans ce magasin');
    const prix = prix_rows[0].prix_vente_local;

    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = persos[0];
    if (!p) throw new Error('Personnage introuvable');
    if (p.gold_actuel < prix) throw new Error('Or insuffisant');

    await db.execute(
        'UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2',
        [prix, personnage_id]
    );
    await db.execute(
        `INSERT INTO inventaire (personnage_id, stuff_id, quantite, est_equipe)
         VALUES ($1, $2, 1, 0)
         ON CONFLICT(personnage_id, stuff_id) DO UPDATE SET quantite = quantite + 1`,
        [personnage_id, stuff_id]
    );
}

export async function vendreItem(personnage_id: number, inventaire_id: number): Promise<number> {
    const db = await getDb();
    const rows = await db.select<{ stuff_id: number; quantite: number }[]>(
        'SELECT stuff_id, quantite FROM inventaire WHERE id = $1 AND personnage_id = $2',
        [inventaire_id, personnage_id]
    );
    const inv = rows[0];
    if (!inv) throw new Error('Item introuvable');

    const stuffRows = await db.select<{ prix_base: number }[]>(
        'SELECT prix_base FROM stuff WHERE id = $1',
        [inv.stuff_id]
    );
    const prix = Math.floor((stuffRows[0]?.prix_base ?? 0) / 4);

    await db.execute(
        'UPDATE personnage SET gold_actuel = gold_actuel + $1 WHERE id = $2',
        [prix, personnage_id]
    );
    if (inv.quantite <= 1) {
        await db.execute('DELETE FROM inventaire WHERE id = $1', [inventaire_id]);
    } else {
        await db.execute('UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1', [inventaire_id]);
    }
    return prix;
}

// --- Magasin ---
export async function getMagasins(): Promise<magasin[]> {
    const db = await getDb();
    return db.select<magasin[]>('SELECT * FROM magasin');
}

export async function getMagasinInventaire(magasin_id: number): Promise<magasin_inventaire[]> {
    const db = await getDb();
    return db.select<magasin_inventaire[]>(
        'SELECT * FROM magasin_inventaire WHERE magasin_id = $1',
        [magasin_id]
    );
}

// --- Tache ---
export async function getTaches(): Promise<tache[]> {
    const db = await getDb();
    return db.select<tache[]>('SELECT * FROM tache');
}

export async function createTache(t: Omit<tache, 'id'>): Promise<void> {
    const db = await getDb();
    const dateCreation = new Date().toISOString();
    await db.execute(
        `INSERT INTO tache (nom, type_activite, type, difficulte, exp_recompense, gold_recompense, pv_vie_penalite, duree_jours, date_creation, date_limite)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [t.nom, t.type_activite, t.type ?? 'ponctuelle', t.difficulte, t.exp_recompense, t.gold_recompense, t.pv_vie_penalite, t.duree_jours ?? null, dateCreation, t.date_limite ?? null]
    );
}

export async function completerRoutine(personnage_id: number, tache_id: number): Promise<void> {
    const db = await getDb();
    const taches = await db.select<tache[]>('SELECT * FROM tache WHERE id = $1', [tache_id]);
    const t = taches[0];
    if (!t) return;
    const stats = ROUTINE_STATS[t.difficulte] ?? ROUTINE_STATS[1];
    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const multi = getModeMultiplier(persos[0]?.mode ?? 'normal');
    await db.execute(
        `UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3`,
        [Math.round(stats.xp * multi), Math.round(stats.gold * multi), personnage_id]
    );
    await db.execute(
        'INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)',
        [personnage_id, tache_id, 'succes', t.nom]
    );
}

export async function gameOver(personnage_id: number): Promise<void> {
    const db = await getDb();
    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = persos[0];
    if (!p) return;
    await db.execute(
        `UPDATE personnage SET level_id=1, experience_actuelle=0, gold_actuel=50, points_stat_disponibles=0 WHERE id=$1`,
        [personnage_id]
    );
    await db.execute(
        `UPDATE caracteristique SET
            pv_vie_max=100, pv_vie_actuels=100,
            pv_combat_max=100, pv_combat_actuels=100,
            attq=10, attq_spe=10, def=8, def_spe=8, vitesse=12
         WHERE id=$1`,
        [p.caracteristique_id]
    );
    // Retour au mode normal après game over
    await db.execute(
        'UPDATE personnage SET mode=\'normal\', mode_debut=NULL, dernier_coffre_hebdo=NULL, dernier_coffre_mensuel=NULL WHERE id=$1',
        [personnage_id]
    );
}

export const STAT_SHOP_PRIX: Record<string, number> = {
    pv_combat_max: 500,
    attq: 300, attq_spe: 300,
    def: 300, def_spe: 300,
    vitesse: 300,
};

export async function acheterStat(personnage_id: number, stat: StatAllouable): Promise<void> {
    const db = await getDb();
    const prix = STAT_SHOP_PRIX[stat] ?? 300;
    const rows = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = rows[0];
    if (!p) throw new Error('Personnage introuvable');
    if (p.gold_actuel < prix) throw new Error('Or insuffisant');

    await db.execute('UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2', [prix, personnage_id]);

    if (stat === 'pv_combat_max') {
        await db.execute(
            'UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1',
            [p.caracteristique_id]
        );
    } else {
        await db.execute(
            `UPDATE caracteristique SET ${stat} = ${stat} + 1 WHERE id = $1`,
            [p.caracteristique_id]
        );
    }
}

export async function checkDailyPenalties(personnage_id: number): Promise<{ gameOver: boolean }> {
    const db = await getDb();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = persos[0];
    if (!p) return { gameOver: false };

    // Guard : ne tourner qu'une fois par jour
    if ((p as any).dernier_check === today) return { gameOver: false };

    // 1. Routines non faites hier (seulement celles créées avant hier)
    const routines = await db.select<tache[]>(
        `SELECT * FROM tache WHERE type = 'routine' AND (date_creation IS NULL OR date(date_creation) <= $1)`,
        [yesterday]
    );
    for (const r of routines) {
        const done = await db.select<{ id: number }[]>(
            `SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'penalite') AND date(date_action) = $3`,
            [personnage_id, r.id, yesterday]
        );
        if (done.length === 0) {
            const mode = p.mode ?? 'normal';
            // Cauchemar : une routine ratée = game over immédiat
            if (mode === 'cauchemar') {
                await db.execute(
                    `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)`,
                    [personnage_id, r.id, r.nom]
                );
                await db.execute(`UPDATE personnage SET dernier_check = $1 WHERE id = $2`, [today, personnage_id]);
                await gameOver(personnage_id);
                return { gameOver: true };
            }
            // Hard : pas de jokers, pénalité PV directe
            if (mode === 'hard' || (p as any).jokers_disponibles <= 0) {
                const pen = (ROUTINE_STATS[r.difficulte] ?? ROUTINE_STATS[1]).pv;
                await db.execute(
                    `UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2`,
                    [pen, p.caracteristique_id]
                );
                await db.execute(
                    `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)`,
                    [personnage_id, r.id, r.nom]
                );
            } else {
                await db.execute(
                    `UPDATE personnage SET jokers_disponibles = jokers_disponibles - 1 WHERE id = $1`,
                    [personnage_id]
                );
                (p as any).jokers_disponibles--;
                await db.execute(
                    `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'joker', $3)`,
                    [personnage_id, r.id, r.nom]
                );
            }
        }
    }

    // 2. Tâches ponctuelles expirées (utilise date_limite si disponible, sinon date_creation + duree_jours)
    const ponctuelles = await db.select<tache[]>(
        `SELECT * FROM tache WHERE type = 'ponctuelle'`
    );
    for (const t of ponctuelles) {
        // Calculer la date d'expiration
        let expireStr: string | null = null;
        if (t.date_limite) {
            expireStr = t.date_limite;
        } else if (t.date_creation && t.duree_jours) {
            const expireDate = new Date(t.date_creation);
            expireDate.setDate(expireDate.getDate() + t.duree_jours);
            expireStr = expireDate.toISOString().split('T')[0];
        }
        if (!expireStr || expireStr >= today) continue;

        const done = await db.select<{ id: number }[]>(
            `SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'expire')`,
            [personnage_id, t.id]
        );
        if (done.length === 0) {
            await db.execute(
                `UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2`,
                [t.pv_vie_penalite, p.caracteristique_id]
            );
            await db.execute(
                `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'expire', $3)`,
                [personnage_id, t.id, t.nom]
            );
        }
    }

    // Marquer le check comme fait aujourd'hui
    await db.execute(
        `UPDATE personnage SET dernier_check = $1 WHERE id = $2`,
        [today, personnage_id]
    );

    // Vérifier game over
    const caRows = await db.select<{ pv_vie_actuels: number }[]>(
        'SELECT pv_vie_actuels FROM caracteristique WHERE id = $1',
        [p.caracteristique_id]
    );
    if ((caRows[0]?.pv_vie_actuels ?? 1) <= 0) {
        await gameOver(personnage_id);
        return { gameOver: true };
    }
    return { gameOver: false };
}

export async function completerTache(personnage_id: number, tache_id: number): Promise<void> {
    const db = await getDb();
    const taches = await db.select<tache[]>('SELECT * FROM tache WHERE id = $1', [tache_id]);
    const t = taches[0];
    if (!t) return;

    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const multi = getModeMultiplier(persos[0]?.mode ?? 'normal');

    await db.execute(
        `UPDATE personnage SET
            experience_actuelle = experience_actuelle + $1,
            gold_actuel = gold_actuel + $2
         WHERE id = $3`,
        [Math.round(t.exp_recompense * multi), Math.round(t.gold_recompense * multi), personnage_id]
    );
    await db.execute(
        'INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)',
        [personnage_id, tache_id, 'succes', t.nom]
    );
    await db.execute('UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1', [tache_id]);
    await db.execute('DELETE FROM tache WHERE id = $1', [tache_id]);
}

export async function echouerTache(personnage_id: number, tache_id: number): Promise<{ gameOver: boolean }> {
    const db = await getDb();
    const taches = await db.select<tache[]>('SELECT * FROM tache WHERE id = $1', [tache_id]);
    const t = taches[0];
    if (!t) return { gameOver: false };

    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = persos[0];
    if (!p) return { gameOver: false };

    // Cauchemar : un échec = game over immédiat
    if ((p.mode ?? 'normal') === 'cauchemar') {
        await db.execute(
            'INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)',
            [personnage_id, tache_id, 'echec', t.nom]
        );
        await db.execute('UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1', [tache_id]);
        await db.execute('DELETE FROM tache WHERE id = $1', [tache_id]);
        await gameOver(personnage_id);
        return { gameOver: true };
    }

    await db.execute(
        `UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2`,
        [t.pv_vie_penalite, p.caracteristique_id]
    );
    await db.execute(
        'INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)',
        [personnage_id, tache_id, 'echec', t.nom]
    );
    await db.execute('UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1', [tache_id]);
    await db.execute('DELETE FROM tache WHERE id = $1', [tache_id]);

    const caRows = await db.select<{ pv_vie_actuels: number }[]>(
        'SELECT pv_vie_actuels FROM caracteristique WHERE id = $1',
        [p.caracteristique_id]
    );
    if ((caRows[0]?.pv_vie_actuels ?? 1) <= 0) {
        await gameOver(personnage_id);
        return { gameOver: true };
    }
    return { gameOver: false };
}

// --- Historique activité ---
export async function getHistoriqueActivite(personnage_id: number): Promise<historique_activite[]> {
    const db = await getDb();
    return db.select<historique_activite[]>(
        'SELECT * FROM historique_activite WHERE personnage_id = $1 ORDER BY date_action DESC',
        [personnage_id]
    );
}

export async function addHistoriqueActivite(
    personnage_id: number,
    tache_id: number,
    statut: string
): Promise<void> {
    const db = await getDb();
    await db.execute(
        'INSERT INTO historique_activite (personnage_id, tache_id, statut) VALUES ($1, $2, $3)',
        [personnage_id, tache_id, statut]
    );
}

// --- Compétences ---
export async function getCompetences(): Promise<Competence[]> {
    const db = await getDb();
    return db.select<Competence[]>("SELECT * FROM competence WHERE source != 'donjon' OR source IS NULL ORDER BY prix_boutique ASC");
}

export async function getCompetencesDonjon(): Promise<Competence[]> {
    const db = await getDb();
    return db.select<Competence[]>("SELECT * FROM competence WHERE source = 'donjon' ORDER BY rarete ASC");
}

export async function getPersonnageCompetences(personnage_id: number): Promise<(PersonnageCompetence & { competence: Competence })[]> {
    const db = await getDb();
    const rows = await db.select<(PersonnageCompetence & Competence & { comp_id: number })[]>(
        `SELECT pc.id, pc.personnage_id, pc.competence_id, pc.est_equipee,
                c.id as comp_id, c.nom, c.description, c.type, c.effet_type,
                c.valeur, c.duree_tours, c.rarete, c.prix_boutique, c.element, c.source
         FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1`,
        [personnage_id]
    );
    return rows.map(r => ({
        id: r.id,
        personnage_id: r.personnage_id,
        competence_id: r.competence_id,
        est_equipee: Boolean(r.est_equipee),
        competence: {
            id: r.comp_id,
            nom: r.nom,
            description: r.description,
            type: r.type,
            effet_type: r.effet_type,
            valeur: r.valeur,
            duree_tours: r.duree_tours,
            rarete: r.rarete,
            prix_boutique: r.prix_boutique,
            element: (r as any).element ?? 'neutre',
            source: (r as any).source ?? 'boutique',
        } as Competence,
    }));
}

export async function acheterCompetence(personnage_id: number, competence_id: number): Promise<void> {
    const db = await getDb();
    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = persos[0];
    if (!p) throw new Error('Personnage introuvable');

    const comps = await db.select<Competence[]>('SELECT * FROM competence WHERE id = $1', [competence_id]);
    const c = comps[0];
    if (!c) throw new Error('Compétence introuvable');

    if (p.gold_actuel < c.prix_boutique) throw new Error('Or insuffisant');

    const existing = await db.select<PersonnageCompetence[]>(
        'SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2',
        [personnage_id, competence_id]
    );
    if (existing.length > 0) throw new Error('Compétence déjà possédée');

    await db.execute('UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2', [c.prix_boutique, personnage_id]);
    await db.execute(
        'INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)',
        [personnage_id, competence_id]
    );
}

export async function equiperCompetence(personnage_id: number, pc_id: number): Promise<void> {
    const db = await getDb();
    const equipped = await db.select<{ cnt: number }[]>(
        'SELECT COUNT(*) as cnt FROM personnage_competence WHERE personnage_id = $1 AND est_equipee = 1',
        [personnage_id]
    );
    if (equipped[0].cnt >= 6) throw new Error('Maximum 6 compétences équipées');
    await db.execute('UPDATE personnage_competence SET est_equipee = 1 WHERE id = $1', [pc_id]);
}

export async function desequiperCompetence(pc_id: number): Promise<void> {
    const db = await getDb();
    await db.execute('UPDATE personnage_competence SET est_equipee = 0 WHERE id = $1', [pc_id]);
}

export async function ajouterRecompenseDonjon(
    personnage_id: number,
    type: 'stuff' | 'competence',
    item_id: number
): Promise<void> {
    const db = await getDb();
    if (type === 'stuff') {
        await db.execute(
            'INSERT INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 1, 0)',
            [personnage_id, item_id]
        );
    } else {
        const existing = await db.select<PersonnageCompetence[]>(
            'SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2',
            [personnage_id, item_id]
        );
        if (existing.length === 0) {
            await db.execute(
                'INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)',
                [personnage_id, item_id]
            );
        }
    }
}

export async function resetPvCombat(personnage_id: number): Promise<void> {
    const db = await getDb();
    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = persos[0];
    if (!p) return;
    await db.execute(
        'UPDATE caracteristique SET pv_combat_actuels = pv_combat_max WHERE id = $1',
        [p.caracteristique_id]
    );
}

export async function updatePvCombat(personnage_id: number, pv_actuels: number): Promise<void> {
    const db = await getDb();
    const persos = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = persos[0];
    if (!p) return;
    await db.execute(
        'UPDATE caracteristique SET pv_combat_actuels = MAX(0, $1) WHERE id = $2',
        [pv_actuels, p.caracteristique_id]
    );
}

// --- Level Up ---
export async function checkLevelUp(personnage_id: number): Promise<{ levels_gagnes: number; points_gagnes: number }> {
    const db = await getDb();
    let levels_gagnes = 0;
    let points_gagnes = 0;

    while (true) {
        const rows = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
        const p = rows[0];
        if (!p) break;

        const levels = await db.select<Level[]>('SELECT * FROM level WHERE id = $1', [p.level_id]);
        const currentLevel = levels[0];
        if (!currentLevel) break;

        // Niveau max
        if (p.experience_actuelle < currentLevel.exp_max_requise || p.level_id >= 10) break;

        const newLevelId = p.level_id + 1;
        await db.execute(
            'UPDATE personnage SET level_id = $1, points_stat_disponibles = points_stat_disponibles + 5 WHERE id = $2',
            [newLevelId, personnage_id]
        );
        levels_gagnes++;
        points_gagnes += 5;
    }

    return { levels_gagnes, points_gagnes };
}

export type StatAllouable = 'pv_combat_max' | 'attq' | 'attq_spe' | 'def' | 'def_spe' | 'vitesse';

export async function allouerStat(personnage_id: number, stat: StatAllouable): Promise<void> {
    const db = await getDb();
    const rows = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = rows[0];
    if (!p || (p.points_stat_disponibles ?? 0) <= 0) return;

    // Décrémenter les points
    await db.execute(
        'UPDATE personnage SET points_stat_disponibles = points_stat_disponibles - 1 WHERE id = $1',
        [personnage_id]
    );

    // Appliquer le gain sur caracteristique
    if (stat === 'pv_combat_max') {
        // +5 PV combat max et actuels
        await db.execute(
            'UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1',
            [p.caracteristique_id]
        );
    } else {
        await db.execute(
            `UPDATE caracteristique SET ${stat} = ${stat} + 1 WHERE id = $1`,
            [p.caracteristique_id]
        );
    }
}

// --- Compteurs loot box ---
export async function incrementerCompteurRoutines(personnage_id: number): Promise<Rarete> {
    const db = await getDb();
    await db.execute(
        'UPDATE personnage SET compteur_routines = COALESCE(compteur_routines, 0) + 1 WHERE id = $1',
        [personnage_id]
    );
    const rows = await db.select<{ compteur_routines: number }[]>(
        'SELECT compteur_routines FROM personnage WHERE id = $1',
        [personnage_id]
    );
    const count = rows[0]?.compteur_routines ?? 1;
    if (count >= 20) return 'epique';
    if (count >= 15) return 'rare';
    if (count >= 10) return 'peu_commun';
    return 'commun';
}

export async function incrementerLootDonjon(personnage_id: number): Promise<Rarete> {
    const db = await getDb();
    await db.execute(
        'UPDATE personnage SET compteur_loot_donjon = COALESCE(compteur_loot_donjon, 0) + 1 WHERE id = $1',
        [personnage_id]
    );
    const rows = await db.select<{ compteur_loot_donjon: number }[]>(
        'SELECT compteur_loot_donjon FROM personnage WHERE id = $1',
        [personnage_id]
    );
    const count = rows[0]?.compteur_loot_donjon ?? 1;
    if (count % 50 === 0) return 'legendaire';
    const idx = Math.floor((count - 1) / 3) % 3;
    return (['peu_commun', 'rare', 'epique'] as Rarete[])[idx];
}

// --- Affinités élémentaires ---
export async function getPersonnageAffinites(personnage_id: number): Promise<PersonnageAffinite[]> {
    const db = await getDb();
    try {
        return db.select<PersonnageAffinite[]>(
            'SELECT * FROM personnage_affinite WHERE personnage_id = $1',
            [personnage_id]
        );
    } catch { return []; }
}

// --- Modes de jeu ---
export async function changerMode(personnage_id: number, newMode: GameMode): Promise<void> {
    const db = await getDb();
    const rows = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = rows[0];
    if (!p) return;
    const currentMode = (p.mode ?? 'normal') as GameMode;
    // Règle des 3j : uniquement pour revenir en normal depuis hard/cauchemar
    // Basculer entre hard et cauchemar est libre
    if (newMode === 'normal' && currentMode !== 'normal') {
        if (p.mode_debut) {
            const debut = new Date(p.mode_debut);
            const diffDays = (Date.now() - debut.getTime()) / 86400000;
            if (diffDays < 3) throw new Error(`Mode actif depuis ${Math.floor(diffDays)}j — annulation possible après 3 jours`);
        }
    }
    const today = new Date().toISOString().split('T')[0];
    // Conserver mode_debut si on reste dans le "danger zone" (hard ↔ cauchemar)
    const modeDebut = newMode !== 'normal'
        ? (currentMode !== 'normal' ? p.mode_debut : today)
        : null;
    await db.execute(
        'UPDATE personnage SET mode = $1, mode_debut = $2 WHERE id = $3',
        [newMode, modeDebut, personnage_id]
    );
}

export async function checkModeCoffres(personnage_id: number): Promise<{ hebdo: Rarete | null; mensuel: Rarete | null }> {
    const db = await getDb();
    const rows = await db.select<Personnage[]>('SELECT * FROM personnage WHERE id = $1', [personnage_id]);
    const p = rows[0];
    if (!p || (p.mode ?? 'normal') === 'normal') return { hebdo: null, mensuel: null };
    const mode = p.mode as GameMode;
    const now = Date.now();
    const ref = p.mode_debut ? new Date(p.mode_debut).getTime() : now;
    const today = new Date().toISOString().split('T')[0];
    let hebdo: Rarete | null = null;
    let mensuel: Rarete | null = null;
    const lastMensuel = p.dernier_coffre_mensuel ? new Date(p.dernier_coffre_mensuel).getTime() : ref;
    if ((now - lastMensuel) >= 30 * 86400000) {
        mensuel = mode === 'cauchemar' ? 'legendaire' : 'epique';
        await db.execute('UPDATE personnage SET dernier_coffre_mensuel = $1 WHERE id = $2', [today, personnage_id]);
    }
    const lastHebdo = p.dernier_coffre_hebdo ? new Date(p.dernier_coffre_hebdo).getTime() : ref;
    if ((now - lastHebdo) >= 7 * 86400000) {
        hebdo = mode === 'cauchemar' ? 'epique' : 'rare';
        await db.execute('UPDATE personnage SET dernier_coffre_hebdo = $1 WHERE id = $2', [today, personnage_id]);
    }
    return { hebdo, mensuel };
}
