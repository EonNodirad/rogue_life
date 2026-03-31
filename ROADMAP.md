# Rogue Life — Feuille de route

## Contexte

**Rogue Life** est une application mobile gamifiée (RPG) qui permet de suivre des données de vie réelle (tâches accomplies, activités) en les transformant en quêtes et récompenses RPG.

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

**Statut : [x] Fait**

- [x] `checkLevelUp(personnage_id)` : compare XP au seuil, incrémente `level_id`, boucle si plusieurs niveaux
- [x] Appel automatique après tout gain d'XP (tâche, routine, donjon)
- [x] Stats recalculées à chaque level up (+PV, +ATQ, +DEF, +VIT)
- [x] Points de stat à distribuer manuellement (section level up sur profil)
- [x] Toast "LEVEL UP !" avec nombre de points gagnés
- [x] Header mis à jour après level up

---

## Étape 8 — Inventaire, Loot & Équilibrage

**Statut : [x] Fait**

- [x] Page Sacoche (`/inventory`) : équipement actif, inventaire (armes/armures/consommables), compétences
- [x] Filtres dépliables dans la boutique (slot, rareté) et filtre élément sur l'onglet compétences
- [x] Filtres dépliables dans la sacoche (catégorie, rareté, élément)
- [x] Loot box routines : coffre quotidien quand toutes les routines sont faites, rareté selon compteur
- [x] Progression rareté donjon : peu_commun→rare→épique en boucle, légendaire tous les 50 étages
- [x] Tables de probabilités par rareté de coffre (`src/lib/loot.ts`)
- [x] Items `utilitaire` exclus des loot boxes

---

## Étape 9 — Économie, Game Over & Qualité de vie

**Statut : [x] Fait**

- [x] Achat d'items en doublons (`ON CONFLICT ... DO UPDATE SET quantite = quantite + 1`)
- [x] Vente d'items depuis la sacoche (25% du prix de base)
- [x] Achat de stats avec de l'or (boutique des stats sur le profil)
- [x] Équilibrage initial : `attq = attq_spe = 10`, `def = def_spe = 8`
- [x] Game Over quand PV IRL = 0 : reset niveau/XP/or/stats, conservation inventaire/compétences
- [x] Modal Game Over + bouton "Recommencer"
- [x] Date limite des tâches : date picker au lieu de "nombre de jours"

---

## Étape 10 — Modes de jeu

**Statut : [x] Fait**

- [x] Type `GameMode = 'normal' | 'hard' | 'cauchemar'`
- [x] `getModeMultiplier` : gains ×1 / ×1.5 / ×2 selon le mode
- [x] Mode Hard : pas de récup PV IRL, pas d'utilitaires, coffre rare/7j + épique/mois
- [x] Mode Cauchemar : une erreur = Game Over immédiat, coffre épique/7j + légendaire/mois
- [x] Règle des 3 jours : annulation vers normal bloquée avant 3j (hard↔cauchemar libre)
- [x] `changerMode` et `checkModeCoffres` dans `db.ts`
- [x] Migration `0013_modes.sql` : colonnes `mode`, `mode_debut`, `dernier_coffre_hebdo/mensuel`
- [x] UI sélection de mode sur le profil avec modal de confirmation
- [x] Badge coloré dans le header (🔥 HARD / 💀 CAUCHEMAR)
- [x] Game Over en mode danger → reset vers Normal automatique
- [x] Boutique : onglet utilitaires masqué en hard/cauchemar
- [x] Coffres hebdo/mensuel affichés via modal loot sur la page tâches

---

## Étape 11 — Polish & UX

**Statut : [ ] En cours**

- [ ] Thème RPG cohérent (palette, polices, icônes unifiées)
- [ ] Animations gains XP/or (compteur animé, flash visuel)
- [ ] Page de stats/historique : graphiques ou résumés de progression
- [ ] Onboarding : écran de création de personnage (nom, classe) au premier lancement
- [ ] Retours haptiques / sonores (Tauri)
- [ ] Test complet sur mobile (Tauri Android/iOS ou émulateur)
- [ ] Gestion d'erreurs DB : messages utilisateur clairs

---

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src-tauri/src/lib.rs` | Migrations Tauri (versions 1–13) |
| `src-tauri/migrations/` | Migrations SQL (0001 → 0013) |
| `src/lib/db.ts` | Fonctions d'accès DB + logique métier |
| `src/lib/types.ts` | Types TypeScript |
| `src/lib/stores.ts` | Store Svelte partagé (characterStore) |
| `src/lib/combat.ts` | Moteur de combat pur TS |
| `src/lib/loot.ts` | Tables de probabilités et génération de loot |
| `src/routes/+layout.svelte` | Header dynamique + navigation + badge mode |
| `src/routes/+page.svelte` | Profil, stats, boutique stats, mode de jeu |
| `src/routes/tasks/+page.svelte` | Tâches, routines, coffres de mode |
| `src/routes/shop/+page.svelte` | Boutique + compétences |
| `src/routes/dungeon/+page.svelte` | Donjon roguelike |
| `src/routes/inventory/+page.svelte` | Sacoche (inventaire + vente) |
