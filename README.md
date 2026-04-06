# Rogue Life

Transformez votre vie en RPG. Accomplissez vos tâches et routines réelles pour gagner de l'XP, de l'or et explorer des donjons.

Rogue Life est une application de gamification de vie (life RPG) construite avec **SvelteKit 2 + Svelte 5 + SQLite (WASM)**. Elle tourne entièrement dans le navigateur, sans serveur ni compte. Vos données restent chez vous.

---

## Fonctionnalités

### Personnage
- Profil avec niveau, XP, or, PV IRL et PV Combat
- Statistiques (ATQ, DEF, VIT, Mana...) évolutives via level up ou achat en boutique
- Système de classes avec trois arbres (Guerrier, Vagabond, Sorcier) sur trois paliers
- Titres débloquables selon les accomplissements (streak, éléments, niveau, fortune...)
- Affinités élémentaires amplifiant les dégâts des compétences associées

### Tâches & Routines
- Créez des tâches ponctuelles avec date limite optionnelle
- Créez des routines quotidiennes récurrentes
- Succès : XP + or / Échec ou oubli : perte de PV IRL
- Compléter toutes ses routines 7 jours d'affilée ouvre une loot box hebdomadaire
- La streak compte les jours consécutifs sans pénalité de routine

### Donjon
- Donjons procéduraux infinis avec système de salles et d'étages
- **Combat ATB (Active Time Battle)** : jauges de vitesse remplacent le tour-par-tour strict — un personnage plus rapide agit plus souvent
- 10 éléments avec archétypes distincts (feu/brûlure, eau/contrôle, terre/tank, air/vitesse...)
- Monstres générés avec budget de stats progressif selon la profondeur
- Bonus aléatoires toutes les 5 salles (stats, PV, affinités)
- Coffre de loot à chaque étage (objets et compétences)

### Boutique & Sacoche
- Achetez armes, armures (tête, plastron, jambières, bottes, gants), consommables et compétences
- Filtres par slot, rareté et élément
- Vendez vos objets depuis la sacoche (25 % du prix de base)
- Achetez des stats directement avec de l'or
- Les équipements épiques et légendaires apportent des bonus d'affinité élémentaire

### Modes de jeu
| Mode | Gains | Pénalités | Coffres bonus |
|------|-------|-----------|---------------|
| Normal | x1 | Jokers disponibles, PV si plus de joker | Aucun |
| Hard | x1.5 | PV directs, pas de jokers ni utilitaires | Rare/7j · Épique/mois |
| Cauchemar | x2 | 1 routine ratée = Game Over immédiat | Épique/7j · Légendaire/mois |

Les modes Hard et Cauchemar sont verrouillés pendant 3 jours avant de pouvoir rétrograder.

### Sauvegarde
Les données sont stockées dans IndexedDB du navigateur. L'application demande au navigateur de marquer le stockage comme persistant. Un bouton d'export/import (fichier `.db`) est disponible sur la page Stats pour sécuriser la progression ou la transférer vers un autre appareil.

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| UI | SvelteKit 2 + Svelte 5 (runes) |
| Base de données | SQLite via sql.js (WASM) |
| Persistance | IndexedDB |
| Typage | TypeScript 5.6 |
| Build | Vite 6 |
| Déploiement | GitHub Pages (adapter-static) |

L'application est **offline-first** : toutes les données sont stockées localement. Aucun serveur, aucun compte, aucune donnée envoyée à l'extérieur.

---

## Lancer le projet

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## Structure du projet

```
src/
├── lib/
│   ├── db.ts          # Toutes les opérations base de données (sql.js)
│   ├── init.sql       # Schéma SQLite complet + données initiales
│   ├── combat.ts      # Moteur de combat ATB (fonctions pures)
│   ├── loot.ts        # Tables de probabilités et génération de loot
│   ├── classes.ts     # Arbres de classes et bonus cumulatifs
│   ├── stores.ts      # Store Svelte du personnage
│   ├── types.ts       # Types TypeScript
│   └── icons.ts       # Icônes élémentaires
└── routes/
    ├── +page.svelte         # Profil & stats du personnage
    ├── +layout.svelte       # Navigation et header global
    ├── tasks/               # Tâches & routines
    ├── shop/                # Boutique
    ├── dungeon/             # Donjon et combat
    ├── inventory/           # Sacoche
    ├── stats/               # Statistiques et historique
    └── tuto/                # Guide du joueur

static/
├── sql-wasm.wasm      # Binaire SQLite WebAssembly
└── ...                # Images et icônes
```

---

## Licence

MIT
