<div class="tuto">

    <h1>Guide du joueur</h1>
    <p class="intro">Rogue Life transforme vos habitudes réelles en aventure RPG. Accomplisr vos tâches vous rapporte de l'XP et de l'or. Oublier vos routines vous coûte des PV. Mourir remet tout à zéro.</p>

    <!-- ── PRINCIPES ── -->
    <section>
        <h2>Principe général</h2>
        <p>Votre personnage possède deux barres de vie :</p>
        <ul>
            <li><strong>PV IRL</strong> — votre vie réelle. Les routines oubliées, les tâches échouées et les tâches expirées en soustraient. Si elles tombent à zéro, c'est le Game Over.</li>
            <li><strong>PV Combat</strong> — utilisés uniquement dans le donjon. Se régénèrent à chaque nouvelle session de combat.</li>
        </ul>
        <p>Chaque jour, connectez-vous pour cocher vos routines. Un personnage actif progresse, un personnage négligé s'effondre.</p>
    </section>

    <!-- ── TACHES ── -->
    <section>
        <h2>Tâches & Routines</h2>

        <h3>Tâches ponctuelles</h3>
        <p>Une tâche ponctuelle est un objectif à réaliser une seule fois, avec ou sans date limite. Vous la validez manuellement quand elle est faite, ou vous l'échouez.</p>
        <table>
            <thead><tr><th>Difficulté</th><th>XP</th><th>Or</th><th>PV perdus si échec</th></tr></thead>
            <tbody>
                <tr><td>Facile</td><td>15</td><td>8g</td><td>5</td></tr>
                <tr><td>Moyen</td><td>30</td><td>15g</td><td>10</td></tr>
                <tr><td>Difficile</td><td>50</td><td>25g</td><td>20</td></tr>
            </tbody>
        </table>
        <p class="note">Les tâches ponctuelles ne comptent pas dans la streak. Seules les routines quotidiennes y contribuent.</p>

        <h3>Routines</h3>
        <p>Une routine est une habitude quotidienne récurrente. Chaque jour, le jeu vérifie si vous avez coché chaque routine. Si ce n'est pas le cas :</p>
        <ul>
            <li>En mode Normal : un joker est consommé automatiquement (si vous en avez), sinon vous perdez des PV IRL.</li>
            <li>En mode Hard : perte de PV directe, sans joker possible.</li>
            <li>En mode Cauchemar : la première routine ratée déclenche le Game Over.</li>
        </ul>
        <p>Une routine ne peut être supprimée qu'après 7 jours d'existence.</p>

        <h3>Streak</h3>
        <p>La streak compte le nombre de jours consécutifs où toutes vos routines ont été validées sans pénalité. Elle sert à deux choses :</p>
        <ul>
            <li>Débloquer des titres (7j, 14j, 30j, 6 mois, 1 an).</li>
            <li>À 7 jours de streak, compléter toutes les routines du jour ouvre une loot box.</li>
        </ul>
    </section>

    <!-- ── MODES ── -->
    <section>
        <h2>Modes de jeu</h2>
        <table>
            <thead><tr><th>Mode</th><th>Gains</th><th>Pénalités</th><th>Coffres bonus</th></tr></thead>
            <tbody>
                <tr>
                    <td><strong>Normal</strong></td>
                    <td>x1</td>
                    <td>Jokers disponibles, PV si plus de joker</td>
                    <td>Aucun</td>
                </tr>
                <tr>
                    <td><strong>Hard</strong></td>
                    <td>x1.5</td>
                    <td>PV directs, pas de jokers, pas d'utilitaires</td>
                    <td>Rare (7j) / Épique (1 mois)</td>
                </tr>
                <tr>
                    <td><strong>Cauchemar</strong></td>
                    <td>x2</td>
                    <td>1 routine ratée = Game Over immédiat</td>
                    <td>Épique (7j) / Légendaire (1 mois)</td>
                </tr>
            </tbody>
        </table>
        <p class="note">Passer d'un mode difficile à un mode plus facile est bloqué pendant 3 jours. Basculer entre Hard et Cauchemar est libre.</p>
        <p class="note">En mode Hard ou Cauchemar, les jokers et consommables sont inutilisables et ne peuvent pas être achetés.</p>
    </section>

    <!-- ── STATS ── -->
    <section>
        <h2>Statistiques de combat</h2>
        <table>
            <thead><tr><th>Stat</th><th>Rôle</th></tr></thead>
            <tbody>
                <tr><td><strong>ATQ</strong></td><td>Dégâts des attaques physiques</td></tr>
                <tr><td><strong>ATQ SPE</strong></td><td>Dégâts des attaques magiques / spéciales</td></tr>
                <tr><td><strong>DEF</strong></td><td>Réduit les dégâts physiques reçus</td></tr>
                <tr><td><strong>DEF SPE</strong></td><td>Réduit les dégâts magiques reçus</td></tr>
                <tr><td><strong>VIT</strong></td><td>Vitesse : détermine qui agit en premier et combien de fois</td></tr>
                <tr><td><strong>PV Combat</strong></td><td>Points de vie en combat (se régénèrent entre les sessions)</td></tr>
                <tr><td><strong>Mana</strong></td><td>Ressource consommée par les compétences</td></tr>
            </tbody>
        </table>
        <p>Les stats peuvent être augmentées par le level up (5 points à distribuer par niveau), par l'équipement, par la classe choisie, et via la boutique avec de l'or.</p>
    </section>

    <!-- ── ATB ── -->
    <section>
        <h2>Système de combat (ATB)</h2>
        <p>Le combat ne suit pas un ordre strict tour-par-tour. Chaque unité possède une jauge de 0 à 100 qui se remplit à sa vitesse. Quand la jauge atteint 100, l'unité agit.</p>
        <ul>
            <li>Si vous avez une vitesse de 20 et le monstre 10, vous agirez environ deux fois pour chaque action du monstre.</li>
            <li>Si un monstre est bien plus rapide que vous, il peut enchaîner plusieurs actions avant que vous puissiez répondre.</li>
            <li>La vitesse est donc la stat la plus impactante pour la survie contre des ennemis rapides.</li>
        </ul>
        <p>En combat, vous choisissez à chaque tour parmi : attaque basique, compétence, ou fuite.</p>
    </section>

    <!-- ── ELEMENTS ── -->
    <section>
        <h2>Elements et archétypes</h2>
        <p>Chaque compétence appartient à un élément. Les éléments définissent le style de jeu de l'archétype.</p>

        <div class="elem-grid">
            <div class="elem-card">
                <div class="elem-nom">Feu</div>
                <div class="elem-desc">Pression offensive et brûlure. Dégâts sur la durée (DoT). Punit les combats longs. Plusieurs compétences s'amplifient si la cible est déjà en feu.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Eau</div>
                <div class="elem-desc">Contrôle et gel progressif. Applique des cumuls de Froid qui ralentissent puis immobilisent. Contre les builds rapides.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Terre</div>
                <div class="elem-desc">Tank et punition. Génère des charges en encaissant des coups, qui amplifient les prochaines frappes. Gagne les combats d'usure.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Air</div>
                <div class="elem-desc">Vitesse et esquive. Enchaîne les attaques rapides, augmente la mobilité, réduit la précision ennemie.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Technologie</div>
                <div class="elem-desc">Surchauffe et explosions. Accumule des charges qui déclenchent des dégâts massifs une fois libérées.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Mort</div>
                <div class="elem-desc">Affaiblissement et poison. Réduit les stats ennemies, applique des effets négatifs cumulatifs.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Vie</div>
                <div class="elem-desc">Soins et régénération. Maintient le personnage en vie sur la durée, vole de la vie ennemie.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Tenebres</div>
                <div class="elem-desc">Burst et marques explosives. Place des marques sur l'ennemi qui détonent pour des dégâts massifs concentrés.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Lumiere</div>
                <div class="elem-desc">Boucliers et contre-attaques. Protège et riposte, bloque les soins ennemis, dissipe les buffs adverses.</div>
            </div>
            <div class="elem-card">
                <div class="elem-nom">Surnaturel</div>
                <div class="elem-desc">Aléatoire et chaos. Dégâts imprévisibles, effets secondaires variés, multiplicateurs surprises.</div>
            </div>
        </div>

        <p class="note">Chaque élément possède une affinité : vous infligez 10 % de dégâts supplémentaires avec vos compétences de l'élément dominant. Certains équipements et certaines classes augmentent cette affinité.</p>
    </section>

    <!-- ── CLASSES ── -->
    <section>
        <h2>Classes</h2>
        <p>Il existe trois arbres de classe, chacun avec trois paliers de spécialisation (niveau 1, 4, 7). Chaque classe apporte des bonus de stats cumulatifs.</p>

        <h3>Arbre du Guerrier</h3>
        <p>Orienté dégâts physiques et défense.</p>
        <ul>
            <li><strong>Guerrier</strong> (+3 ATQ) — socle de l'arbre</li>
            <li>Paladin (+3 ATQ SPE) → Guerrier elem (+5% aff) / Guerrier runique (+3 ATQ SPE, +3 DEF SPE)</li>
            <li>Tank (+3 DEF) → Tank absolu / Antimage (+6 DEF SPE)</li>
            <li>Barbare (+3 ATQ) → Géant barbare (+15 PV, +3 DEF) / Berserk (+6 ATQ)</li>
        </ul>

        <h3>Arbre du Vagabond</h3>
        <p>Orienté vitesse, mobilité et polyvalence.</p>
        <ul>
            <li><strong>Vagabond</strong> (+3 VIT) — socle de l'arbre</li>
            <li>Archer (+3 ATQ SPE) → Ranger (+3 ATQ SPE, +3 VIT) / Archer lourd (+6 ATQ SPE)</li>
            <li>Moine (+3 VIT) → Moine itinérant (+6 VIT) / Moine elem (+5% aff)</li>
            <li>Assassin (+3 ATQ) → Assassin de l'ombre (+6 ATQ SPE) / Assassin dégourdit (+3 ATQ, +3 VIT)</li>
        </ul>

        <h3>Arbre du Sorcier</h3>
        <p>Orienté dégâts magiques et sorts.</p>
        <ul>
            <li><strong>Sorcier</strong> (+3 ATQ SPE) — socle de l'arbre</li>
            <li>Mage (+3 ATQ SPE) → Archimage (+6 ATQ SPE) / Elementaliste (+5% aff)</li>
            <li>Occultiste (+3 DEF SPE) → Incanteur (+15 PV, +3 DEF SPE) / Mage runique (+3 DEF, +3 DEF SPE)</li>
            <li>Sorceleur (+3 ATQ) → Chasseur de monstre (+3 VIT, +3 ATQ) / Guerrier mage (+3 ATQ SPE, +3 ATQ)</li>
        </ul>

        <p class="note">Les bonus de classe sont cumulatifs : un Paladin conserve le +3 ATQ du Guerrier et ajoute son propre +3 ATQ SPE.</p>
    </section>

    <!-- ── TITRES ── -->
    <section>
        <h2>Titres</h2>
        <p>Chaque personnage porte un titre visible sur son profil. Les titres se débloquent selon vos accomplissements et peuvent être changés librement parmi ceux que vous avez obtenus.</p>

        <h3>Titres de niveau</h3>
        <ul>
            <li>Niveau 1 : Novice</li>
            <li>Niveau 3 : Aventurier</li>
            <li>Niveau 5 : Veteran</li>
        </ul>

        <h3>Titres de streak</h3>
        <ul>
            <li>7 jours : Disciple Discipline</li>
            <li>14 jours : Habitue du Royaume</li>
            <li>30 jours : Inflexible</li>
            <li>6 mois : Ancien de la Cite</li>
            <li>1 an : Divinite de la Constance</li>
        </ul>

        <h3>Titres elementaires</h3>
        <p>Collectionnez des compétences d'un même élément pour débloquer son titre.</p>
        <table>
            <thead><tr><th>Element</th><th>5 compétences</th><th>10 compétences</th></tr></thead>
            <tbody>
                <tr><td>Feu</td><td>Etincelle Vive</td><td>Seigneur du Brasier</td></tr>
                <tr><td>Eau</td><td>Enfant des Marees</td><td>Souverain des Abysses</td></tr>
                <tr><td>Terre</td><td>Esprit de Roche</td><td>Pilier de la Creation</td></tr>
                <tr><td>Air</td><td>Souffle Leger</td><td>Tempete Incarnee</td></tr>
                <tr><td>Technologie</td><td>Apprenti Mecanicien</td><td>Grand Architecte du Progres</td></tr>
                <tr><td>Surnaturel</td><td>Eveille</td><td>Maitre des Arcanes Interdites</td></tr>
                <tr><td>Mort</td><td>Ombre Errante</td><td>Faucheur Eternel</td></tr>
                <tr><td>Vie</td><td>Main Verte</td><td>Gardien de l'Arbre-Monde</td></tr>
                <tr><td>Lumiere</td><td>Porteur d'Aube</td><td>Eclat Celeste</td></tr>
                <tr><td>Tenebres</td><td>Voile de Nuit</td><td>Prince du Neant</td></tr>
            </tbody>
        </table>

        <h3>Titres spéciaux</h3>
        <ul>
            <li><strong>Cresus du Donjon</strong> — avoir plus de 5 000 pièces d'or</li>
            <li><strong>Elu du Destin</strong> — posseder 3 compétences Légendaires</li>
        </ul>
    </section>

    <!-- ── LOOT ── -->
    <section>
        <h2>Loot et raretés</h2>
        <p>Il existe 5 raretés pour les objets et compétences :</p>
        <div class="rarete-list">
            <span class="r-commun">Commun</span>
            <span class="r-peu-commun">Peu commun</span>
            <span class="r-rare">Rare</span>
            <span class="r-epique">Epique</span>
            <span class="r-legendaire">Legendaire</span>
        </div>
        <p>Sources de loot :</p>
        <ul>
            <li><strong>Coffres de donjon</strong> — à chaque étage terminé. La rareté augmente avec la profondeur.</li>
            <li><strong>Loot box de routines</strong> — après 7 jours de streak consécutifs, une fois par semaine. La rareté dépend du nombre de routines effectuées sur 7 jours.</li>
            <li><strong>Coffres de mode</strong> — en Hard ou Cauchemar, un coffre apparaît chaque semaine et chaque mois.</li>
        </ul>
        <p>Chaque coffre propose 3 récompenses au choix : un objet d'équipement ou une compétence.</p>
    </section>

    <!-- ── SAVE ── -->
    <section>
        <h2>Sauvegarde</h2>
        <p>Vos données sont stockées localement dans votre navigateur (IndexedDB). Elles persistent tant que vous ne videz pas manuellement les données du site.</p>
        <p>Pour sécuriser votre progression, utilisez les boutons <strong>Exporter la save</strong> et <strong>Importer une save</strong> disponibles sur la page Stats. Cela télécharge un fichier <code>.db</code> que vous pouvez conserver et réimporter sur n'importe quel appareil.</p>
    </section>

</div>

<style>
    .tuto {
        color: #eee;
        font-family: var(--font);
        font-size: 0.88rem;
        line-height: 1.6;
    }

    h1 {
        font-size: 1.2rem;
        color: #e94560;
        margin-bottom: 4px;
        letter-spacing: 1px;
    }

    .intro {
        color: #aaa;
        font-size: 0.82rem;
        margin-bottom: 20px;
    }

    section {
        margin-bottom: 28px;
        border-top: 1px solid #1e2d50;
        padding-top: 16px;
    }

    h2 {
        font-size: 1rem;
        color: #e94560;
        margin: 0 0 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    h3 {
        font-size: 0.85rem;
        color: #f39c12;
        margin: 12px 0 6px;
    }

    p {
        margin: 0 0 8px;
        color: #ccc;
    }

    ul {
        margin: 0 0 8px;
        padding-left: 18px;
        color: #ccc;
    }

    li {
        margin-bottom: 4px;
    }

    .note {
        font-size: 0.78rem;
        color: #888;
        font-style: italic;
        background: #0f1f3d;
        padding: 6px 10px;
        border-left: 2px solid #e94560;
        border-radius: 0 4px 4px 0;
        margin-top: 6px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
        font-size: 0.78rem;
    }

    th {
        background: #0f3460;
        color: #eee;
        padding: 6px 8px;
        text-align: left;
        font-weight: bold;
    }

    td {
        padding: 5px 8px;
        border-bottom: 1px solid #1e2d50;
        color: #ccc;
    }

    tr:last-child td {
        border-bottom: none;
    }

    /* Elements */
    .elem-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin: 10px 0;
    }

    .elem-card {
        background: #0f1f3d;
        border: 1px solid #1e2d50;
        border-radius: 6px;
        padding: 8px 10px;
    }

    .elem-nom {
        font-weight: bold;
        color: #e94560;
        font-size: 0.82rem;
        margin-bottom: 4px;
    }

    .elem-desc {
        font-size: 0.72rem;
        color: #aaa;
        line-height: 1.4;
    }

    /* Raretés */
    .rarete-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 8px 0;
    }

    .rarete-list span {
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: bold;
    }

    .r-commun       { background: #2a2a2a; color: #aaa; }
    .r-peu-commun   { background: #1a3d2b; color: #2ecc71; }
    .r-rare         { background: #1a2a3d; color: #3498db; }
    .r-epique       { background: #2a1a3d; color: #9b59b6; }
    .r-legendaire   { background: #3d2d0a; color: #f39c12; }

    code {
        background: #0f1f3d;
        padding: 1px 5px;
        border-radius: 3px;
        font-size: 0.82rem;
        color: #3498db;
    }
</style>
