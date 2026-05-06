-- Migration 003 : liaison donjon <-> personnage

-- Donjon actif du personnage (NULL si pas en cours)
ALTER TABLE personnage ADD COLUMN donjon_id_actuel INTEGER REFERENCES donjon(id) DEFAULT NULL;

-- Historique des runs de donjon
CREATE TABLE IF NOT EXISTS historique_donjon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  donjon_id INTEGER NOT NULL REFERENCES donjon(id),
  etage_max INTEGER NOT NULL DEFAULT 0,
  salle_max INTEGER NOT NULL DEFAULT 0,
  resultat TEXT NOT NULL CHECK (resultat IN ('victoire', 'defaite', 'abandon')),
  date_run TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

PRAGMA user_version = 3;
