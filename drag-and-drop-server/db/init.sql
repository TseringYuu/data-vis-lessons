CREATE DATABASE IF NOT EXISTS `drag_and_drop_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `drag_and_drop_db`;

CREATE TABLE IF NOT EXISTS `dashboard` (
    `id` INT UNSIGNED AUTO_INCREMENT,
    `config` LONGTEXT not null,
    PRIMARY KEY (`id`)
);
