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
INSERT INTO `color_records` VALUES (114,1),(87,2),(90,2),(108,2),(111,2),(114,2),(90,3),(93,4),(96,4),(99,4),(108,4),(114,4),(86,5),(87,5),(89,5),(90,5),(92,5),(95,5),(96,5),(98,5),(102,5),(103,5),(106,5),(107,5),(116,5),(85,6),(86,6),(87,6),(88,6),(89,6),(92,6),(93,6),(95,6),(97,6),(98,6),(99,6),(100,6),(101,6),(104,6),(105,6),(106,6),(107,6),(109,6),(112,6),(113,6),(91,7),(94,7),(106,7),(109,7),(112,7),(115,7),(85,8),(86,8),(88,8),(89,8),(92,8),(95,8),(97,8),(98,8),(103,8),(85,9),(88,9),(93,9),(96,9),(97,9),(100,9),(101,12),(104,12),(110,12);
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

-- Dump completed on 2022-04-24 16:10:21
