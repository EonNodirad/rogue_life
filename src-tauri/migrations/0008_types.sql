ALTER TABLE competence ADD COLUMN element TEXT DEFAULT 'neutre';

CREATE TABLE personnage_affinite (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personnage_id INTEGER REFERENCES personnage(id),
    element TEXT NOT NULL,
    bonus_pct INTEGER DEFAULT 0
);

-- Compétences test (une par élément)
INSERT INTO competence (nom, description, type, effet_type, valeur, duree_tours, rarete, prix_boutique, element) VALUES
('Frappe Surnaturelle', 'Attaque de type surnaturel', 'attaque', 'physique', 40, 0, 'commun', 35, 'surnaturel'),
('Tir Techno',          'Tir de type technologie',   'attaque', 'magique',  40, 0, 'commun', 35, 'technologie'),
('Boule de Feu',        'Attaque de type feu',        'attaque', 'magique',  40, 0, 'commun', 35, 'feu'),
('Vague Glaciale',      'Attaque de type eau',        'attaque', 'magique',  40, 0, 'commun', 35, 'eau'),
('Séisme',              'Attaque de type terre',      'attaque', 'physique', 40, 0, 'commun', 35, 'terre'),
('Rafale',              'Attaque de type air',        'attaque', 'magique',  40, 0, 'commun', 35, 'air'),
('Soin Naturel',        'Attaque de type vie',        'attaque', 'magique',  40, 0, 'commun', 35, 'vie'),
('Drain Vital',         'Attaque de type mort',       'attaque', 'physique', 40, 0, 'commun', 35, 'mort'),
('Ombre Menaçante',     'Attaque de type ténèbre',    'attaque', 'physique', 40, 0, 'commun', 35, 'tenebres'),
('Éclat de Lumière',    'Attaque de type lumière',    'attaque', 'magique',  40, 0, 'commun', 35, 'lumiere');
