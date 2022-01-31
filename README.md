# AssignmentApp

Ceci est un projet Angular dans le cadre du Master EMSI Intense avec L'université Côte d'Azur.

# Objectif

Créer une plateforme de gestion des assignments avec une partie back end et une partie front end.

# Front end

La partie du projet front end contient les notions de bases 
    - 

# Taches à réaliser:

- [x] Déployer le projet sur Heroku
      - https://assignment-frontend-tm.herokuapp.com/home
- [ ] Créer une vidéo de ~1min montrant les fonctionalités réalisées
      - ?
- [x] Meilleure présentation
- [?] Meilleure pagination
- [x] Afficher les details depuis la liste de la page principale
- [x] Supprimer depuis la liste principale
- [x] Ajout de dialogue avant suppression
- [ ] Snack bar (Il y a eu un essai mais sans grand succès)
- [ ] Login
- [x] Surprises
    - Ajout d'une barre de navigation ancrée en haut de l'écran avec le toggle pour login (Supposé être un lien vers une page à part mais je n'ai pas réalisé le module de Login)
    - Ajout de différents boutons dans l'affichage detaillé des assignments dans la page principale
      - Toggle de Rendu.
      - Lien vers la page de details pour plus de details (La classe Assignment manque de champs mais pour un expemple réel il y aurait plus de details).
      - Lien vers la page d'édition (J'aurais pu changer les différents textes en zones de text et ajouter un bouton de sauvegarde sur la même page mais j'ai trouvé cela moins ésthètique que ce qui a été réalisé).
      - NB : Les boutons autres que "Details" requièrent toujours qu'on soit connectés.
    - Changement de l'index des Assignments lors de la pagination:
      - Les nombres sont successifs entre les pages
      - Ajouter ou supprimer rafraichis la liste dans perdre la position:
        - Si on a 45 Assignement par page, la deuxième page commence par 46.
        - Si on supprime l'élément 49, l'élement 50 prends sa place et ainsi de suite sans perdre ni la position du scroll ni la pagination.
        - Si on a uniquement 46 éléments et qu'on supprime le dernier, on n'affiche pas une liste vide mais on retourne à la page précédente.
        - Si on affiche un seul élément a la fois et qu'on soit sur la dernière page, changer la limite ne changeais pas la page, ce qui résultait à une page vide. Ce n'est plus le cas car changer la limite sur une page plus grande que le nombre de pages avec une nouvelle limite retourne la dernière page.