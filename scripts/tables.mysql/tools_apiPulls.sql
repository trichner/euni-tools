CREATE DATABASE  IF NOT EXISTS `tools` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tools`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: tools
-- ------------------------------------------------------
-- Server version	5.1.73-0ubuntu0.10.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apiPulls`
--

DROP TABLE IF EXISTS `apiPulls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apiPulls` (
  `pullID` int(11) NOT NULL AUTO_INCREMENT,
  `pulledBy` int(11) NOT NULL,
  `characterID` int(11) NOT NULL,
  `pullDate` datetime NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DoB` datetime NOT NULL,
  `race` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gender` varchar(1) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `corpName` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `corpID` int(11) NOT NULL,
  `allianceName` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `allianceID` int(11) NOT NULL,
  `cloneName` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `cloneSP` int(11) NOT NULL,
  `balance` bigint(20) NOT NULL,
  `memoryImplant` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `memoryBonus` tinyint(1) DEFAULT NULL,
  `willpowerImplant` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `willpowerBonus` tinyint(1) DEFAULT NULL,
  `charismaImplant` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `charismaBonus` tinyint(1) DEFAULT NULL,
  `perceptionImplant` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `perceptionBonus` tinyint(1) DEFAULT NULL,
  `intelligenceImplant` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `intelligenceBonus` tinyint(1) DEFAULT NULL,
  `intelligence` tinyint(2) NOT NULL,
  `memory` tinyint(2) NOT NULL,
  `charisma` tinyint(2) NOT NULL,
  `perception` tinyint(2) NOT NULL,
  `willpower` tinyint(2) NOT NULL,
  `totalSP` int(11) NOT NULL,
  PRIMARY KEY (`pullID`),
  UNIQUE KEY `characterID` (`characterID`,`pullDate`)
) ENGINE=InnoDB AUTO_INCREMENT=110799 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-07-25 20:21:33
