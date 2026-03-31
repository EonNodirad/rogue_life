# Rogue Life — Feuille de route

## Contexte

**Rogue Life** est une application mobile gamifiée (RPG) qui permet de suivre des données de vie réelle (tâches accomplies, poids, activités) en les transformant en quêtes et récompenses RPG.

Stack : **Tauri 2** (Rust) + **SvelteKit 2** (TypeScript) + **SQLite**

---

## Étape 1 — Configurer SQLite dans Tauri

**Statut : [x] Fait**

- [x] Ajouter `tauri-plugin-sql` avec feature `sqlite`
- [x] Initialiser le plugin SQL dans `lib.rs`
- [x] Configurer la permission `sql:allow-*`
- [x] Migration `0001_init.sql` avec données initiales

---

## Étape 2 — Couche d'accès aux données (TypeScript)

**Statut : [x] Fait**

- [x] Types TypeScript pour toutes les tables
- [x] Fonctions CRUD : personnage, caracteristique, tâches, inventaire, donjon, poids, historique, magasin
- [x] `createTache`, `completerTache`, `echouerTache`, `acheterItem`, `equiperItem`, `desequiperItem`

---

## Étape 3 — Page d'accueil : Profil du personnage

**Statut : [x] Fait**

- [x] Nom, classe, titre, barres PV IRL / PV Combat / XP, or
- [x] Liste équipements actifs
- [x] Rafraîchissement au focus

---

## Étape 4 — Page Tâches

**Statut : [x] Fait**

- [x] Liste tâches actives, modale création
- [x] "Réussie" : +XP +or + historique
- [x] "Échouée" : -PV IRL + historique
- [x] Vérification pénalités quotidiennes (routines non faites)
- [x] Section historique récent

---

## Étape 5 — Page Boutique

**Statut : [x] Fait**

- [x] Items avec filtres slot / rareté, cards colorées par rareté
- [x] Acheter / Équiper / Déséquiper
- [x] Onglet ⚡ Compétences : acheter, équiper (max 6), badges éléments
- [x] Compétences `source='donjon'` masquées (drop only)

---

## Étape 6 — Page Donjon (Roguelike)

**Statut : [x] Fait**

- [x] Moteur de combat tour par tour (`src/lib/combat.ts`) — pur TS, immutable
- [x] Génération procédurale des monstres (budget stats par étage/salle)
- [x] Deux économies : or donjon (in-memory) vs or IRL (DB)
- [x] Machine d'états UI : lobby → combat → inter_salle / ravito → gacha → loot_box | mort
- [x] Compétences : attaque, buff, statut (poison, stun)
- [x] Système élémentaire : 10 éléments, TYPE_MATRIX 10×10, affinités offensives
- [x] Affinités permanentes (`personnage_affinite` DB) + temporaires in-memory (run)
- [x] Gacha tous les 5 salles : 3 choix de bonus (stats, PV max %, affinités élémentaires)
- [x] Loot box fin d'étage : 1 seule fois par étage (flag localStorage), compétences drop-only
- [x] Sauvegarde automatique de progression (localStorage, `beforeNavigate`)
- [x] Étages infinis sans reset entre étages consécutifs
- [x] Anti-doublons compétences dans les loot boxes

---

## Étape 7 — Système de Level Up

**Statut : [ ] À faire**

**Fichier :** `src/lib/game.ts` (à créer), `src/routes/tasks/+page.svelte`, `src/routes/+page.svelte`

- [ ] Fonction `checkLevelUp(personnage_id)` :
  - Comparer XP actuelle au seuil `exp_max_requise` du niveau suivant (`level` table)
  - Si atteint : incrémenter `level_id` du personnage, recalculer stats de base
  - Boucler si plusieurs niveaux d'un coup
- [ ] Appel automatique après tout gain d'XP (complétion de tâche, victoire donjon)
- [ ] Recalcul des stats à chaque level up :
  - `pv_vie_max += 10`, `pv_combat_max += 8`, `attq += 2`, `def += 2`, `attq_spe += 2`, `def_spe += 2`, `vitesse += 1`
- [ ] Notification visuelle (toast "LEVEL UP !" avec nouveau niveau)
- [ ] Mise à jour du header après level up

---

## Étape 8 


---

## Étape 9 — Polish et tests

**Statut : [ ] À faire**

- [ ] Thème RPG cohérent (palette, polices, icônes)
- [ ] Animations gains XP/or (compteur animé, flash)
- [ ] Gestion erreurs DB (messages utilisateur)
- [ ] Test complet sur émulateur mobile (Tauri mobile ou PWA)

---

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src-tauri/src/lib.rs` | Migrations Tauri (versions 1-9) |
| `src-tauri/migrations/` | Migrations SQL (0001→0009) |
| `src/lib/db.ts` | Fonctions d'accès DB |
| `src/lib/types.ts` | Types TypeScript |
| `src/lib/stores.ts` | Store Svelte partagé (characterStore) |
| `src/lib/combat.ts` | Moteur de combat pur TS |
| `src/routes/+layout.svelte` | Header dynamique + navigation |
| `src/routes/+page.svelte` | Page profil |
| `src/routes/tasks/+page.svelte` | Page tâches |
| `src/routes/shop/+page.svelte` | Page boutique + compétences |
| `src/routes/dungeon/+page.svelte` | Page donjon roguelike |
