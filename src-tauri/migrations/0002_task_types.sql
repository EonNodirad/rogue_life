-- Ajout du type de tâche et de la durée pour les tâches ponctuelles
ALTER TABLE tache ADD COLUMN type TEXT DEFAULT 'ponctuelle';
ALTER TABLE tache ADD COLUMN duree_jours INTEGER;
ALTER TABLE tache ADD COLUMN date_creation TEXT;
