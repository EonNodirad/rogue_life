-- Migration 001 : gold de départ 0 → 50
-- Seuls les joueurs à 0 gold sont mis à jour (ceux qui ont dépensé leur or ne sont pas touchés)
UPDATE personnage SET gold_actuel = 50 WHERE gold_actuel = 0;
PRAGMA user_version = 1;
