-- CreateTable
CREATE TABLE `TBL_USUARIO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeDocument` VARCHAR(5) NOT NULL,
    `document` VARCHAR(30) NOT NULL,
    `fullName` VARCHAR(500) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(70) NOT NULL,
    `role` ENUM('USER', 'SUPER_USER', 'ADMIN') NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createUserAt` VARCHAR(191) NULL,
    `createDateAt` DATETIME(3) NULL,
    `updateUserAt` VARCHAR(191) NULL,
    `updateDateAt` DATETIME(3) NULL,

    UNIQUE INDEX `TBL_USUARIO_document_key`(`document`),
    UNIQUE INDEX `TBL_USUARIO_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
