-- Migration 002 : ajout colonne avatar sur personnage
ALTER TABLE personnage ADD COLUMN avatar TEXT DEFAULT NULL;
PRAGMA user_version = 2;
