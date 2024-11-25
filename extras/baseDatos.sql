-- Base de datos: `tickets`
CREATE DATABASE IF NOT EXISTS `tickets`;
-- DROP DATABASE `tickets`
USE `tickets`;


-- SELECT * FROM usuarios
CREATE TABLE IF NOT EXISTS  `usuarios` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `puestoUsuario` INT(11) NOT NULL,
  `nombreUsuario` VARCHAR(100) NOT NULL,
  `correoUsuario` VARCHAR(50) NOT NULL UNIQUE,
  `claveUsuario` VARCHAR(255) NOT NULL, -- Ajustado para almacenar contraseñas hasheadas
  `rolUsuario` ENUM('Usuario', 'Tecnico', 'Administrador') NOT NULL,
  PRIMARY KEY (`idUsuario`),
  FOREIGN KEY (`puestoUsuario`) REFERENCES `puestos`(`idPuesto`) ON DELETE CASCADE ON UPDATE CASCADE -- Agregada clave foránea
);

-- SELECT * FROM puestos
CREATE TABLE IF NOT EXISTS `puestos` (
  `idPuesto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombrePuesto` VARCHAR(50) NOT NULL,
  `prioridad` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idPuesto`)
);

-- SELECT * FROM tickets