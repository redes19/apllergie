-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: apllergie
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` VALUES (1,'Milk'),(2,'Eggs'),(3,'Peanuts');
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `motdepasse` varchar(120) NOT NULL,
  `allergies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`allergies`)),
  `allergy_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','test@test.com','123',NULL,NULL),(2,'John Doe','john.doe@example.com','motdepasse123',NULL,NULL),(3,'test','test2@test.com','$2b$10$ua.2cq6GGiQawsAp9sCnJ.UvJloaSBKmGJnftb6PSQOEQfA4fVWsW',NULL,NULL),(4,'gzerger','zerzer@rezr.fr','$2b$10$mohf.lFDFi.aVSeSVh.p8.1.L7uERxE0l2j1BlOVWfqQZvRU0m09W',NULL,NULL),(5,'azeazra','rzeze@arar.fr','$2b$10$ymfOS10XfXCdt.w2LuobJuyb3VB5stpmHr03yV028zZQ4T00NnlTi',NULL,NULL),(6,'zretr','tertr@eaze.fr','$2b$10$EYIgHap6hvcCmLZGz5QDJet3JLE11mAE2potYL7QZVUjRNx3IzIvy',NULL,NULL),(7,'zerttre','tertret@truyrt.fr','$2b$10$U6876xjmpkc8bTjl6Oa3.e/75iN1Ms5En94B/9L17QfZqTLwvRwTi',NULL,NULL),(8,'zerttre','tergertret@truyrt.fr','$2b$10$.8xfCbuS0XFZyS5sKJzS4.LoL9.AXjBpArmZeViQ9iDn7Ur6xmu6O',NULL,NULL),(9,'zerttre','tergertrzet@truyrt.fr','$2b$10$kJKfTNQF1Cl3.xRBsmawde2OjaUHU0DzjyGozBVfmwLmAtkbdxXNu',NULL,NULL),(10,'re rz','loris@test.fr','$2b$10$ZU7BttjBtawTKtNVyZ52.ePBWusHoM.27CL0IIkfMmR3iEdw/E4fW',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_allergies`
--

DROP TABLE IF EXISTS `user_allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_allergies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `allergy_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `allergy_id` (`allergy_id`),
  CONSTRAINT `user_allergies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_allergies_ibfk_2` FOREIGN KEY (`allergy_id`) REFERENCES `allergies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_allergies`
--

LOCK TABLES `user_allergies` WRITE;
/*!40000 ALTER TABLE `user_allergies` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'apllergie'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17 20:40:05
