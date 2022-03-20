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
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'rami94','ramisaad@gmail.com','$2a$08$YaLBerT.4aYt4xCBpYNY9uoMKmHTzi/ekzn3J33QKsdmDN8bhbeyC','client',1,1,NULL),(3,'reem98','reemhalbouni@hotmail.com','$2a$08$0TO/pBvRCjHud6YH4jwx.uiuj2Q13KQI1EwqkpJONCBe5zuFf.cfS','stmem',2,1,'vet'),(4,'ilhamiMorak','ilhamiMorak@gmail.com','$2a$08$SLa9cToW17Ra/9MdipJKaeAuKktqJ7PAhZlAIQs/P/CCV/cMWjsyu','client',3,1,NULL),(5,'bashobesh','bashar@outlook.com','$2a$08$mmEAlAHblh782QQTYVspnOeh22bR5X2M328lQFnG6EHKPCHj5PxVK','stmem',4,1,'trainer'),(6,'wisomiso','wisam@hotmail.com','$2a$08$yyAy0dBCaIwU1TaFBxaNTOKJZp07a4VS.xEQzmMVLGlmp4cwC/4Xa','stmem',5,1,'groomer'),(7,'kylo','kyle@hotmail.com','$2a$08$UXhoT4tFfbjZiddpHn7cNuza1vaEOr95RJAchUTJXKMNYK48n7Cq.','client',6,1,NULL),(8,'marie','marie@halima.com','$2a$08$lDvMe0LyBdQMQ2RGJv2YfOja.ZSB0QDijZaVnTAWsjaqVTyn3kUA2','stmem',7,1,'groomer'),(9,'moso','mos@gmail.com','$2a$08$ttaBmhGT0YBzgqiFK00QLuip9hoXF5z6GZDDfNF63gDAsjtaw0FYS','stmem',8,1,'vet'),(93,'koookoRami','ramisaadaldden@gmail.com','$2b$08$ZIPVzTVYTS09JvqjS6CVm.imRC6RbSAbjQD/VDNd.JDLZbbSr3ij2','client',125,NULL,NULL),(95,'ffe23444','ramisfffwaadaldden@gmail.com','$2b$08$erILY6pZKREBQr720jOPW.f6JPrjGriMPy1g3G6ewZC7zMMhBfZvW','client',127,NULL,NULL),(97,'ffew3442','ramisaadffqwealdden@gmail.com','$2b$08$rrJtftJZf1iOQJ63xMUHXun.1mZosgQ3kGWXEW6Bgojkhi53t.h0q','client',129,NULL,NULL),(98,'ffwefwef','ramisafwefwefadaldden@gmail.com','$2b$08$HagSNv8vlf/2F3JE0zWAOe9ubB6p2xjfEqkv09jnZ4ub2ixiWFb5W','client',130,NULL,NULL),(99,'qwdqdd','ramiwwwqsaadaldden@gmail.com','$2b$08$T73VWQRW.XAgl3KXg1ioN.Ry0z0Mg2XWAjRm/BC/HBnFsWmYnZROy','client',131,NULL,NULL),(100,'wefweff','ramisaaeeewdaldden@gmail.com','$2b$08$uY8pH5xTFJrDEelPwezQR.wIlkPXcmSuX13j7hN4BViB46NJhG63u','client',132,NULL,NULL),(101,'ffe23444ewef','rameeewefisaadaldden@gmail.com','$2b$08$q/L1mo/Chk6K7BxQ0Tcb4OfHv/S1oiA7iIp5ZO48ukc3BipXXegs6','client',133,NULL,NULL),(102,'fwefwefqq','rarr23r3rmisaadaldden@gmail.com','$2b$08$56jbYuLlpbyqqGKmHbLxpuELpbKcJ/tnotYKZJNjgNIDU1FUZAL52','client',134,NULL,NULL),(103,'wefwefffweff','raeeeemisaadaldden@gmail.com','$2b$08$/VSpsvhtI/J.AAfKVWd06OtPYozd7S9NAAfIqZMEQ3kmA9NBTmzoS','client',135,NULL,NULL),(104,'wefwefwefwe','ramisaffewfeadaldden@gmail.com','$2b$08$LY3ko0.GENtkYT3SJAz/d.x5665sQyVESOFxJ6ZQNP.qXe3CGRF4i','client',136,NULL,NULL),(105,'rami94eew','ramisffwefaadaldden@gmail.com','$2b$08$0gU4y/rdIZ/QwZyYQ/DpbOBo3wUKwzwrZ5tAfuMnzN/G3OqdsrnSO','client',137,NULL,NULL),(106,'feewef','rafwefwefmisaadaldden@gmail.com','$2b$08$A/oW6ze87Pykmtu/mgQnfeRjNGzom5BNtKke8nzQcn3p1/6ZbGNOG','client',138,NULL,NULL),(121,'fweqqwe','ramisaadalffwefdden@gmail.com','$2b$08$o91FI9J2ZWfwuhNA50HyxOIZKYNCnHgfkOVL2M56pMdc2UcFFw5W2','client',153,NULL,NULL),(122,'wefweffdeee','ramisqweqwaadalwefweqdden@gmail.com','$2b$08$lLb.yNNJg1phg4oNNOjx5.Wp43PUdjUtmPMQ4NIdsQzw7u0ajjDbK','client',154,NULL,NULL),(123,'wefweffewefwe','ramisaadaldwefewden@gmail.com','$2b$08$1llhBpzZzDC5QQ79bJG13eXPkET2g26/ep3syLx8u4IAJT810fPWS','client',155,NULL,NULL),(124,'weqq2r32','ramisaadaffwefldden@gmail.com','$2b$08$6PcoXZ/e2GvyRuG1ZDkX0uBxp0l2Fj8lNK/fllxIbLse6OrvsyFv2','client',156,NULL,NULL),(126,'ffew111','ramisaadaldqweden@gmail.com','$2b$08$6GOOKwWlnx/ErJIRjazZe.MsOsLPq03auIQe0sNv9uKOLSByqFdR6','client',158,NULL,NULL),(127,'fwef','ramisaadwfffwealdden@gmail.com','$2b$08$GDJxhaArodQ5wGq2Rsncve2eMbC.kokbUjZ04oQ.9pMprAojMb7g.','client',159,NULL,NULL),(128,'rami94fewfwe','ramisaadawfefffeldden@gmail.com','$2b$08$Bg4agYMLpOLVYPpYIupaVOSnvVteOZj6b400JnBvYb6sAvlBqyQ1e','client',161,NULL,NULL),(152,'rami94ffwefw','ramisaadewqaldden@gmail.com','$2b$08$rXli8o/pbRU/OWmSoqDhA.W6di35z8rUvXtLJdio3wSknACzhPQU2','client',184,NULL,NULL),(153,'ramiwewe','ramisaadaqwdqwdldden@gmail.com','$2b$08$YhN.YAygGycSpgnYaBkbCOTnZmVuYAsASJiG2.TxZI.NvGo9ox3Wy','client',185,NULL,NULL),(154,'helooekkei33333','jjejfjiej3333@google.com','$2b$08$yFTEPrvGPhQUOre7eTNHEeb17c97A5RFenPPuUXYgYchzGnbbhRF6','client',186,NULL,NULL),(156,'frontend','rjoijio@gmail.com','$2b$08$y/.ldc9bHRvjmp/gN9Byge2dks9OGum11DupA7sL2fo2sCM/bP..y','client',188,NULL,NULL),(157,'RamiSaad','Rami@gmail.com','$2b$08$LsOM5zzBL8iUQ/hMrTClvOWAGAp4kluyc0O9rzdtPM6wNChO3HYCW','client',189,NULL,NULL),(158,'moSaro','maro@gmail.com','$2b$08$.Sz2UTRPxop124p1e032H./xu3zNkbGHbNJIsAGg8mMEMsvGj4Bn2','client',190,NULL,NULL),(159,'frontendeeq','frontendeeq@gmail.com','$2b$08$ZzvGuNkoauzg2pokG88IJeMXMPRYx5WhQtLKqOtONt/c05.15bRn.','client',191,NULL,NULL);
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

-- Dump completed on 2022-03-19 15:46:39
