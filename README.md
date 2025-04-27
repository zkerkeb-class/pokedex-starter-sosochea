# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Pokédex Sosochea

Bienvenue dans le projet **Pokédex Sosochea** ! 🌟

Ce projet est une application web full-stack permettant de :
- Créer, modifier et consulter des Pokémons
- Poster des messages amusants avec des Pokémons
- S'enregistrer et se connecter en toute sécurité
- Utiliser un mini réseau social interne appelé "Pokétalk"

---

## 📚 Structure du projet

Le projet est divisé en deux dossiers principaux :

- `pokedex-api-sosochea/` : le **backend** (API REST avec Node.js + Express + MongoDB)
- `pokedex-starter-sosochea/` : le **frontend** (React.js)

---

## 🛠️ Instructions d'installation

### 1. Cloner le projet
```bash
 git clone https://github.com/zkerkeb-class/pokedex-starter-sosochea.git
 cd pokedex-starter-sosochea
```

### 2. Installer les dépendances
- Pour l'API :
```bash
cd pokedex-api-sosochea
npm install
```
- Pour le frontend :
```bash
cd ../pokedex-starter-sosochea
npm install
```

### 3. Lancer la base de données
Assurez-vous d'avoir MongoDB démarré en local :
```bash
mongod
```

### 4. Démarrer les serveurs
- Backend :
```bash
cd pokedex-api-sosochea
npm run dev
```
- Frontend :
```bash
cd ../pokedex-starter-sosochea
npm run dev
```

Accédez à l'application sur : [http://localhost:5173](http://localhost:5173)

---

## 📚 Documentation de l'API

### Authentification
| Méthode | URL | Description |
|:--------|:----|:------------|
| POST | `/api/users/register` | Inscription d'un nouvel utilisateur |
| POST | `/api/users/login` | Connexion d'un utilisateur |

### Pokémons
| Méthode | URL | Description |
|:--------|:----|:------------|
| GET | `/api/pokemons` | Liste de tous les Pokémons |
| POST | `/api/pokemons` | Création d'un Pokémon (authentification requise) |
| PUT | `/api/pokemons/:id` | Modification d'un Pokémon (authentification requise) |
| DELETE | `/api/pokemons/:id` | Suppression d'un Pokémon (authentification requise) |

### Pokétalk (Posts)
| Méthode | URL | Description |
|:--------|:----|:------------|
| GET | `/api/posts` | Liste de tous les posts Pokétalk |
| POST | `/api/posts` | Création d'un post |
| DELETE | `/api/posts/:id` | Suppression d'un post |
| PATCH | `/api/posts/:id/like` | Liker un post |
| PATCH | `/api/posts/:id/dislike` | Disliker un post |


---

## 🌐 Frontend - Fonctionnalités principales

- **Login/Register** : connexion sécurisée avec JWT
- **Page d'accueil** : rechercher, filtrer et voir la liste de Pokémons
- **Création de Pokémons** : ajout de nouveaux Pokémons
- **🎙️ Pokétalk** :
  - Poster des messages courts avec un Pokémon aléatoire
  - Liker / Disliker les posts
  - Supprimer ses posts
  - Trier par date, popularité, nom du Pokémon ou auteur
  - Rechercher parmi les posts
  - Pagination


---

## 🎥 Vidéo de démonstration

▶️ [Lien YouTube vers la démo du projet](https://youtu.be/X6ihdk6skxo?si=HT5LCrj1Mr4Twrl1) 
---

## 💚 Merci pour votre attention et bon Poké-catching 🌟 !

---

