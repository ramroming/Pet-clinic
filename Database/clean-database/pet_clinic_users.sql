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
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (161,'reemo','reem@hotmail.com','$2b$08$WfXNIXRfwADQi7DrZkNtm.0Hv8WiZ5Nng7OodceDkwylROQGyWsEy','stmem',193,NULL,'vet'),(162,'rami94','rami@gmail.com','$2b$08$Vuh8i12JHyxg6UrWeKiCjuPXm3MHRVXOuwR6kDdVAXu2B3i9pRVZS','stmem',194,NULL,'groomer'),(163,'bashhal','bash@gmail.com','$2b$08$bkRCD3Uc0VRxZAvoqE7ZfOmJw255SDg7nUE0kafUlLDoLQUvovxtm','stmem',195,NULL,'trainer'),(164,'sami99','sami@hotmail.com','$2b$08$d6EVhvfDYKZTkTqr.Yap2e/vChxXkQicsb7hXVtqxPUlL48rbu9G6','stmem',196,NULL,'receptionist'),(165,'Mehmetci','mehmetci@gmail.com','$2b$08$zJxcwwvvGmIiAPZhj1zCVORwv8AJxg3QihB2DNptEFfW6EyidcQ6O','client',197,NULL,NULL),(166,'marie00','maria@gmail.com','$2b$08$7ZORVbFbGY62tCv9h5ZSrOH9gMFoL8pqsmmY6ZZFcAn9dPpXl2ILK','client',198,NULL,NULL),(167,'yaso','yaso@outlook.com','$2b$08$Lc.1NnwdJq1ALNFi4D85VeJL2.yj2TTBT4KL6c14awdow1NdssXte','client',199,NULL,NULL),(168,'karen82','karen44@gmail.com','$2b$08$wTUmzF0rr9N7aZAy987lqe8xIxCuIoCixZ7U.H3JR737w2bQLmCse','client',200,NULL,NULL),(169,'jimbo','jimbo@gmail.com','$2b$08$.Is69P.49PsorQee6o.NyuDefQCD5JZ1nGx/DqeB.OsB4.8PZSUNq','client',201,NULL,NULL),(170,'pamela88','pamela3@gmail.com','$2b$08$aQjo84TBlDgU1vcs087QsOBY1npNwSjW9O12rOnRvsEei9WvNykZ.','client',202,NULL,NULL),(171,'michael88','mike88@gmail.com','$2b$08$j3BKAF0nlB2HV95hIfgzDeS5RsYLuMV.biYWvITK35for4chWcs0y','client',203,NULL,NULL),(172,'moso99','moso@gmail.com','$2b$08$dnZMtOJ4E8Ivt1gQ5KkiLOIPCR2ZdWU47evEw/R9nfxSeg0kbOmoO','client',204,NULL,NULL),(173,'manaloo','manal@gmail.com','$2b$08$WQeSBpASBIZ4y3TawCZD0.aH01.V5ibMivJgTxfzusBGHj51zr2wu','client',205,NULL,NULL),(174,'amalco','tahaamalco@gmail.com','$2b$08$lIq88r.NeDuF37ab.7cthe0FXVg30faPuXxTY1kAldNYkCbC1UvnW','client',206,NULL,NULL),(176,'adminBruce','bruce@gmail.com','$2b$08$QB8RsWSIvEkoOrqGiahImO6o4uNfYorPMydWLYeFocOCc9j.8Aw.S','stmem',208,NULL,'admin'),(186,'Fatih88','fatih88@gmail.com','$2b$08$F0S7QljPSUPO2wusXV7AQuCON85gH7YsakPpsgWm4g7z3jsJBlxk2','stmem',218,NULL,'vet');
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

-- Dump completed on 2022-05-06 20:46:16
