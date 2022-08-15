-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 15 août 2022 à 11:37
-- Version du serveur : 8.0.29
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
CREATE TABLE IF NOT EXISTS `commentaires` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`post_id`, `user_id`) VALUES
(218, 35);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `title` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `picture` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`title`, `date`, `picture`, `content`, `ID`, `user_id`) VALUES
('VUE JS', '2022-08-15 05:49:25', 'http://localhost:3000/images/post/1660563404083-vuejs.png', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum pariatur iure placeat minima cum odit nulla, quidem unde voluptates repellendus! Deserunt earum quia doloribus cupiditate veniam repellendus accusamus voluptate consequatur, ea ab fugiat quisquam ullam? Nihil fugiat, fuga sunt quia soluta rerum reprehenderit quis sed ex? Enim voluptatibus voluptas, quam fuga architecto ullam beatae sed, quisquam iure, labore ratione quae.', 218, 35),
('Langage Python', '2022-08-15 05:49:25', 'http://localhost:3000/images/post/1660563412086-logo python.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum pariatur iure placeat minima cum odit nulla, quidem unde voluptates repellendus! Deserunt earum quia doloribus cupiditate veniam repellendus accusamus voluptate consequatur, ea ab fugiat quisquam ullam? Nihil fugiat, fuga sunt quia soluta rerum reprehenderit quis sed ex? Enim voluptatibus voluptas, quam fuga architecto ullam beatae sed, quisquam iure, labore ratione quae.', 221, 72),
('SQL VS NoSQL', '2022-08-15 05:49:25', 'http://localhost:3000/images/post/1660563418748-bdd.png', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum pariatur iure placeat minima cum odit nulla, quidem unde voluptates repellendus! Deserunt earum quia doloribus cupiditate veniam repellendus accusamus voluptate consequatur, ea ab fugiat quisquam ullam? Nihil fugiat, fuga sunt quia soluta rerum reprehenderit quis sed ex? Enim voluptatibus voluptas, quam fuga architecto ullam beatae sed, quisquam iure, labore ratione quae.', 222, 72),
('Quel OS choisir pour le développement ?', '2022-08-15 05:49:25', NULL, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum pariatur iure placeat minima cum odit nulla, quidem unde voluptates repellendus! Deserunt earum quia doloribus cupiditate veniam repellendus accusamus voluptate consequatur, ea ab fugiat quisquam ullam? Nihil fugiat, fuga sunt quia soluta rerum reprehenderit quis sed ex? Enim voluptatibus voluptas, quam fuga architecto ullam beatae sed, quisquam iure, labore ratione quae.', 223, 72),
('REACT JS', '2022-08-15 05:49:25', NULL, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum pariatur iure placeat minima cum odit nulla, quidem unde voluptates repellendus! Deserunt earum quia doloribus cupiditate veniam repellendus accusamus voluptate consequatur, ea ab fugiat quisquam ullam? Nihil fugiat, fuga sunt quia soluta rerum reprehenderit quis sed ex? Enim voluptatibus voluptas, quam fuga architecto ullam beatae sed, quisquam iure, labore ratione quae.', 224, 35);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `pictureprofil` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'http://localhost:3000/images/profil_vierge.jpg',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `email` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `uniqueUser` (`name`,`firstname`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`admin`, `pictureprofil`, `name`, `firstname`, `email`, `password`, `ID`) VALUES
(1, 'http://localhost:3000/images/profil_vierge.jpg', 'ESTIVAL', 'Thomas', 'a69969a3838acaf10e0cab60b531bcd82629d04b22b71282205c5cfd24f87738', '$2b$05$3y17ZnuF0/WeQLHQVw/pO.UlwBp.D63Hxi49XcKWqWsFtw7ghNEwS', 35),
(0, 'http://localhost:3000/images/profil_vierge.jpg', 'FOURNIER', 'valerie', 'acd5ce36b7271b1a51f63e895b8cf6711629e2e8f277a74998712f84079fd467', '$2b$05$OvOjX.W57GgmAjJbTx7MPOyXIaOGnsGHILZr63GtfhBqzV3sLUyD6', 72),
(0, 'http://localhost:3000/images/profil_vierge.jpg', 'JEAN', 'dupont', '8a97058bf77729f9e40a110d74a9ba3eca88e0a25d13ace9ac28933b79ff1eb9', '$2b$05$eodEW2yiaBeHmkZAxhs9juNsWhLWgxHxDnFFSpm0k5t/kzE9DnaJO', 73);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
