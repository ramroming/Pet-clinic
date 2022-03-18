-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pet_clinic
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `color_records`
--

DROP TABLE IF EXISTS `color_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color_records` (
  `pet_id` int NOT NULL,
  `color_id` int NOT NULL,
  PRIMARY KEY (`pet_id`,`color_id`),
  KEY `COLOR_RECORDS_fk1` (`color_id`),
  CONSTRAINT `COLOR_RECORDS_fk0` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `COLOR_RECORDS_fk1` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_records`
--

LOCK TABLES `color_records` WRITE;
/*!40000 ALTER TABLE `color_records` DISABLE KEYS */;
INSERT INTO `color_records` VALUES (52,1),(55,1),(60,1),(61,1),(82,1),(53,2),(54,2),(57,2),(58,2),(82,2),(2,3),(50,3),(52,3),(55,3),(56,3),(50,4),(52,4),(56,4),(60,4),(61,4),(83,4),(3,5),(51,5),(56,5),(57,5),(59,5),(61,5),(65,5),(66,5),(67,5),(68,5),(69,5),(72,5),(73,5),(75,5),(77,5),(79,5),(84,5),(53,6),(55,6),(57,6),(60,6),(62,6),(63,6),(64,6),(67,6),(68,6),(69,6),(70,6),(71,6),(76,6),(77,6),(79,6),(80,6),(84,6),(1,7),(65,7),(1,8),(50,8),(51,8),(65,8),(66,8),(67,8),(68,8),(73,8),(79,8),(58,9),(62,9),(70,9),(76,9),(78,9),(80,9),(81,11),(72,12),(73,12),(76,12),(80,12),(81,12),(59,13),(75,13),(77,13),(74,14);
/*!40000 ALTER TABLE `color_records` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-18 19:05:04
