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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `user_type` varchar(150) NOT NULL,
  `personal_info_id` int NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `stmem_type` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `USERS_fk0` (`personal_info_id`),
  CONSTRAINT `USERS_fk0` FOREIGN KEY (`personal_info_id`) REFERENCES `personal_info` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_subtypes` CHECK ((((`user_type` = _utf8mb4'client') and (`stmem_type` is null)) or ((`user_type` = _utf8mb4'stmem') and (`stmem_type` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'rami94','ramisaad@gmail.com','$2a$08$YaLBerT.4aYt4xCBpYNY9uoMKmHTzi/ekzn3J33QKsdmDN8bhbeyC','client',1,1,NULL),(3,'reem98','reemhalbouni@hotmail.com','$2a$08$0TO/pBvRCjHud6YH4jwx.uiuj2Q13KQI1EwqkpJONCBe5zuFf.cfS','stmem',2,1,'vet'),(4,'ilhamiMorak','ilhamiMorak@gmail.com','$2a$08$SLa9cToW17Ra/9MdipJKaeAuKktqJ7PAhZlAIQs/P/CCV/cMWjsyu','client',3,1,NULL),(5,'bashobesh','bashar@outlook.com','$2a$08$mmEAlAHblh782QQTYVspnOeh22bR5X2M328lQFnG6EHKPCHj5PxVK','stmem',4,1,'trainer'),(6,'wisomiso','wisam@hotmail.com','$2a$08$yyAy0dBCaIwU1TaFBxaNTOKJZp07a4VS.xEQzmMVLGlmp4cwC/4Xa','stmem',5,1,'groomer'),(7,'kylo','kyle@hotmail.com','$2a$08$UXhoT4tFfbjZiddpHn7cNuza1vaEOr95RJAchUTJXKMNYK48n7Cq.','client',6,1,NULL),(8,'marie','marie@halima.com','$2a$08$lDvMe0LyBdQMQ2RGJv2YfOja.ZSB0QDijZaVnTAWsjaqVTyn3kUA2','stmem',7,1,'groomer'),(9,'moso','mos@gmail.com','$2a$08$ttaBmhGT0YBzgqiFK00QLuip9hoXF5z6GZDDfNF63gDAsjtaw0FYS','stmem',8,1,'vet');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-15 22:48:48
