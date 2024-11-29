-- Base de datos: `tickets`
CREATE DATABASE IF NOT EXISTS `tickets`;
-- DROP DATABASE `tickets`
USE `tickets`;
SHOW TABLES;

-- SELECT * FROM puestos
-- DROP TABLE `puestos`
CREATE TABLE IF NOT EXISTS `puestos` (
  `idPuesto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombrePuesto` VARCHAR(50) NOT NULL,
  `prioridad` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idPuesto`)
);


-- SELECT * FROM usuarios
-- DROP TABLE `usuarios`
CREATE TABLE IF NOT EXISTS  `usuarios` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `puestoUsuario` INT(11) NOT NULL,
  `nombreUsuario` VARCHAR(100) NOT NULL,
  `apellidoUsuario` VARCHAR(100) NOT NULL,
  `correoUsuario` VARCHAR(50) NOT NULL UNIQUE,
  `claveUsuario` VARCHAR(255) NOT NULL, -- Ajustado para almacenar contraseñas hasheadas
  `rolUsuario` ENUM('Usuario', 'Tecnico', 'Administrador') NOT NULL,
  PRIMARY KEY (`idUsuario`),
  FOREIGN KEY (`puestoUsuario`) REFERENCES `puestos`(`idPuesto`) ON DELETE CASCADE ON UPDATE CASCADE -- Agregada clave foránea
);

-- SELECT * FROM tickets
-- DROP TABLE `tickets`
CREATE TABLE `tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `statusTicket` enum("En Proceso", "Completado", "Pendiente"),
  `tituloTicket` varchar(255) NOT NULL,
  `descripcionTicket` varchar(255),
  `fechaSolicitadoTicket` datetime NOT NULL,
  `fechaFinalizadoTicket` date DEFAULT NULL,
  `prioridadTicket` char(1) NOT NULL,
  PRIMARY KEY (`idTicket`),
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- SELECT * FROM citas
-- DROP TABLE
CREATE TABLE `citas` (
  `idCita` int(11) NOT NULL,
  `idTicket` int(11) NOT NULL,
  `fechaInicioCita` datetime NOT NULL,
  `fechaFinCita` datetime NOT NULL,
  PRIMARY KEY (`idCita`)
); 

-- SELECT * FROM tecnicos_citas
-- DROP TABLE tecnicos_citas
CREATE TABLE tecnicos_citas (
  idUsuario INT(11) NOT NULL,
  idCita INT(11) NOT NULL,
  PRIMARY KEY (idUsuario, idCita),
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idCita) REFERENCES citas(idCita) ON DELETE CASCADE ON UPDATE CASCADE
);

