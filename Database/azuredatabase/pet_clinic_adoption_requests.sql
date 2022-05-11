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
-- Table structure for table `adoption_requests`
--

DROP TABLE IF EXISTS `adoption_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoption_requests` (
  `date` datetime NOT NULL,
  `client_id` int(11) NOT NULL,
  `adoption_ad_id` int(11) NOT NULL,
  `status` varchar(15) CHARACTER SET utf8mb4 NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`client_id`,`adoption_ad_id`),
  KEY `ADOPTION_REQUESTS_fk1` (`adoption_ad_id`),
  KEY `id` (`id`),
  CONSTRAINT `ADOPTION_REQUESTS_fk0` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption_requests`
--

LOCK TABLES `adoption_requests` WRITE;
/*!40000 ALTER TABLE `adoption_requests` DISABLE KEYS */;
INSERT INTO `adoption_requests` VALUES ('2022-04-10 13:37:43',166,76,'accepted',1),('2022-03-22 12:11:00',170,49,'rejected',2),('2022-04-10 13:12:14',171,74,'pending',3),('2022-04-10 13:18:38',172,74,'pending',4),('2022-04-10 14:18:00',172,76,'rejected',5),('2022-04-10 13:41:36',172,77,'accepted',6),('2022-05-06 08:06:02',172,83,'accepted',7),('2022-03-22 12:07:28',173,49,'accepted',8),('2022-03-24 12:07:28',173,50,'pending',9);
/*!40000 ALTER TABLE `adoption_requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-11  2:08:47
