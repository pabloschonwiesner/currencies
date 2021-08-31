CREATE DATABASE  IF NOT EXISTS `currencies` 
USE `currencies`;

DROP TABLE IF EXISTS `currencies`;
CREATE TABLE `currencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  `symbol` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `currencies` WRITE;
INSERT INTO `currencies` VALUES (1,'bitcoin','BTC'),(2,'ethereum','ETH'),(3,'cardano','ADA')
UNLOCK TABLES;

DROP TABLE IF EXISTS `currency_rates`;
CREATE TABLE `currency_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_currency` int(11) NOT NULL,
  `value` float NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_currencies_fk_idx` (`id_currency`),
  CONSTRAINT `id_currencies_fk` FOREIGN KEY (`id_currency`) REFERENCES `currencies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `currency_rates` WRITE;
INSERT INTO `currency_rates` VALUES (1,1,48556.5,'2021-08-29 00:38:36');
UNLOCK TABLES;