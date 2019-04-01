-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 26 nov. 2018 à 22:28
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `messagerapp`
--

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id_image` int(50) NOT NULL AUTO_INCREMENT,
  `URL` text NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id_message`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id_message`, `id_user`, `message`, `created_at`) VALUES
(1, 1, 'Coucou ça va ?', '2018-04-13 20:13:35'),
(2, 1, 'qsdfqsd', '2018-04-13 22:06:11'),
(3, 1, 'lolilol', '2018-04-13 22:10:16'),
(4, 1, 'lol', '2018-04-13 22:11:48'),
(5, 4, 'Salut !', '2018-04-13 22:11:52'),
(6, 6, 'hey boys', '2018-04-13 22:14:45'),
(7, 1, 'lol', '2018-04-13 22:16:46'),
(8, 6, 'qsdqsd', '2018-04-13 22:16:49'),
(9, 6, 'hello boy', '2018-11-26 21:55:29'),
(10, 7, 'ça va ?', '2018-11-26 21:55:32'),
(11, 6, 'Ouiiiiiii', '2018-11-26 21:55:38'),
(12, 7, 'hahahahahahahhahahah', '2018-11-26 21:55:43');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `mail_users` varchar(100) NOT NULL,
  `password` varchar(30) NOT NULL,
  `account_type` int(11) NOT NULL,
  `img_url` text NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `username`, `mail_users`, `password`, `account_type`, `img_url`) VALUES
(1, 'kifran', 'rizzon.charles@gmail.com', 'just4service', 0, '0'),
(4, 'sdfsdf', 'sdfsd', 'aze', 0, '0'),
(5, 'aze', 'aze', 'aze', 0, '0'),
(6, 'dianophe', 'rizzon.charles@gmail.com', 'toor', 0, '0'),
(7, 'kifran', 'kifran', 'toor', 0, 'https://img-19.ccm2.net/nk1eHVlqfdoTvhQItQ2WE6Jbj70=/91a1e9868ec347bcb203ca1a63034cb6/ccm-ugc/efa5cf51c0711fafc61e73f90e05bc12-s-.png');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_message_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
