ALTER TABLE stuff ADD COLUMN rarete TEXT DEFAULT 'commun';

UPDATE stuff SET slot='arme_1main'    WHERE slot IN ('main_droite','main_gauche') AND categorie='arme';
UPDATE stuff SET slot='arme_2mains'   WHERE slot='deux_mains';
UPDATE stuff SET slot='bouclier_1main', categorie='arme' WHERE id=2;

UPDATE stuff SET rarete='commun'      WHERE id IN (1,2,6,7,8);
UPDATE stuff SET rarete='peu_commun'  WHERE id=3;
UPDATE stuff SET rarete='rare'        WHERE id=4;
UPDATE stuff SET rarete='epique'      WHERE id=5;
