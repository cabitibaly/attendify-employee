# 📋 Attendify Employee

Application mobile de gestion des présences destinée aux employés, développée avec **React Native** et **Expo**.

---

## ✨ Fonctionnalités

- 📅 Consultation du calendrier de présences
- 📄 Sélection et téléversement de documents
- 🔔 Retours haptiques pour une meilleure expérience utilisateur
- 🎨 Interface moderne avec NativeWind (Tailwind CSS pour React Native)
- 🗂️ Navigation par onglets et routing basé sur les fichiers (Expo Router)
- 💾 Stockage local avec AsyncStorage

---

## 🛠️ Stack technique

| Technologie | Version |
|---|---|
| React Native | 0.81.5 |
| Expo | ~54.0.x |
| Expo Router | ~6.0.x |
| TypeScript | ~5.9.x |
| NativeWind | ^4.2.x |
| Tailwind CSS | ^3.4.x |
| React Native Reanimated | ~4.1.x |
| React Native Calendars | ^1.13.x |

---

## 📁 Structure du projet

```
attendify-employee/
├── app/             # Écrans et routes (file-based routing Expo Router)
├── components/      # Composants réutilisables
├── assets/          # Images, polices et ressources statiques
├── data/            # Données locales / mock data
├── interface/       # Types TypeScript et interfaces
├── global.css       # Styles globaux (NativeWind / Tailwind)
├── app.json         # Configuration Expo
└── tailwind.config.js
```

---

## 🚀 Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) sur votre appareil mobile (optionnel)

### Installation

```bash
git clone https://github.com/cabitibaly/attendify-employee.git
cd attendify-employee
npm install
```

### Lancer l'application

```bash
npx expo start
```

Choisissez ensuite votre environnement d'exécution :

| Option | Commande |
|---|---|
| Android (émulateur) | `npm run android` |
| iOS (simulateur) | `npm run ios` |
| Web | `npm run web` |
| Expo Go (scan QR) | `npx expo start` |

---

## 🧹 Réinitialiser le projet

Pour repartir d'une base vierge :

```bash
npm run reset-project
```

> Le code de démarrage sera déplacé dans `app-example/` et un répertoire `app/` vide sera créé.

---

## 🔍 Linting

```bash
npm run lint
```

---

## 📦 Principales dépendances

- **[@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)** — Feuilles modales animées
- **[lucide-react-native](https://lucide.dev/)** — Icônes vectorielles
- **[react-native-calendars](https://github.com/wix/react-native-calendars)** — Composant calendrier
- **[expo-document-picker](https://docs.expo.dev/versions/latest/sdk/document-picker/)** — Sélection de fichiers
- **[expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)** — Retours haptiques
- **[@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)** — Persistance locale

---

## 📚 Ressources utiles

- [Documentation Expo](https://docs.expo.dev/)
- [Expo Router — File-based routing](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- [Communauté Expo sur Discord](https://chat.expo.dev)

---

## Auteur
 
**cabitibaly** — [GitHub](https://github.com/cabitibaly)