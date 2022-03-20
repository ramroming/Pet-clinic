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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption_ads`
--

LOCK TABLES `adoption_ads` WRITE;
/*!40000 ALTER TABLE `adoption_ads` DISABLE KEYS */;
INSERT INTO `adoption_ads` VALUES (13,'2022-03-13 07:50:27','dog',1,71,NULL,2,'My dog 1 is such cute and lovely dog'),(14,'2022-03-13 07:50:43','dog',1,72,NULL,2,'My dog 2 is such cute and lovely dog'),(15,'2022-03-13 07:51:09','dog',1,73,NULL,2,'My dog 3 is such cute and lovely dog'),(16,'2022-03-13 07:51:27','dog',1,74,NULL,2,'My dog 4 is such cute and lovely dog'),(17,'2022-03-13 07:51:46','dog',1,75,NULL,2,'My dog 5 is such cute and lovely dog'),(18,'2022-03-13 07:52:07','dog',1,76,NULL,2,'My dog 6 is such cute and lovely dog'),(19,'2022-03-13 07:52:27','dog',1,77,NULL,2,'My dog 7 is such cute and lovely dog'),(20,'2022-03-13 07:53:30','bird',1,54,NULL,126,'I love my bird 3 so much why don\'t you adopt it'),(21,'2022-03-13 07:53:46','bird',1,55,NULL,126,'I love my bird 4 so much why don\'t you adopt it'),(22,'2022-03-13 07:58:04','dog',1,78,NULL,126,'I love my dog 8 so much why don\'t you adopt it'),(23,'2022-03-13 07:58:48','dog',1,79,NULL,126,'I love my dog 9 so much why don\'t you adopt it'),(24,'2022-03-13 08:00:59','dog',1,80,NULL,126,'I love my dog 10 so much why don\'t you adopt it'),(25,'2022-03-13 08:02:31','bird',1,56,NULL,4,'Don\'t you like my bird 5 go ahead and adopt it'),(26,'2022-03-13 08:03:01','bird',1,57,NULL,4,'Don\'t you like my bird 6 go ahead and adopt it'),(27,'2022-03-13 08:06:30','bird',1,58,NULL,4,'Say hello to my lovely bird'),(28,'2022-03-13 08:06:41','bird',1,59,NULL,4,'Say hello to my lovely bird'),(29,'2022-03-13 08:06:53','bird',1,60,NULL,4,'Say hello to my lovely bird'),(30,'2022-03-13 08:07:05','bird',1,61,NULL,4,'Say hello to my lovely bird'),(31,'2022-03-13 08:07:22','cat',1,62,NULL,4,'Say hello to my lovely cat'),(32,'2022-03-13 08:07:39','cat',1,63,NULL,4,'Say hello to my lovely cat'),(33,'2022-03-13 08:07:48','cat',1,64,NULL,4,'Say hello to my lovely cat'),(34,'2022-03-13 08:14:31','cat',1,65,NULL,7,'I love my cat so much'),(35,'2022-03-13 08:14:40','cat',1,66,NULL,7,'I love my cat so much'),(36,'2022-03-13 08:14:49','cat',1,67,NULL,7,'I love my cat so much'),(37,'2022-03-13 08:14:58','cat',1,68,NULL,7,'I love my cat so much'),(38,'2022-03-13 08:15:09','cat',1,69,NULL,7,'I love my cat so much'),(39,'2022-03-13 08:15:23','cat',1,70,NULL,7,'I love my cat so much'),(44,'2022-03-16 12:03:24','cat',1,1,NULL,2,'Finaly updated my pet ad story'),(45,'2022-03-18 10:46:05','bird',1,82,NULL,158,'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is'),(47,'2022-03-18 14:08:23','dog',1,84,NULL,158,'Say hello to my husky dog');
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

-- Dump completed on 2022-03-19 15:46:39
