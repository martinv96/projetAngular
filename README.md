# Mini To-Do App - Projet Angular

Une application web **100% standalone** développée avec **Angular 20**, **Bootstrap 5**, et **TypeScript**, permettant de gérer vos tâches quotidiennes avec un calendrier interactif.

---

## Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation et exécution](#installation-et-exécution)
- [Structure du projet](#structure-du-projet)
- [Configuration](#configuration)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## Description

Cette application permet de :

- Ajouter, supprimer et modifier des tâches avec différents statuts (**En cours**, **Terminée**, **Urgente**).  
- Visualiser un **calendrier interactif** permettant de naviguer par mois et année.  
- Utiliser une interface propre, moderne et responsive grâce à **Bootstrap** et une typographie professionnelle (**Poppins**).  

Toutes les données des tâches sont **stockées localement** via `localStorage`, garantissant la persistance des informations entre les sessions.

---

## Fonctionnalités

### Gestion des tâches

- Créer une nouvelle tâche avec un nom et un statut.
- Modifier le statut d’une tâche existante via une liste déroulante.
- Supprimer une tâche.
- Tri visuel par couleur grâce aux badges Bootstrap.
- Interface réactive et agréable avec des animations légères au survol.

### Calendrier interactif

- Vue mensuelle du calendrier avec les jours clairement identifiés.
- Navigation entre les mois grâce aux boutons **« Précédent », « Aujourd'hui », « Suivant »**.
- Sélection de l'année via une **liste déroulante** moderne.
- Jour sélectionné mis en évidence.
- Design responsive et professionnel pour tous les écrans.

### Interface et design

- **100% standalone Angular components** (aucun module central requis).  
- **Bootstrap 5** pour les boutons, badges, formulaires et layout.  
- **Polices Poppins** pour un rendu moderne et lisible.  
- Couleurs harmonisées et UI épurée.

---

## Technologies utilisées

- [Angular 20](https://angular.io/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Bootstrap 5](https://getbootstrap.com/)  
- [Bootstrap Icons](https://icons.getbootstrap.com/)  
- `localStorage` pour persistance des tâches  

---

## Installation et exécution

1. **Cloner le dépôt :**

```bash
git clone <URL_DU_DEPOT>
cd ProjetAngular
