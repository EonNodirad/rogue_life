-- ============================================================
-- SCHÉMA COMPLET DE LA BASE DE DONNÉES ROGUE LIFE
-- init.sql + migration_001 + migration_002 + migration_003
-- ============================================================

-- Statistiques de base partagées entre personnages et monstres
CREATE TABLE caracteristique (
  id INTEGER PRIMARY KEY,
  pv_vie_max INTEGER,
  pv_vie_actuels INTEGER,
  pv_combat_max INTEGER,
  pv_combat_actuels INTEGER,
  attq INTEGER,
  attq_spe INTEGER,
  def INTEGER,
  def_spe INTEGER,
  vitesse INTEGER,
  mana_max INTEGER DEFAULT 150,
  mana_actuels INTEGER DEFAULT 150
);

CREATE TABLE level (
  id INTEGER PRIMARY KEY,
  exp_max_requise INTEGER
);

-- Arbre de classes (3 arbres : guerrier, vagabond, sorcier ; 3 paliers)
CREATE TABLE classe (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  arbre TEXT NOT NULL,          -- 'guerrier' | 'vagabond' | 'sorcier'
  palier INTEGER NOT NULL,      -- 1 (départ), 4 (tier 2), 7 (tier 3)
  parent_id INTEGER REFERENCES classe(id),
  bonus_attq INTEGER DEFAULT 0,
  bonus_def INTEGER DEFAULT 0,
  bonus_attq_spe INTEGER DEFAULT 0,
  bonus_def_spe INTEGER DEFAULT 0,
  bonus_vit INTEGER DEFAULT 0,
  bonus_pv_max INTEGER DEFAULT 0,
  bonus_aff_elem REAL DEFAULT 0
);

CREATE TABLE titre (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  bonus_stat TEXT
);

-- Personnage joueur (une seule instance dans la DB actuellement)
-- migration_002 : avatar
-- migration_003 : donjon_id_actuel
CREATE TABLE personnage (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  experience_actuelle INTEGER DEFAULT 0,
  gold_actuel INTEGER DEFAULT 50,
  classe_id INTEGER,
  titre_id INTEGER,
  level_id INTEGER,
  caracteristique_id INTEGER,
  dernier_check TEXT DEFAULT '',
  jokers_disponibles INTEGER DEFAULT 0,
  points_stat_disponibles INTEGER DEFAULT 0,
  compteur_routines INTEGER DEFAULT 0,
  compteur_loot_donjon INTEGER DEFAULT 0,   -- nombre d'étages complétés (détermine la rareté du loot)
  mode TEXT DEFAULT 'normal',               -- 'normal' | 'hard' | 'cauchemar'
  mode_debut TEXT,                          -- date de début du mode difficile
  dernier_coffre_hebdo TEXT,
  dernier_coffre_mensuel TEXT,
  avatar TEXT DEFAULT NULL,                 -- migration_002
  donjon_id_actuel INTEGER REFERENCES donjon(id) DEFAULT NULL, -- migration_003
  FOREIGN KEY (classe_id) REFERENCES classe(id),
  FOREIGN KEY (titre_id) REFERENCES titre(id),
  FOREIGN KEY (level_id) REFERENCES level(id),
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

CREATE TABLE monstre (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  caracteristique_id INTEGER,
  exp_recompense INTEGER,
  gold_recompense INTEGER,
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

CREATE TABLE donjon (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  niveau_recommande INTEGER
);

-- Quels monstres apparaissent dans quel donjon et à quelle fréquence
CREATE TABLE donjon_monstre (
  donjon_id INTEGER,
  monstre_id INTEGER,
  taux_apparition INTEGER,  -- pourcentage de chance d'apparition
  PRIMARY KEY (donjon_id, monstre_id),
  FOREIGN KEY (donjon_id) REFERENCES donjon(id),
  FOREIGN KEY (monstre_id) REFERENCES monstre(id)
);

-- Historique des runs de donjon par personnage (migration_003)
CREATE TABLE historique_donjon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  donjon_id INTEGER NOT NULL REFERENCES donjon(id),
  etage_max INTEGER NOT NULL DEFAULT 0,
  salle_max INTEGER NOT NULL DEFAULT 0,
  resultat TEXT NOT NULL CHECK (resultat IN ('victoire', 'defaite', 'abandon')),
  date_run TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historique_poids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  date_mesure TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valeur_poids REAL,
  FOREIGN KEY (personnage_id) REFERENCES personnage(id)
);

-- Équipement disponible
CREATE TABLE stuff (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  bonus_attq INTEGER DEFAULT 0,
  bonus_attq_spe INTEGER DEFAULT 0,
  bonus_def INTEGER DEFAULT 0,
  bonus_def_spe INTEGER DEFAULT 0,
  bonus_vitesse INTEGER DEFAULT 0,
  bonus_pv_combat INTEGER DEFAULT 0,
  prix_base INTEGER,
  categorie TEXT DEFAULT 'arme',
  slot TEXT DEFAULT 'arme_1main',   -- 'arme_1main' | 'arme_2main' | 'casque' | 'torse' | 'jambes' | 'bottes' | 'accessoire'
  soin_pv INTEGER DEFAULT 0,
  rarete TEXT DEFAULT 'commun',     -- 'commun' | 'peu_commun' | 'rare' | 'epique' | 'legendaire'
  bonus_aff_elem REAL DEFAULT 0,
  element TEXT DEFAULT 'neutre'
);

-- Inventaire du personnage (stuff possédé)
CREATE TABLE inventaire (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  stuff_id INTEGER,
  quantite INTEGER DEFAULT 1,
  est_equipe INTEGER DEFAULT 0,  -- 0 = non équipé, 1 = équipé
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

CREATE TABLE magasin (
  id INTEGER PRIMARY KEY,
  nom TEXT
);

CREATE TABLE magasin_inventaire (
  magasin_id INTEGER,
  stuff_id INTEGER,
  prix_vente_local INTEGER,
  PRIMARY KEY (magasin_id, stuff_id),
  FOREIGN KEY (magasin_id) REFERENCES magasin(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

-- Tâches IRL à accomplir (ponctuelles ou récurrentes)
CREATE TABLE tache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT,
  type_activite TEXT,
  difficulte INTEGER,
  exp_recompense INTEGER,
  gold_recompense INTEGER,
  pv_vie_penalite INTEGER,
  type TEXT DEFAULT 'ponctuelle',   -- 'ponctuelle' | 'quotidienne' | 'hebdomadaire'
  duree_jours INTEGER,
  date_creation TEXT,
  date_limite TEXT
);

-- Historique des tâches réalisées par le personnage
CREATE TABLE historique_activite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  tache_id INTEGER,
  date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  statut TEXT,                  -- 'success' | 'echec'
  nom_tache TEXT DEFAULT '',    -- copie du nom en cas de suppression de la tâche
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (tache_id) REFERENCES tache(id)
);

-- Compétences actives/passives (source : boutique ou récompense donjon)
CREATE TABLE competence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,           -- 'actif' | 'passif' | 'statut'
  effet_type TEXT NOT NULL,
  puissance INTEGER DEFAULT 0,
  effet_secondaire TEXT DEFAULT NULL,
  valeur INTEGER DEFAULT 0,
  duree_tours INTEGER DEFAULT 0,
  rarete TEXT DEFAULT 'commun',
  prix_boutique INTEGER DEFAULT 50,
  element TEXT DEFAULT 'neutre',
  source TEXT DEFAULT 'boutique',  -- 'boutique' | 'donjon'
  cout_mana INTEGER DEFAULT 0
);

-- Compétences possédées par le personnage
CREATE TABLE personnage_competence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER REFERENCES personnage(id),
  competence_id INTEGER REFERENCES competence(id),
  est_equipee INTEGER DEFAULT 0
);

-- Affinités élémentaires du personnage (bonus % par élément)
CREATE TABLE personnage_affinite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER REFERENCES personnage(id),
  element TEXT NOT NULL,
  bonus_pct INTEGER DEFAULT 0
);

-- Classes débloquées par le personnage
CREATE TABLE personnage_classe_debloquee (
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  classe_id INTEGER NOT NULL REFERENCES classe(id),
  PRIMARY KEY (personnage_id, classe_id)
);
