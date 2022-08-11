# GROUPOMANIA
Projet développé dans un environnement vueJS V2 côté front et NodeJs-Express côté back-end.

## PROGRAMME REQUIS
* [Node.js](https://nodejs.org/fr/download/ "Lien de téléchargement officiel de Node.js")
* [MYSQL](https://dev.mysql.com/downloads/ "Lien de téléchargement officiel de Mysql")

## IMPORTATION DE LA BDD en ligne de commande
* `mysql -u root -p`
* `CREATE DATABASE groupomania;`
* `mysql -u username -p groupomania < dump.sql`

## IMPORTATION DE LA BDD VIA LES GUI

* Pour importer une base avec phpMyAdmin, il suffit de faire un copier-coller du "dump" de MySQL dans le champ prévu pour saisir les requêtes
* Pour importer une base avec mysqlworkbench, connectez-vous puis rendez-vous dans l'onglet "Server"; "import data"


## Lancement du FRONTEND
* Executer la commande `npm install` depuis du dossier `front/`
* Executer la commande `npm start` depuis du dossier `front/`

## Lancement du BACKEND
* Renseigner votre nom d'utilisateur (root par défaut) et votre mot de passe au sein du fichier `P7_OPENCLASSROOMS/back/db.js`
* Executer la commande `npm install` depuis du dossier `back/`
* Executer la commande `npm start` depuis du dossier `back/`

## LANCEMENT DU SITE
* Ouvrez votre navigateur à l'adresse [localhost:8080](http://localhost:8080/#/ "PORT LOCAL 8080")