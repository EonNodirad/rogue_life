-- Ajout du champ source sur les compétences
ALTER TABLE competence ADD COLUMN source TEXT DEFAULT 'boutique';

-- Compétences exclusives donjon (plus puissantes, raretés élevées)
INSERT INTO competence (nom, description, type, effet_type, valeur, duree_tours, rarete, prix_boutique, element, source) VALUES
('Frappe de l''Abîme',  'Coup des ténèbres dévastateur',     'attaque', 'physique', 60, 0, 'rare',       0, 'tenebres', 'donjon'),
('Appel du Néant',      'Drain vital des profondeurs',       'attaque', 'physique', 55, 0, 'rare',       0, 'mort',     'donjon'),
('Nova Solaire',        'Explosion de lumière aveuglante',   'attaque', 'magique',  65, 0, 'epique',     0, 'lumiere',  'donjon'),
('Tremblement de Terre','Frappe tellurique épique',          'attaque', 'physique', 70, 0, 'epique',     0, 'terre',    'donjon'),
('Tornade Arcanique',   'Tempête magique incontrôlable',     'attaque', 'magique',  65, 0, 'epique',     0, 'air',      'donjon'),
('Maelström',           'Vortex aquatique légendaire',       'attaque', 'magique',  80, 0, 'legendaire', 0, 'eau',      'donjon'),
('Extinction',          'Souffle des ténèbres légendaire',   'attaque', 'physique', 85, 0, 'legendaire', 0, 'tenebres', 'donjon'),
('Phénix',              'Flamme légendaire purificatrice',   'attaque', 'magique',  80, 0, 'legendaire', 0, 'feu',      'donjon');
