SET FOREIGN_KEY_CHECKS=0;
-- CreateTable
CREATE TABLE `account_users` (
    `id` VARCHAR(72) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `account_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_facts` (
    `id` VARCHAR(72) NOT NULL,
    `name` VARCHAR(255) NOT NULL DEFAULT 'Kus Koláče',
    `streetAddress` VARCHAR(255) NOT NULL DEFAULT 'Korunní 90',
    `cityZip` VARCHAR(255) NOT NULL DEFAULT '101 00 Vinohrady, Praha 2',
    `phone` VARCHAR(50) NOT NULL DEFAULT '608 903 828',
    `email` VARCHAR(255) NOT NULL DEFAULT 'info@kuskolace.cz',
    `priceRangeCzk` VARCHAR(50) NOT NULL DEFAULT '100–200 Kč',
    `ratingScore` DECIMAL(3, 1) NOT NULL DEFAULT 4.7,
    `reviewsCount` INTEGER NOT NULL DEFAULT 1265,
    `takeawayAvailable` BOOLEAN NOT NULL DEFAULT true,
    `deliveryAvailable` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opening_hours` (
    `id` VARCHAR(72) NOT NULL,
    `dayKey` ENUM('PO', 'UT', 'ST', 'CT', 'PA', 'SO', 'NE') NOT NULL,
    `dayName` VARCHAR(50) NOT NULL,
    `isOpen` BOOLEAN NOT NULL DEFAULT true,
    `openTime` VARCHAR(10) NOT NULL,
    `closeTime` VARCHAR(10) NOT NULL,
    `note` VARCHAR(255) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `opening_hours_dayKey_key`(`dayKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_configs` (
    `id` VARCHAR(72) NOT NULL,
    `welcomeHeading` VARCHAR(255) NOT NULL,
    `welcomePreamble` TEXT NOT NULL,
    `storyTitle` VARCHAR(255) NOT NULL,
    `storyBody` TEXT NOT NULL,
    `isStoryVisible` BOOLEAN NOT NULL DEFAULT true,
    `isShowcaseVisible` BOOLEAN NOT NULL DEFAULT true,
    `isInstagramVisible` BOOLEAN NOT NULL DEFAULT true,
    `isContactVisible` BOOLEAN NOT NULL DEFAULT true,
    `isWebPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instagram_configs` (
    `id` VARCHAR(72) NOT NULL,
    `accountHandle` VARCHAR(100) NOT NULL DEFAULT '@kuskolace',
    `syncStatus` ENUM('AUTORIZOVANO', 'NEPROPOJENO', 'NAHLEDOVY_REZIM') NOT NULL DEFAULT 'NEPROPOJENO',
    `autoSync` BOOLEAN NOT NULL DEFAULT false,
    `feedMode` ENUM('API', 'FALLBACK') NOT NULL DEFAULT 'FALLBACK',
    `lastSyncAt` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pastry_items` (
    `id` VARCHAR(72) NOT NULL,
    `itemCode` VARCHAR(50) NULL,
    `name` VARCHAR(255) NOT NULL,
    `category` ENUM('OVOCNE_KOLACE', 'KYNUTE_BUCHTY_A_LOUPAKY', 'SLANE_PECIVO') NOT NULL,
    `priceCzk` INTEGER NOT NULL,
    `shortDescription` VARCHAR(500) NOT NULL,
    `fullDescription` TEXT NULL,
    `ingredients` JSON NOT NULL,
    `allergens` JSON NOT NULL,
    `photoKey` VARCHAR(700) NOT NULL,
    `isTodaySpecial` BOOLEAN NOT NULL DEFAULT false,
    `isSoldOut` BOOLEAN NOT NULL DEFAULT false,
    `freshnessLabel` VARCHAR(100) NOT NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instagram_posts` (
    `id` VARCHAR(72) NOT NULL,
    `caption` TEXT NOT NULL,
    `photoKey` VARCHAR(700) NOT NULL,
    `postUrl` VARCHAR(500) NOT NULL,
    `publishedLabel` VARCHAR(100) NOT NULL,
    `likesCount` INTEGER NOT NULL DEFAULT 0,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isFromApi` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SET FOREIGN_KEY_CHECKS=1;