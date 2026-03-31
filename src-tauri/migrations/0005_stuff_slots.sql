ALTER TABLE stuff ADD COLUMN categorie TEXT DEFAULT 'arme';
ALTER TABLE stuff ADD COLUMN slot TEXT DEFAULT 'main_droite';
ALTER TABLE stuff ADD COLUMN soin_pv INTEGER DEFAULT 0;

ALTER TABLE personnage ADD COLUMN jokers_disponibles INTEGER DEFAULT 0;

-- Reclasser les items existants
UPDATE stuff SET categorie='arme',   slot='main_droite' WHERE id IN (1, 3, 5);
UPDATE stuff SET categorie='armure', slot='main_gauche' WHERE id = 2;
UPDATE stuff SET categorie='armure', slot='plastron'    WHERE id = 4;

-- Nouveaux items utilitaires
INSERT OR IGNORE INTO stuff (id, nom, categorie, slot, soin_pv, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base) VALUES
  (6, 'Petite potion de soin', 'utilitaire', 'consommable', 20, 0, 0, 0, 0, 0, 0, 15),
  (7, 'Grande potion de soin', 'utilitaire', 'consommable', 50, 0, 0, 0, 0, 0, 0, 40),
  (8, 'Joker de routine',      'utilitaire', 'joker',        0, 0, 0, 0, 0, 0, 0, 60);

INSERT OR IGNORE INTO magasin_inventaire (magasin_id, stuff_id, prix_vente_local) VALUES
  (1, 6, 15),
  (1, 7, 40),
  (1, 8, 60);
