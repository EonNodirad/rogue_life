CREATE TABLE competence (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    effet_type TEXT NOT NULL,
    valeur INTEGER DEFAULT 0,
    duree_tours INTEGER DEFAULT 0,
    rarete TEXT DEFAULT 'commun',
    prix_boutique INTEGER DEFAULT 50
);

CREATE TABLE personnage_competence (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personnage_id INTEGER REFERENCES personnage(id),
    competence_id INTEGER REFERENCES competence(id),
    est_equipee INTEGER DEFAULT 0
);

INSERT INTO competence (nom, description, type, effet_type, valeur, duree_tours, rarete, prix_boutique) VALUES
('Coup puissant',  'Attaque physique dévastatrice',          'attaque', 'physique',    15, 0, 'commun',     30),
('Éclair',         'Attaque magique instantanée',            'attaque', 'magique',     12, 0, 'peu_commun', 50),
('Rage',           '+5 ATQ pendant 3 tours',                 'buff',    'buff_attq',    5, 3, 'peu_commun', 60),
('Poison',         'Inflige 4 dégâts par tour pendant 3 tours', 'statut', 'poison',    4, 3, 'rare',       80),
('Étourdissement', 'Le monstre passe son prochain tour',     'statut',  'stun',         0, 1, 'rare',       90);
