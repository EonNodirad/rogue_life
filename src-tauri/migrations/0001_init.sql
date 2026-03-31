-- ============================================================
-- SCHÉMA
-- ============================================================

CREATE TABLE IF NOT EXISTS caracteristique (
  id INTEGER PRIMARY KEY,
  pv_vie_max INTEGER,
  pv_vie_actuels INTEGER,
  pv_combat_max INTEGER,
  pv_combat_actuels INTEGER,
  attq INTEGER,
  attq_spe INTEGER,
  def INTEGER,
  def_spe INTEGER,
  vitesse INTEGER
);

CREATE TABLE IF NOT EXISTS level (
  id INTEGER PRIMARY KEY,
  exp_max_requise INTEGER
);

CREATE TABLE IF NOT EXISTS classe (
  id INTEGER PRIMARY KEY,
  nom TEXT
);

CREATE TABLE IF NOT EXISTS titre (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  bonus_stat TEXT
);

CREATE TABLE IF NOT EXISTS personnage (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  experience_actuelle INTEGER DEFAULT 0,
  gold_actuel INTEGER DEFAULT 0,
  classe_id INTEGER,
  titre_id INTEGER,
  level_id INTEGER,
  caracteristique_id INTEGER,
  FOREIGN KEY (classe_id) REFERENCES classe(id),
  FOREIGN KEY (titre_id) REFERENCES titre(id),
  FOREIGN KEY (level_id) REFERENCES level(id),
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

CREATE TABLE IF NOT EXISTS monstre (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  caracteristique_id INTEGER,
  exp_recompense INTEGER,
  gold_recompense INTEGER,
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

CREATE TABLE IF NOT EXISTS donjon (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  niveau_recommande INTEGER
);

CREATE TABLE IF NOT EXISTS donjon_monstre (
  donjon_id INTEGER,
  monstre_id INTEGER,
  taux_apparition INTEGER,
  PRIMARY KEY (donjon_id, monstre_id),
  FOREIGN KEY (donjon_id) REFERENCES donjon(id),
  FOREIGN KEY (monstre_id) REFERENCES monstre(id)
);

CREATE TABLE IF NOT EXISTS historique_poids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  date_mesure TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valeur_poids REAL,
  FOREIGN KEY (personnage_id) REFERENCES personnage(id)
);

CREATE TABLE IF NOT EXISTS stuff (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  bonus_attq INTEGER DEFAULT 0,
  bonus_attq_spe INTEGER DEFAULT 0,
  bonus_def INTEGER DEFAULT 0,
  bonus_def_spe INTEGER DEFAULT 0,
  bonus_vitesse INTEGER DEFAULT 0,
  bonus_pv_combat INTEGER DEFAULT 0,
  prix_base INTEGER
);

CREATE TABLE IF NOT EXISTS inventaire (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  stuff_id INTEGER,
  quantite INTEGER DEFAULT 1,
  est_equipe INTEGER DEFAULT 0,
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

CREATE TABLE IF NOT EXISTS magasin (
  id INTEGER PRIMARY KEY,
  nom TEXT
);

CREATE TABLE IF NOT EXISTS magasin_inventaire (
  magasin_id INTEGER,
  stuff_id INTEGER,
  prix_vente_local INTEGER,
  PRIMARY KEY (magasin_id, stuff_id),
  FOREIGN KEY (magasin_id) REFERENCES magasin(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

CREATE TABLE IF NOT EXISTS tache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  type_activite TEXT,
  difficulte INTEGER,
  exp_recompense INTEGER,
  gold_recompense INTEGER,
  pv_vie_penalite INTEGER
);

CREATE TABLE IF NOT EXISTS historique_activite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  tache_id INTEGER,
  date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  statut TEXT,
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (tache_id) REFERENCES tache(id)
);

-- ============================================================
-- DONNÉES INITIALES
-- ============================================================

-- Niveaux (1 à 10)
INSERT OR IGNORE INTO level (id, exp_max_requise) VALUES
  (1, 100),
  (2, 250),
  (3, 500),
  (4, 900),
  (5, 1500),
  (6, 2300),
  (7, 3300),
  (8, 4600),
  (9, 6200),
  (10, 9999);

-- Classes
INSERT OR IGNORE INTO classe (id, nom) VALUES
  (1, 'Guerrier'),
  (2, 'Mage'),
  (3, 'Voleur');

-- Titres
INSERT OR IGNORE INTO titre (id, nom, bonus_stat) VALUES
  (1, 'Novice', 'aucun'),
  (2, 'Aventurier', 'attq+2'),
  (3, 'Héros', 'attq+5,def+3');

-- Stats du personnage par défaut
INSERT OR IGNORE INTO caracteristique (id, pv_vie_max, pv_vie_actuels, pv_combat_max, pv_combat_actuels, attq, attq_spe, def, def_spe, vitesse) VALUES
  (1, 100, 100, 100, 100, 10, 10, 8, 8, 12);

-- Personnage par défaut
INSERT OR IGNORE INTO personnage (id, nom, experience_actuelle, gold_actuel, classe_id, titre_id, level_id, caracteristique_id) VALUES
  (1, 'Héros', 0, 50, 1, 1, 1, 1);

-- Stats des monstres
INSERT OR IGNORE INTO caracteristique (id, pv_vie_max, pv_vie_actuels, pv_combat_max, pv_combat_actuels, attq, attq_spe, def, def_spe, vitesse) VALUES
  (2, 30, 30, 30, 30, 6, 0, 3, 0, 8),    -- Slime
  (3, 60, 60, 60, 60, 12, 0, 6, 0, 10),  -- Gobelin
  (4, 120, 120, 120, 120, 20, 5, 12, 5, 14); -- Troll

-- Monstres
INSERT OR IGNORE INTO monstre (id, nom, caracteristique_id, exp_recompense, gold_recompense) VALUES
  (1, 'Slime', 2, 20, 5),
  (2, 'Gobelin', 3, 45, 15),
  (3, 'Troll', 4, 100, 40);

-- Donjons
INSERT OR IGNORE INTO donjon (id, nom, niveau_recommande) VALUES
  (1, 'Grotte des Débutants', 1),
  (2, 'Forêt Maudite', 3),
  (3, 'Tour du Chaos', 6);

-- Monstres dans les donjons
INSERT OR IGNORE INTO donjon_monstre (donjon_id, monstre_id, taux_apparition) VALUES
  (1, 1, 80),
  (1, 2, 20),
  (2, 2, 60),
  (2, 3, 40),
  (3, 3, 100);

-- Items
-- (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base) VALUES
  (1, 'Épée en bois',   3, 0, 0, 0, 0, 0,  30),
  (2, 'Bouclier en bois', 0, 0, 3, 0, 0, 0, 25),
  (3, 'Dague rouillée', 5, 1, 0, 0, 2, 0,  50),
  (4, 'Armure de cuir', 0, 0, 6, 2, 0, 10, 80),
  (5, 'Épée de fer',   10, 3, 0, 0, 0, 0, 150);

-- Boutique
INSERT OR IGNORE INTO magasin (id, nom) VALUES
  (1, 'Boutique du Village');

INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1, 1, 35),
  (1, 2, 30),
  (1, 3, 60),
  (1, 4, 90),
  (1, 5, 170);