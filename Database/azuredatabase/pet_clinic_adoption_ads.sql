-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: pet-clinic-app.mysql.database.azure.com    Database: pet_clinic
-- ------------------------------------------------------
-- Server version	5.7.37-log

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `ad_type` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
  `status` tinyint(1) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `shelter_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `story` varchar(500) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ADOPTION_ADS_fk0` (`pet_id`),
  KEY `ADOPTION_ADS_fk1` (`shelter_id`),
  KEY `ADOPTION_ADS_fk2` (`client_id`),
  CONSTRAINT `ADOPTION_ADS_fk0` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ADOPTION_ADS_fk1` FOREIGN KEY (`shelter_id`) REFERENCES `shelters` (`id`),
  CONSTRAINT `ADOPTION_ADS_fk2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption_ads`
--

LOCK TABLES `adoption_ads` WRITE;
/*!40000 ALTER TABLE `adoption_ads` DISABLE KEYS */;
INSERT INTO `adoption_ads` VALUES (48,'2022-03-22 11:51:42','cat',1,88,NULL,174,'My cute and loving Lilo is waiting for someone that loves cat and can provide a safe and loving home'),(50,'2022-03-22 11:52:24','bird',1,90,NULL,174,'My cute and loving Kiki is waiting for someone that loves cat and can provide a safe and loving home'),(51,'2022-03-22 11:53:10','cat',1,103,NULL,168,'My cute and loving Mila is waiting for someone that loves cat and can provide a safe and loving home'),(52,'2022-03-22 11:53:53','dog',1,104,NULL,168,'My cute and loving Kyle is waiting for someone that loves cat and can provide a safe and loving home'),(53,'2022-03-22 11:54:22','bird',1,105,NULL,168,'My cute and loving Gigi  is waiting for someone that loves cat and can provide a safe and loving home'),(57,'2022-03-22 11:55:32','cat',1,85,NULL,165,'My cute and loving mimo is waiting for someone that loves cat and can provide a safe and loving home'),(58,'2022-03-22 11:55:46','dog',1,86,NULL,165,'My cute and loving Dido is waiting for someone that loves cat and can provide a safe and loving home'),(59,'2022-03-22 11:55:58','bird',1,87,NULL,165,'My cute and loving kokoo is waiting for someone that loves cat and can provide a safe and loving home'),(60,'2022-03-22 11:56:28','cat',1,97,NULL,170,'My cute and loving Wallie is waiting for someone that loves cat and can provide a safe and loving home'),(61,'2022-03-22 11:56:59','dog',1,98,NULL,170,'My cute and loving Sam is waiting for someone that loves cat and can provide a safe and loving home'),(62,'2022-03-22 11:57:15','bird',1,99,NULL,170,'My cute and loving Fred is waiting for someone that loves cat and can provide a safe and loving home'),(64,'2022-03-22 11:58:02','dog',1,110,NULL,166,'My cute and loving Dennis is waiting for someone that loves cat and can provide a safe and loving home'),(66,'2022-03-22 11:59:15','cat',1,100,NULL,169,'My cute and loving Dina is waiting for someone that loves cat and can provide a safe and loving home'),(67,'2022-03-22 11:59:28','dog',1,101,NULL,169,'My cute and loving Greg is waiting for someone that loves cat and can provide a safe and loving home'),(68,'2022-03-22 11:59:39','bird',1,102,NULL,169,'My cute and loving Ella is waiting for someone that loves cat and can provide a safe and loving home'),(69,'2022-03-22 12:00:09','cat',1,91,NULL,173,'My cute and loving Frento is waiting for someone that loves cat and can provide a safe and loving home'),(70,'2022-03-22 12:00:23','dog',1,92,NULL,173,'My cute and loving Didi is waiting for someone that loves cat and can provide a safe and loving home'),(71,'2022-03-22 12:00:34','bird',1,93,NULL,173,'My cute and loving Selman, is waiting for someone that loves cat and can provide a safe and loving home'),(74,'2022-04-10 10:46:15','cat',1,109,NULL,166,'Hey I\'m cute tala'),(76,'2022-04-10 13:03:15','dog',0,89,1,NULL,'Can you please adopt me'),(77,'2022-04-10 13:38:19','bird',0,96,1,NULL,'please adopt this pet from the shelter'),(83,'2022-05-06 08:03:45','cat',0,126,NULL,171,'Hi my name is kara please adopt me <3');
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

-- Dump completed on 2022-05-11  2:08:52
