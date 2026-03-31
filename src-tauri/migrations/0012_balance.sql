-- Équilibrage stats initiales : attq_spe = attq, def_spe = def
UPDATE caracteristique SET attq_spe = 10, def_spe = 8 WHERE id = 1;

-- Date limite pour les tâches ponctuelles
ALTER TABLE tache ADD COLUMN date_limite TEXT;

-- Convertir les tâches existantes
UPDATE tache SET date_limite = date(date_creation, '+' || duree_jours || ' days')
WHERE type = 'ponctuelle' AND duree_jours IS NOT NULL AND date_creation IS NOT NULL;
