-- CreateTable
CREATE TABLE `Wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `balance` DOUBLE NOT NULL DEFAULT 0,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    `currency` ENUM('USD', 'EUR', 'KRW', 'JPY') NOT NULL DEFAULT 'KRW',
    `password` VARCHAR(191) NOT NULL,
    `isLocked` BOOLEAN NOT NULL DEFAULT false,
    `lockReason` VARCHAR(191) NULL,
    `lastAccessedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Wallet_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `walletId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `type` ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER') NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `referenceId` VARCHAR(191) NULL,
    `fee` DOUBLE NULL DEFAULT 0,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NULL,
    `ipAddress` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
