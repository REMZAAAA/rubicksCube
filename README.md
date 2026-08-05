# 🧩 Rubik's Cube 3D

Projet de simulation d'un Rubik's Cube en 3D développé entièrement en **Vanilla JavaScript** et **CSS 3D**.

Ce projet est né d'une idée proposée par mon petit frère, passionné par les Rubik's Cubes. L'objectif est de développer une version interactive du cube permettant de le manipuler, de suivre son état et d'intégrer progressivement des algorithmes de résolution.

Encore en développement, il constitue aujourd'hui mon projet le plus important en termes de taille et de complexité algorithmique. Il me pousse à travailler sur la modélisation d'un état complexe, la gestion des rotations, les animations 3D et la création d'algorithmes capables d'analyser et de résoudre le cube.

> 🚧 Projet actuellement en développement.

---

## ✨ Fonctionnalités

## 🎲 Manipulation du cube

Le cube peut être manipulé avec les mouvements classiques :

### Faces principales

- `U` - Up
- `D` - Down
- `L` - Left
- `R` - Right
- `F` - Front
- `B` - Back

### Couches intermédiaires

- `M`
- `E`
- `S`

Le système gère également :

- Mouvements simples :
  - `R`

- Mouvements inverses :
  - `R'`

- Mouvements doubles :
  - `R2`

- Séquences composées de plusieurs mouvements

---

# 🔀 Mélange

Le projet possède un système de mélange automatique permettant de générer une suite aléatoire de mouvements afin de créer différents états du cube.

---

# 📜 Historique des mouvements

Chaque mouvement effectué est enregistré afin de permettre :

- Le suivi des actions réalisées
- L'affichage de la séquence de mouvements
- La navigation dans l'historique

Une interface de contrôle est également présente pour préparer :

- ⏮ Mouvement précédent
- ▶ Lecture
- ⏸ Pause
- ⏭ Mouvement suivant

> La structure visuelle est terminée, la logique complète de lecture est encore en développement.

---

# 🎨 Personnalisation

Le cube possède un système de personnalisation des couleurs.

Fonctionnalités actuelles :

- Modification des couleurs des faces

Fonctionnalités prévues :

- Modification individuelle des stickers

---

# 🧠 Algorithmique

La partie principale du projet concerne la représentation interne et la manipulation de l'état du cube.

Chaque pièce possède ses propres informations :

- Position
- Couleurs
- Faces associées
- Type de pièce :
  - Centre
  - Arête
  - Coin

Chaque rotation modifie l'état global du cube tout en conservant un comportement identique à un véritable Rubik's Cube.

---

# 🤖 Résolution automatique

Un système de résolution automatique est actuellement en développement.

La première étape réalisée concerne la résolution de la croix grâce à un algorithme personnel nommé :

## KING Algorithm

Cet algorithme analyse l'état du cube afin de construire progressivement la croix de la face choisie.

Les prochaines étapes consisteront à développer les autres parties d'une résolution complète.

---

# 📁 Structure du projet

```
.
├── index.html
│
├── css
│   ├── animation.css
│   ├── canvas.css
│   ├── history.css
│   ├── link.css
│   ├── main.css
│   └── sidebar.css
│
└── js
    ├── algorithm.js
    ├── colors.js
    ├── cubeMap.js
    ├── cubeRenderer.js
    ├── cubeRotation.js
    ├── eventHandler.js
    ├── history.js
    ├── king.js
    ├── layerHandler.js
    ├── main.js
    ├── pan.js
    └── shuffle.js
```

---

# 🚀 Installation

Aucune installation nécessaire.

Le projet fonctionne directement dans un navigateur.

## Étapes :

1. Cloner le repository :

```bash
git clone https://github.com/REMZAAAA/rubicksCube
```

2. Ouvrir :

```
index.html
```

Aucune dépendance, aucun framework et aucun serveur local ne sont nécessaires.

---

# 🛠️ Technologies utilisées

- HTML5
- CSS3
- CSS 3D Transform
- JavaScript ES6+

---

# 🎯 Objectifs futurs

- Terminer le système de résolution automatique
- Ajouter une résolution complète du cube
- Permettre la personnalisation sticker par sticker
- Finaliser le système de lecture des mouvements
- Améliorer les animations et l'expérience utilisateur

---

# 📌 Compétences développées

Ce projet me permet d'approfondir :

- La conception d'algorithmes complexes
- La gestion d'états interdépendants
- La programmation JavaScript avancée
- Les animations CSS 3D
- La structuration d'un projet sans framework
- La résolution de problèmes logiques complexes
