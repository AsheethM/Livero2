-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Lun 20 Novembre 2017 à 00:05
-- Version du serveur :  5.7.20-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `PRI`
--

-- --------------------------------------------------------

--
-- Structure de la table `Shop`
--

CREATE TABLE `Shop` (
  `shopname` varchar(100) NOT NULL,
  `id_owner` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `location` varchar(500) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Shop`
--

INSERT INTO `Shop` (`shopname`, `id_owner`, `id`, `location`, `email`) VALUES
('CARREFOUR', 2, 1, 'Paris', 'lidl@lidl.com');

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

CREATE TABLE `transaction` (
  `id_shop` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_transporter` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `is_OK` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL,
  `timer` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `actor` varchar(100) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `User`
--

INSERT INTO `User` (`lastname`, `firstname`, `birthdate`, `email`, `phone`, `actor`, `id`) VALUES
('Titus', 'Regis', '2017-11-23', 'test@gmail.com', '0699027889', 'customer', 1),
('Sehil', 'Yvael', '2017-11-15', 'test.yvael@test.com', '0147859265', 'vendor', 2),
('pelletier', 'nicolas', '2017-11-09', 'nicolas@test.com', '0548713695', 'transporter', 3),
('User', 'Test3', '2017-11-15', 'test3@test.com', '0415136587', 'transporter', 4);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Shop`
--
ALTER TABLE `Shop`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Shop`
--
ALTER TABLE `Shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
