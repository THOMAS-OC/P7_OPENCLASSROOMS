# GROUPOMANIA
Projet développé dans un environnement vueJS V2 côté front et NodeJs-Express côté back-end.

## PROGRAMME REQUIS
* [Node.js](https://nodejs.org/fr/download/ "Lien de téléchargement officiel de Node.js")
* [MYSQL](https://dev.mysql.com/downloads/ "Lien de téléchargement officiel de Mysql")

## IMPORTATION DE LA BDD en ligne de commande
* `mysql -u root -p`
* `CREATE DATABASE groupomania;`
* `mysql -u username -p groupomania < Estival_Thomas_bdd_082022.sql`

## IMPORTATION DE LA BDD VIA phpMyAdmin
* Rendez-vous à l'adresse http://localhost/phpmyadmin/
* Créez une nouvelle BDD et appelez là "groupomania"
* Rendez-vous dans la BDD, puis dans l'onglet "importer", ajouter le fichier "Estival_Thomas_bdd_082022.sql" puis cliquer sur "exécuter"

## Lancement du FRONTEND
* Executer la commande `npm install` depuis le dossier `front/`
* Executer la commande `npm start` depuis le dossier `front/`

## Lancement du BACKEND
* Renseigner votre nom d'utilisateur (root par défaut) et votre mot de passe au sein du fichier `P7_OPENCLASSROOMS/back/db.js`
* Executer la commande `npm install` depuis le dossier `back/`
* Executer la commande `npm start` depuis le dossier `back/`

## LANCEMENT DU SITE
* Ouvrez votre navigateur à l'adresse [localhost:8080](http://localhost:8080/#/ "PORT LOCAL 8080")