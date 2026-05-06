# Bases de données relationnelles : projet
## Rogue Life — Document de conception

**Noé Daridon**  
Version du 30 avril 2026

---

## Table des matières

1. [Analyse des besoins](#1-analyse-des-besoins)
   - 1.1 [Expression des besoins](#11-expression-des-besoins)
   - 1.2 [Association entre entités](#12-association-entre-entités)
   - 1.3 [Modèle Entité-Association](#13-modèle-entité-association)
   - 1.4 [Entités associatives](#14-entités-associatives)
2. [Modèle de données](#2-modèle-de-données)
   - 2.1 [Cardinalités des associations](#21-cardinalités-des-associations)
3. [Base de données](#3-base-de-données)
   - 3.1 [Structuration](#31-structuration)
   - 3.2 [Clés primaires](#32-clés-primaires)
   - 3.3 [Création (extrait)](#33-création-extrait)
4. [Cas d'usage](#4-cas-dusage)
   - 4.1 [Projection sur une table](#41-projection-sur-une-table)
   - 4.2 [Restriction sur une table](#42-restriction-sur-une-table)
   - 4.3 [Connecteurs logiques](#43-connecteurs-logiques)
   - 4.4 [Jointures](#44-jointures)
   - 4.5 [Opérations ensemblistes](#45-opérations-ensemblistes)
   - 4.6 [Fonctions d'agrégat](#46-fonctions-dagrégat)
   - 4.7 [Groupements](#47-groupements)
   - 4.8 [Restriction sur groupements](#48-restriction-sur-groupements)
   - 4.9 [Division relationnelle](#49-division-relationnelle)
5. [Conclusion](#5-conclusion)
6. [Améliorations](#6-améliorations)

---

## 1 Analyse des besoins

À partir d'une simple expression des besoins nous allons identifier les entités et les relations (associations) existantes entre ces entités pour obtenir une analyse précise de ces besoins.

### 1.1 Expression des besoins

> *"Un personnage accomplit des tâches, explore des donjons et gère son équipement."*

On identifie dans cette phrase trois entités principales sur lesquelles on peut préciser des informations :

- **Personnage** : nom, expérience, gold, mode de jeu
- **Tache** : nom, type d'activité, difficulté, récompenses
- **Donjon** : nom, niveau recommandé

Et trois entités de support :

- **Stuff** : nom, catégorie, slot, rareté, élément, bonus de combat
- **Competence** : nom, type (actif/passif), source (boutique/donjon), coût en mana
- **Monstre** : nom, statistiques, récompenses

Entre ces entités il existe des relations implicites (associations) que nous allons expliciter en précisant les cardinalités.

### 1.2 Association entre entités

Nous allons préciser nos besoins en formulant des phrases **sujet-verbe-complément**.

Associations identifiées :

1. **personnage–tache** : chaque personnage accomplit au moins une tâche
2. **personnage–donjon** : chaque personnage explore au moins un donjon
3. **personnage–stuff** : chaque personnage possède au moins un équipement
4. **personnage–competence** : chaque personnage apprend au moins une compétence
5. **personnage–classe** : chaque personnage débloque au moins une classe
6. **donjon–monstre** : chaque donjon contient au moins un monstre
7. **magasin–stuff** : chaque magasin propose au moins un équipement

En inversant sujet et complément :

1. **tache–personnage** : chaque tâche peut être accomplie par plusieurs personnages
2. **donjon–personnage** : chaque donjon peut être exploré par plusieurs personnages
3. **stuff–personnage** : un même équipement peut appartenir à plusieurs personnages
4. **competence–personnage** : une même compétence peut être apprise par plusieurs personnages
5. **classe–personnage** : une classe peut être débloquée par plusieurs personnages
6. **monstre–donjon** : un même monstre peut apparaître dans plusieurs donjons
7. **stuff–magasin** : un même équipement peut être vendu dans plusieurs magasins

On relève des associations **plusieurs-à-plusieurs** pour chacune de ces relations.

### 1.3 Modèle Entité-Association

```
Personnage (1..*) ──── historique_activite ──── (1..*) Tache
Personnage (1..*) ──── historique_donjon   ──── (1..*) Donjon
Personnage (1..*) ──── inventaire          ──── (1..*) Stuff
Personnage (1..*) ──── personnage_competence── (1..*) Competence
Personnage (1..*) ──── personnage_classe_debloquee ── (1..*) Classe
Donjon     (1..*) ──── donjon_monstre      ──── (1..*) Monstre
Magasin    (1..*) ──── magasin_inventaire  ──── (1..*) Stuff
```

Associations **un-à-plusieurs** (clés étrangères directes) :

```
Classe      (1) ────── (0..*) Personnage    (classe_id)
Titre       (1) ────── (0..*) Personnage    (titre_id)
Level       (1) ────── (0..*) Personnage    (level_id)
Caracteristique (1) ── (1)    Personnage    (caracteristique_id)
Caracteristique (1) ── (0..*) Monstre       (caracteristique_id)
Classe      (0..1) ─── (0..*) Classe        (parent_id — réflexif)
Donjon      (0..1) ─── (0..*) Personnage    (donjon_id_actuel — migration_003)
```

### 1.4 Entités associatives

Dans le cas d'associations plusieurs-à-plusieurs, il est nécessaire de créer des entités associatives.

#### 1.4.1 Historique des activités

On précise les contraintes entre **personnage** et **tache** via `historique_activite` :

- **personnage–historique_activite** : un personnage génère une ou plusieurs entrées d'historique
- **historique_activite–personnage** : chaque entrée concerne un seul personnage
- **tache–historique_activite** : une tâche peut apparaître dans plusieurs entrées
- **historique_activite–tache** : chaque entrée concerne une seule tâche

Associations **un-à-plusieurs** (1..1 − 1..\*) :
- personnage → historique_activite
- tache → historique_activite

Attributs propres à l'entité associative : `date_action`, `statut`, `nom_tache`.

#### 1.4.2 Inventaire

On précise les contraintes entre **personnage** et **stuff** via `inventaire` :

- **personnage–inventaire** : un personnage possède un ou plusieurs items
- **inventaire–personnage** : chaque ligne d'inventaire appartient à un seul personnage
- **stuff–inventaire** : un équipement peut être dans plusieurs inventaires
- **inventaire–stuff** : chaque ligne concerne un seul équipement

Attributs propres : `quantite`, `est_equipe`.

#### 1.4.3 Compétences du personnage

On précise les contraintes entre **personnage** et **competence** via `personnage_competence` :

- **personnage–personnage_competence** : un personnage possède une ou plusieurs compétences
- **competence–personnage_competence** : une compétence peut appartenir à plusieurs personnages

Attribut propre : `est_equipee`.

#### 1.4.4 Historique des donjons

On précise les contraintes entre **personnage** et **donjon** via `historique_donjon` :

- **personnage–historique_donjon** : un personnage peut avoir plusieurs runs de donjon
- **historique_donjon–personnage** : chaque run concerne un seul personnage
- **donjon–historique_donjon** : un donjon peut avoir été exploré plusieurs fois
- **historique_donjon–donjon** : chaque run concerne un seul donjon

Attributs propres : `etage_max`, `salle_max`, `resultat`, `date_run`.

#### 1.4.5 Monstres du donjon

On précise les contraintes entre **donjon** et **monstre** via `donjon_monstre` :

- **donjon–donjon_monstre** : un donjon contient un ou plusieurs monstres
- **monstre–donjon_monstre** : un monstre peut apparaître dans plusieurs donjons

Attribut propre : `taux_apparition`.

---

## 2 Modèle de données

### 2.1 Cardinalités des associations

| Phrase (sujet → complément) | Cardinalité |
|---|---|
| un personnage a une seule classe active | 1..1 (personnage → classe) |
| une classe est portée par zéro ou plusieurs personnages | 0..* (classe → personnage) |
| un personnage possède exactement une caracteristique | 1..1 (personnage → caracteristique) |
| une caracteristique décrit un seul personnage ou monstre | 1..1 ou 0..1 |
| un personnage accomplit zéro ou plusieurs tâches | 0..* |
| une tâche est accomplie par zéro ou plusieurs personnages | 0..* |
| un personnage explore zéro ou plusieurs donjons | 0..* |
| un donjon est exploré par zéro ou plusieurs personnages | 0..* |
| un donjon contient un ou plusieurs monstres | 1..* |
| un monstre apparaît dans zéro ou plusieurs donjons | 0..* |
| une classe peut être parente de zéro ou plusieurs classes | 0..* (réflexif) |
| une classe a au plus un parent | 0..1 (réflexif) |

### Diagramme schématique (simplifié)

```
[Caracteristique] 1──1 [Personnage] 1──1 [Level]
                            │                └── (exp_max_requise)
                     ┌──────┼──────────┐
                     │      │          │
               [Classe]  [Titre]   [Donjon] (donjon_id_actuel)
               (arbre,     (bonus_    (actuel)
               palier,     stat)
               parent_id◄──┘réflexif)

[Personnage] ──< [inventaire] >── [Stuff]
[Personnage] ──< [personnage_competence] >── [Competence]
[Personnage] ──< [personnage_classe_debloquee] >── [Classe]
[Personnage] ──< [historique_activite] >── [Tache]
[Personnage] ──< [historique_donjon] >── [Donjon]
[Personnage] ──< [historique_poids]
[Donjon]     ──< [donjon_monstre] >── [Monstre]
[Magasin]    ──< [magasin_inventaire] >── [Stuff]
[Caracteristique] 1──* [Monstre]
```

---

## 3 Base de données

### 3.1 Structuration

On déduit du modèle la structuration suivante (15 tables) :

**Tables principales :**
1. `caracteristiques(id, pv_vie_max, pv_vie_actuels, pv_combat_max, pv_combat_actuels, attq, attq_spe, def, def_spe, vitesse, mana_max, mana_actuels)`
2. `levels(id, exp_max_requise)`
3. `classes(id, nom, arbre, palier, #parent_id, bonus_attq, bonus_def, bonus_attq_spe, bonus_def_spe, bonus_vit, bonus_pv_max, bonus_aff_elem)`
4. `titres(id, nom, bonus_stat)`
5. `personnages(id, nom, experience_actuelle, gold_actuel, #classe_id, #titre_id, #level_id, #caracteristique_id, compteur_loot_donjon, mode, avatar, #donjon_id_actuel, ...)`
6. `monstres(id, nom, #caracteristique_id, exp_recompense, gold_recompense)`
7. `donjons(id, nom, niveau_recommande)`
8. `stuffs(id, nom, bonus_attq, bonus_attq_spe, bonus_def, bonus_def_spe, bonus_vitesse, bonus_pv_combat, prix_base, categorie, slot, soin_pv, rarete, bonus_aff_elem, element)`
9. `competences(id, nom, description, type, effet_type, puissance, valeur, duree_tours, rarete, prix_boutique, element, source, cout_mana)`
10. `magasins(id, nom)`
11. `taches(id, nom, type_activite, difficulte, exp_recompense, gold_recompense, pv_vie_penalite, type, duree_jours, date_creation, date_limite)`

**Tables associatives :**
12. `donjon_monstre(#donjon_id, #monstre_id, taux_apparition)`
13. `inventaire(id, #personnage_id, #stuff_id, quantite, est_equipe)`
14. `magasin_inventaire(#magasin_id, #stuff_id, prix_vente_local)`
15. `personnage_competence(id, #personnage_id, #competence_id, est_equipee)`
16. `personnage_affinite(id, #personnage_id, element, bonus_pct)`
17. `personnage_classe_debloquee(#personnage_id, #classe_id)`
18. `historique_activite(id, #personnage_id, #tache_id, date_action, statut, nom_tache)`
19. `historique_donjon(id, #personnage_id, #donjon_id, etage_max, salle_max, resultat, date_run)`
20. `historique_poids(id, #personnage_id, date_mesure, valeur_poids)`

### 3.2 Clés primaires

Choix des clés primaires composées et leurs contraintes métier :

- **donjon_monstre** : `(donjon_id, monstre_id)` — un monstre ne peut être référencé qu'une fois par donjon.
- **magasin_inventaire** : `(magasin_id, stuff_id)` — un même équipement ne peut être proposé qu'une fois par magasin.
- **personnage_classe_debloquee** : `(personnage_id, classe_id)` — un personnage ne peut débloquer une classe qu'une seule fois.

Clés simples auto-incrémentées (`INTEGER PRIMARY KEY AUTOINCREMENT`) :
- `inventaire`, `personnage_competence`, `personnage_affinite`, `historique_activite`, `historique_donjon`, `historique_poids`, `tache`.

### 3.3 Création (extrait)

Tables de référence (sans données) :

```sql
CREATE TABLE caracteristique (
  id INTEGER PRIMARY KEY,
  pv_vie_max INTEGER, pv_vie_actuels INTEGER,
  pv_combat_max INTEGER, pv_combat_actuels INTEGER,
  attq INTEGER, attq_spe INTEGER,
  def INTEGER, def_spe INTEGER,
  vitesse INTEGER,
  mana_max INTEGER DEFAULT 150,
  mana_actuels INTEGER DEFAULT 150
);

CREATE TABLE personnage (
  id INTEGER PRIMARY KEY,
  nom TEXT,
  experience_actuelle INTEGER DEFAULT 0,
  gold_actuel INTEGER DEFAULT 50,
  classe_id INTEGER REFERENCES classe(id),
  titre_id INTEGER REFERENCES titre(id),
  level_id INTEGER REFERENCES level(id),
  caracteristique_id INTEGER REFERENCES caracteristique(id),
  compteur_loot_donjon INTEGER DEFAULT 0,
  mode TEXT DEFAULT 'normal',
  avatar TEXT DEFAULT NULL,
  donjon_id_actuel INTEGER REFERENCES donjon(id) DEFAULT NULL
);

CREATE TABLE historique_donjon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  personnage_id INTEGER NOT NULL REFERENCES personnage(id),
  donjon_id INTEGER NOT NULL REFERENCES donjon(id),
  etage_max INTEGER NOT NULL DEFAULT 0,
  salle_max INTEGER NOT NULL DEFAULT 0,
  resultat TEXT NOT NULL CHECK (resultat IN ('victoire', 'defaite', 'abandon')),
  date_run TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Données initiales minimales pour les tests :

| personnage | | donjon | | tache |
|---|---|---|---|---|
| id=1, nom='Héros', level_id=1 | | id=1, nom='Crypte Oubliée', niveau_recommande=1 | | id=1, nom='Course 5km', type='sport' |
| classe_id=1 (Guerrier) | | id=2, nom='Tour des Ombres', niveau_recommande=5 | | id=2, nom='Lire 30min', type='lecture' |

---

## 4 Cas d'usage

Une fois la base alimentée, on valide la structuration en testant les opérateurs de l'algèbre relationnelle.

### 4.1 Projection sur une table

**Cas d'usage :**
> "Nom et niveau recommandé de tous les donjons"

**Algèbre relationnelle :**  
Π(nom, niveau_recommande)(donjon)

**Requête SQL :**
```sql
SELECT nom, niveau_recommande FROM donjon;
```

---

### 4.2 Restriction sur une table

**Cas d'usage :**
> "Les compétences de type actif"

**Algèbre relationnelle :**  
σ[type='actif'](competence)

**Requête SQL :**
```sql
SELECT * FROM competence WHERE type = 'actif';
```

---

### 4.3 Connecteurs logiques

**Cas d'usage :**
> "Les compétences actives de rareté 'rare' ou 'epique' venant de la boutique"

**Algèbre relationnelle :**
1. R = σ[type='actif' ∧ (rarete='rare' ∨ rarete='epique') ∧ source='boutique'](competence)
2. P = Π(nom, rarete, cout_mana)(R)

**Requête SQL :**
```sql
SELECT nom, rarete, cout_mana
FROM competence
WHERE type = 'actif'
  AND (rarete = 'rare' OR rarete = 'epique')
  AND source = 'boutique';
```

---

### 4.4 Jointures

Les tables associatives nécessitent des jointures pour retrouver l'information complète.

#### 4.4.1 Personnage — Compétences

**Cas d'usage :**
> "Informations sur les compétences équipées par le personnage"

**Algèbre relationnelle :**
1. IJ1 = ⋈[personnage.id = personnage_competence.personnage_id](personnage, personnage_competence)
2. IJ2 = ⋈[IJ1.competence_id = competence.id](IJ1, competence)
3. R = σ[est_equipee=1](IJ2)
4. P = Π(personnage.nom, competence.nom, type, effet_type, cout_mana)(R)

**Requête SQL :**
```sql
CREATE VIEW competences_equipees AS
SELECT p.nom AS personnage, c.nom AS competence,
       c.type, c.effet_type, c.cout_mana, c.rarete
FROM personnage p
INNER JOIN personnage_competence pc ON (p.id = pc.personnage_id)
INNER JOIN competence c ON (pc.competence_id = c.id)
WHERE pc.est_equipee = 1;
```

#### 4.4.2 Donjon — Monstres

**Cas d'usage :**
> "Informations sur les monstres présents dans chaque donjon"

**Algèbre relationnelle :**
1. IJ1 = ⋈[donjon.id = donjon_monstre.donjon_id](donjon, donjon_monstre)
2. IJ2 = ⋈[IJ1.monstre_id = monstre.id](IJ1, monstre)
3. P = Π(donjon.nom, monstre.nom, taux_apparition, exp_recompense)(IJ2)

**Requête SQL :**
```sql
CREATE VIEW monstres_par_donjon AS
SELECT d.nom AS donjon, m.nom AS monstre,
       dm.taux_apparition, m.exp_recompense, m.gold_recompense
FROM donjon d
INNER JOIN donjon_monstre dm ON (d.id = dm.donjon_id)
INNER JOIN monstre m ON (dm.monstre_id = m.id);
```

#### 4.4.3 Personnage — Historique des donjons

**Cas d'usage :**
> "Informations complètes sur les runs de donjon d'un personnage"

**Algèbre relationnelle :**
1. IJ1 = ⋈[personnage.id = historique_donjon.personnage_id](personnage, historique_donjon)
2. IJ2 = ⋈[IJ1.donjon_id = donjon.id](IJ1, donjon)
3. P = Π(personnage.nom, donjon.nom, etage_max, salle_max, resultat, date_run)(IJ2)

**Requête SQL :**
```sql
CREATE VIEW runs_donjon AS
SELECT p.nom AS personnage, d.nom AS donjon,
       hd.etage_max, hd.salle_max, hd.resultat, hd.date_run
FROM personnage p
INNER JOIN historique_donjon hd ON (p.id = hd.personnage_id)
INNER JOIN donjon d ON (hd.donjon_id = d.id);
```

#### 4.4.4 Personnage — Inventaire équipé

**Cas d'usage :**
> "Équipement actuellement porté par le personnage avec ses bonus"

**Requête SQL :**
```sql
CREATE VIEW equipement_actif AS
SELECT p.nom AS personnage, s.nom AS item, s.slot,
       s.bonus_attq, s.bonus_def, s.bonus_attq_spe, s.bonus_def_spe,
       s.bonus_vitesse, s.rarete, s.element
FROM personnage p
INNER JOIN inventaire i ON (p.id = i.personnage_id)
INNER JOIN stuff s ON (i.stuff_id = s.id)
WHERE i.est_equipe = 1;
```

---

### 4.5 Opérations ensemblistes

**Cas d'usage :**
> "Nom des donjons que le personnage n'a jamais complétés avec 'victoire'"

**Algèbre relationnelle :**
1. P1 = Π(nom)(donjon)
2. R = σ[resultat='victoire'](historique_donjon)
3. IJ = ⋈[R.donjon_id = donjon.id](R, donjon)
4. P2 = Π(nom)(IJ)
5. M = \ (P1, P2)

**Requête SQL :**
```sql
SELECT nom FROM donjon
EXCEPT
SELECT d.nom
FROM donjon d
INNER JOIN historique_donjon hd ON (d.id = hd.donjon_id)
WHERE hd.resultat = 'victoire';
```

---

### 4.6 Fonctions d'agrégat

**Cas d'usage :**
> "Nombre total de tâches accomplies avec succès"

**Algèbre relationnelle :**
1. R = σ[statut='success'](historique_activite)
2. P = Π(count(*))(R)
3. ρ(count(*) → nb_succes)(P)

**Requête SQL :**
```sql
SELECT COUNT(*) AS nb_succes
FROM historique_activite
WHERE statut = 'success';
```

---

### 4.7 Groupements

**Cas d'usage :**
> "Expérience totale gagnée par type d'activité"

**Algèbre relationnelle :**
1. IJ = ⋈[historique_activite.tache_id = tache.id](historique_activite, tache)
2. R = σ[statut='success'](IJ)
3. G = γ(type_activite)[sum(exp_recompense)](R)
4. P = Π(type_activite, sum(exp_recompense))(G)

**Requête SQL :**
```sql
SELECT t.type_activite,
       SUM(t.exp_recompense) AS xp_total,
       COUNT(*) AS nb_taches
FROM historique_activite ha
INNER JOIN tache t ON (ha.tache_id = t.id)
WHERE ha.statut = 'success'
GROUP BY t.type_activite;
```

---

### 4.8 Restriction sur groupements

**Cas d'usage :**
> "Les donjons où le personnage a obtenu un étage maximum supérieur à la moyenne de tous ses runs"

**Algèbre relationnelle :**
1. G = γ(donjon_id)[avg(etage_max)](historique_donjon)
2. moy = Π(avg(etage_max))(historique_donjon)
3. R = σ[etage_max > moy](G)

**Requête SQL :**
```sql
SELECT d.nom AS donjon,
       MAX(hd.etage_max) AS meilleur_etage
FROM historique_donjon hd
INNER JOIN donjon d ON (hd.donjon_id = d.id)
GROUP BY hd.donjon_id
HAVING MAX(hd.etage_max) > (
  SELECT AVG(etage_max) FROM historique_donjon
);
```

---

### 4.9 Division relationnelle

**Cas d'usage :**
> "Personnages ayant complété avec 'victoire' tous les donjons disponibles"

*Les personnages tels qu'il n'existe pas de donjon qu'ils n'auraient pas complété.*

**Algèbre relationnelle :**
1. P1 = Π(personnage_id, donjon_id)(σ[resultat='victoire'](historique_donjon))
2. P2 = Π(id)(donjon)
3. D = ÷(P1, P2)
4. IJ = ⋈[D.personnage_id = personnage.id](D, personnage)
5. Π(nom)(IJ)

**Requête SQL :**
```sql
SELECT p.nom
FROM personnage p
WHERE NOT EXISTS (
  SELECT *
  FROM donjon d
  WHERE NOT EXISTS (
    SELECT *
    FROM historique_donjon hd
    WHERE hd.personnage_id = p.id
      AND hd.donjon_id = d.id
      AND hd.resultat = 'victoire'
  )
);
```

---

## 5 Conclusion

Dans ce projet Rogue Life, à partir de l'expression des besoins *"un personnage accomplit des tâches, explore des donjons et gère son équipement"*, nous avons affiné progressivement ces besoins par une formulation de phrases sujet-verbe-complément.

Cette analyse a permis d'identifier **7 associations plusieurs-à-plusieurs**, transformées en **9 tables associatives** (`inventaire`, `personnage_competence`, `personnage_affinite`, `personnage_classe_debloquee`, `donjon_monstre`, `magasin_inventaire`, `historique_activite`, `historique_donjon`, `historique_poids`) et **11 tables principales**, pour un total de **20 tables**.

Les associations **un-à-plusieurs** directes (classe, titre, level, caracteristique vers personnage) sont représentées par des clés étrangères simples. L'association réflexive sur `classe` (`parent_id`) modélise l'arbre de progression en 3 paliers.

La base a été validée par des cas d'usage couvrant l'ensemble des opérateurs de l'algèbre relationnelle.

---

## 6 Améliorations

### 6.1 Multi-personnages

Actuellement, la base ne contient qu'un seul personnage (`id=1`). La modélisation supporte nativement plusieurs personnages, mais la couche applicative (localStorage) utilise des clés fixes (`donjon_save_1`) qui ne s'adapteraient pas. Une évolution naturelle serait de stocker l'état du run en base plutôt qu'en localStorage.

### 6.2 Système de guilde (association réflexive)

On pourrait préciser :
- un personnage peut avoir un mentor (lui-même un personnage)

Ce qui revient à une association réflexive :
```
personnage(id, nom, ..., #mentor_id)
```
Avec `mentor_id` clé étrangère sur `personnage.id`.

### 6.3 Évolution : sauvegarde complète en base

Dans la version actuelle, l'état du run de donjon est stocké en **localStorage** (étage courant, salle, état du combat, bonus actifs). Une évolution permettrait de tout persister en base :

```
session_donjon(id, #personnage_id, #donjon_id, etage, salle,
               or_cumule, pv_actuels, mana_actuels,
               phase, date_debut)
session_bonus(#session_id, bonus_type, valeur)
```

Cela permettrait la continuité de session entre navigateurs et la détection d'anomalies (triche, interruption anormale).

### 6.4 Évolution du modèle de données

En tenant compte des évolutions futures, on obtiendrait les tables supplémentaires :

1. `session_donjon(id, #personnage_id, #donjon_id, etage, salle, pv_actuels, mana_actuels, phase, date_debut)`
2. `session_bonus(#session_id, bonus_type, valeur)`
3. `classement(id, #personnage_id, score, date_calcul)` — pour un futur leaderboard
