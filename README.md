# Rogue Life

> Transformez votre vie en RPG. Accomplissez vos tâches et routines réelles pour gagner de l'XP, de l'or et explorer des donjons.

Rogue Life est une application de gamification de vie (life RPG) construite avec **Tauri 2 + SvelteKit 2 + SQLite**. Elle tourne en local sur desktop et mobile — vos données restent chez vous.

---

## Fonctionnalités

### Personnage
- Profil avec niveau, XP, or, PV IRL et PV Combat
- Statistiques (ATQ, DEF, VIT...) évolutives via level up ou achat
- Équipement actif avec bonus de stats

### Tâches & Routines
- Créez des tâches ponctuelles avec date limite
- Créez des routines quotidiennes récurrentes
- Succès → XP + or / Échec → perte de PV IRL
- Compléter toutes ses routines du jour ouvre un **coffre de loot**

### Donjon
- Donjons procéduraux infinis avec système de salles et d'étages
- **Combat au tour par tour** avec 10 types élémentaires et matrice d'affinités
- Monstres générés avec budget de stats progressif par étage
- Bonus aléatoires toutes les 5 salles (stats, PV, affinités élémentaires)
- Coffre de loot à chaque étage (objets et compétences)
- Progression sauvegardée automatiquement (localStorage)

### Boutique & Sacoche
- Achetez armes, armures, consommables et compétences
- Filtres par slot, rareté et élément
- Vendez vos objets depuis la sacoche (25% du prix de base)
- Achetez des stats directement avec de l'or

### Modes de jeu
| Mode | Description |
|------|-------------|
| **Normal** | Comportement par défaut |
| **Hard** | Pas de récup PV IRL, pas d'utilitaires, gains ×1.5, coffre rare/7j et épique/mois |
| **Cauchemar** | Une erreur = Game Over, gains ×2, coffre épique/7j et légendaire/mois |

Les modes Hard et Cauchemar sont annulables après 3 jours. Basculer entre Hard et Cauchemar est libre.

### Système de loot
5 raretés : Commun · Peu commun · Rare · Épique · Légendaire

Les coffres ont des probabilités de rareté différentes selon leur origine (routine, donjon, mode de jeu).

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| UI | SvelteKit 2 + Svelte 5 (runes) |
| Desktop/Mobile | Tauri 2 (Rust) |
| Base de données | SQLite via tauri-plugin-sql |
| Migrations | 13 migrations versionnées |
| Typage | TypeScript 5.6 |
| Build | Vite 6 |

L'application est **offline-first** : toutes les données sont stockées localement via SQLite. Aucun serveur, aucun compte.

---

## Lancer le projet

### Prérequis

- [Node.js](https://nodejs.org/) 20+
- [Rust](https://www.rust-lang.org/tools/install) (stable)
- [Tauri CLI v2](https://tauri.app/start/prerequisites/)

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run tauri dev

# Build de production
npm run tauri build
```

---

## Structure du projet

```
src/
├── lib/
│   ├── db.ts          # Toutes les opérations base de données
│   ├── combat.ts      # Moteur de combat (fonctions pures)
│   ├── loot.ts        # Tables de probabilités et génération de loot
│   ├── stores.ts      # Store Svelte du personnage
│   └── types.ts       # Types TypeScript
└── routes/
    ├── +page.svelte         # Profil & stats
    ├── tasks/               # Tâches & routines
    ├── shop/                # Boutique
    ├── dungeon/             # Donjon
    └── inventory/           # Sacoche

src-tauri/
├── src/lib.rs          # Configuration Tauri + migrations
└── migrations/         # SQL (0001 → 0013)
```

---

## Licence

MIT — voir [LICENSE](LICENSE).
