-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: tap2tell
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_logger`
--

DROP TABLE IF EXISTS `access_logger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_logger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `success` tinyint NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_592498efcc7b3c679d433037b1d` (`userId`),
  CONSTRAINT `FK_592498efcc7b3c679d433037b1d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_logger`
--

LOCK TABLES `access_logger` WRITE;
/*!40000 ALTER TABLE `access_logger` DISABLE KEYS */;
INSERT INTO `access_logger` VALUES (11,'2021-07-15 10:52:47',1,'df3309fa-23d0-4ff6-9cd4-337dde40f9cd');
/*!40000 ALTER TABLE `access_logger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_permission`
--

DROP TABLE IF EXISTS `file_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(60) NOT NULL,
  `permission_type` enum('role','user') NOT NULL,
  `role_name` varchar(30) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `permission` enum('allow','deny') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_permission`
--

LOCK TABLES `file_permission` WRITE;
/*!40000 ALTER TABLE `file_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_archive`
--

DROP TABLE IF EXISTS `image_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_archive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `letter` enum('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v') NOT NULL,
  `image_id` varchar(255) DEFAULT NULL,
  `image_created` datetime NOT NULL,
  `image_updated` datetime NOT NULL,
  `response_audio_path` varchar(100) DEFAULT '0',
  `image_path` varchar(100) DEFAULT NULL,
  `relative_id` varchar(100) DEFAULT NULL,
  `image_status` enum('APPROVED','DISAPPROVED','PENDING') NOT NULL DEFAULT 'PENDING',
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_archive`
--

LOCK TABLES `image_archive` WRITE;
/*!40000 ALTER TABLE `image_archive` DISABLE KEYS */;
INSERT INTO `image_archive` VALUES (7,'2021-02-18 13:24:08.476428','a','5d158be2-e61b-430f-a2a7-50c30d08c5db','2021-02-18 12:36:50','2021-02-18 12:36:50','0','/image/SKxI6aH2cYxBphpA4Mo9ZBb5dO3U7gkG.jpg',NULL,'PENDING',''),(8,'2021-02-18 13:25:26.861028','a','3a8d8044-dfb5-41fa-86b4-e0119ed43b2a','2021-02-18 12:37:23','2021-02-18 12:37:23','0','/image/YRrlH1fgw4j9jLY4s13LbeeD8nyC8sWB.jpg',NULL,'PENDING',''),(9,'2021-07-04 15:14:52.042577','a','f5c42c0f-6a23-4224-b839-403ffe59d1a6','2021-07-04 15:09:08','2021-07-04 15:09:08','0','/image/r8phvPySJ3g5ytKvlkrIaa51VRlc3Hyz.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(10,'2021-07-04 16:43:05.286327','a','ce424a21-ef7d-4847-bb10-5f2ba93106d5','2021-07-04 15:23:01','2021-07-04 15:46:28','/audio/ys5HGixR3hRw7U6dlVWMJLM947ArIGJg.mp3','/image/2tmx51GLAwsamSXkdHkmFsxibU3FR26L.jpg','ea0286c3-83c2-47fd-8114-fa480bfccf8d','DISAPPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(11,'2021-07-04 16:44:19.832196','a','45491338-3636-4513-a45e-80cee584b91c','2021-07-04 15:19:35','2021-07-04 16:05:51','0','/image/Oo73yxj6EqsGEGb3IhMavLn65TLntwIZ.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(12,'2021-07-05 10:02:41.476751','a','06505f87-d04c-4771-896a-ab597c19f6cc','2021-07-04 16:43:26','2021-07-04 16:43:26','0','/image/UhvMMC1vy4AxyM3Q5FVSTwWLa1CpaVKc.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(13,'2021-07-05 11:45:36.875559','a','252e5ba2-65d5-483d-8f1f-937f7be609c6','2021-07-04 16:39:50','2021-07-04 16:42:45','/audio/08DiWvgDHaPjUyjNl1vXD1pApleSzElF.mp3','/image/vhCFoH9RN9WdJKb4TBqbXB3DMfGXw8kz.jpg','ea0286c3-83c2-47fd-8114-fa480bfccf8d','DISAPPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(14,'2021-07-05 11:47:15.386423','a','8b716acf-3752-4822-9761-6df490842c7a','2021-07-04 16:36:14','2021-07-04 16:36:14','0','/image/8CmpUqVG0aCOU3dvHzI4phRbSAVKzCCW.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(15,'2021-07-05 11:55:23.157963','a','b0d7760a-9300-4c44-aee2-b10117a19485','2021-07-04 17:55:43','2021-07-04 17:55:43','0','/image/tRCFeYOjsmDuQItH1uTfxwtJNm7rSOZN.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(16,'2021-07-05 11:55:32.565589','a','ba2416be-3f9f-42ec-89f6-94bf93694cf0','2021-07-04 17:56:32','2021-07-04 17:56:32','0','/image/rIe5BE4rxpWCPpvO9FDf6LUCXLtDbhjc.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(17,'2021-07-05 11:55:44.722794','a','fa3d9adb-5521-4864-9151-2788d2c5b88d','2021-07-04 15:20:52','2021-07-04 15:20:52','0','/image/kNi8lDr5qh6Bg425QeyEBv1qalhDGD1V.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(18,'2021-07-05 11:56:03.117103','a','ff314344-8e47-43b2-841e-c6d7931c289c','2021-07-05 11:36:54','2021-07-05 11:53:07','/audio/LBKgz4JOYr29hAkTF0fct2Ra61KwJ8tK.mp3','/image/tY9dwX55E9vmm21A4I6cQudUKtTduef2.jpg','4e31f5bc-20bf-46ae-9e5a-db2f82322516','APPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(19,'2021-07-05 11:56:30.711411','a','b13e7597-a607-4e49-91ed-eb1856250839','2021-07-05 11:48:37','2021-07-05 11:48:37','0','/image/9oTgd4X3rG2csoS8IjARyONnHTMxZFN7.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(20,'2021-07-05 11:56:37.183333','a','c219a00c-44f2-40b2-9e92-b0bd456e887f','2021-07-05 11:51:46','2021-07-05 11:51:46','0','/image/4YZCw13YcGFCEEOlt6kBDB9xo2ELd918.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(21,'2021-07-05 11:59:58.277100','a','8cc05217-b70e-43f2-bb7b-2f3a484ccc4d','2021-07-04 15:59:00','2021-07-05 11:56:24','0','/image/rU11Csnu14av0WS2u7PByRiTZXhW3tFW.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(22,'2021-07-05 12:00:13.766052','a','d5b43266-0c60-4c69-85a0-983343c8ce03','2021-07-04 17:33:07','2021-07-04 17:33:07','0','/image/kBOofqlh8GtIaO4ROFu65Py0myecLrH3.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(23,'2021-07-05 12:01:24.699549','a','15541c4e-6e2a-476b-9ec7-ca6f49151714','2021-07-05 11:34:50','2021-07-05 11:34:50','0','/image/too9qPP1fZkyatKlBhANS4kDX6MAZMHx.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(24,'2021-07-05 12:01:37.746119','a','b220472b-2460-424c-b274-dd69b225ffce','2021-07-04 15:35:27','2021-07-04 15:35:27','0','/image/lhCRAvTHqgckh8qdGVzAhI1Hn4x53g0b.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(25,'2021-07-05 12:02:16.228052','a','c83e8251-8b17-48cb-85f4-6af06ff2a2dc','2021-07-04 16:37:56','2021-07-04 16:37:56','0','/image/aBB4J5mDhVnHFeCwNvGwmT7GtnPJSqFn.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(26,'2021-07-05 12:02:20.924289','a','ac697c19-c9ba-46c1-96d1-6fc84cb6399b','2021-07-04 16:49:24','2021-07-04 16:49:24','0','/image/PaQ0VNOJ4jhFgjRfhXnmbgjp6WUQvXOX.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(27,'2021-07-05 12:02:25.523157','a','bb5e946b-e939-47dc-beed-8fcc32ecab33','2021-07-04 16:49:24','2021-07-04 16:49:24','0','/image/uik5LYfq9efk3EwsLlH76EHj7gHLWkQA.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(28,'2021-07-05 12:02:28.190157','a','17a202b7-d847-4875-bf9d-fabb4b43bf97','2021-07-04 16:39:02','2021-07-04 16:39:02','0','/image/b1ZwwnGLkclI3glI8TOzX5lCvE2C3FVj.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(29,'2021-07-05 12:02:30.212643','a','af5d491d-44b5-43ff-aa3d-37f13e2dfbba','2021-07-05 11:46:16','2021-07-05 11:46:16','0','/image/jiom02z9JQ9mKpRC518tSX1lr7xJ9N2D.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(30,'2021-07-05 12:02:35.881443','a','7f5e8487-bfa4-448b-bbcf-85e5d9eb87f2','2021-07-05 11:58:39','2021-07-05 11:58:39','0','/image/c8MdhgDPeE383IVO7QQKfX3CEDAMvZRO.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(31,'2021-07-05 12:02:45.029606','a','74f9f2e3-779c-46e7-8f22-89d31410cdc8','2021-07-05 11:59:20','2021-07-05 11:59:20','0','/image/Z1zsg0HQ4gKQsFnKGh4IHM5gikPUXrk6.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(32,'2021-07-05 12:03:00.705467','a','d338e144-771d-4923-b02f-55676977a335','2021-07-04 15:26:49','2021-07-05 11:59:45','0','/image/vMGEeSDmSxFciP6xImkeV5TjbOk7jGBs.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(33,'2021-07-05 12:13:45.506969','a','79b5d9a8-d987-4832-9cee-4e49b15184a9','2021-07-05 12:04:25','2021-07-05 12:09:29','0','/image/sDGy6TRmYoHgX3qa8KgGf0r1StXWHZxF.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd'),(34,'2021-07-05 12:22:31.642988','a','016a90a2-fee1-457a-922d-f3c7143815ad','2021-07-05 12:06:51','2021-07-05 12:09:58','0','/image/Qfjbe0XmthFv4DSndDuAvZpio20l7Gbe.jpg',NULL,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd');
/*!40000 ALTER TABLE `image_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter_image`
--

DROP TABLE IF EXISTS `letter_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter_image` (
  `id` varchar(36) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `letter` enum('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v') NOT NULL,
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `response_audio_path` varchar(100) DEFAULT '0',
  `image_path` varchar(100) DEFAULT NULL,
  `relative_id` varchar(100) DEFAULT NULL,
  `is_new_response` tinyint NOT NULL DEFAULT '0',
  `image_status` enum('APPROVED','DISAPPROVED','PENDING') NOT NULL DEFAULT 'PENDING',
  `user_id` varchar(255) DEFAULT NULL,
  `remind` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter_image`
--

LOCK TABLES `letter_image` WRITE;
/*!40000 ALTER TABLE `letter_image` DISABLE KEYS */;
INSERT INTO `letter_image` VALUES ('08664422-61a3-41b8-9a0e-3e3da32bf93f','2021-03-25 15:08:09.206676','b','2021-05-30 15:41:48.000000','0','/image/F6B2WjNlVLq8fjOjaQqAlXn10MfgQM9Y.jpg',NULL,0,'PENDING','7955de65-2151-4e25-94d6-573a7fd077b5',1),('21ab8360-cd77-4866-bc66-7fe02c0ba15d','2021-03-25 15:10:41.221077','b','2021-05-30 15:41:48.000000','0','/image/NxhqrTxt0pHzmpJQJ2O7JU1zLxeYCHgd.jpg',NULL,0,'PENDING','7955de65-2151-4e25-94d6-573a7fd077b5',1),('2d7570e0-f71d-4e18-b584-52ef9b4355ba','2021-03-25 15:09:51.146441','b','2021-05-30 15:41:48.000000','0','/image/WuRLrWjiQKAW8pZKJCUoZBcS2MlOjGyA.jpg',NULL,0,'PENDING','7955de65-2151-4e25-94d6-573a7fd077b5',1),('3f16acfb-251b-4423-b71a-ae1b115861fe','2021-03-25 12:42:57.873260','v','2021-05-30 15:41:48.000000','0','/image/JlGckF6zPwL0J6m8ovO0wj0SLgA3uoZP.jpg',NULL,0,'PENDING','7955de65-2151-4e25-94d6-573a7fd077b5',1),('52ebddfd-cd9b-4a95-b527-06353d59017d','2021-07-05 17:20:19.589690','f','2021-07-05 17:20:19.589690','0','/image/u7pBxAQSl6H0pjAdq3C34x0mqvvDOAaF.jpg',NULL,0,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1),('556e285d-d7ff-404e-8bb2-797ab15c7f7c','2021-07-05 17:25:21.008324','b','2021-07-05 17:25:21.008324','0','/image/SfGfAVidvA9dQjoV1iXAEYMI8HsvSlT7.jpg',NULL,0,'PENDING','df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1),('5c5154d5-4ea4-4227-9659-029af88af98b','2021-07-05 17:24:50.965704','c','2021-07-05 17:30:34.000000','/audio/LbX9j5UnZ7keMhnPg8De11TvC2ltyt2t.mp3','/image/GyzgemjAtKxGhbo6UdcBt23cOf6rmvqx.jpg','0d4b06fc-3758-4274-b2d5-7db9607ebc27',0,'APPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1),('67470533-28fe-4d52-83b8-96ab9dc15363','2021-07-05 12:05:17.509909','a','2021-05-30 15:41:48.000000','/audio/gxTZeeLdF0WCN7koBZ0NuLtGeNVThSof.mp3','/image/axkHV0CmOD6gJ1Dy7zeoPizl2GAPsQwH.jpg','4e31f5bc-20bf-46ae-9e5a-db2f82322516',0,'APPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1),('77267d71-5de5-4f8c-9aa2-f90713cad482','2021-03-25 15:45:23.769030','a','2021-05-30 15:41:48.000000','0','/image/GmCmhcnLubuEKBsnddGPq2nX5t5zCc4x.jpg',NULL,0,'PENDING','7955de65-2151-4e25-94d6-573a7fd077b5',1),('795f5856-bca0-45d6-91ba-91504b77f864','2021-07-05 17:31:01.030439','c','2021-07-05 17:31:53.000000','/audio/N7mCfLKln1t4PWOs1iDy0FHH6jKPMITd.mp3','/image/kVfJkfPWFqgoHhpr50smxroJDSyyXCSB.jpg','dc718f05-b30a-4e77-a8d2-86c3d44779c3',0,'APPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1),('7b16d17b-c0f9-4e6f-bc72-a1a53ceae85b','2021-07-05 17:28:04.222758','c','2021-07-05 17:30:49.000000','/audio/toNEvRcDscxGdlqVjenfQr1uhQJDVA8s.mp3','/image/R31uI6joYIdULMazsrtKqVVTh57glEIA.jpg','dc718f05-b30a-4e77-a8d2-86c3d44779c3',0,'APPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1),('8cd872a5-ba55-449b-a44f-131018dfd76a','2021-03-25 14:45:17.394785','a','2021-05-30 15:41:48.000000','0','/image/73X6Sg3Uco84A3bveIZRxQ4UfpiKrhzj.jpg',NULL,0,'PENDING','7955de65-2151-4e25-94d6-573a7fd077b5',1),('9eeef85c-9e9b-471a-a9a3-d5c7f42223a5','2021-07-05 15:57:42.683725','b','2021-07-05 17:24:36.000000','/audio/6JAR0CZBmm9RMyuMoRUwPU9EwrXUc3Fs.mp3','/image/V0G9RIa8srOcDokvvT0AM4u6qHLP2YFj.jpg','0d4b06fc-3758-4274-b2d5-7db9607ebc27',0,'APPROVED','df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1),('a423bdc4-bba4-4337-b8b2-9ef51a190d9b','2021-03-25 12:40:25.576180','a','2021-05-30 15:41:48.000000','0','/image/px3qmzFc6pejpswD2afiYTt3Uk74DVd1.jpg',NULL,0,'PENDING','7955de65-2151-4e25-94d6-573a7fd077b5',1),('a498998d-f07a-4de9-86cd-7dac017a9f58','2021-05-06 10:34:58.968386','a','2021-05-30 15:41:48.000000','/audio/KRBWoFop7JdNATMVugyE1MFWXmHumQZl.mp3','/image/4NZm9HI8W4pBNv8C1ELIEGMlprErBezZ.jpg','88e03481-6844-46c3-8e71-feeac6c2d437',1,'APPROVED','7955de65-2151-4e25-94d6-573a7fd077b5',1),('cc757c55-5d82-44bb-8b79-529bf8110c79','2021-03-25 14:50:00.429245','c','2021-05-30 15:41:48.000000','/audio/HdugJ2rcP9xYcoai7gJ2LhIVC8MKySwo.mp3','/image/FL5gIbKwMB0Lm0a17dtpMHH5zzh2YlzB.jpg','1bbb258f-2c23-4a4a-8f4d-a2b2152cc527',1,'APPROVED','7955de65-2151-4e25-94d6-573a7fd077b5',1);
/*!40000 ALTER TABLE `letter_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relative`
--

DROP TABLE IF EXISTS `relative`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relative` (
  `id` varchar(36) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `relative_image_path` varchar(100) DEFAULT NULL,
  `relative_name` varchar(40) NOT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relative`
--

LOCK TABLES `relative` WRITE;
/*!40000 ALTER TABLE `relative` DISABLE KEYS */;
INSERT INTO `relative` VALUES ('0d4b06fc-3758-4274-b2d5-7db9607ebc27','2021-07-05 17:24:04.152593','/image/8nFxRcC4h2O7T4aTKkNSPMR0z9GtUovn.png','שני',NULL,''),('1bbb258f-2c23-4a4a-8f4d-a2b2152cc527','2021-06-30 15:41:47.991290','/image/JV7kNGFILXDmzXCLJ6SIadxMXsiHPl4E.png','SHANI TESTTTTT',NULL,''),('4e31f5bc-20bf-46ae-9e5a-db2f82322516','2021-07-05 11:53:07.277056','/image/2TrUobQtHVuwWQ1oG5FJCKOPes1tlFw2.png','HEYYYYYYY',NULL,''),('88e03481-6844-46c3-8e71-feeac6c2d437','2021-06-30 17:13:29.846788','/image/P1LiHbOBLbAgBXMlkbWkxf73xJv4YxTG.png','fdsfds',NULL,''),('dc718f05-b30a-4e77-a8d2-86c3d44779c3','2021-07-05 17:30:09.795389','/image/O7DIShcqQNb3FhSO4wWn57jG8ZPkzS1G.png','שני',NULL,''),('ea0286c3-83c2-47fd-8114-fa480bfccf8d','2021-07-04 15:46:28.823234','/image/Dx4R2ekNcyUGFX0GPHCLHyexKw7LScnu.png','aaaaa',NULL,'');
/*!40000 ALTER TABLE `relative` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `roleKey` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'CHILD','child user','CHILD');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `two_factor`
--

DROP TABLE IF EXISTS `two_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `two_factor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `attempt` tinyint unsigned NOT NULL DEFAULT '0',
  `code_created_date` timestamp(6) NULL DEFAULT NULL,
  `user_blocked_date` timestamp(6) NULL DEFAULT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_162c7f53b41b84102a8e06eff1` (`user_id`),
  CONSTRAINT `FK_162c7f53b41b84102a8e06eff18` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `two_factor`
--

LOCK TABLES `two_factor` WRITE;
/*!40000 ALTER TABLE `two_factor` DISABLE KEYS */;
/*!40000 ALTER TABLE `two_factor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `type` varchar(255) NOT NULL,
  `emailVerified` tinyint DEFAULT '0',
  `fullName` varchar(255) DEFAULT NULL,
  `verificationToken` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  KEY `IDX_31ef2b4d30675d0c15056b7f6e` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('df3309fa-23d0-4ff6-9cd4-337dde40f9cd','shani@nadalia.com','$2b$10$LT/9peK8jUM/1801jWutYO/o.cES30oE0faj1nEIC91gfyPO8oQbu','2021-07-04 12:48:49.820393','2021-07-15 10:51:52.000000','Child',1,'Ghg',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_password`
--

DROP TABLE IF EXISTS `user_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3e755bee2cdcee50a9e742776d8` (`userId`),
  CONSTRAINT `FK_3e755bee2cdcee50a9e742776d8` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_password`
--

LOCK TABLES `user_password` WRITE;
/*!40000 ALTER TABLE `user_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(36) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_d0e5815877f7395a198a4cb0a4` (`user_id`),
  KEY `IDX_32a6fc2fcb019d8e3a8ace0f55` (`role_id`),
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('df3309fa-23d0-4ff6-9cd4-337dde40f9cd',1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-13 19:17:44
