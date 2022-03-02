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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `date` datetime NOT NULL,
  `client_id` int NOT NULL,
  `stmem_id` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  `appointment_type_id` int NOT NULL,
  `pet_id` int DEFAULT NULL,
  PRIMARY KEY (`date`,`stmem_id`),
  KEY `APPOINTMENTS_fk0` (`client_id`),
  KEY `APPOINTMENTS_fk1` (`stmem_id`),
  KEY `APPOINTMENTS_fk2` (`appointment_type_id`),
  KEY `APPOINTMENTS_fk3` (`pet_id`),
  CONSTRAINT `APPOINTMENTS_fk0` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `APPOINTMENTS_fk1` FOREIGN KEY (`stmem_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `APPOINTMENTS_fk2` FOREIGN KEY (`appointment_type_id`) REFERENCES `appointment_types` (`id`),
  CONSTRAINT `APPOINTMENTS_fk3` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES ('2022-03-02 18:00:00',6,3,1,1,19),('2022-03-03 09:00:00',2,3,1,1,1),('2022-03-10 09:00:00',3,6,1,3,2),('2022-03-10 10:00:00',2,6,1,3,30),('2022-03-10 11:00:00',5,6,1,3,4),('2022-03-10 12:00:00',6,6,1,3,19),('2022-03-10 13:00:00',7,6,1,3,20),('2022-03-10 14:00:00',8,6,1,3,21),('2022-03-10 15:00:00',9,6,1,3,25),('2022-03-10 16:00:00',93,6,1,3,26),('2022-03-10 17:00:00',95,6,1,3,27),('2022-03-10 18:00:00',97,6,1,3,28),('2022-03-12 16:00:00',2,9,1,1,30),('2022-04-05 09:00:00',3,3,1,1,2);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-02 23:20:13
