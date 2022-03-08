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
-- Table structure for table `adoption_ads`
--

DROP TABLE IF EXISTS `adoption_ads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoption_ads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `ad_type` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `pet_id` int NOT NULL,
  `shelter_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `story` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ADOPTION_ADS_fk0` (`pet_id`),
  KEY `ADOPTION_ADS_fk1` (`shelter_id`),
  KEY `ADOPTION_ADS_fk2` (`client_id`),
  CONSTRAINT `ADOPTION_ADS_fk0` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`),
  CONSTRAINT `ADOPTION_ADS_fk1` FOREIGN KEY (`shelter_id`) REFERENCES `shelters` (`id`),
  CONSTRAINT `ADOPTION_ADS_fk2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  CONSTRAINT `arc_adoption_ad` CHECK (((`shelter_id` is null) or (`client_id` is null)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption_ads`
--

LOCK TABLES `adoption_ads` WRITE;
/*!40000 ALTER TABLE `adoption_ads` DISABLE KEYS */;
INSERT INTO `adoption_ads` VALUES (1,'2020-02-08 00:00:00','dog',1,3,NULL,2,''),(2,'2020-02-09 00:00:00','cat',1,1,1,NULL,'');
/*!40000 ALTER TABLE `adoption_ads` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08 19:45:59
