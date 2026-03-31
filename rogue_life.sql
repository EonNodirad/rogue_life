CREATE TABLE caracteristique (
  id INT PRIMARY KEY,
  pv_vie_max INT,
  pv_vie_actuels INT,
  pv_combat_max INT,
  pv_combat_actuels INT,
  attq INT,
  attq_spe INT,
  def INT,
  def_spe INT,
  vitesse INT
);

CREATE TABLE level (
  id INT PRIMARY KEY,
  exp_max_requise INT
);

CREATE TABLE classe (
  id INT PRIMARY KEY,
  nom VARCHAR(255)
);

CREATE TABLE titre (
  id INT PRIMARY KEY,
  nom VARCHAR(255),
  bonus_stat VARCHAR(255)
);

CREATE TABLE personnage (
  id INT PRIMARY KEY,
  nom VARCHAR(255),
  experience_actuelle INT DEFAULT 0,
  gold_actuel INT DEFAULT 0,
  classe_id INT,
  titre_id INT,
  level_id INT,
  caracteristique_id INT,
  FOREIGN KEY (classe_id) REFERENCES classe(id),
  FOREIGN KEY (titre_id) REFERENCES titre(id),
  FOREIGN KEY (level_id) REFERENCES level(id),
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

-- Le retour des Monstres !
CREATE TABLE monstre (
  id INT PRIMARY KEY,
  nom VARCHAR(255),
  caracteristique_id INT,
  exp_recompense INT,
  gold_recompense INT,
  FOREIGN KEY (caracteristique_id) REFERENCES caracteristique(id)
);

-- Ajout d'une table Donjon pour structurer l'exploration
CREATE TABLE donjon (
  id INT PRIMARY KEY,
  nom VARCHAR(255),
  niveau_recommande INT
);

-- Table de liaison : Quel monstre apparait dans quel donjon
CREATE TABLE donjon_monstre (
  donjon_id INT,
  monstre_id INT,
  taux_apparition INT, -- Pourcentage de chance de le croiser
  PRIMARY KEY (donjon_id, monstre_id),
  FOREIGN KEY (donjon_id) REFERENCES donjon(id),
  FOREIGN KEY (monstre_id) REFERENCES monstre(id)
);

CREATE TABLE historique_poids (
  id INT PRIMARY KEY,
  personnage_id INT,
  date_mesure TIMESTAMP,
  valeur_poids DECIMAL(5,2),
  FOREIGN KEY (personnage_id) REFERENCES personnage(id)
);

CREATE TABLE stuff (
  id INT PRIMARY KEY,
  nom VARCHAR(255),
  bonus_attq INT DEFAULT 0, -- Le stuff doit booster les stats du combat !
  bonus_def INT DEFAULT 0,
  prix_base INT
);

CREATE TABLE inventaire (
  id INT PRIMARY KEY,
  personnage_id INT,
  stuff_id INT,
  quantite INT DEFAULT 1,
  est_equipe BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

CREATE TABLE magasin (
  id INT PRIMARY KEY,
  nom VARCHAR(255)
);

CREATE TABLE magasin_inventaire (
  magasin_id INT,
  stuff_id INT,
  prix_vente_local INT,
  PRIMARY KEY (magasin_id, stuff_id),
  FOREIGN KEY (magasin_id) REFERENCES magasin(id),
  FOREIGN KEY (stuff_id) REFERENCES stuff(id)
);

CREATE TABLE tache (
  id INT PRIMARY KEY,
  nom VARCHAR(255),
  type_activite VARCHAR(50), 
  difficulte INT,
  exp_recompense INT,
  gold_recompense INT,
  pv_vie_penalite INT -- Les dégâts pris sur la vie IRL en cas d'échec
);

CREATE TABLE historique_activite (
  id INT PRIMARY KEY,
  personnage_id INT,
  tache_id INT,
  date_action TIMESTAMP,
  statut VARCHAR(50), 
  FOREIGN KEY (personnage_id) REFERENCES personnage(id),
  FOREIGN KEY (tache_id) REFERENCES tache(id)
);