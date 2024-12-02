-- Base de datos: `tickets`
CREATE DATABASE IF NOT EXISTS `tickets`;
-- DROP DATABASE `tickets`
USE `tickets`;
SHOW TABLES;

-- SELECT * FROM puestos
-- DROP TABLE `puestos`
-- SELECT * FROM usuarios
-- DROP TABLE `usuarios`
-- SELECT * FROM tickets
-- DROP TABLE `tickets`
-- SELECT * FROM citas
-- DROP TABLE citas
-- SELECT * FROM tecnicos_citas
-- DROP TABLE tecnicos_citas


CREATE TABLE IF NOT EXISTS `puestos` (
  `idPuesto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombrePuesto` VARCHAR(50) NOT NULL,
  `prioridad` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idPuesto`)
);

CREATE TABLE IF NOT EXISTS  `usuarios` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `puestoUsuario` INT(11) NOT NULL,
  `nombreUsuario` VARCHAR(100) NOT NULL,
  `apellidoUsuario` VARCHAR(100) NOT NULL,
  `correoUsuario` VARCHAR(50) NOT NULL UNIQUE,
  `claveUsuario` VARCHAR(25) NOT NULL,
  `departamentoUsuario` VARCHAR(255),
  `plantaUsuario` VARCHAR(255),
  `rolUsuario` ENUM('Usuario', 'Tecnico', 'Administrador', 'Secretario') NOT NULL,
  PRIMARY KEY (`idUsuario`),
  FOREIGN KEY (`puestoUsuario`) REFERENCES `puestos`(`idPuesto`) ON DELETE CASCADE ON UPDATE CASCADE -- Agregada clave foránea
);

CREATE TABLE IF NOT EXISTS `tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `statusTicket` enum("En Proceso", "Completado", "Pendiente", "No Completado"),
  `tituloTicket` varchar(255) NOT NULL,
  `descripcionTicket` varchar(255),
  `fechaSolicitadoTicket` datetime NOT NULL,
  `fechaFinalizadoTicket` date DEFAULT NULL,
  `prioridadTicket` char(1) NOT NULL,
  PRIMARY KEY (`idTicket`),
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `citas` (
  `idCita` int(11) NOT NULL AUTO_INCREMENT,
  `idTicket` int(11) NOT NULL,
  `fechaInicioCita` datetime NOT NULL,
  `fechaFinCita` datetime,
  PRIMARY KEY (`idCita`),
FOREIGN KEY (`idTicket`) REFERENCES `tickets`(`idTicket`) ON DELETE CASCADE ON UPDATE CASCADE
); 

CREATE TABLE IF NOT EXISTS `tecnicos_citas` (
  `idUsuario` INT(11) NOT NULL,
  `idCita` INT(11) NOT NULL,
  PRIMARY KEY (idUsuario, idCita),
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idCita) REFERENCES citas(idCita) ON DELETE CASCADE ON UPDATE CASCADE
);

