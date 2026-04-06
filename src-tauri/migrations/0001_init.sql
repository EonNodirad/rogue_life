-- ============================================================
-- SCHÉMA COMPLET (fusion migrations 0001→0014)
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
  vitesse INTEGER,
  mana_max INTEGER DEFAULT 150,
  mana_actuels INTEGER DEFAULT 150
);

CREATE TABLE IF NOT EXISTS level (
  id INTEGER PRIMARY KEY,
  exp_max_requise INTEGER
);

CREATE TABLE IF NOT EXISTS classe (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  arbre TEXT NOT NULL,
  palier INTEGER NOT NULL,
  parent_id INTEGER REFERENCES classe(id),
  bonus_attq INTEGER DEFAULT 0,
  bonus_def INTEGER DEFAULT 0,
  bonus_attq_spe INTEGER DEFAULT 0,
  bonus_def_spe INTEGER DEFAULT 0,
  bonus_vit INTEGER DEFAULT 0,
  bonus_pv_max INTEGER DEFAULT 0,
  bonus_aff_elem REAL DEFAULT 0
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
  dernier_check TEXT DEFAULT '',
  jokers_disponibles INTEGER DEFAULT 0,
  points_stat_disponibles INTEGER DEFAULT 0,
  compteur_routines INTEGER DEFAULT 0,
  compteur_loot_donjon INTEGER DEFAULT 0,
  mode TEXT DEFAULT 'normal',
  mode_debut TEXT,
  dernier_coffre_hebdo TEXT,
  dernier_coffre_mensuel TEXT,
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
  prix_base INTEGER,
  categorie TEXT DEFAULT 'arme',
  slot TEXT DEFAULT 'arme_1main',
  soin_pv INTEGER DEFAULT 0,
  rarete TEXT DEFAULT 'commun',
  bonus_aff_elem REAL DEFAULT 0,
  element TEXT DEFAULT 'neutre'
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
  pv_vie_penalite INTEGER,
  type TEXT DEFAULT 'ponctuelle',
  duree_jours INTEGER,
  date_creation TEXT,
  date_limite TEXT
);

CREATE TABLE IF NOT EXISTS historique_activite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER,
  tache_id INTEGER,
  date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  statut TEXT,
  nom_tache TEXT DEFAULT '',
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (tache_id) REFERENCES tache(id)
);

CREATE TABLE IF NOT EXISTS competence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  effet_type TEXT NOT NULL,
  puissance INTEGER DEFAULT 0,
  effet_secondaire TEXT DEFAULT NULL,
  valeur INTEGER DEFAULT 0,
  duree_tours INTEGER DEFAULT 0,
  rarete TEXT DEFAULT 'commun',
  prix_boutique INTEGER DEFAULT 50,
  element TEXT DEFAULT 'neutre',
  source TEXT DEFAULT 'boutique',
  cout_mana INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personnage_competence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER REFERENCES personnage(id),
  competence_id INTEGER REFERENCES competence(id),
  est_equipee INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personnage_affinite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER REFERENCES personnage(id),
  element TEXT NOT NULL,
  bonus_pct INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personnage_classe_debloquee (
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  classe_id INTEGER NOT NULL REFERENCES classe(id),
  PRIMARY KEY (personnage_id, classe_id)
);

-- ============================================================
-- DONNÉES INITIALES
-- ============================================================

-- Niveaux
INSERT OR IGNORE INTO level (id, exp_max_requise) VALUES
  (1, 100),(2, 250),(3, 500),(4, 900),(5, 1500),
  (6, 2300),(7, 3300),(8, 4600),(9, 6200),(10, 9999);

-- Classes (30 classes sur 3 arbres, 3 paliers)
INSERT OR IGNORE INTO classe VALUES (1,'Guerrier','guerrier',1,NULL,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (2,'Vagabond','vagabond',1,NULL,0,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (3,'Sorcier','sorcier',1,NULL,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (4,'Paladin','guerrier',4,1,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (5,'Tank','guerrier',4,1,0,3,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (6,'Barbare','guerrier',4,1,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (7,'Archer','vagabond',4,2,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (8,'Moine','vagabond',4,2,0,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (9,'Assassin','vagabond',4,2,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (10,'Mage','sorcier',4,3,0,0,3,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (11,'Occultiste','sorcier',4,3,0,0,0,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (12,'Sorceleur','sorcier',4,3,3,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (13,'Guerrier elem','guerrier',7,4,0,0,0,0,0,0,5.0);
INSERT OR IGNORE INTO classe VALUES (14,'Guerrier runique','guerrier',7,4,0,0,3,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (15,'Tank absolu','guerrier',7,5,0,3,0,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (16,'Antimage','guerrier',7,5,0,0,0,6,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (17,'Geant barbare','guerrier',7,6,0,3,0,0,0,15,0.0);
INSERT OR IGNORE INTO classe VALUES (18,'Berserk','guerrier',7,6,6,0,0,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (19,'Ranger','vagabond',7,7,0,0,3,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (20,'Archer lourd','vagabond',7,7,0,0,6,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (21,'Moine itinerant','vagabond',7,8,0,0,0,0,6,0,0.0);
INSERT OR IGNORE INTO classe VALUES (22,'Moine elem','vagabond',7,8,0,0,0,0,0,0,5.0);
INSERT OR IGNORE INTO classe VALUES (23,'Assassin de ombre','vagabond',7,9,0,0,6,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (24,'Assassin degourdit','vagabond',7,9,3,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (25,'Archimage','sorcier',7,10,0,0,6,0,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (26,'Elementaliste','sorcier',7,10,0,0,0,0,0,0,5.0);
INSERT OR IGNORE INTO classe VALUES (27,'Incanteur','sorcier',7,11,0,0,0,3,0,15,0.0);
INSERT OR IGNORE INTO classe VALUES (28,'Mage runique','sorcier',7,11,0,3,0,3,0,0,0.0);
INSERT OR IGNORE INTO classe VALUES (29,'Chasseur de monstre','sorcier',7,12,3,0,0,0,3,0,0.0);
INSERT OR IGNORE INTO classe VALUES (30,'Guerrier mage','sorcier',7,12,3,0,3,0,0,0,0.0);

-- Titres
INSERT OR IGNORE INTO titre (id, nom, bonus_stat) VALUES
  (1, 'Novice',                        'aucun'),
  (2, 'Aventurier',                    'attq+2'),
  (3, 'Héros',                         'attq+5,def+3'),
  -- Maîtrise élémentaire tier 1 (5 comps)
  (4,  'Étincelle Vive',               'feu:5'),
  (5,  'Enfant des Marées',            'eau:5'),
  (6,  'Esprit de Roche',              'terre:5'),
  (7,  'Souffle Léger',                'air:5'),
  (8,  'Apprenti Mécanicien',          'technologie:5'),
  (9,  'Éveillé',                      'surnaturel:5'),
  (10, 'Ombre Errante',                'mort:5'),
  (11, 'Main Verte',                   'vie:5'),
  (12, 'Porteur d''Aube',              'lumiere:5'),
  (13, 'Voile de Nuit',                'tenebres:5'),
  -- Maîtrise élémentaire tier 2 (10 comps)
  (14, 'Seigneur du Brasier',          'feu:10'),
  (15, 'Souverain des Abysses',        'eau:10'),
  (16, 'Pilier de la Création',        'terre:10'),
  (17, 'Tempête Incarnée',             'air:10'),
  (18, 'Grand Architecte du Progrès',  'technologie:10'),
  (19, 'Maître des Arcanes Interdites','surnaturel:10'),
  (20, 'Faucheur Éternel',             'mort:10'),
  (21, 'Gardien de l''Arbre-Monde',   'vie:10'),
  (22, 'Éclat Céleste',               'lumiere:10'),
  (23, 'Prince du Néant',              'tenebres:10'),
  -- Persistance / streak
  (24, 'Disciple Discipliné',          'streak:7'),
  (25, 'Habitué du Royaume',           'streak:14'),
  (26, 'Inflexible',                   'streak:30'),
  (27, 'Ancien de la Cité',            'streak:180'),
  (28, 'Divinité de la Constance',     'streak:365'),
  -- Fortune
  (29, 'Crésus du Donjon',             'gold:5000'),
  -- Chance
  (30, 'Élu du Destin',               'legendaire:3');

-- Caractéristiques (id=1 : joueur ; ids 2-4 : monstres)
INSERT OR IGNORE INTO caracteristique (id, pv_vie_max, pv_vie_actuels, pv_combat_max, pv_combat_actuels, attq, attq_spe, def, def_spe, vitesse, mana_max, mana_actuels) VALUES
  (1, 100, 100, 100, 100, 10, 10, 8, 8, 12, 150, 150),
  (2,  30,  30,  30,  30,  6,  0, 3, 0,  8,  40,  40),
  (3,  60,  60,  60,  60, 12,  0, 6, 0, 10,  80,  80),
  (4, 120, 120, 120, 120, 20,  5,12, 5, 14, 150, 150);

-- Personnage par défaut
INSERT OR IGNORE INTO personnage (id, nom, experience_actuelle, gold_actuel, classe_id, titre_id, level_id, caracteristique_id) VALUES
  (1, 'Heros', 0, 50, 1, 1, 1, 1);

-- Monstres
INSERT OR IGNORE INTO monstre (id, nom, caracteristique_id, exp_recompense, gold_recompense) VALUES
  (1, 'Slime',   2, 20,  5),
  (2, 'Gobelin', 3, 45, 15),
  (3, 'Troll',   4,100, 40);

-- Donjons
INSERT OR IGNORE INTO donjon (id, nom, niveau_recommande) VALUES
  (1, 'Grotte des Debutants', 1),
  (2, 'Foret Maudite',        3),
  (3, 'Tour du Chaos',        6);

INSERT OR IGNORE INTO donjon_monstre (donjon_id, monstre_id, taux_apparition) VALUES
  (1,1,80),(1,2,20),(2,2,60),(2,3,40),(3,3,100);

-- Équipements (état final après toutes les migrations)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
  (1, 'Epee en bois',       3, 0, 0, 0, 0,  0,  30, 'arme',       'arme_1main',    0, 'commun',    0, 'neutre'),
  (2, 'Bouclier en bois',   0, 0, 3, 0, 0,  0,  25, 'arme',       'bouclier_1main',0, 'commun',    0, 'neutre'),
  (3, 'Dague rouillee',     5, 1, 0, 0, 2,  0,  50, 'arme',       'arme_1main',    0, 'peu_commun',0, 'neutre'),
  (4, 'Armure de cuir',     0, 0, 6, 2, 0, 10,  80, 'armure',     'plastron',      0, 'rare',      0, 'neutre'),
  (5, 'Epee de fer',       10, 3, 0, 0, 0,  0, 150, 'arme',       'arme_1main',    0, 'epique',    0, 'neutre'),
  (6, 'Petite potion',      0, 0, 0, 0, 0,  0, 200, 'utilitaire', 'consommable',  20, 'commun',    0, 'neutre'),
  (7, 'Grande potion',      0, 0, 0, 0, 0,  0,  40, 'utilitaire', 'consommable',  50, 'commun',    0, 'neutre'),
  (8, 'Joker de routine',   0, 0, 0, 0, 0,  0, 200, 'utilitaire', 'joker',         0, 'commun',    0, 'neutre');

-- Armes et boucliers (ids 9-78)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communes 1 main
  ( 9,'Dague de Recrue',       0,0,0,0, 3,0, 30,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (10,'Lame Rouillée',         1,0,0,0, 1,0, 30,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (11,'Épée de Bois Lestée',   2,0,0,0, 1,0, 35,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (12,'Gourdin Noueux',        2,0,0,0, 0,0, 32,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (13,'Bouclier de Paille',    0,0,2,1, 0,0, 30,'arme','bouclier_1main',0,'commun',    0,'neutre'),
  (14,'Targe en Bois',         0,0,2,0, 0,0, 33,'arme','bouclier_1main',0,'commun',    0,'neutre'),
  (15,'Masse de Fer',          3,0,0,0, 0,0, 40,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (16,'Hachette de Bûcheron',  3,0,0,0,-1,0, 38,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (17,'Baguette d''Apprenti',  0,2,0,0, 1,0, 35,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (18,'Orbe Fissuré',          0,3,0,0, 0,0, 38,'arme','arme_1main',    0,'commun',    0,'neutre'),
  (19,'Grimoire Déchiré',      0,2,0,1, 0,0, 40,'arme','arme_1main',    0,'commun',    0,'neutre'),
-- Communes 2 mains
  (20,'Bâton de Marche',       0,3,0,0, 0,0, 40,'arme','arme_2mains',   0,'commun',    0,'neutre'),
  (21,'Fronde Basique',        2,0,0,0, 1,0, 35,'arme','arme_2mains',   0,'commun',    0,'neutre'),
  (22,'Pavois de Fortune',     0,0,3,0, 0,0, 45,'arme','bouclier_2mains',0,'commun',   0,'neutre'),
-- Peu communes 1 main
  (23,'Glaive de Garde',       4,0,0,0, 2,0, 90,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (24,'Broquel en Bronze',     0,0,3,0, 2,0, 80,'arme','bouclier_1main',0,'peu_commun',0,'neutre'),
  (25,'Bouclier à Pointes',    3,0,3,0, 0,0, 85,'arme','bouclier_1main',0,'peu_commun',0,'neutre'),
  (26,'Gantelet Renforcé',     3,0,0,2, 0,0, 95,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (27,'Dague de Voleur',       0,0,0,0, 6,0, 95,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (28,'Morgenstern',           5,0,1,0, 0,0,115,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (29,'Marteau de Forge',      6,0,0,0, 0,0,120,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (30,'Livre de Sorts Mineur', 0,4,0,2, 0,0, 95,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
  (31,'Sceptre de Cristal',    0,5,0,0, 1,0,105,'arme','arme_1main',    0,'peu_commun',0,'neutre'),
-- Peu communes 2 mains
  (32,'Arc de Chasse Simple',  5,0,0,0, 1,0,100,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
  (33,'Lance de Milicien',     4,0,0,0, 2,0,105,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
  (34,'Grand Bouclier d''Acier',0,0,4,2,0,0,110,'arme','bouclier_2mains',0,'peu_commun',0,'neutre'),
  (35,'Épée Bâtarde',          5,0,1,0, 0,0,115,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
  (36,'Bâton d''Initié',       0,6,0,0, 0,0,110,'arme','arme_2mains',   0,'peu_commun',0,'neutre'),
-- Rares 1 main
  (37,'Épée Longue d''Acier',  6,0,0,0, 3,0,170,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (38,'Cimeterre Courbe',      0,0,0,0, 9,0,175,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (39,'Bouclier Runique',      0,0,4,5, 0,0,180,'arme','bouclier_1main',0,'rare',      0,'neutre'),
  (40,'Rondache Miroir',       0,0,4,4, 0,0,180,'arme','bouclier_1main',0,'rare',      0,'neutre'),
  (41,'Catalyseur de Mana',    0,9,0,0, 0,0,200,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (42,'Flasque Alchimique',    0,5,0,0, 4,0,185,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (43,'Grimoire d''Occultisme',0,7,0,2, 0,0,195,'arme','arme_1main',    0,'rare',      0,'neutre'),
  (44,'Sceptre d''Argent',     0,6,0,3, 0,0,205,'arme','arme_1main',    0,'rare',      0,'neutre'),
-- Rares 2 mains
  (45,'Aegis de Plomb',        0,0,6,3, 0,0,185,'arme','bouclier_2mains',0,'rare',     0,'neutre'),
  (46,'Hache de Bataille',    10,0,0,0,-1,0,190,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (47,'Pique de Cavalerie',    7,0,0,0, 2,0,190,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (48,'Dagues Jumelles',       4,0,0,0, 5,0,195,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (49,'Arbalète Lourde',       9,0,0,0, 0,0,210,'arme','arme_2mains',   0,'rare',      0,'neutre'),
  (50,'Marteau de Guerre',    11,0,0,0,-2,0,210,'arme','arme_2mains',   0,'rare',      0,'neutre'),
-- Épiques 1 main
  (51,'Lame de Givre',         4,0,0,0, 3,0,240,'arme','arme_1main',    0,'epique',   10,'eau'),
  (52,'Dague d''Assassin',     0,0,0,0, 7,0,240,'arme','arme_1main',    0,'epique',   10,'mort'),
  (53,'Bouclier de Magma',     0,0,4,3, 0,0,245,'arme','bouclier_1main',0,'epique',   10,'feu'),
  (54,'Lanterne des Âmes',     0,5,0,2, 0,0,265,'arme','arme_1main',    0,'epique',   10,'mort'),
  (55,'Griffe de l''Ombre',    5,0,0,0, 2,0,265,'arme','arme_1main',    0,'epique',   10,'tenebres'),
  (56,'Égide Océanique',       0,0,5,2, 0,0,270,'arme','bouclier_1main',0,'epique',   10,'eau'),
  (57,'Gantelet Surchauffé',   0,7,0,0, 0,0,270,'arme','arme_1main',    0,'epique',   10,'feu'),
  (58,'Sceptre des Tempêtes',  0,4,0,0, 3,0,275,'arme','arme_1main',    0,'epique',   10,'air'),
  (59,'Orbe de Sagesse',       0,5,0,2, 0,0,280,'arme','arme_1main',    0,'epique',   10,'surnaturel'),
-- Épiques 2 mains
  (60,'Bâton des Sylves',      0,7,0,0, 0,0,245,'arme','arme_2mains',   0,'epique',   10,'vie'),
  (61,'Arc de Foudre',         5,0,0,0, 2,0,250,'arme','arme_2mains',   0,'epique',   10,'technologie'),
  (62,'Hache du Berserker',    8,0,-1,0,0,0,250,'arme','arme_2mains',   0,'epique',   10,'feu'),
  (63,'Pavois de Justice',     0,0,7,0, 0,0,255,'arme','bouclier_2mains',0,'epique',  10,'lumiere'),
  (64,'Espadon de Gaïa',       7,0,0,0, 0,0,260,'arme','arme_2mains',   0,'epique',   10,'terre'),
-- Légendaires 1 main
  (65,'Bouclier d''Yggdrasil', 0,0,5,4, 0,0,450,'arme','bouclier_1main',0,'legendaire',15,'vie'),
  (66,'Excalibur',             6,0,0,0, 3,0,480,'arme','arme_1main',    0,'legendaire',15,'lumiere'),
  (67,'Lame du Vide',          6,3,0,0, 0,0,520,'arme','arme_1main',    0,'legendaire',15,'tenebres'),
  (68,'Œil de l''Océan',       0,8,0,1, 0,0,520,'arme','arme_1main',    0,'legendaire',15,'eau'),
  (69,'Gantelet de l''Aube',   4,4,0,0, 0,0,525,'arme','arme_1main',    0,'legendaire',15,'lumiere'),
  (70,'Codex de l''Infini',    0,8,0,1, 0,0,550,'arme','arme_1main',    0,'legendaire',15,'surnaturel'),
-- Légendaires 2 mains
  (71,'Rempart des Tempêtes',  0,0,0,0, 9,0,490,'arme','bouclier_2mains',0,'legendaire',15,'air'),
  (72,'Épées Dansantes',       4,0,0,0, 5,0,495,'arme','arme_2mains',   0,'legendaire',15,'air'),
  (73,'Faux de la Faucheuse',  9,0,0,0, 0,0,500,'arme','arme_2mains',   0,'legendaire',15,'mort'),
  (74,'Trident des Abysses',   5,4,0,0, 0,0,510,'arme','arme_2mains',   0,'legendaire',15,'eau'),
  (75,'Météore Forgé',        11,0,0,0,-2,0,530,'arme','arme_2mains',   0,'legendaire',15,'feu'),
  (76,'Bâton du Créateur',     0,10,0,0,-1,0,540,'arme','arme_2mains',  0,'legendaire',15,'lumiere'),
  (77,'Cœur de la Montagne',   0,0,7,2, 0,0,540,'arme','bouclier_2mains',0,'legendaire',15,'terre'),
  (78,'Canon à Plasma',        0,9,0,0, 0,0,550,'arme','arme_2mains',   0,'legendaire',15,'technologie');

-- Casques (ids 79-103)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (79,'Bandana Usé',           0,0,0,0, 2,0, 30,'armure','tete',0,'commun',    0,'neutre'),
  (80,'Capuche en Toile',      0,0,1,1, 0,0, 32,'armure','tete',0,'commun',    0,'neutre'),
  (81,'Chapeau de Paille',     0,0,0,1, 1,0, 35,'armure','tete',0,'commun',    0,'neutre'),
  (82,'Casque en Cuir',        0,0,2,0, 0,0, 38,'armure','tete',0,'commun',    0,'neutre'),
  (83,'Heaume Rouillé',        0,0,3,0,-1,0, 40,'armure','tete',0,'commun',    0,'neutre'),
-- Peu communs
  (84,'Masque de Voleur',      0,0,1,0, 4,0, 85,'armure','tete',0,'peu_commun',0,'neutre'),
  (85,'Chapeau d''Apprenti',   0,3,0,2, 0,0, 90,'armure','tete',0,'peu_commun',0,'neutre'),
  (86,'Casque de Fantassin',   0,0,4,0, 1,0, 95,'armure','tete',0,'peu_commun',0,'neutre'),
  (87,'Capeline Renforcée',    0,0,3,2, 0,0,100,'armure','tete',0,'peu_commun',0,'neutre'),
  (88,'Diadème Mental',        0,5,0,0, 0,0,115,'armure','tete',0,'peu_commun',0,'neutre'),
-- Rares
  (89,'Heaume de Chevalier',   0,0,6,2, 0,0,170,'armure','tete',0,'rare',      0,'neutre'),
  (90,'Masque d''Assassin',    2,0,0,0, 6,0,175,'armure','tete',0,'rare',      0,'neutre'),
  (91,'Couronne d''Érudit',    0,6,0,3, 0,0,185,'armure','tete',0,'rare',      0,'neutre'),
  (92,'Casque Tactique',       0,0,4,0, 4,0,190,'armure','tete',0,'rare',      0,'neutre'),
  (93,'Cagoule d''Ombre',      0,0,0,3, 5,0,195,'armure','tete',0,'rare',      0,'neutre'),
-- Épiques
  (94,'Halo Lumineux',         0,2,0,5, 0,0,240,'armure','tete',0,'epique',   10,'lumiere'),
  (95,'Masque Démoniaque',     5,0,0,0, 2,0,245,'armure','tete',0,'epique',   10,'mort'),
  (96,'Couronne Sylvestre',    0,0,4,3, 0,0,250,'armure','tete',0,'epique',   10,'vie'),
  (97,'Heaume de Forge',       1,0,6,0, 0,0,255,'armure','tete',0,'epique',   10,'feu'),
  (98,'Visière Technologique', 0,5,0,0, 2,0,260,'armure','tete',0,'epique',   10,'technologie'),
-- Légendaires
  (99,'Couronne du Liche',     6,0,0,3, 0,0,480,'armure','tete',0,'legendaire',15,'mort'),
  (100,'Heaume d''Aube',       0,0,5,4, 0,0,490,'armure','tete',0,'legendaire',15,'lumiere'),
  (101,'Tiare de l''Océan',    0,6,0,3, 0,0,500,'armure','tete',0,'legendaire',15,'eau'),
  (102,'Casque Météore',       2,0,7,0, 0,0,510,'armure','tete',0,'legendaire',15,'feu'),
  (103,'Masque du Vide',       0,3,0,0, 6,0,520,'armure','tete',0,'legendaire',15,'tenebres');

-- Plastrons (ids 104-128)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (104,'Tunique en Lin',            0,0,0,0, 2,0, 30,'armure','plastron',0,'commun',    0,'neutre'),
  (105,'Plastron en Cuir',          0,0,2,0, 0,0, 35,'armure','plastron',0,'commun',    0,'neutre'),
  (106,'Cotte de Mailles Trouée',   0,0,3,0,-1,0, 40,'armure','plastron',0,'commun',    0,'neutre'),
  (107,'Robe Mitée',                0,0,0,2, 0,0, 35,'armure','plastron',0,'commun',    0,'neutre'),
  (108,'Harnais Usé',               1,0,1,0, 0,0, 38,'armure','plastron',0,'commun',    0,'neutre'),
-- Peu communs
  (109,'Plastron de Garde',         0,0,5,0, 0,0, 95,'armure','plastron',0,'peu_commun',0,'neutre'),
  (110,'Robe d''Adepte',            0,1,0,4, 0,0, 90,'armure','plastron',0,'peu_commun',0,'neutre'),
  (111,'Manteau de Rôdeur',         0,0,2,0, 3,0,100,'armure','plastron',0,'peu_commun',0,'neutre'),
  (112,'Cuirasse Cloutée',          1,0,4,0, 0,0,105,'armure','plastron',0,'peu_commun',0,'neutre'),
  (113,'Gilet de Duel',             0,0,2,0, 3,0,110,'armure','plastron',0,'peu_commun',0,'neutre'),
-- Rares
  (114,'Armure de Plates',          0,0,8,0,-1,0,170,'armure','plastron',0,'rare',      0,'neutre'),
  (115,'Robe de Mage',              0,2,0,6, 0,0,175,'armure','plastron',0,'rare',      0,'neutre'),
  (116,'Manteau d''Assassin',       0,0,3,0, 5,0,185,'armure','plastron',0,'rare',      0,'neutre'),
  (117,'Cuirasse Lourde',           0,0,7,1, 0,0,190,'armure','plastron',0,'rare',      0,'neutre'),
  (118,'Plastron de Gladiateur',    3,0,5,0, 0,0,195,'armure','plastron',0,'rare',      0,'neutre'),
-- Épiques
  (119,'Manteau des Tempêtes',      0,0,2,0, 5,0,245,'armure','plastron',0,'epique',   10,'air'),
  (120,'Robe de l''Arbre-Monde',    0,0,4,3, 0,0,250,'armure','plastron',0,'epique',   10,'vie'),
  (121,'Armure Magmatique',         1,0,6,0, 0,0,255,'armure','plastron',0,'epique',   10,'feu'),
  (122,'Cuirasse Sismique',         0,0,7,0, 0,0,260,'armure','plastron',0,'epique',   10,'terre'),
  (123,'Gilet d''Infiltration',     2,0,0,0, 5,0,265,'armure','plastron',0,'epique',   10,'tenebres'),
-- Légendaires
  (124,'Armure d''Excalibur',       0,0,6,3, 0,0,490,'armure','plastron',0,'legendaire',15,'lumiere'),
  (125,'Robe du Néant',             0,4,0,5, 0,0,500,'armure','plastron',0,'legendaire',15,'tenebres'),
  (126,'Exosquelette Torso',        4,0,5,0, 0,0,510,'armure','plastron',0,'legendaire',15,'technologie'),
  (127,'Carapace de Gaïa',          0,0,9,0,-2,0,520,'armure','plastron',0,'legendaire',15,'terre'),
  (128,'Cuirasse Léviathan',        0,0,6,3, 0,0,530,'armure','plastron',0,'legendaire',15,'eau');

-- Jambières (ids 129-153)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (129,'Pantalon en Toile',         0,0,0,0, 2,0, 30,'armure','jambiere',0,'commun',    0,'neutre'),
  (130,'Bottes Usées',              0,0,1,0, 1,0, 32,'armure','jambiere',0,'commun',    0,'neutre'),
  (131,'Jambières en Cuir',         0,0,2,0, 0,0, 35,'armure','jambiere',0,'commun',    0,'neutre'),
  (132,'Sandales Légères',          0,0,-1,0,3,0, 38,'armure','jambiere',0,'commun',    0,'neutre'),
  (133,'Grèves Rouillées',          0,0,3,0,-1,0, 40,'armure','jambiere',0,'commun',    0,'neutre'),
-- Peu communs
  (134,'Bottes de Cuir Léger',      0,0,1,0, 4,0, 85,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (135,'Pantalon de Rôdeur',        0,0,2,0, 3,0, 90,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (136,'Grèves de Garde',           0,0,4,0, 1,0, 95,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (137,'Chaussures d''Adepte',      0,0,0,3, 2,0,100,'armure','jambiere',0,'peu_commun',0,'neutre'),
  (138,'Bottes de Marche',          0,0,2,1, 2,0,110,'armure','jambiere',0,'peu_commun',0,'neutre'),
-- Rares
  (139,'Bottes d''Assassin',        0,0,1,0, 7,0,170,'armure','jambiere',0,'rare',      0,'neutre'),
  (140,'Grèves de Chevalier',       0,0,6,2, 0,0,175,'armure','jambiere',0,'rare',      0,'neutre'),
  (141,'Bottes de Célérité',        0,0,-1,0,9,0,185,'armure','jambiere',0,'rare',      0,'neutre'),
  (142,'Pantalon Brodé',            0,0,0,5, 3,0,190,'armure','jambiere',0,'rare',      0,'neutre'),
  (143,'Bottes Tactiques',          0,0,4,0, 4,0,195,'armure','jambiere',0,'rare',      0,'neutre'),
-- Épiques
  (144,'Pas du Vent',               0,0,1,0, 6,0,240,'armure','jambiere',0,'epique',   10,'air'),
  (145,'Grèves Sismiques',          0,0,6,0, 1,0,245,'armure','jambiere',0,'epique',   10,'terre'),
  (146,'Bottes Infernales',         3,0,0,0, 4,0,250,'armure','jambiere',0,'epique',   10,'feu'),
  (147,'Traces de l''Océan',        0,0,0,2, 5,0,255,'armure','jambiere',0,'epique',   10,'eau'),
  (148,'Bottes Magnétiques',        0,0,4,0, 3,0,260,'armure','jambiere',0,'epique',   10,'technologie'),
-- Légendaires
  (149,'Bottes d''Hermès',          0,0,0,0, 9,0,480,'armure','jambiere',0,'legendaire',15,'air'),
  (150,'Grèves du Titan',           0,0,7,2, 0,0,490,'armure','jambiere',0,'legendaire',15,'terre'),
  (151,'Pas de l''Ombre',           3,0,0,0, 6,0,500,'armure','jambiere',0,'legendaire',15,'tenebres'),
  (152,'Racines d''Yggdrasil',      0,0,5,4, 0,0,510,'armure','jambiere',0,'legendaire',15,'vie'),
  (153,'Sabots de Lumière',         0,4,0,0, 5,0,520,'armure','jambiere',0,'legendaire',15,'lumiere');

-- Gantelets (ids 154-178)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communs
  (154,'Mitaines en Laine',         0,1,0,0, 1,0, 30,'armure','gants',0,'commun',    0,'neutre'),
  (155,'Gants en Cuir',             0,0,2,0, 0,0, 32,'armure','gants',0,'commun',    0,'neutre'),
  (156,'Gantelets Rouillés',        2,0,1,0,-1,0, 35,'armure','gants',0,'commun',    0,'neutre'),
  (157,'Bandelettes',               0,0,0,0, 2,0, 38,'armure','gants',0,'commun',    0,'neutre'),
  (158,'Gants de Travail',          2,0,0,0, 0,0, 40,'armure','gants',0,'commun',    0,'neutre'),
-- Peu communs
  (159,'Gants de Voleur',           2,0,0,0, 3,0, 85,'armure','gants',0,'peu_commun',0,'neutre'),
  (160,'Gantelets de Garde',        2,0,3,0, 0,0, 90,'armure','gants',0,'peu_commun',0,'neutre'),
  (161,'Mitaines d''Apprenti',      0,4,0,1, 0,0, 95,'armure','gants',0,'peu_commun',0,'neutre'),
  (162,'Gants de Duel',             3,0,0,0, 2,0,100,'armure','gants',0,'peu_commun',0,'neutre'),
  (163,'Gantelets Renforcés',       1,0,4,0, 0,0,110,'armure','gants',0,'peu_commun',0,'neutre'),
-- Rares
  (164,'Gantelets Chevalier',       3,0,5,0, 0,0,170,'armure','gants',0,'rare',      0,'neutre'),
  (165,'Gants d''Assassin',         3,0,0,0, 5,0,175,'armure','gants',0,'rare',      0,'neutre'),
  (166,'Mitaines de Mage',          0,6,0,2, 0,0,185,'armure','gants',0,'rare',      0,'neutre'),
  (167,'Gantelets Berserk',         7,0,-1,0,0,0,190,'armure','gants',0,'rare',      0,'neutre'),
  (168,'Gants de Précision',        4,0,0,0, 4,0,195,'armure','gants',0,'rare',      0,'neutre'),
-- Épiques
  (169,'Poings de Magma',           5,0,2,0, 0,0,240,'armure','gants',0,'epique',   10,'feu'),
  (170,'Mitaines du Givre',         0,4,0,0, 3,0,245,'armure','gants',0,'epique',   10,'eau'),
  (171,'Gantelets de Pierre',       1,0,6,0, 0,0,250,'armure','gants',0,'epique',   10,'terre'),
  (172,'Gants Conducteurs',         4,3,0,0, 0,0,255,'armure','gants',0,'epique',   10,'technologie'),
  (173,'Griffes Sylvestres',        5,0,0,2, 0,0,260,'armure','gants',0,'epique',   10,'vie'),
-- Légendaires
  (174,'Poings Météores',           7,0,2,0, 0,0,480,'armure','gants',0,'legendaire',15,'feu'),
  (175,'Mitaines du Vide',          0,6,0,0, 3,0,490,'armure','gants',0,'legendaire',15,'tenebres'),
  (176,'Gantelets de Gaïa',         2,0,7,0, 0,0,500,'armure','gants',0,'legendaire',15,'terre'),
  (177,'Gants de l''Aube',          5,4,0,0, 0,0,510,'armure','gants',0,'legendaire',15,'lumiere'),
  (178,'Poignes de l''Ouragan',     3,0,0,0, 6,0,520,'armure','gants',0,'legendaire',15,'air');

-- Boutique
INSERT OR IGNORE INTO magasin (id, nom) VALUES (1, 'Boutique du Village');
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,1,35),(1,2,30),(1,3,60),(1,4,90),(1,5,170),(1,6,200),(1,8,200);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,9,30),(1,10,30),(1,11,35),(1,12,32),(1,13,30),(1,14,33),(1,15,40),(1,16,38),(1,17,35),(1,18,38),(1,19,40),
  (1,20,40),(1,21,35),(1,22,45),
  (1,23,90),(1,24,80),(1,25,85),(1,26,95),(1,27,95),(1,28,115),(1,29,120),(1,30,95),(1,31,105),
  (1,32,100),(1,33,105),(1,34,110),(1,35,115),(1,36,110),
  (1,37,170),(1,38,175),(1,39,180),(1,40,180),(1,41,200),(1,42,185),(1,43,195),(1,44,205),
  (1,45,185),(1,46,190),(1,47,190),(1,48,195),(1,49,210),(1,50,210),
  (1,51,240),(1,52,240),(1,53,245),(1,54,265),(1,55,265),(1,56,270),(1,57,270),(1,58,275),(1,59,280),
  (1,60,245),(1,61,250),(1,62,250),(1,63,255),(1,64,260),
  (1,65,450),(1,66,480),(1,67,520),(1,68,520),(1,69,525),(1,70,550),
  (1,71,490),(1,72,495),(1,73,500),(1,74,510),(1,75,530),(1,76,540),(1,77,540),(1,78,550);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,79,30),(1,80,32),(1,81,35),(1,82,38),(1,83,40),
  (1,84,85),(1,85,90),(1,86,95),(1,87,100),(1,88,115),
  (1,89,170),(1,90,175),(1,91,185),(1,92,190),(1,93,195),
  (1,94,240),(1,95,245),(1,96,250),(1,97,255),(1,98,260),
  (1,99,480),(1,100,490),(1,101,500),(1,102,510),(1,103,520);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,104,30),(1,105,35),(1,106,40),(1,107,35),(1,108,38),
  (1,109,95),(1,110,90),(1,111,100),(1,112,105),(1,113,110),
  (1,114,170),(1,115,175),(1,116,185),(1,117,190),(1,118,195),
  (1,119,245),(1,120,250),(1,121,255),(1,122,260),(1,123,265),
  (1,124,490),(1,125,500),(1,126,510),(1,127,520),(1,128,530);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,129,30),(1,130,32),(1,131,35),(1,132,38),(1,133,40),
  (1,134,85),(1,135,90),(1,136,95),(1,137,100),(1,138,110),
  (1,139,170),(1,140,175),(1,141,185),(1,142,190),(1,143,195),
  (1,144,240),(1,145,245),(1,146,250),(1,147,255),(1,148,260),
  (1,149,480),(1,150,490),(1,151,500),(1,152,510),(1,153,520);
INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,154,30),(1,155,32),(1,156,35),(1,157,38),(1,158,40),
  (1,159,85),(1,160,90),(1,161,95),(1,162,100),(1,163,110),
  (1,164,170),(1,165,175),(1,166,185),(1,167,190),(1,168,195),
  (1,169,240),(1,170,245),(1,171,250),(1,172,255),(1,173,260),
  (1,174,480),(1,175,490),(1,176,500),(1,177,510),(1,178,520);

-- Bottes (ids 179-208)
INSERT OR IGNORE INTO stuff (id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element) VALUES
-- Communes
  (179,'Sandales de Voyage',     0,0,0,0, 2,0, 30,'armure','bottes',0,'commun',    0,'neutre'),
  (180,'Bottes de Terre',        0,0,1,0, 1,0, 32,'armure','bottes',0,'commun',    0,'neutre'),
  (181,'Chaussons Rembourrés',   0,0,0,0, 3,0, 35,'armure','bottes',0,'commun',    0,'neutre'),
  (182,'Mocassins Usés',         0,0,0,1, 2,0, 37,'armure','bottes',0,'commun',    0,'neutre'),
  (183,'Sabots de Bois',         0,0,2,0, 1,0, 40,'armure','bottes',0,'commun',    0,'neutre'),
-- Peu communes
  (184,'Bottes de Pisteur',      0,0,1,0, 5,0, 85,'armure','bottes',0,'peu_commun',0,'neutre'),
  (185,'Sandales d''Acrobate',   0,0,0,2, 4,0, 90,'armure','bottes',0,'peu_commun',0,'neutre'),
  (186,'Chaussures de Mage',     0,2,0,0, 3,0, 95,'armure','bottes',0,'peu_commun',0,'neutre'),
  (187,'Bottes Renforcées',      0,0,3,0, 2,0,100,'armure','bottes',0,'peu_commun',0,'neutre'),
  (188,'Chaussures de Coureur',  0,0,0,0, 6,0,110,'armure','bottes',0,'peu_commun',0,'neutre'),
-- Rares
  (189,'Bottes de Sang',         1,0,0,0, 8,0,170,'armure','bottes',0,'rare',      0,'neutre'),
  (190,'Sandales Runiques',      0,0,0,4, 3,0,175,'armure','bottes',0,'rare',      0,'neutre'),
  (191,'Bottes du Marcheur',     0,0,-1,0,9,0,185,'armure','bottes',0,'rare',      0,'neutre'),
  (192,'Chaussures Bénites',     0,0,3,3, 0,0,190,'armure','bottes',0,'rare',      0,'neutre'),
  (193,'Bottes de Vif-Argent',   0,2,0,0, 7,0,200,'armure','bottes',0,'rare',      0,'neutre'),
-- Épiques
  (194,'Bottes du Feu Ardent',   2,0,0,0, 6,0,240,'armure','bottes',0,'epique',   10,'feu'),
  (195,'Bottes des Glaces',      0,0,2,0, 5,0,245,'armure','bottes',0,'epique',   10,'eau'),
  (196,'Semelles Sismiques',     0,0,5,0, 2,0,245,'armure','bottes',0,'epique',   10,'terre'),
  (197,'Ailes du Zéphyr',        0,0,0,0, 8,0,250,'armure','bottes',0,'epique',   10,'air'),
  (198,'Chaussures Biomécas',    0,2,0,0, 5,0,250,'armure','bottes',0,'epique',   10,'technologie'),
  (199,'Pas du Nécromant',       0,3,0,0, 4,0,255,'armure','bottes',0,'epique',   10,'mort'),
  (200,'Semelles Verdoyantes',   0,0,0,3, 4,0,255,'armure','bottes',0,'epique',   10,'vie'),
  (201,'Bottes des Ombres',      2,0,0,0, 6,0,260,'armure','bottes',0,'epique',   10,'tenebres'),
  (202,'Sandales Saintes',       0,0,0,4, 4,0,265,'armure','bottes',0,'epique',   10,'lumiere'),
  (203,'Sabots Mystiques',       0,3,0,0, 5,0,270,'armure','bottes',0,'epique',   10,'surnaturel'),
-- Légendaires
  (204,'Bottes du Phoenix',      2,0,0,0,10,0,480,'armure','bottes',0,'legendaire',15,'feu'),
  (205,'Pas du Léviathan',       0,0,3,0, 8,0,490,'armure','bottes',0,'legendaire',15,'eau'),
  (206,'Semelles de Titan',      0,0,4,0, 7,0,500,'armure','bottes',0,'legendaire',15,'terre'),
  (207,'Chaussures du Vide',     0,3,0,0, 9,0,510,'armure','bottes',0,'legendaire',15,'tenebres'),
  (208,'Bottes Solaires',        0,4,0,0, 8,0,520,'armure','bottes',0,'legendaire',15,'lumiere');

INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1,179,30),(1,180,32),(1,181,35),(1,182,37),(1,183,40),
  (1,184,85),(1,185,90),(1,186,95),(1,187,100),(1,188,110),
  (1,189,170),(1,190,175),(1,191,185),(1,192,190),(1,193,200),
  (1,194,240),(1,195,245),(1,196,245),(1,197,250),(1,198,250),
  (1,199,255),(1,200,255),(1,201,260),(1,202,265),(1,203,270),
  (1,204,480),(1,205,490),(1,206,500),(1,207,510),(1,208,520);

-- ============================================================
-- COMPÉTENCES (194 compétences sur 11 éléments)
-- Colonnes : nom, description, type, effet_type, puissance, effet_secondaire, valeur, duree_tours, rarete, prix_boutique, element, source, cout_mana
-- ============================================================
INSERT OR IGNORE INTO competence (nom, description, type, effet_type, puissance, effet_secondaire, valeur, duree_tours, rarete, prix_boutique, element, source, cout_mana) VALUES
-- === FEU ===
('Coup Chauffé','Frappe avec la base de l''arme brûlante.','attaque','physique',40,NULL,0,0,'commun',35,'feu','boutique',10),
('Souffle de Braise','Recrache des cendres incandescentes.','attaque','magique',35,'brulure',5,3,'commun',45,'feu','boutique',15),
('Étincelle Persistante','Un projectile qui s''accroche et roussit la cible.','attaque','magique',40,'brulure',5,3,'commun',50,'feu','boutique',18),
('Dague Cendrée','Plante une lame qui réagit à la chaleur.','attaque','physique',50,NULL,0,0,'commun',60,'feu','boutique',20),
('Fièvre Guerrière','Fait monter sa température pour taper fort.','buff','buff_attq',0,NULL,6,3,'peu_commun',75,'feu','boutique',25),
('Poudre Étincelante','Un tir de mousquet chargé de poudre vive.','attaque','magique',60,NULL,0,0,'peu_commun',95,'feu','boutique',30),
('Uppercut Enflammé','Un puissant coup de poing remontant en feu.','attaque','physique',60,'brulure',10,2,'peu_commun',110,'feu','boutique',35),
('Jet de Poivre Brûlant','Jette un mélange d''épices qui irrite les yeux.','attaque','magique',50,'debuff_precision',15,3,'peu_commun',120,'feu','boutique',40),
('Lame de Foyer','Un coup de taille avec une épée rougeoyante.','attaque','ignore_def',70,NULL,20,0,'rare',140,'feu','boutique',45),
('Bombe Fumigène Ignée','Libère une fumée suffocante et brûlante.','statut','brulure',0,NULL,15,3,'rare',190,'feu','boutique',50),
('Manteau de Flammes','Un bouclier de feu punissant le contact direct.','statut','reduction_degats',0,NULL,15,3,'rare',200,'feu','boutique',55),
('Frappe du Forgeron','Un coup lourd imitant le marteau sur l''enclume.','attaque','physique',85,NULL,0,0,'rare',220,'feu','boutique',60),
('Tir de Poudre Noire','Un tir surchargé qui explose à l''impact.','attaque','magique',95,NULL,0,0,'rare',240,'feu','boutique',70),
('Cautérisation Cruelle','Une douleur magique figeant la cible.','attaque','magique',80,NULL,0,0,'epique',310,'feu','boutique',75),
('Onde de Choc Thermique','Souffle une bourrasque brûlante.','attaque','magique',75,'brulure',15,3,'epique',350,'feu','boutique',85),
('Rugissement Brasier','Pousse un cri de guerre crachant du feu.','statut','debuff_attq',0,NULL,10,3,'epique',380,'feu','boutique',60),
('Fente du Dragon','Attaque perçante, la lame en fusion.','attaque','physique',115,NULL,0,0,'epique',420,'feu','boutique',100),
('Pluie de Feu','Une volée de flèches enflammées.','attaque','magique',110,'brulure',20,3,'epique',460,'feu','boutique',110),
('Plongeon Météorique','Saute et s''écrase comme une météorite.','attaque','physique',130,NULL,0,0,'legendaire',600,'feu','boutique',130),
('Incinération Totale','Recrée l''éclat du soleil.','attaque','magique',150,'brulure_incurable',30,99,'legendaire',700,'feu','boutique',150),
-- === EAU ===
('Crachat Froid','Recrache une eau glacée et piquante.','attaque','magique',40,'froid',1,0,'commun',35,'eau','boutique',10),
('Coup de Gourde','Frappe avec sa flasque d''eau lourde.','attaque','physique',45,NULL,0,0,'commun',40,'eau','boutique',12),
('Lame Glissante','Un coup d''arme rendu imprévisible.','attaque','physique',50,NULL,0,0,'commun',45,'eau','boutique',15),
('Ondelette','Fait léviter de l''eau pour la jeter.','attaque','magique',50,NULL,0,0,'commun',55,'eau','boutique',18),
('Pas Glissant','Enduit ses semelles d''eau pour patiner.','buff','buff_esquive',0,NULL,20,3,'commun',60,'eau','boutique',25),
('Fléchette de Glace','Un projectile gelé tiré avec précision.','attaque','magique',45,'froid',1,0,'peu_commun',90,'eau','boutique',25),
('Orbe de Givre','Lance une sphère d''eau extrêmement froide.','attaque','magique',60,'froid',1,0,'peu_commun',100,'eau','boutique',35),
('Coup Bas Vaseux','Frappe les jambes en projetant de la boue.','attaque','physique',55,'debuff_vitesse',5,3,'peu_commun',110,'eau','boutique',35),
('Taillade Aqueuse','Coupe l''air d''un jet d''eau tranchant.','attaque','physique',70,NULL,0,0,'peu_commun',120,'eau','boutique',40),
('Brume Épaisse','Invoque un brouillard faisant hésiter l''ennemi.','statut','debuff_precision',0,NULL,15,3,'rare',170,'eau','boutique',50),
('Bulle Prison','Enferme la tête de l''adversaire dans l''eau.','attaque','magique',50,'stun',0,1,'rare',200,'eau','boutique',60),
('Garde de Givre','Fige l''air autour de soi pour durcir l''armure.','statut','reduction_degats',0,NULL,20,2,'rare',210,'eau','boutique',55),
('Frappe du Torrent','Un coup inarrêtable avec l''élan d''une cascade.','attaque','physique',85,NULL,0,0,'rare',230,'eau','boutique',60),
('Pression Écrasante','L''eau alourdit drastiquement les équipements.','statut','debuff_vitesse',0,NULL,10,3,'epique',320,'eau','boutique',70),
('Pluie Verglaçante','Une averse qui gèle les articulations.','attaque','magique',90,'froid',2,0,'epique',400,'eau','boutique',95),
('Geyser Sous-Jacent','Fait éclater une colonne d''eau sous la cible.','attaque','magique',110,'debuff_vitesse',15,3,'epique',450,'eau','boutique',110),
('Fauchage Glaçant','Balaye les appuis, gelant les chevilles.','attaque','physique',95,'stun',0,2,'epique',480,'eau','boutique',115),
('Exécution des Abysses','Empale sa cible avec la force de la haute mer.','attaque','physique',135,NULL,0,0,'legendaire',650,'eau','boutique',135),
('Déferlante Morte','Projette un mur d''eau glaciale.','attaque','magique',120,'froid',3,0,'legendaire',680,'eau','boutique',145),
('Zéro Absolu','Libère un blizzard figeant le temps lui-même.','attaque','magique',140,'stun',0,2,'legendaire',750,'eau','boutique',160),
-- === TERRE ===
('Coup de Pierre','Jette une pierre lourde avec précision.','attaque','physique',40,NULL,0,0,'commun',35,'terre','boutique',10),
('Garde Sédimentaire','Recouvre sa peau de roche protectrice.','buff','buff_def',0,NULL,5,3,'commun',45,'terre','boutique',15),
('Coup d''Argile','Un coup de pied lourd et boueux.','attaque','def_based',45,NULL,0,0,'commun',50,'terre','boutique',18),
('Frappe du Manche','Un coup brutal avec la base de l''arme.','attaque','physique',50,NULL,0,0,'commun',50,'terre','boutique',18),
('Posture Montagne','S''ancre au sol pour encaisser et renvoyer.','statut','riposte',0,NULL,20,3,'commun',65,'terre','boutique',25),
('Tir de Boue','Un amas de terre humide tiré à grande vitesse.','attaque','magique',55,'debuff_precision',15,3,'peu_commun',95,'terre','boutique',30),
('Taillade Rocheuse','Une attaque tranchante qui frotte le sol.','attaque','def_based',65,NULL,0,0,'peu_commun',110,'terre','boutique',35),
('Accumulation','Absorbe l''énergie du sol.','statut','charge_sismique',0,NULL,1,0,'peu_commun',120,'terre','boutique',40),
('Estoc Terrestre','Un coup puissant avec l''inertie du corps.','attaque','physique',75,NULL,0,0,'peu_commun',130,'terre','boutique',45),
('Aura d''Enlisement','Le sol devient instable et collant.','statut','debuff_esquive',0,NULL,50,3,'rare',180,'terre','boutique',50),
('Blindage Minéral','Se recouvre d''une épaisse couche de roche.','buff','buff_def',0,NULL,10,3,'rare',200,'terre','boutique',55),
('Coup de Genou Dense','Un coup au corps-à-corps ultra-dense.','attaque','def_based',85,NULL,0,0,'rare',210,'terre','boutique',60),
('Projectile de Silex','Un éclat de roche extrêmement dur.','attaque','ignore_def',95,NULL,100,0,'rare',220,'terre','boutique',70),
('Absorption Tellurique','Utilise la douleur pour recharger sa magie.','statut','reduction_degats',0,NULL,25,3,'rare',250,'terre','boutique',40),
('Frappe Sismique','Frappe le sol, libérant l''énergie stockée.','attaque','physique_sismique',70,NULL,10,0,'epique',350,'terre','boutique',85),
('Mur de Granit','Un mur quasi-indestructible devant soi.','statut','riposte',0,NULL,50,3,'epique',380,'terre','boutique',70),
('Marteau de Gaia','Un coup de marteau fait de croûte terrestre.','attaque','def_based',115,NULL,0,0,'epique',420,'terre','boutique',100),
('Éboulement Dirigé','Fait pleuvoir des rochers pointus.','attaque','magique',120,'debuff_def',15,3,'epique',460,'terre','boutique',110),
('Assaut Tectonique','Charge vengeresse qui fend l''air.','attaque','physique',130,NULL,0,0,'legendaire',600,'terre','boutique',130),
('Faille Absolue','Ouvre la terre, engloutissant la cible.','attaque','def_spe_based',150,NULL,0,0,'legendaire',720,'terre','boutique',150),
-- === AIR ===
('Poing Fuyant','Une frappe rapide comme le vent.','attaque','multi_frappe',35,NULL,2,0,'commun',40,'air','boutique',15),
('Souffle Tranchant','Un sifflement projetant une lame d''air.','attaque','magique',40,NULL,0,0,'commun',35,'air','boutique',12),
('Fléchette de Vent','Un projectile aérodynamique.','attaque','ignore_def',45,NULL,10,0,'commun',45,'air','boutique',15),
('Estocade Légère','Un coup de pointe souple et vif.','attaque','physique',50,NULL,0,0,'commun',50,'air','boutique',18),
('Pas de Plume','Allège ses pas pour éviter les coups.','buff','buff_esquive',0,NULL,20,3,'commun',65,'air','boutique',25),
('Coup de Vent Vif','Une bourrasque soudaine.','attaque','vitesse_based',60,NULL,0,0,'peu_commun',95,'air','boutique',30),
('Fauchage Aérien','Un coup d''arme circulaire rapide.','attaque','multi_frappe',50,NULL,2,0,'peu_commun',110,'air','boutique',40),
('Sphère d''Air','Une bulle d''air comprimé.','attaque','magique',65,NULL,0,0,'peu_commun',100,'air','boutique',35),
('Taillade Invisible','Le mouvement est si rapide qu''il est invisible.','attaque','physique',75,NULL,0,0,'peu_commun',130,'air','boutique',45),
('Nuage Aveuglant','Soulève de la poussière dans les yeux.','statut','debuff_precision',0,NULL,20,3,'rare',180,'air','boutique',50),
('Courant Ascendant','Le vent vous porte, doublant vos actions.','buff','buff_vitesse',0,NULL,15,3,'rare',220,'air','boutique',75),
('Balayette Rapide','Un coup de pied bas accéléré par le vent.','attaque','vitesse_based',85,NULL,0,0,'rare',210,'air','boutique',60),
('Tir Perçant','Un tir enveloppé d''une spirale de vent.','attaque','ignore_def',90,NULL,100,0,'rare',230,'air','boutique',65),
('Esquive Parfaite','Anticipe le mouvement grâce aux courants.','buff','buff_esquive',0,NULL,100,1,'rare',250,'air','boutique',80),
('Bourrasque','Un vent violent qui fait reculer l''ennemi.','attaque','magique',95,'debuff_vitesse',10,3,'epique',350,'air','boutique',85),
('Vitesse Sonique','Dépasse les limites du corps.','buff','buff_vitesse',0,NULL,12,3,'epique',390,'air','boutique',70),
('Rafale des Mille Lames','Une série de frappes rotatives frénétiques.','attaque','multi_frappe',45,NULL,3,0,'epique',450,'air','boutique',110),
('Tornade Ciblée','Invoque un petit cyclone.','attaque','magique',120,NULL,0,0,'epique',420,'air','boutique',100),
('Percée de l''Ouragan','Une charge terrifiante portée par la tempête.','attaque','physique',135,NULL,0,0,'legendaire',620,'air','boutique',135),
('Tempête Ultime','Crée un vent apocalyptique protecteur.','attaque','magique',150,NULL,0,0,'legendaire',750,'air','boutique',160),
-- === VIE ===
('Coup de Rameau','Un coup sec avec du bois vert.','attaque','physique',40,NULL,0,0,'commun',35,'vie','boutique',10),
('Sève Apaisante','Boit une fiole de sève curative.','statut','soin',0,NULL,10,0,'commun',50,'vie','boutique',25),
('Graine Sangsue','Implante une graine qui pompe l''énergie.','attaque','vol_vie',30,NULL,50,0,'commun',55,'vie','boutique',20),
('Fouet Épineux','Une attaque cinglante avec une liane.','attaque','vol_vie',45,NULL,50,0,'commun',60,'vie','boutique',25),
('Photosynthèse','Absorbe la lumière pour guérir.','statut','regen_pv',0,NULL,5,3,'peu_commun',85,'vie','boutique',35),
('Pollen Irritant','Fait pleurer et affaiblit la cible.','attaque','magique',50,'debuff_attq',5,3,'peu_commun',90,'vie','boutique',30),
('Lame de Feuille','Frappe avec une arme aux rebords dentelés.','attaque','physique',65,NULL,0,0,'peu_commun',100,'vie','boutique',35),
('Drain Végétal','Des racines absorbent la force adverse.','attaque','vol_vie',60,NULL,50,0,'peu_commun',130,'vie','boutique',50),
('Estoc Enraciné','Pousse l''arme avec la force d''une racine.','attaque','physique',75,NULL,0,0,'peu_commun',140,'vie','boutique',45),
('Écorce Curative','Protège tout en refermant les plaies.','statut','soin',0,NULL,20,0,'rare',200,'vie','boutique',60),
('Spores de Sommeil','Endort l''adversaire avec un gaz lourd.','statut','stun',0,NULL,0,2,'rare',220,'vie','boutique',70),
('Explosion Florale','Fait détoner une fleur magique.','attaque','magique',85,NULL,0,0,'rare',210,'vie','boutique',60),
('Coup de Liane Vampirique','Un coup de fouet qui ramène du sang.','attaque','vol_vie',80,NULL,50,0,'rare',250,'vie','boutique',70),
('Racine Sismique','Une grosse racine percute l''adversaire.','attaque','magique',95,'debuff_vitesse',8,3,'epique',340,'vie','boutique',85),
('Bénédiction Sylvestre','Un soin massif d''urgence.','statut','soin',0,NULL,50,0,'epique',400,'vie','boutique',120),
('Écrasement du Tronc','Maniée avec la force d''un arbre qui s''abat.','attaque','physique',115,NULL,0,0,'epique',420,'vie','boutique',100),
('Roseraie Sanglante','Un parterre de ronces qui vide la cible.','attaque','vol_vie',100,NULL,50,0,'epique',480,'vie','boutique',115),
('Empalement Sylvestre','Cloue l''adversaire avec un pieu de bois.','attaque','vol_vie',130,NULL,50,0,'legendaire',620,'vie','boutique',135),
('Éveil de l''Arbre-Vie','L''ultime miracle de la nature.','statut','soin',0,NULL,70,0,'legendaire',750,'vie','boutique',200),
-- === MORT ===
('Coup d''Os','Frappe avec une arme taillée dans un os.','attaque','physique',40,NULL,0,0,'commun',35,'mort','boutique',10),
('Souffle Tombal','Expiration de poussière de cimetière.','attaque','magique',40,'debuff_attq',3,5,'commun',45,'mort','boutique',15),
('Orbe Fantôme','Projectile d''énergie pâle.','attaque','magique',45,'debuff_def_spe',3,5,'commun',50,'mort','boutique',18),
('Dague Macabre','Lame enduite de crasse mortuaire.','attaque','physique',50,'debuff_vitesse',3,5,'commun',55,'mort','boutique',20),
('Regard d''Effroi','Terrifie la cible, la rendant molle.','statut','debuff_attq_spe',0,NULL,6,5,'peu_commun',80,'mort','boutique',30),
('Faux d''Ombre','Balayage évoquant une faux mortelle.','attaque','physique',65,NULL,0,0,'peu_commun',100,'mort','boutique',35),
('Bris d''Armure','Énergie qui ronge le métal et le cuir.','attaque','magique',55,'debuff_def',8,3,'peu_commun',120,'mort','boutique',45),
('Fente Fatale','Frappe perçante sur point vital exposé.','attaque','physique',75,NULL,0,0,'peu_commun',140,'mort','boutique',50),
('Aura de Putréfaction','Miasme qui détruit la vitalité ennemie.','statut','debuff_attq',0,NULL,8,3,'rare',190,'mort','boutique',65),
('Manteau d''Os','Arrache la résistance ennemie pour soi.','statut','debuff_def',0,NULL,5,3,'rare',210,'mort','boutique',60),
('Écho des Limbes','Murmure projeté dans l''esprit.','attaque','magique',85,'debuff_attq_spe',6,5,'rare',220,'mort','boutique',65),
('Froid Cadavérique','Rend impossible le soin pour la cible.','attaque','magique',80,'anti_heal',0,3,'rare',240,'mort','boutique',70),
('Sangsue de Force','Coupe un muscle et absorbe sa force.','attaque','physique',90,'debuff_attq',3,3,'epique',340,'mort','boutique',85),
('Hurlement Spectral','Cri déchirant qui brise la volonté.','statut','debuff_def_spe',0,NULL,15,3,'epique',390,'mort','boutique',90),
('Taillade Nécrotique','Frappe qui pourrit la chair au contact.','attaque','physique',110,'debuff_attq',6,3,'epique',420,'mort','boutique',100),
('Nuage de Peste','Corrode l''essence même de la cible.','attaque','magique',115,NULL,0,0,'epique',480,'mort','boutique',115),
('Jugement d''Anubis','La balance de la mort s''abat.','attaque','magique',130,NULL,0,0,'legendaire',620,'mort','boutique',130),
('Moisson d''Âme','Arrache l''esprit de l''adversaire.','attaque','physique',150,'debuff_attq',8,3,'legendaire',750,'mort','boutique',160),
-- === LUMIÈRE ===
('Pointe Étincelante','Coup d''estoc rapide reflétant le soleil.','attaque','physique',45,NULL,0,0,'commun',40,'lumiere','boutique',15),
('Tir de Prisme','Concentre un fin rayon de lumière.','attaque','magique',50,NULL,0,0,'commun',50,'lumiere','boutique',20),
('Frappe Juste','Attaque portée avec droiture.','attaque','ignore_def',55,NULL,10,0,'commun',60,'lumiere','boutique',25),
('Éblouissement','Rend la cible incapable d''esquiver.','statut','debuff_esquive',0,NULL,50,2,'commun',70,'lumiere','boutique',30),
('Coupe-Ombre','Fauchage net avec une lame de l''aube.','attaque','ignore_def',70,NULL,100,0,'peu_commun',120,'lumiere','boutique',50),
('Rayon Ardent','Faisceau de lumière concentrée.','attaque','ignore_def',80,NULL,30,0,'peu_commun',130,'lumiere','boutique',55),
('Coup Bouclier Radieux','Bourrade avec énergie lumineuse.','attaque','physique',75,NULL,0,0,'peu_commun',110,'lumiere','boutique',45),
('Lumière Concentrée','Le personnage accumule des photons.','statut','prochain_attq_mult',0,NULL,200,0,'peu_commun',140,'lumiere','boutique',60),
('Lance Stellaire','Projette un javelot d''énergie lumineuse.','attaque','magique',100,NULL,0,0,'rare',230,'lumiere','boutique',85),
('Châtiment Céleste','Un pilier de lumière s''abat.','attaque','ignore_def_spe',90,NULL,20,0,'rare',250,'lumiere','boutique',95),
('Plongeon de l''Ange','S''abat sur la cible depuis les cieux.','attaque','ignore_def',105,NULL,20,0,'rare',260,'lumiere','boutique',100),
('Aura de Vérité','La lumière révèle toute chose.','statut','dissipe_buff',0,NULL,0,0,'rare',200,'lumiere','boutique',65),
('Lame de l''Aurore','Coup d''arme blanche dévastateur.','attaque','ignore_def',125,NULL,30,0,'epique',420,'lumiere','boutique',130),
('Purification Radicale','Rayon qui fond littéralement la cible.','attaque','ignore_def_spe',115,NULL,40,0,'epique',460,'lumiere','boutique',140),
('Jugement Solaire','La justice pure s''abat, sans filtre.','attaque','ignore_def',140,NULL,70,0,'legendaire',680,'lumiere','boutique',180),
('Supernova','Explosion d''une étoile, burst ultime.','attaque','magique',200,NULL,0,0,'legendaire',800,'lumiere','boutique',-1),
-- === SURNATUREL ===
('Paume Éthérée','Onde de choc magique instable. Dégâts imprévisibles entre 20 et 60.','attaque','aleatoire',60,NULL,20,0,'commun',35,'surnaturel','boutique',10),
('Orbe Arcanique','Projectile d''énergie violette.','attaque','magique',45,NULL,0,0,'commun',40,'surnaturel','boutique',15),
('Murmure Dissonant','Rend l''ennemi susceptible de se frapper.','buff','buff_esquive',0,NULL,15,3,'commun',60,'surnaturel','boutique',25),
('Estoc Immatériel','Arme traversant partiellement la matière.','attaque','ignore_def',50,NULL,30,0,'commun',55,'surnaturel','boutique',20),
('Distorsion','La force devient faiblesse.','statut','dissipe_buff',0,NULL,0,0,'peu_commun',110,'surnaturel','boutique',45),
('Frappe Magique','Coup imprégné de mana brut.','attaque','magique',65,NULL,0,0,'peu_commun',100,'surnaturel','boutique',35),
('Choc Temporel','Ralentit localement le temps.','attaque','magique',60,'debuff_vitesse',5,3,'peu_commun',120,'surnaturel','boutique',45),
('Regard Fou','Regard figeant le cerveau reptilien.','statut','stun',0,NULL,0,2,'peu_commun',130,'surnaturel','boutique',50),
('Onde Mentale','Choc psychique direct dans la tête.','attaque','magique',85,'stun',0,1,'rare',210,'surnaturel','boutique',65),
('Sceaux Explosifs','Glyphes instables explosant au contact. Dégâts imprévisibles entre 50 et 130.','attaque','aleatoire',130,NULL,50,0,'rare',220,'surnaturel','boutique',70),
('Vol de Pensée','Vous jouez à la place de l''ennemi.','statut','stun',0,NULL,0,1,'rare',260,'surnaturel','boutique',85),
('Fente de Dimension','Disparaît pour réapparaître en frappant.','attaque','ignore_def',95,NULL,100,0,'rare',240,'surnaturel','boutique',75),
('Chaos Mental','Attaque bloquant le système nerveux.','attaque','magique',80,'stun',0,2,'epique',360,'surnaturel','boutique',90),
('Roulette Arcanique','Laisse le mana décider du sort du combat.','attaque','magique',110,NULL,0,0,'epique',400,'surnaturel','boutique',100),
('Miroir aux Illusions','Crée un double parfait de la cible.','statut','stun',0,NULL,0,1,'epique',450,'surnaturel','boutique',120),
('Désintégration','Incantation interdite de suppression pure.','attaque','magique',80,NULL,0,0,'legendaire',700,'surnaturel','boutique',160),
-- === TECHNOLOGIE ===
('Coup de Piston','Un coup mécanique lourd qui fait chauffer le bras.','attaque','surchauffe_add',45,NULL,1,0,'commun',35,'technologie','boutique',10),
('Tir d''Échauffement','Un tir rapide qui commence à faire rougir le canon.','attaque','surchauffe_add_mag',40,NULL,1,0,'commun',40,'technologie','boutique',15),
('Soupape de Sécurité','Purge toutes les charges de surchauffe. Restaure 5 mana par charge retirée.','statut','surchauffe_reset_mana',0,NULL,5,0,'commun',60,'technologie','boutique',5),
('Lame Scie-Circulaire','Fait tourner une lame à plein régime.','attaque','surchauffe_add',50,NULL,1,0,'commun',50,'technologie','boutique',18),
('Jet de Vapeur','Souffle la vapeur brûlante de l''armure au visage ennemi.','attaque','surchauffe_purge',45,'debuff_precision',15,3,'peu_commun',95,'technologie','boutique',30),
('Overclock Mineur','Désactive les sécurités pour accélérer les mouvements.','buff','buff_vitesse',0,NULL,8,3,'peu_commun',110,'technologie','boutique',25),
('Frappe Cylindrique','Un impact brutal avec un bras pneumatique.','attaque','surchauffe_add',70,NULL,2,0,'peu_commun',120,'technologie','boutique',40),
('Décharge d''Urgence','Éjecte toute l''énergie thermique accumulée dans un tir.','attaque','surchauffe_purge',60,NULL,15,0,'peu_commun',130,'technologie','boutique',45),
('Tir Plasma Brut','Un faisceau surchauffé très coûteux pour le matériel.','attaque','surchauffe_add_mag',80,NULL,2,0,'rare',210,'technologie','boutique',65),
('Garde Thermique','Refroidit le système en solidifiant les plaques externes.','statut','reduction_degats',0,NULL,20,2,'rare',200,'technologie','boutique',50),
('Coup de Clé Rouge','Frappe avec un outil chauffé à blanc.','attaque','surchauffe_add',65,'brulure',10,3,'rare',190,'technologie','boutique',55),
('Épée Tronçonneuse','Découpe l''ennemi dans un hurlement de moteur.','attaque','surchauffe_add',85,NULL,2,0,'rare',230,'technologie','boutique',70),
('Souffle Cryogénique','Refroidissement brutal créant un choc thermique chez l''ennemi.','attaque','surchauffe_purge',75,'stun',0,1,'epique',380,'technologie','boutique',85),
('Surcharge Volontaire','Pousse sciemment la machine à son point de rupture.','statut','prochain_attq_mult',0,NULL,200,0,'epique',400,'technologie','boutique',70),
('Marteau Pilon','Une attaque fracassante, extrêmement dangereuse pour vous.','attaque','surchauffe_add',115,NULL,3,0,'epique',420,'technologie','boutique',100),
('Rayon Dissipateur','Utilise la chaleur pour faire fondre les protections ennemies.','attaque','surchauffe_purge',95,'debuff_def_spe',8,3,'epique',460,'technologie','boutique',115),
('Canon Électromagnétique','Un tir d''une puissance colossale qui enflamme les circuits.','attaque','surchauffe_add_mag',130,NULL,3,0,'legendaire',620,'technologie','boutique',130),
('Noyau en Fusion','L''attaque suicide parfaite pour terminer un boss.','attaque','surchauffe_add',145,NULL,4,0,'legendaire',680,'technologie','boutique',140),
('Purge Nucléaire','Le bouton d''évacuation d''urgence de votre réacteur.','attaque','surchauffe_purge',150,NULL,20,0,'legendaire',750,'technologie','boutique',160),
-- === TÉNÈBRES ===
('Coup Bas Furtif','Frappe vicieuse dans l''angle mort.','attaque','physique',40,NULL,0,0,'commun',35,'tenebres','boutique',10),
('Orbe de Suie','Boule d''énergie sale aspirant la magie.','attaque','vol_mana',40,NULL,10,0,'commun',45,'tenebres','boutique',15),
('Entaille Sinueuse','Tranche l''ennemi pour siphonner son flux.','attaque','physique',50,'vol_mana',10,0,'commun',50,'tenebres','boutique',20),
('Sceau Maudit','Pose une malédiction à retardement.','statut','marque',0,NULL,70,2,'commun',65,'tenebres','boutique',25),
('Voile d''Opacité','Plonge la cible dans un brouillard corrompu.','statut','anti_heal',0,NULL,0,2,'peu_commun',95,'tenebres','boutique',35),
('Terreur Rampante','Fige de peur, retardant l''action adverse.','attaque','magique',55,'debuff_vitesse',5,3,'peu_commun',110,'tenebres','boutique',40),
('Frappe Éclipse','Coup lourd punissant les cibles vidées.','attaque','physique',75,NULL,0,0,'peu_commun',130,'tenebres','boutique',50),
('Corruption d''Aura','Vole la force magique de l''adversaire.','statut','dissipe_buff',0,NULL,0,0,'peu_commun',140,'tenebres','boutique',55),
('Ombre Étouffante','Filaments sombres serrant la gorge.','attaque','vol_mana',65,NULL,25,0,'rare',190,'tenebres','boutique',60),
('Marque du Destin','Une bombe magique collée sur la cible.','statut','marque',0,NULL,120,3,'rare',230,'tenebres','boutique',75),
('Brise-Nuque Obscur','Coup sec à la base du crâne.','attaque','physique',85,'stun',0,3,'rare',210,'tenebres','boutique',65),
('Poids du Néant','La gravité pèse sur la magie adverse.','statut','debuff_attq_spe',0,NULL,5,3,'rare',200,'tenebres','boutique',60),
('Cauchemar Éveillé','Attaque psychique noire.','attaque','vol_mana',95,NULL,50,0,'epique',380,'tenebres','boutique',90),
('Exécution Différée','Frappe résonnant avec les malédictions.','attaque','physique',115,NULL,0,0,'epique',420,'tenebres','boutique',110),
('Gouffre Dévorant','Faisceau rongeant le corps et l''esprit.','attaque','vol_mana',100,NULL,50,0,'epique',450,'tenebres','boutique',115),
('Abysse Absolu','Fait détoner toutes les malédictions instantanément.','attaque','magique',80,NULL,0,0,'legendaire',750,'tenebres','boutique',170),
-- === NEUTRE (sans mana) ===
('Garde de Fer','Le personnage lève son arme pour encaisser le prochain coup.','statut','reduction_degats',0,NULL,50,1,'commun',20,'neutre','boutique',0),
('Coup de Pommeau','Un coup sec et contondant au visage pour désorienter.','attaque','physique',25,'debuff_vitesse',5,2,'commun',25,'neutre','boutique',0),
('Feinte','Fait semblant de frapper pour ouvrir la garde de l''adversaire.','statut','prochain_attq_mult',0,NULL,150,0,'commun',30,'neutre','boutique',0),
('Fente Rapide','Une attaque vive suivie d''un pas de retrait immédiat.','attaque','physique',35,NULL,0,0,'peu_commun',45,'neutre','boutique',0),
('Frappe Lourde','Un grand coup très puissant mais prévisible.','attaque','physique',60,NULL,0,0,'peu_commun',50,'neutre','boutique',0),
('Brise-Garde','Un coup de pied frontal conçu pour briser la posture ennemie.','attaque','physique',30,'debuff_def',3,3,'peu_commun',60,'neutre','boutique',0),
('Respiration Martiale','Le personnage prend une grande inspiration pour recharger.','statut','soin_restore_mana',0,NULL,15,0,'rare',75,'neutre','boutique',0),
('Balayage Tactique','Un fauchage visant les appuis pour déstabiliser l''adversaire.','attaque','physique',35,NULL,0,0,'rare',90,'neutre','boutique',0),
('Riposte Parfaite','Une posture d''attente redoutable.','statut','riposte',0,NULL,100,1,'epique',120,'neutre','boutique',0),
('Coup de Grâce','La technique d''exécution pour achever un combat.','attaque','physique',40,NULL,0,0,'epique',150,'neutre','boutique',0);
