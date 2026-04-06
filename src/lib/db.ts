import initSqlJs from 'sql.js';
import type { Database } from 'sql.js';
import initSql from '$lib/init.sql?raw';
import type {
    Personnage, Caracteristique, Level, Titre, Classe,
    Monstre, Donjon, Donjon_Monstre, historique_poids,
    stuff, inventaire, magasin, magasin_inventaire,
    tache, historique_activite,
    Competence, PersonnageCompetence, PersonnageAffinite, Rarete, GameMode
} from './types';

// ── IndexedDB persistence ─────────────────────────────────────────────────────

const IDB_NAME  = 'rogue_life';
const IDB_STORE = 'db';
const IDB_KEY   = 'save';

function idbOpen(): Promise<IDBDatabase> {
    return new Promise((res, rej) => {
        const req = indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
        req.onsuccess = () => res(req.result);
        req.onerror   = () => rej(req.error);
    });
}

async function idbGet(): Promise<Uint8Array | null> {
    const idb = await idbOpen();
    return new Promise((res, rej) => {
        const tx  = idb.transaction(IDB_STORE, 'readonly');
        const get = tx.objectStore(IDB_STORE).get(IDB_KEY);
        get.onsuccess = () => res((get.result as Uint8Array) ?? null);
        get.onerror   = () => rej(get.error);
    });
}

async function idbPut(data: Uint8Array): Promise<void> {
    const idb = await idbOpen();
    return new Promise((res, rej) => {
        const tx = idb.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(data, IDB_KEY);
        tx.oncomplete = () => res();
        tx.onerror    = () => rej(tx.error);
    });
}

// ── DB singleton ──────────────────────────────────────────────────────────────

let sqlDb: Database | null = null;

async function getDb(): Promise<Database> {
    if (sqlDb) return sqlDb;

    if (navigator.storage?.persist) await navigator.storage.persist();

    const SQL   = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' });
    const saved = await idbGet();

    if (saved) {
        sqlDb = new SQL.Database(saved);
    } else {
        sqlDb = new SQL.Database();
        sqlDb.run(initSql);
        await saveDb();
    }
    return sqlDb;
}

async function saveDb(): Promise<void> {
    if (!sqlDb) return;
    await idbPut(sqlDb.export());
}

// ── SQL helpers ───────────────────────────────────────────────────────────────

// Convertit $1,$2,... → ? pour le binding positionnel de sql.js
function adaptSql(sql: string): string {
    return sql.replace(/\$\d+/g, '?');
}

function dbSelect<T>(sql: string, params: unknown[] = []): T[] {
    const stmt = sqlDb!.prepare(adaptSql(sql));
    const rows: T[] = [];
    stmt.bind(params as any[]);
    while (stmt.step()) rows.push(stmt.getAsObject() as T);
    stmt.free();
    return rows;
}

function dbRun(sql: string, params: unknown[] = []): void {
    sqlDb!.run(adaptSql(sql), params as any[]);
}

// ── Constantes ────────────────────────────────────────────────────────────────

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

export const STAT_SHOP_PRIX: Record<string, number> = {
    pv_combat_max: 100,
    attq: 50, attq_spe: 50,
    def: 50, def_spe: 50,
    vitesse: 50,
    mana_max: 100,
};

export type StatAllouable = 'pv_combat_max' | 'attq' | 'attq_spe' | 'def' | 'def_spe' | 'vitesse' | 'mana_max';

// ── Personnage ────────────────────────────────────────────────────────────────

export async function getPersonnage(id: number): Promise<Personnage | null> {
    await getDb();
    return dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [id])[0] ?? null;
}

export async function updatePersonnage(p: Partial<Personnage> & { id: number }): Promise<void> {
    await getDb();
    dbRun(
        'UPDATE personnage SET experience_actuelle = $1, gold_actuel = $2, level_id = $3 WHERE id = $4',
        [p.experience_actuelle, p.gold_actuel, p.level_id, p.id]
    );
    await saveDb();
}

// ── Caracteristique ───────────────────────────────────────────────────────────

export async function getCaracteristique(id: number): Promise<Caracteristique | null> {
    await getDb();
    return dbSelect<Caracteristique>('SELECT * FROM caracteristique WHERE id = $1', [id])[0] ?? null;
}

export async function updateCaracteristique(c: Caracteristique): Promise<void> {
    await getDb();
    dbRun(
        `UPDATE caracteristique SET
            pv_vie_max=$1, pv_vie_actuels=$2,
            pv_combat_max=$3, pv_combat_actuels=$4,
            attq=$5, attq_spe=$6,
            def=$7, def_spe=$8, vitesse=$9,
            mana_max=$10, mana_actuels=$11
         WHERE id=$12`,
        [c.pv_vie_max, c.pv_vie_actuels, c.pv_combat_max, c.pv_combat_actuels,
         c.attq, c.attq_spe, c.def, c.def_spe, c.vitesse,
         c.mana_max, c.mana_actuels, c.id]
    );
    await saveDb();
}

// ── Level ─────────────────────────────────────────────────────────────────────

export async function getLevels(): Promise<Level[]> {
    await getDb();
    return dbSelect<Level>('SELECT * FROM level ORDER BY id');
}

// ── Classe ────────────────────────────────────────────────────────────────────

export async function getClasses(): Promise<Classe[]> {
    await getDb();
    return dbSelect<Classe>('SELECT * FROM classe');
}

// ── Titre ─────────────────────────────────────────────────────────────────────

export async function getTitres(): Promise<Titre[]> {
    await getDb();
    return dbSelect<Titre>('SELECT * FROM titre');
}

export async function changerTitre(personnage_id: number, titre_id: number): Promise<void> {
    await getDb();
    dbRun('UPDATE personnage SET titre_id = $1 WHERE id = $2', [titre_id, personnage_id]);
    await saveDb();
}

// ── Monstre ───────────────────────────────────────────────────────────────────

export async function getMonstres(): Promise<Monstre[]> {
    await getDb();
    return dbSelect<Monstre>('SELECT * FROM monstre');
}

// ── Donjon ────────────────────────────────────────────────────────────────────

export async function getDonjons(): Promise<Donjon[]> {
    await getDb();
    return dbSelect<Donjon>('SELECT * FROM donjon');
}

export async function getDonjonMonstres(donjon_id: number): Promise<Donjon_Monstre[]> {
    await getDb();
    return dbSelect<Donjon_Monstre>('SELECT * FROM donjon_monstre WHERE donjon_id = $1', [donjon_id]);
}

// ── Historique poids ──────────────────────────────────────────────────────────

export async function getHistoriquePoids(personnage_id: number): Promise<historique_poids[]> {
    await getDb();
    return dbSelect<historique_poids>(
        'SELECT * FROM historique_poids WHERE personnage_id = $1 ORDER BY date_mesure DESC',
        [personnage_id]
    );
}

export async function addHistoriquePoids(personnage_id: number, valeur_poids: number): Promise<void> {
    await getDb();
    dbRun('INSERT INTO historique_poids (personnage_id, valeur_poids) VALUES ($1, $2)', [personnage_id, valeur_poids]);
    await saveDb();
}

// ── Stuff ─────────────────────────────────────────────────────────────────────

export async function getStuffs(): Promise<stuff[]> {
    await getDb();
    return dbSelect<stuff>('SELECT * FROM stuff');
}

// ── Inventaire ────────────────────────────────────────────────────────────────

export async function getInventaire(personnage_id: number): Promise<inventaire[]> {
    await getDb();
    return dbSelect<inventaire>('SELECT * FROM inventaire WHERE personnage_id = $1', [personnage_id]);
}

export async function addToInventaire(personnage_id: number, stuff_id: number): Promise<void> {
    await getDb();
    dbRun(
        `INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)`,
        [personnage_id, stuff_id]
    );
    dbRun(
        `UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2`,
        [personnage_id, stuff_id]
    );
    await saveDb();
}

const SLOTS_MAIN = ['arme_1main', 'arme_2mains', 'bouclier_1main', 'bouclier_2mains'];
const poidsSlot = (slot: string) => slot.includes('2mains') ? 2 : 1;

export async function equiperItem(personnage_id: number, inventaire_id: number): Promise<void> {
    await getDb();

    const rows = dbSelect<{ slot: string }>(
        `SELECT s.slot FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1`,
        [inventaire_id]
    );
    const slot = rows[0]?.slot;
    if (!slot) return;

    if (SLOTS_MAIN.includes(slot)) {
        const poids = poidsSlot(slot);
        const equipes = dbSelect<{ id: number; slot: string }>(
            `SELECT i.id, s.slot FROM inventaire i
             JOIN stuff s ON s.id = i.stuff_id
             WHERE i.personnage_id = $1 AND i.est_equipe = 1 AND s.slot IN ('arme_1main','arme_2mains','bouclier_1main','bouclier_2mains')`,
            [personnage_id]
        );
        let poidsActuel = equipes.reduce((sum, e) => sum + poidsSlot(e.slot), 0);
        for (const e of equipes) {
            if (poidsActuel + poids <= 2) break;
            dbRun('UPDATE inventaire SET est_equipe = 0 WHERE id = $1', [e.id]);
            poidsActuel -= poidsSlot(e.slot);
        }
    } else {
        dbRun(
            `UPDATE inventaire SET est_equipe = 0
             WHERE personnage_id = $1 AND est_equipe = 1
             AND stuff_id IN (SELECT id FROM stuff WHERE slot = $2)`,
            [personnage_id, slot]
        );
    }

    dbRun('UPDATE inventaire SET est_equipe = 1 WHERE id = $1', [inventaire_id]);
    await saveDb();
}

export async function utiliserConsommable(personnage_id: number, inventaire_id: number): Promise<void> {
    await getDb();

    const rows = dbSelect<{ slot: string; soin_pv: number; stuff_id: number }>(
        `SELECT s.slot, s.soin_pv, i.stuff_id FROM inventaire i JOIN stuff s ON s.id = i.stuff_id WHERE i.id = $1`,
        [inventaire_id]
    );
    const item = rows[0];
    if (!item) return;

    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;

    const mode = p.mode ?? 'normal';
    if (mode === 'hard' || mode === 'cauchemar') throw new Error('Utilitaires interdits en mode Hard / Cauchemar');

    if (item.slot === 'consommable' && item.soin_pv > 0) {
        dbRun(
            `UPDATE caracteristique SET pv_vie_actuels = MIN(pv_vie_max, pv_vie_actuels + $1) WHERE id = $2`,
            [item.soin_pv, p.caracteristique_id]
        );
    } else if (item.slot === 'joker') {
        dbRun(`UPDATE personnage SET jokers_disponibles = jokers_disponibles + 1 WHERE id = $1`, [personnage_id]);
    }

    dbRun(`UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1`, [inventaire_id]);
    dbRun(`DELETE FROM inventaire WHERE id = $1 AND quantite <= 0`, [inventaire_id]);
    await saveDb();
}

export async function desequiperItem(inventaire_id: number): Promise<void> {
    await getDb();
    dbRun('UPDATE inventaire SET est_equipe = 0 WHERE id = $1', [inventaire_id]);
    await saveDb();
}

export async function acheterItem(personnage_id: number, magasin_id: number, stuff_id: number): Promise<void> {
    await getDb();

    const prix_rows = dbSelect<{ prix_vente_local: number }>(
        'SELECT prix_vente_local FROM magasin_inventaire WHERE magasin_id = $1 AND stuff_id = $2',
        [magasin_id, stuff_id]
    );
    if (!prix_rows[0]) throw new Error('Item introuvable dans ce magasin');
    const prix = prix_rows[0].prix_vente_local;

    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) throw new Error('Personnage introuvable');
    if (p.gold_actuel < prix) throw new Error('Or insuffisant');

    const stuffSlot = dbSelect<{ slot: string }>('SELECT slot FROM stuff WHERE id = $1', [stuff_id]);
    if (stuffSlot[0]?.slot === 'joker') {
        const mode = p.mode ?? 'normal';
        if (mode === 'hard' || mode === 'cauchemar') throw new Error('Jokers interdits en mode Hard / Cauchemar');
    }

    dbRun('UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2', [prix, personnage_id]);
    dbRun(
        `INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)`,
        [personnage_id, stuff_id]
    );
    dbRun(
        `UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2`,
        [personnage_id, stuff_id]
    );
    await saveDb();
}

export async function vendreItem(personnage_id: number, inventaire_id: number): Promise<number> {
    await getDb();
    const inv = dbSelect<{ stuff_id: number; quantite: number }>(
        'SELECT stuff_id, quantite FROM inventaire WHERE id = $1 AND personnage_id = $2',
        [inventaire_id, personnage_id]
    )[0];
    if (!inv) throw new Error('Item introuvable');

    const prix = Math.floor((dbSelect<{ prix_base: number }>('SELECT prix_base FROM stuff WHERE id = $1', [inv.stuff_id])[0]?.prix_base ?? 0) / 4);

    dbRun('UPDATE personnage SET gold_actuel = gold_actuel + $1 WHERE id = $2', [prix, personnage_id]);
    if (inv.quantite <= 1) {
        dbRun('DELETE FROM inventaire WHERE id = $1', [inventaire_id]);
    } else {
        dbRun('UPDATE inventaire SET quantite = quantite - 1 WHERE id = $1', [inventaire_id]);
    }
    await saveDb();
    return prix;
}

// ── Magasin ───────────────────────────────────────────────────────────────────

export async function getMagasins(): Promise<magasin[]> {
    await getDb();
    return dbSelect<magasin>('SELECT * FROM magasin');
}

export async function getMagasinInventaire(magasin_id: number): Promise<magasin_inventaire[]> {
    await getDb();
    return dbSelect<magasin_inventaire>('SELECT * FROM magasin_inventaire WHERE magasin_id = $1', [magasin_id]);
}

// ── Tâche ─────────────────────────────────────────────────────────────────────

export async function getTaches(): Promise<tache[]> {
    await getDb();
    return dbSelect<tache>('SELECT * FROM tache');
}

export async function createTache(t: Omit<tache, 'id'>): Promise<void> {
    await getDb();
    const dateCreation = new Date().toISOString();
    dbRun(
        `INSERT INTO tache (nom, type_activite, type, difficulte, exp_recompense, gold_recompense, pv_vie_penalite, duree_jours, date_creation, date_limite)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [t.nom, t.type_activite, t.type ?? 'ponctuelle', t.difficulte, t.exp_recompense, t.gold_recompense, t.pv_vie_penalite, t.duree_jours ?? null, dateCreation, t.date_limite ?? null]
    );
    await saveDb();
}

export async function supprimerRoutine(tache_id: number): Promise<void> {
    await getDb();
    const t = dbSelect<tache>('SELECT * FROM tache WHERE id = $1', [tache_id])[0];
    if (!t) return;
    if (t.date_creation) {
        const diffDays = (Date.now() - new Date(t.date_creation).getTime()) / 86400000;
        if (diffDays < 7) throw new Error(`Routine créée il y a ${Math.floor(diffDays)}j — suppression possible après 7 jours`);
    }
    dbRun('DELETE FROM tache WHERE id = $1', [tache_id]);
    await saveDb();
}

export async function completerRoutine(personnage_id: number, tache_id: number): Promise<void> {
    await getDb();
    const t = dbSelect<tache>('SELECT * FROM tache WHERE id = $1', [tache_id])[0];
    if (!t) return;
    const stats = ROUTINE_STATS[t.difficulte] ?? ROUTINE_STATS[1];
    const p     = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    const multi = getModeMultiplier(p?.mode ?? 'normal');
    dbRun(
        `UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3`,
        [Math.round(stats.xp * multi), Math.round(stats.gold * multi), personnage_id]
    );
    dbRun(
        'INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)',
        [personnage_id, tache_id, 'succes', t.nom]
    );
    await saveDb();
}

export async function gameOver(personnage_id: number): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;
    dbRun(
        `UPDATE personnage SET level_id=1, experience_actuelle=0, gold_actuel=50, points_stat_disponibles=0 WHERE id=$1`,
        [personnage_id]
    );
    dbRun(
        `UPDATE caracteristique SET
            pv_vie_max=100, pv_vie_actuels=100,
            pv_combat_max=100, pv_combat_actuels=100,
            attq=10, attq_spe=10, def=8, def_spe=8, vitesse=12,
            mana_max=150, mana_actuels=150
         WHERE id=$1`,
        [p.caracteristique_id]
    );
    dbRun(
        `UPDATE personnage SET mode='normal', mode_debut=NULL, dernier_coffre_hebdo=NULL, dernier_coffre_mensuel=NULL WHERE id=$1`,
        [personnage_id]
    );
    dbRun(`DELETE FROM personnage_competence WHERE personnage_id = $1`, [personnage_id]);
    dbRun(`DELETE FROM competence WHERE source = 'donjon'`);
    dbRun(`DELETE FROM inventaire WHERE personnage_id = $1`, [personnage_id]);
    await saveDb();
}

export async function acheterStat(personnage_id: number, stat: StatAllouable): Promise<void> {
    await getDb();
    const prix = STAT_SHOP_PRIX[stat] ?? 300;
    const p    = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) throw new Error('Personnage introuvable');
    if (p.gold_actuel < prix) throw new Error('Or insuffisant');

    dbRun('UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2', [prix, personnage_id]);

    if (stat === 'pv_combat_max') {
        dbRun('UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1', [p.caracteristique_id]);
    } else if (stat === 'mana_max') {
        dbRun('UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1', [p.caracteristique_id]);
    } else {
        dbRun(`UPDATE caracteristique SET ${stat} = ${stat} + 1 WHERE id = $1`, [p.caracteristique_id]);
    }
    await saveDb();
}

export async function updateManaActuels(personnage_id: number, mana: number): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;
    dbRun('UPDATE caracteristique SET mana_actuels = MAX(0, MIN(mana_max, $1)) WHERE id = $2', [mana, p.caracteristique_id]);
    await saveDb();
}

export async function regenMana(personnage_id: number, montant: number): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;
    dbRun('UPDATE caracteristique SET mana_actuels = MIN(mana_max, mana_actuels + $1) WHERE id = $2', [montant, p.caracteristique_id]);
    await saveDb();
}

export async function checkDailyPenalties(personnage_id: number): Promise<{ gameOver: boolean }> {
    await getDb();
    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return { gameOver: false };

    if ((p as any).dernier_check === today) return { gameOver: false };

    // 1. Routines non faites hier
    const routines = dbSelect<tache>(
        `SELECT * FROM tache WHERE type = 'routine' AND (date_creation IS NULL OR date(date_creation) <= $1)`,
        [yesterday]
    );
    for (const r of routines) {
        const done = dbSelect<{ id: number }>(
            `SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'penalite') AND date(date_action) = $3`,
            [personnage_id, r.id, yesterday]
        );
        if (done.length === 0) {
            const mode = p.mode ?? 'normal';
            if (mode === 'cauchemar') {
                dbRun(
                    `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)`,
                    [personnage_id, r.id, r.nom]
                );
                dbRun(`UPDATE personnage SET dernier_check = $1 WHERE id = $2`, [today, personnage_id]);
                await saveDb();
                await gameOver(personnage_id);
                return { gameOver: true };
            }
            if (mode === 'hard' || (p as any).jokers_disponibles <= 0) {
                const pen = (ROUTINE_STATS[r.difficulte] ?? ROUTINE_STATS[1]).pv;
                dbRun(
                    `UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2`,
                    [pen, p.caracteristique_id]
                );
                dbRun(
                    `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'penalite', $3)`,
                    [personnage_id, r.id, r.nom]
                );
            } else {
                dbRun(`UPDATE personnage SET jokers_disponibles = jokers_disponibles - 1 WHERE id = $1`, [personnage_id]);
                (p as any).jokers_disponibles--;
                dbRun(
                    `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'joker', $3)`,
                    [personnage_id, r.id, r.nom]
                );
            }
        }
    }

    // 2. Tâches ponctuelles expirées
    const ponctuelles = dbSelect<tache>(`SELECT * FROM tache WHERE type = 'ponctuelle'`);
    for (const t of ponctuelles) {
        let expireStr: string | null = null;
        if (t.date_limite) {
            expireStr = t.date_limite;
        } else if (t.date_creation && t.duree_jours) {
            const expireDate = new Date(t.date_creation);
            expireDate.setDate(expireDate.getDate() + t.duree_jours);
            expireStr = expireDate.toISOString().split('T')[0];
        }
        if (!expireStr || expireStr >= today) continue;

        const done = dbSelect<{ id: number }>(
            `SELECT id FROM historique_activite WHERE personnage_id = $1 AND tache_id = $2 AND statut IN ('succes', 'expire')`,
            [personnage_id, t.id]
        );
        if (done.length === 0) {
            dbRun(
                `UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2`,
                [t.pv_vie_penalite, p.caracteristique_id]
            );
            dbRun(
                `INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, 'expire', $3)`,
                [personnage_id, t.id, t.nom]
            );
        }
    }

    dbRun(`UPDATE personnage SET dernier_check = $1 WHERE id = $2`, [today, personnage_id]);

    const caRows = dbSelect<{ pv_vie_actuels: number }>(
        'SELECT pv_vie_actuels FROM caracteristique WHERE id = $1',
        [p.caracteristique_id]
    );
    if ((caRows[0]?.pv_vie_actuels ?? 1) <= 0) {
        await saveDb();
        await gameOver(personnage_id);
        return { gameOver: true };
    }
    await saveDb();
    return { gameOver: false };
}

export async function completerTache(personnage_id: number, tache_id: number): Promise<void> {
    await getDb();
    const t = dbSelect<tache>('SELECT * FROM tache WHERE id = $1', [tache_id])[0];
    if (!t) return;

    const p     = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    const multi = getModeMultiplier(p?.mode ?? 'normal');

    dbRun(
        `UPDATE personnage SET experience_actuelle = experience_actuelle + $1, gold_actuel = gold_actuel + $2 WHERE id = $3`,
        [Math.round(t.exp_recompense * multi), Math.round(t.gold_recompense * multi), personnage_id]
    );
    dbRun(
        'INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)',
        [personnage_id, tache_id, 'complete', t.nom]
    );
    dbRun('UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1', [tache_id]);
    dbRun('DELETE FROM tache WHERE id = $1', [tache_id]);
    await saveDb();
}

export async function echouerTache(personnage_id: number, tache_id: number): Promise<{ gameOver: boolean }> {
    await getDb();
    const t = dbSelect<tache>('SELECT * FROM tache WHERE id = $1', [tache_id])[0];
    if (!t) return { gameOver: false };

    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return { gameOver: false };

    if ((p.mode ?? 'normal') === 'cauchemar') {
        dbRun('INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)', [personnage_id, tache_id, 'echec', t.nom]);
        dbRun('UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1', [tache_id]);
        dbRun('DELETE FROM tache WHERE id = $1', [tache_id]);
        await saveDb();
        await gameOver(personnage_id);
        return { gameOver: true };
    }

    dbRun(`UPDATE caracteristique SET pv_vie_actuels = MAX(0, pv_vie_actuels - $1) WHERE id = $2`, [t.pv_vie_penalite, p.caracteristique_id]);
    dbRun('INSERT INTO historique_activite (personnage_id, tache_id, statut, nom_tache) VALUES ($1, $2, $3, $4)', [personnage_id, tache_id, 'echec', t.nom]);
    dbRun('UPDATE historique_activite SET tache_id = NULL WHERE tache_id = $1', [tache_id]);
    dbRun('DELETE FROM tache WHERE id = $1', [tache_id]);

    const pv = dbSelect<{ pv_vie_actuels: number }>('SELECT pv_vie_actuels FROM caracteristique WHERE id = $1', [p.caracteristique_id])[0]?.pv_vie_actuels ?? 1;
    if (pv <= 0) {
        await saveDb();
        await gameOver(personnage_id);
        return { gameOver: true };
    }
    await saveDb();
    return { gameOver: false };
}

// ── Historique activité ───────────────────────────────────────────────────────

export async function calculerStreak(personnage_id: number): Promise<{ actuel: number; record: number }> {
    await getDb();
    const rows = dbSelect<{ jour: string }>(
        `SELECT DISTINCT date(h.date_action) as jour
         FROM historique_activite h
         WHERE h.personnage_id = $1 AND h.statut = 'succes'
         AND date(h.date_action) NOT IN (
             SELECT DISTINCT date(date_action)
             FROM historique_activite
             WHERE personnage_id = $1 AND statut = 'penalite'
         )
         ORDER BY jour DESC`,
        [personnage_id]
    );
    if (rows.length === 0) return { actuel: 0, record: 0 };

    const jours     = rows.map(r => r.jour);
    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let actuel = 0;
    let ref = jours[0] === today || jours[0] === yesterday ? jours[0] : null;
    if (ref) {
        actuel = 1;
        for (let i = 1; i < jours.length; i++) {
            const expected = new Date(new Date(ref).getTime() - 86400000).toISOString().split('T')[0];
            if (jours[i] === expected) { actuel++; ref = jours[i]; }
            else break;
        }
    }

    let record = 0, courant = 1;
    for (let i = 1; i < jours.length; i++) {
        const expected = new Date(new Date(jours[i - 1]).getTime() - 86400000).toISOString().split('T')[0];
        if (jours[i] === expected) { courant++; }
        else { record = Math.max(record, courant); courant = 1; }
    }
    record = Math.max(record, courant, actuel);

    return { actuel, record };
}

export async function getHistoriqueActivite(personnage_id: number): Promise<historique_activite[]> {
    await getDb();
    return dbSelect<historique_activite>(
        'SELECT * FROM historique_activite WHERE personnage_id = $1 ORDER BY date_action DESC',
        [personnage_id]
    );
}

export async function addHistoriqueActivite(personnage_id: number, tache_id: number, statut: string): Promise<void> {
    await getDb();
    dbRun('INSERT INTO historique_activite (personnage_id, tache_id, statut) VALUES ($1, $2, $3)', [personnage_id, tache_id, statut]);
    await saveDb();
}

// ── Compétences ───────────────────────────────────────────────────────────────

export async function getCompetences(): Promise<Competence[]> {
    await getDb();
    return dbSelect<Competence>("SELECT * FROM competence WHERE source != 'donjon' OR source IS NULL ORDER BY prix_boutique ASC");
}

export async function getCompetencesDonjon(): Promise<Competence[]> {
    await getDb();
    return dbSelect<Competence>("SELECT * FROM competence WHERE source = 'donjon' ORDER BY rarete ASC");
}

export async function resetRunDonjon(personnage_id: number): Promise<void> {
    await getDb();
    dbRun(
        `DELETE FROM personnage_competence
         WHERE personnage_id = $1
         AND competence_id IN (SELECT id FROM competence WHERE source = 'donjon')`,
        [personnage_id]
    );
    dbRun(`DELETE FROM competence WHERE source = 'donjon'`);
    await saveDb();
}

export async function resetTotalGameOver(personnage_id: number): Promise<void> {
    await getDb();
    dbRun(`DELETE FROM personnage_competence WHERE personnage_id = $1`, [personnage_id]);
    dbRun(`DELETE FROM competence WHERE source = 'donjon'`);
    dbRun(`DELETE FROM inventaire WHERE personnage_id = $1`, [personnage_id]);
    await saveDb();
}

export async function getPersonnageCompetences(personnage_id: number): Promise<(PersonnageCompetence & { competence: Competence })[]> {
    await getDb();
    const rows = dbSelect<PersonnageCompetence & Competence & { comp_id: number }>(
        `SELECT pc.id, pc.personnage_id, pc.competence_id, pc.est_equipee,
                c.id as comp_id, c.nom, c.description, c.type, c.effet_type,
                c.puissance, c.effet_secondaire,
                c.valeur, c.duree_tours, c.rarete, c.prix_boutique,
                c.element, c.source, c.cout_mana
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
            puissance: (r as any).puissance ?? 0,
            effet_secondaire: (r as any).effet_secondaire ?? null,
            valeur: r.valeur,
            duree_tours: r.duree_tours,
            rarete: r.rarete,
            prix_boutique: r.prix_boutique,
            element: (r as any).element ?? 'neutre',
            source: (r as any).source ?? 'boutique',
            cout_mana: (r as any).cout_mana ?? 0,
        } as Competence,
    }));
}

export async function acheterCompetence(personnage_id: number, competence_id: number): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) throw new Error('Personnage introuvable');

    const c = dbSelect<Competence>('SELECT * FROM competence WHERE id = $1', [competence_id])[0];
    if (!c) throw new Error('Compétence introuvable');

    if (p.gold_actuel < c.prix_boutique) throw new Error('Or insuffisant');

    const existing = dbSelect<PersonnageCompetence>(
        'SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2',
        [personnage_id, competence_id]
    );
    if (existing.length > 0) throw new Error('Compétence déjà possédée');

    dbRun('UPDATE personnage SET gold_actuel = gold_actuel - $1 WHERE id = $2', [c.prix_boutique, personnage_id]);
    dbRun('INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)', [personnage_id, competence_id]);
    await saveDb();
}

export async function equiperCompetence(personnage_id: number, pc_id: number): Promise<void> {
    await getDb();
    const equipped = dbSelect<{ cnt: number }>(
        'SELECT COUNT(*) as cnt FROM personnage_competence WHERE personnage_id = $1 AND est_equipee = 1',
        [personnage_id]
    );
    if (equipped[0].cnt >= 6) throw new Error('Maximum 6 compétences équipées');
    dbRun('UPDATE personnage_competence SET est_equipee = 1 WHERE id = $1', [pc_id]);
    await saveDb();
}

export async function desequiperCompetence(pc_id: number): Promise<void> {
    await getDb();
    dbRun('UPDATE personnage_competence SET est_equipee = 0 WHERE id = $1', [pc_id]);
    await saveDb();
}

export async function ajouterRecompenseDonjon(personnage_id: number, type: 'stuff' | 'competence', item_id: number): Promise<void> {
    await getDb();
    if (type === 'stuff') {
        dbRun(`INSERT OR IGNORE INTO inventaire (personnage_id, stuff_id, quantite, est_equipe) VALUES ($1, $2, 0, 0)`, [personnage_id, item_id]);
        dbRun(`UPDATE inventaire SET quantite = quantite + 1 WHERE personnage_id = $1 AND stuff_id = $2`, [personnage_id, item_id]);
    } else {
        const existing = dbSelect<PersonnageCompetence>(
            'SELECT * FROM personnage_competence WHERE personnage_id = $1 AND competence_id = $2',
            [personnage_id, item_id]
        );
        if (existing.length === 0) {
            dbRun('INSERT INTO personnage_competence (personnage_id, competence_id, est_equipee) VALUES ($1, $2, 0)', [personnage_id, item_id]);
        }
    }
    await saveDb();
}

export async function resetPvCombat(personnage_id: number): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;
    dbRun('UPDATE caracteristique SET pv_combat_actuels = pv_combat_max, mana_actuels = mana_max WHERE id = $1', [p.caracteristique_id]);
    await saveDb();
}

export async function updatePvCombat(personnage_id: number, pv_actuels: number): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;
    dbRun('UPDATE caracteristique SET pv_combat_actuels = MAX(0, $1) WHERE id = $2', [pv_actuels, p.caracteristique_id]);
    await saveDb();
}

// ── Level Up ──────────────────────────────────────────────────────────────────

export async function checkLevelUp(personnage_id: number): Promise<{ levels_gagnes: number; points_gagnes: number }> {
    await getDb();
    let levels_gagnes = 0;
    let points_gagnes = 0;

    while (true) {
        const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
        if (!p) break;
        const currentLevel = dbSelect<Level>('SELECT * FROM level WHERE id = $1', [p.level_id])[0];
        if (!currentLevel) break;
        if (p.experience_actuelle < currentLevel.exp_max_requise || p.level_id >= 10) break;

        dbRun(
            'UPDATE personnage SET level_id = $1, points_stat_disponibles = points_stat_disponibles + 5 WHERE id = $2',
            [p.level_id + 1, personnage_id]
        );
        levels_gagnes++;
        points_gagnes += 5;
    }

    if (levels_gagnes > 0) await saveDb();
    return { levels_gagnes, points_gagnes };
}

export async function allouerStat(personnage_id: number, stat: StatAllouable): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p || (p.points_stat_disponibles ?? 0) <= 0) return;

    dbRun('UPDATE personnage SET points_stat_disponibles = points_stat_disponibles - 1 WHERE id = $1', [personnage_id]);

    if (stat === 'pv_combat_max') {
        dbRun('UPDATE caracteristique SET pv_combat_max = pv_combat_max + 5, pv_combat_actuels = pv_combat_actuels + 5 WHERE id = $1', [p.caracteristique_id]);
    } else if (stat === 'mana_max') {
        dbRun('UPDATE caracteristique SET mana_max = mana_max + 15, mana_actuels = mana_actuels + 15 WHERE id = $1', [p.caracteristique_id]);
    } else {
        dbRun(`UPDATE caracteristique SET ${stat} = ${stat} + 1 WHERE id = $1`, [p.caracteristique_id]);
    }
    await saveDb();
}

// ── Compteurs loot box ────────────────────────────────────────────────────────

export async function incrementerCompteurRoutines(personnage_id: number): Promise<Rarete> {
    await getDb();
    dbRun('UPDATE personnage SET compteur_routines = COALESCE(compteur_routines, 0) + 1 WHERE id = $1', [personnage_id]);
    const count = dbSelect<{ compteur_routines: number }>('SELECT compteur_routines FROM personnage WHERE id = $1', [personnage_id])[0]?.compteur_routines ?? 1;
    await saveDb();
    if (count >= 20) return 'epique';
    if (count >= 15) return 'rare';
    if (count >= 10) return 'peu_commun';
    return 'commun';
}

export async function incrementerLootDonjon(personnage_id: number): Promise<Rarete> {
    await getDb();
    dbRun('UPDATE personnage SET compteur_loot_donjon = COALESCE(compteur_loot_donjon, 0) + 1 WHERE id = $1', [personnage_id]);
    const count = dbSelect<{ compteur_loot_donjon: number }>('SELECT compteur_loot_donjon FROM personnage WHERE id = $1', [personnage_id])[0]?.compteur_loot_donjon ?? 1;
    await saveDb();
    if (count % 50 === 0) return 'legendaire';
    const idx = Math.floor((count - 1) / 3) % 3;
    return (['peu_commun', 'rare', 'epique'] as Rarete[])[idx];
}

// ── Affinités élémentaires ────────────────────────────────────────────────────

export async function getPersonnageAffinites(personnage_id: number): Promise<PersonnageAffinite[]> {
    await getDb();
    try {
        return dbSelect<PersonnageAffinite>('SELECT * FROM personnage_affinite WHERE personnage_id = $1', [personnage_id]);
    } catch { return []; }
}

// ── Modes de jeu ──────────────────────────────────────────────────────────────

export async function changerMode(personnage_id: number, newMode: GameMode): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;
    const currentMode = (p.mode ?? 'normal') as GameMode;
    const modeRank: Record<GameMode, number> = { normal: 0, hard: 1, cauchemar: 2 };
    if (modeRank[newMode] < modeRank[currentMode]) {
        if (p.mode_debut) {
            const diffDays = (Date.now() - new Date(p.mode_debut).getTime()) / 86400000;
            if (diffDays < 3) throw new Error(`Mode actif depuis ${Math.floor(diffDays)}j — retour possible après 3 jours`);
        }
    }
    const today     = new Date().toISOString().split('T')[0];
    const modeDebut = newMode !== 'normal' ? (currentMode !== 'normal' ? p.mode_debut : today) : null;
    dbRun('UPDATE personnage SET mode = $1, mode_debut = $2 WHERE id = $3', [newMode, modeDebut, personnage_id]);
    await saveDb();
}

export async function checkModeCoffres(personnage_id: number): Promise<{ hebdo: Rarete | null; mensuel: Rarete | null }> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p || (p.mode ?? 'normal') === 'normal') return { hebdo: null, mensuel: null };
    const mode  = p.mode as GameMode;
    const now   = Date.now();
    const ref   = p.mode_debut ? new Date(p.mode_debut).getTime() : now;
    const today = new Date().toISOString().split('T')[0];
    let hebdo: Rarete | null = null;
    let mensuel: Rarete | null = null;

    const lastMensuel = p.dernier_coffre_mensuel ? new Date(p.dernier_coffre_mensuel).getTime() : ref;
    if ((now - lastMensuel) >= 30 * 86400000) {
        mensuel = mode === 'cauchemar' ? 'legendaire' : 'epique';
        dbRun('UPDATE personnage SET dernier_coffre_mensuel = $1 WHERE id = $2', [today, personnage_id]);
    }
    const lastHebdo = p.dernier_coffre_hebdo ? new Date(p.dernier_coffre_hebdo).getTime() : ref;
    if ((now - lastHebdo) >= 7 * 86400000) {
        hebdo = mode === 'cauchemar' ? 'epique' : 'rare';
        dbRun('UPDATE personnage SET dernier_coffre_hebdo = $1 WHERE id = $2', [today, personnage_id]);
    }
    if (hebdo || mensuel) await saveDb();
    return { hebdo, mensuel };
}

// ── Onboarding & Stats ────────────────────────────────────────────────────────

export async function renommerPersonnage(personnage_id: number, nom: string): Promise<void> {
    await getDb();
    dbRun('UPDATE personnage SET nom = $1 WHERE id = $2', [nom.trim(), personnage_id]);
    await saveDb();
}

export async function getStatsResume(personnage_id: number): Promise<{
    taches_succes: number; taches_echec: number; routines_faites: number; penalites: number;
}> {
    await getDb();
    const rows = dbSelect<{ statut: string; type_tache: string | null; cnt: number }>(
        `SELECT h.statut, t.type as type_tache, COUNT(*) as cnt
         FROM historique_activite h
         LEFT JOIN tache t ON t.id = h.tache_id
         WHERE h.personnage_id = $1
         GROUP BY h.statut, t.type`,
        [personnage_id]
    );
    let taches_succes = 0, taches_echec = 0, routines_faites = 0, penalites = 0;
    for (const r of rows) {
        if (r.statut === 'succes' && r.type_tache === 'routine') routines_faites += r.cnt;
        else if (r.statut === 'succes')   taches_succes += r.cnt;
        else if (r.statut === 'echec')    taches_echec  += r.cnt;
        else if (r.statut === 'penalite') penalites     += r.cnt;
    }
    return { taches_succes, taches_echec, routines_faites, penalites };
}

// ── Titres ────────────────────────────────────────────────────────────────────

export async function calculerEtAttribuerTitre(personnage_id: number): Promise<void> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return;

    const leg = dbSelect<{ cnt: number }>(
        `SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`, [personnage_id]);
    if ((leg[0]?.cnt ?? 0) >= 3) { await _setTitre(p, 30); return; }

    if (p.gold_actuel >= 5000) { await _setTitre(p, 29); return; }

    const { actuel } = await calculerStreak(personnage_id);
    if (actuel >= 365) { await _setTitre(p, 28); return; }
    if (actuel >= 180) { await _setTitre(p, 27); return; }
    if (actuel >= 30)  { await _setTitre(p, 26); return; }
    if (actuel >= 14)  { await _setTitre(p, 25); return; }
    if (actuel >= 7)   { await _setTitre(p, 24); return; }

    const elemCounts = dbSelect<{ element: string; cnt: number }>(
        `SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`, [personnage_id]);
    const ELEM_TIER2: Record<string, number> = { feu:14, eau:15, terre:16, air:17, technologie:18, surnaturel:19, mort:20, vie:21, lumiere:22, tenebres:23 };
    const ELEM_TIER1: Record<string, number> = { feu:4,  eau:5,  terre:6,  air:7,  technologie:8,  surnaturel:9,  mort:10, vie:11, lumiere:12, tenebres:13 };
    for (const row of elemCounts) {
        if ((row.cnt ?? 0) >= 10 && ELEM_TIER2[row.element]) { await _setTitre(p, ELEM_TIER2[row.element]); return; }
    }
    for (const row of elemCounts) {
        if ((row.cnt ?? 0) >= 5 && ELEM_TIER1[row.element]) { await _setTitre(p, ELEM_TIER1[row.element]); return; }
    }

    if (p.level_id >= 5) { await _setTitre(p, 3); return; }
    if (p.level_id >= 3) { await _setTitre(p, 2); return; }
    await _setTitre(p, 1);
}

export async function calculerTitresDebloques(personnage_id: number): Promise<number[]> {
    await getDb();
    const p = dbSelect<Personnage>('SELECT * FROM personnage WHERE id = $1', [personnage_id])[0];
    if (!p) return [1];

    const debloques: number[] = [1];

    if (p.level_id >= 3) debloques.push(2);
    if (p.level_id >= 5) debloques.push(3);
    if (p.gold_actuel >= 5000) debloques.push(29);

    const { actuel, record } = await calculerStreak(personnage_id);
    const maxStreak = Math.max(actuel, record);
    if (maxStreak >= 7)   debloques.push(24);
    if (maxStreak >= 14)  debloques.push(25);
    if (maxStreak >= 30)  debloques.push(26);
    if (maxStreak >= 180) debloques.push(27);
    if (maxStreak >= 365) debloques.push(28);

    const elemCounts = dbSelect<{ element: string; cnt: number }>(
        `SELECT c.element, COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 GROUP BY c.element`, [personnage_id]);
    const ELEM_TIER1: Record<string, number> = { feu:4, eau:5, terre:6, air:7, technologie:8, surnaturel:9, mort:10, vie:11, lumiere:12, tenebres:13 };
    const ELEM_TIER2: Record<string, number> = { feu:14, eau:15, terre:16, air:17, technologie:18, surnaturel:19, mort:20, vie:21, lumiere:22, tenebres:23 };
    for (const row of elemCounts) {
        if ((row.cnt ?? 0) >= 5  && ELEM_TIER1[row.element]) debloques.push(ELEM_TIER1[row.element]);
        if ((row.cnt ?? 0) >= 10 && ELEM_TIER2[row.element]) debloques.push(ELEM_TIER2[row.element]);
    }

    const leg = dbSelect<{ cnt: number }>(
        `SELECT COUNT(*) as cnt FROM personnage_competence pc
         JOIN competence c ON c.id = pc.competence_id
         WHERE pc.personnage_id = $1 AND c.rarete = 'legendaire'`, [personnage_id]);
    if ((leg[0]?.cnt ?? 0) >= 3) debloques.push(30);

    return debloques;
}

async function _setTitre(p: Personnage, titre_id: number): Promise<void> {
    if (p.titre_id === titre_id) return;
    dbRun('UPDATE personnage SET titre_id = $1 WHERE id = $2', [titre_id, p.id]);
    await saveDb();
}

// ── API interne pour classes.ts ───────────────────────────────────────────────

export async function _classesSelect<T>(sql: string, params: unknown[] = []): Promise<T[]> {
    await getDb();
    return dbSelect<T>(sql, params);
}

export async function _classesRun(sql: string, params: unknown[] = []): Promise<void> {
    await getDb();
    dbRun(sql, params);
    await saveDb();
}

// ── Export / Import save ──────────────────────────────────────────────────────

export async function exporterSave(): Promise<void> {
    const db   = await getDb();
    const data = db.export();
    const blob = new Blob([data.buffer as ArrayBuffer], { type: 'application/octet-stream' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'rogue_life_save.db';
    a.click();
    URL.revokeObjectURL(url);
}

export async function importerSave(file: File): Promise<void> {
    const buffer = await file.arrayBuffer();
    const data   = new Uint8Array(buffer);
    const SQL    = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' });
    sqlDb        = new SQL.Database(data);
    await saveDb();
}
