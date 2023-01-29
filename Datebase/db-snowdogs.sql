-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2023 at 08:33 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-snowdogs`
--
CREATE DATABASE IF NOT EXISTS `db-snowdogs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db-snowdogs`;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `ContactId` int(11) NOT NULL,
  `Text` varchar(1200) NOT NULL,
  `DepartureDate` date NOT NULL,
  `ArrivalDate` date NOT NULL,
  `ResortId` int(11) NOT NULL,
  `PhoneNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`ContactId`, `Text`, `DepartureDate`, `ArrivalDate`, `ResortId`, `PhoneNumber`) VALUES
(1, 'ראיתי שנפתח קורס בחרמון.. מתי ? כמה עולה? מלאמלא שאלות....', '2022-12-07', '2022-12-30', 0, '0899999999'),
(5, 'מחר!!! תטיס אותי מחרר!!!}', '2022-12-08', '2022-12-09', 1, '0500000000'),
(21, 'אני מחפשת טיסה לבנסקו', '2023-01-29', '2023-02-05', 1, '0521231232');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationId`, `userId`) VALUES
(143, 58),
(138, 58),
(145, 9),
(146, 9),
(139, 9);

-- --------------------------------------------------------

--
-- Table structure for table `resorts`
--

CREATE TABLE `resorts` (
  `ResortId` int(11) NOT NULL,
  `ResortName` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resorts`
--

INSERT INTO `resorts` (`ResortId`, `ResortName`) VALUES
(1, 'Snow'),
(2, 'Cruize'),
(3, 'Surf'),
(4, 'Culture');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `FirstName` varchar(14) NOT NULL,
  `LastName` varchar(14) NOT NULL,
  `Username` varchar(14) NOT NULL,
  `Password` varchar(120) NOT NULL,
  `Role` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `FirstName`, `LastName`, `Username`, `Password`, `Role`) VALUES
(4, 'raz', 'deshen', 'razi', 'df62d1cc429365fb75bbd9f8a2d7d9d3be8f9d3c06243da96e39c46b8af502f234ab0a1c7b8b18c30391013c7cf8db32ea142981e5ab5f555f941e9e', 'Admin'),
(9, 'Adi', 'Ifrah', 'Adi2', 'c022f4d314facf94ca050583dc3a01ae726c5af1110ca4c576b3f0349ee44e415734b833e00c7bfe13233905f6a38e400a1453bf7428199a098ab8bb', 'User'),
(47, 'moshe', 'ofnik', 'ofnik', 'c022f4d314facf94ca050583dc3a01ae726c5af1110ca4c576b3f0349ee44e415734b833e00c7bfe13233905f6a38e400a1453bf7428199a098ab8bb', 'User'),
(52, 'moshe', 'saas', 'saas', 'c022f4d314facf94ca050583dc3a01ae726c5af1110ca4c576b3f0349ee44e415734b833e00c7bfe13233905f6a38e400a1453bf7428199a098ab8bb', 'User'),
(57, 'Tzipi', 'Shavit', 'Zipi', 'c022f4d314facf94ca050583dc3a01ae726c5af1110ca4c576b3f0349ee44e415734b833e00c7bfe13233905f6a38e400a1453bf7428199a098ab8bb', 'User'),
(58, 'inon', 'peer', 'inon123', '70cd505fe623424a4acb420a2b269aae7e33733a4fec3ab91be5864cc7dc1a72feedbe27d1b6bb1b20a43efe269b2aaa26a3b15207451d22d8a88648', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `ResortId` int(11) NOT NULL,
  `DepartureDate` date NOT NULL,
  `ArrivalDate` date NOT NULL,
  `Price` int(11) NOT NULL,
  `ImageName` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `Description`, `ResortId`, `DepartureDate`, `ArrivalDate`, `Price`, `ImageName`) VALUES
(138, 'Bansko', 1, '2023-02-05', '2023-02-09', 4300, 'f9627ac3-7844-4a92-b8a6-e61fb05904f6.jpg'),
(139, 'Val thorens', 1, '2023-03-01', '2023-03-07', 5400, '3b976abc-6c87-4dba-b246-f8604f30b3a6.jpg'),
(140, 'SnowDogs cruize - Greece', 2, '2023-02-05', '2023-02-10', 2899, '83eccf7d-3eb5-4f69-a416-f2f7197df735.jpg'),
(141, 'SnowDogs cruize - Cyprus', 2, '2023-02-18', '2023-02-22', 6200, '9f6ba5b6-3b4c-4a21-ada5-305e742e6ecf.jpg'),
(143, 'SnowDogs Surf - Brazil', 3, '2023-02-12', '2023-02-23', 8700, 'ce13cf7d-f36a-4001-a148-9abdc28231e3.jpg'),
(144, 'SnowDogs Surf - Sydney', 3, '2023-02-06', '2023-02-11', 7100, '4b701d35-4aba-4116-b6c1-ad2c4b303848.jpg'),
(145, 'SnowDogs Surf - Malibu', 3, '2023-03-05', '2023-03-11', 5600, '3680f7fe-2f7e-4853-a189-09cfd2bf91d7.jpg'),
(146, 'London', 4, '2023-03-09', '2023-03-14', 3700, '47e63363-1cbe-438c-9365-3995de1578eb.jpg'),
(147, 'France', 4, '2023-03-05', '2023-03-11', 5600, '1d0c6b65-afdb-4ae4-89ec-7f7a5e5a62ff.jpg'),
(148, 'La Plagne', 1, '2023-03-05', '2023-03-11', 6300, '63df0dc3-af28-4c50-9257-accb5d35f793.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`ContactId`),
  ADD KEY `ResortId` (`ResortId`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `resorts`
--
ALTER TABLE `resorts`
  ADD PRIMARY KEY (`ResortId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`),
  ADD KEY `ResortId` (`ResortId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `ContactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `resorts`
--
ALTER TABLE `resorts`
  MODIFY `ResortId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints for table `vacations`
--
ALTER TABLE `vacations`
  ADD CONSTRAINT `vacations_ibfk_1` FOREIGN KEY (`ResortId`) REFERENCES `resorts` (`ResortId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
