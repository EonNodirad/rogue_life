-- Migration 004 : système de quêtes principales et secondaires
CREATE TABLE IF NOT EXISTS quete (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  nom TEXT NOT NULL,
  description TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('principale', 'secondaire')),
  exp_recompense INTEGER DEFAULT 0,
  gold_recompense INTEGER DEFAULT 0,
  titre_recompense TEXT DEFAULT NULL,
  date_creation TEXT DEFAULT CURRENT_TIMESTAMP,
  statut TEXT DEFAULT 'en_cours' CHECK (statut IN ('en_cours', 'complete', 'abandonnee'))
);

CREATE TABLE IF NOT EXISTS quete_etape (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quete_id INTEGER NOT NULL REFERENCES quete(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  complete INTEGER DEFAULT 0
);

PRAGMA user_version = 4;
