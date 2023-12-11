-- Sistema de reclamos UCM --

------------- CREAR TABLA SEDE ------------------------------
CREATE TABLE ALLNRS_SEDE(
    ID_SEDE INT,
    NOMBRE_SEDE VARCHAR(100),
    CONSTRAINT PK_ALLNRS_SEDE PRIMARY KEY (ID_SEDE)
);

INSERT INTO ALLNRS_SEDE(ID_SEDE,NOMBRE_SEDE)
	VALUES(1,'TALCA');
INSERT INTO ALLNRS_SEDE(ID_SEDE,NOMBRE_SEDE)
	VALUES(2,'CURICO');

DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_SEDE
BEFORE INSERT ON ALLNRS_SEDE
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_SEDE = (SELECT MAX(ID_SEDE) + 1 FROM ALLNRS_SEDE);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_SEDE = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_SEDE, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_SEDE, 2)));
END;
//
DELIMITER ;


-- CREAR TABLA FACULTAD	 
CREATE TABLE ALLNRS_FACULTAD(
    ID_FACULTAD INT,
    NOMBRE_FACULTAD VARCHAR(100),
    ID_SEDE INT,
    CONSTRAINT PK_ALLNRS_FACULTAD PRIMARY KEY (ID_FACULTAD),
    CONSTRAINT FK_ALLNRS_FACULTAD_SEDE FOREIGN KEY (ID_SEDE) REFERENCES ALLNRS_SEDE(ID_SEDE)
);

INSERT INTO ALLNRS_FACULTAD(ID_FACULTAD,NOMBRE_FACULTAD,ID_SEDE)
	VALUES(1,'INGENIERIA',1);
INSERT INTO ALLNRS_FACULTAD(ID_FACULTAD,NOMBRE_FACULTAD,ID_SEDE)
	VALUES(2,'SALUD',1);

DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_FACULTAD
BEFORE INSERT ON ALLNRS_FACULTAD
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_FACULTAD = (SELECT MAX(ID_FACULTAD) + 1 FROM ALLNRS_FACULTAD);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_FACULTAD = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_FACULTAD, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_FACULTAD, 2)));
END;
//
DELIMITER ;




-- CREAR TABLA CARRERA 
CREATE TABLE ALLNRS_CARRERA(
    ID_CARRERA INT,
    NOMBRE_CARRERA VARCHAR(100),
    ID_FACULTAD INT,
    CONSTRAINT PK_ALLNRS_CARRERA PRIMARY KEY (ID_CARRERA),
    CONSTRAINT FK_ALLNRS_CARRERA_FACULTAD FOREIGN KEY (ID_FACULTAD) REFERENCES ALLNRS_FACULTAD(ID_FACULTAD)  
);

INSERT INTO ALLNRS_CARRERA(ID_CARRERA,NOMBRE_CARRERA,ID_FACULTAD)
	VALUES(1,'INGENIERIA CIVIL INFORMATICA',1);
INSERT INTO ALLNRS_CARRERA(ID_CARRERA,NOMBRE_CARRERA,ID_FACULTAD)
	VALUES(2,'INGENIERIA EN CONSTRUCCION',1);
DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_CARRERA
BEFORE INSERT ON ALLNRS_CARRERA
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_CARRERA = (SELECT MAX(ID_CARRERA) + 1 FROM ALLNRS_CARRERA);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_CARRERA = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_CARRERA, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_CARRERA, 2)));
END;
//
DELIMITER ;




-- CREAR TABLA TIPO_USUARIO 

CREATE TABLE ALLNRS_TIPO_USUARIO(
    ID_TIPO_USUARIO INT,
    NOMBRE_USUARIO VARCHAR(30),
    CONSTRAINT PK_ALLNRS_TIPO_USUARIO PRIMARY KEY (ID_TIPO_USUARIO)
);

INSERT INTO ALLNRS_TIPO_USUARIO(ID_TIPO_USUARIO,NOMBRE_USUARIO)	
	VALUES(1,'ESTUDIANTE');
INSERT INTO ALLNRS_TIPO_USUARIO(ID_TIPO_USUARIO,NOMBRE_USUARIO)
	VALUES(2,'SECRETARIA');
INSERT INTO ALLNRS_TIPO_USUARIO(ID_TIPO_USUARIO,NOMBRE_USUARIO)
	VALUES(3,'JEFE DE CARRERA');
INSERT INTO ALLNRS_TIPO_USUARIO(ID_TIPO_USUARIO,NOMBRE_USUARIO)
	VALUES(5,'ADMINISTRADOR');

DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_TIPO_USUARIO
BEFORE INSERT ON ALLNRS_TIPO_USUARIO
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_TIPO_USUARIO = (SELECT MAX(ID_TIPO_USUARIO) + 1 FROM ALLNRS_TIPO_USUARIO);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_USUARIO = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_USUARIO, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_USUARIO, 2)));
END;
//
DELIMITER ;




--  CREAR TABLA USUARIO ------------------------------

CREATE TABLE ALLNRS_USUARIO(
    ID_USUARIO INT,
    NOMBRE_USUARIO VARCHAR(30),
    APELLIDO_USUARIO VARCHAR(30),
    CORREO_USUARIO VARCHAR(100),
    CONTRASENA_USUARIO VARCHAR(200),
    GENERACION_USUARIO INT,
    ID_CARRERA INT,
    ID_TIPO_USUARIO INT,
    FECHA_CREACION_USUARIO DATE,
    CONSTRAINT PK_ALLNRS_USUARIO PRIMARY KEY (ID_USUARIO),
    CONSTRAINT FK_ALLNRS_USUARIO_CARRERA FOREIGN KEY (ID_CARRERA) REFERENCES ALLNRS_CARRERA(ID_CARRERA),
    CONSTRAINT FK_ALLNRS_USUARIO_TIPO_USUARIO FOREIGN KEY (ID_TIPO_USUARIO) REFERENCES ALLNRS_TIPO_USUARIO(ID_TIPO_USUARIO)
);



DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_USUARIO
BEFORE INSERT ON ALLNRS_USUARIO
FOR EACH ROW
BEGIN
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_USUARIO = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_USUARIO, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_USUARIO, 2)));
    SET NEW.APELLIDO_USUARIO = CONCAT(UPPER(SUBSTRING(NEW.APELLIDO_USUARIO, 1, 1)), LOWER(SUBSTRING(NEW.APELLIDO_USUARIO, 2)));
END;
//
DELIMITER ;


INSERT INTO ALLNRS_USUARIO(ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO,FECHA_CREACION_USUARIO)
	VALUES(111111,'ADMINISTRADOR', '', '', '$2a$12$4anBQWC6Bv1tnklAP6S32eU5cFZX7QJcgdeIQ2dyneIPa.ToNd5zu', 2020, 1, 5, '2023-03-29');

INSERT INTO ALLNRS_USUARIO(ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO,FECHA_CREACION_USUARIO)
	VALUES(20759841,'Thomas Andreus', 'Riffo Araya', 'Thomas.Riffo@ALU.UCM.CL', '$2a$12$4anBQWC6Bv1tnklAP6S32eU5cFZX7QJcgdeIQ2dyneIPa.ToNd5zu', 2020, 1, 1, '2023-03-29');
INSERT INTO ALLNRS_USUARIO(ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO,FECHA_CREACION_USUARIO)
	VALUES(20351192,'Alfonso Jose Tomas ', 'Lara Castillo', 'Alfonso.Lara@ALU.UCM.CL', '$2a$12$4anBQWC6Bv1tnklAP6S32eU5cFZX7QJcgdeIQ2dyneIPa.ToNd5zu', 2020, 1, 1, '2023-03-29');
INSERT INTO ALLNRS_USUARIO(ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO,FECHA_CREACION_USUARIO)
	VALUES(20961749,'Claudio Felipe', 'Lazo Valdes', 'Claudio.Lazo@ALU.UCM.CL', '$2a$12$4anBQWC6Bv1tnklAP6S32eU5cFZX7QJcgdeIQ2dyneIPa.ToNd5zu', 2020, 1, 1, '2023-03-29');
INSERT INTO ALLNRS_USUARIO(ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO,FECHA_CREACION_USUARIO)
	VALUES(20170932,'Cristian Alonso', 'Nuñez Velasquez', 'Cristian.Nuñez@ALU.UCM.CL', '$2a$12$4anBQWC6Bv1tnklAP6S32eU5cFZX7QJcgdeIQ2dyneIPa.ToNd5zu', 2020, 1, 1, '2023-03-29');
INSERT INTO ALLNRS_USUARIO(ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO,FECHA_CREACION_USUARIO)
	VALUES(20912750,'Gonzalo Ignacio',  'Avendaño Alfaro', 'Gonzalo.Avendaño@ALU.UCM.CL', '$2a$12$4anBQWC6Bv1tnklAP6S32eU5cFZX7QJcgdeIQ2dyneIPa.ToNd5zu', 2020, 1, 1, '2023-03-29');
INSERT INTO ALLNRS_USUARIO(ID_USUARIO,NOMBRE_USUARIO,APELLIDO_USUARIO,CORREO_USUARIO,CONTRASENA_USUARIO,GENERACION_USUARIO,ID_CARRERA,ID_TIPO_USUARIO,FECHA_CREACION_USUARIO)
	VALUES(20802643,'Sebastian Alonso', 'Salinas Jorquera', 'Sebastian.Salinas@ALU.UCM.CL', '$2a$12$4anBQWC6Bv1tnklAP6S32eU5cFZX7QJcgdeIQ2dyneIPa.ToNd5zu', 2020, 1, 1, '2023-03-29');



--  CREAR TABLA AREA ------------------------------

CREATE TABLE ALLNRS_AREA(
    ID_AREA INT,
    NOMBRE_AREA VARCHAR(50),
    ENCARGADO INT,
    CONSTRAINT PK_ALLNRS_AREA PRIMARY KEY(ID_AREA)
);

INSERT INTO ALLNRS_AREA(ID_AREA,NOMBRE_AREA,ENCARGADO)
	VALUES
    (1,'Registro y matricula',3),
	(2,'Servicios académicos',2),
    (3,'Tecnología educativa',3),
    (4,'Finanzas estudiantiles',2),
    (5,'Bienestar estudiantil',2),
    (6,'Infraestructura y mantenimiento',3),
    (7,'Deportes y recreación',2),
    (8,'Biblioteca y recursos educativos',2),
    (9,'Seguridad en el campus',3);
    

DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_AREA
BEFORE INSERT ON ALLNRS_AREA
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_AREA = (SELECT MAX(ID_AREA) + 1 FROM ALLNRS_AREA);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_AREA = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_AREA, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_AREA, 2)));
END;
//
DELIMITER ;


    
    






-- CREAR TABLA CATEGORIA

CREATE TABLE ALLNRS_CATEGORIA(
    ID_CATEGORIA INT,
    NOMBRE_CATEGORIA VARCHAR(50),
    ID_AREA INT,
    CONSTRAINT PK_ALLNRS_CATEGORIA PRIMARY KEY(ID_CATEGORIA),
    CONSTRAINT FK_ALLNRS_CATEGORIA_AREA FOREIGN KEY (ID_AREA) REFERENCES ALLNRS_AREA (ID_AREA)
);

INSERT INTO ALLNRS_CATEGORIA(ID_CATEGORIA,NOMBRE_CATEGORIA,ID_AREA)
VALUES
	(1,'Problemas de Inscripción',1),	
	(2,'Cambios de carrera',1),	
	(3,'Documentación académica',1),
	(4,'Problemas con profesores',2),	
	(5,'Contenido de cursos',2),
	(6,'Evaluaciones',2),
	(7,'Plataformas online',3),
	(8,'Acceso a recursos digitales',3),
	(9,'Problemas técnicos',3),
	(10,'Pagos de matrícula',4),
	(11,'Ayudas financieras',4),
	(12,'Servicios de salud',5),
	(13,'Asesoramiento psicológico',5),
	(14,'Apoyo social',5),
	(15,'Problemas en aulas',6),
	(16,'Mantenimiento de edificios',6),
	(17,'Instalaciones deportivas',7),	
	(18,'Programas recreativos',7),
	(19,'Organización de eventos',7),
	(20,'préstamo de libros',8),
    (21,'Espacios de estudio',8),
	(22,'Seguridad física',9),
	(23,'Protocolos de emergencia',9),
	(24,'Prevención de robos',9);

DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_CATEGORIA
BEFORE INSERT ON ALLNRS_CATEGORIA
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_CATEGORIA = (SELECT MAX(ID_CATEGORIA) + 1 FROM ALLNRS_CATEGORIA);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_CATEGORIA = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_CATEGORIA, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_CATEGORIA, 2)));
END;
//
DELIMITER ;




--  CREAR TABLA VISIBILIDAD ------------------------------
CREATE TABLE ALLNRS_VISIBILIDAD(
	ID_VISIBILIDAD INT,
    NOMBRE_VISIBILIDAD VARCHAR(20),
    CONSTRAINT PK_ALLNRS_VISIBILIDAD PRIMARY KEY (ID_VISIBILIDAD)
);

INSERT INTO ALLNRS_VISIBILIDAD(ID_VISIBILIDAD,NOMBRE_VISIBILIDAD)
	VALUES(1,'PUBLICO');
INSERT INTO ALLNRS_VISIBILIDAD(ID_VISIBILIDAD,NOMBRE_VISIBILIDAD)
	VALUES(2,'PRIVADO');
    
DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_VISIBILIDAD
BEFORE INSERT ON ALLNRS_VISIBILIDAD
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_VISIBILIDAD = (SELECT MAX(ID_CATEGORIA) + 1 FROM ALLNRS_VISIBILIDAD);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_VISIBILIDAD = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_VISIBILIDAD, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_VISIBILIDAD, 2)));
END;
//
DELIMITER ;



    
    
-- CREAR TABLA ESTADO ------------------------------

CREATE TABLE ALLNRS_ESTADO(
	ID_ESTADO INT,
    NOMBRE_ESTADO VARCHAR(20),
    CONSTRAINT PK_ALLNRS_ESTADO PRIMARY KEY (ID_ESTADO)
);

INSERT INTO ALLNRS_ESTADO(ID_ESTADO,NOMBRE_ESTADO)
	VALUES(1,'PENDIENTE');
INSERT INTO ALLNRS_ESTADO(ID_ESTADO,NOMBRE_ESTADO)
	VALUES(2,'EN PROCESO');
INSERT INTO ALLNRS_ESTADO(ID_ESTADO,NOMBRE_ESTADO)
	VALUES(3,'SOLUCIONADO');
    
DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_ESTADO
BEFORE INSERT ON ALLNRS_ESTADO
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_ESTADO = (SELECT MAX(ID_ESTADO) + 1 FROM ALLNRS_ESTADO);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.NOMBRE_ESTADO = CONCAT(UPPER(SUBSTRING(NEW.NOMBRE_ESTADO, 1, 1)), LOWER(SUBSTRING(NEW.NOMBRE_ESTADO, 2)));
END;
//
DELIMITER ;



    
    
--  CREAR TABLA RESPUESTA ------------------------------
CREATE TABLE ALLNRS_RESPUESTA(
	ID_RESPUESTA INT,
    RESPUESTA VARCHAR(1000),
    ID_USUARIO_RESPUESTA INT,
    CONSTRAINT PK_ALLNRS_RESPUESTA PRIMARY KEY (ID_RESPUESTA),
    CONSTRAINT FK_ALLNRS_RESPUESTA_USUARIO FOREIGN KEY (ID_USUARIO_RESPUESTA) REFERENCES  ALLNRS_USUARIO (ID_USUARIO)
);
INSERT INTO ALLNRS_RESPUESTA (ID_RESPUESTA,RESPUESTA,ID_USUARIO_RESPUESTA)
	VALUES(1,'SIN RESPUESTA',111111);
    
DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_RESPUESTA
BEFORE INSERT ON ALLNRS_RESPUESTA
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_RESPUESTA = (SELECT MAX(ID_RESPUESTA) + 1 FROM ALLNRS_RESPUESTA);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.RESPUESTA = CONCAT(UPPER(SUBSTRING(NEW.RESPUESTA, 1, 1)), LOWER(SUBSTRING(NEW.RESPUESTA, 2)));
END;
//
DELIMITER ;





--  CREAR TABLA RECLAMO ------------------------------

CREATE TABLE ALLNRS_RECLAMOS(
    ID_RECLAMO INT,
    TITULO_RECLAMO VARCHAR(50),
    DESCRIPCION_RECLAMO VARCHAR(1000),
    ID_VISIBILIDAD INT,
    ID_ESTADO INT,
    FECHA_CREACION_RECLAMO DATETIME,
    FECHA_UPDATE_RECLAMO DATETIME,
    FECHA_FINALIZADO DATETIME,
    ID_USUARIO INT,
    ID_CATEGORIA INT,
    ID_RESPUESTA INT,
    ID_AREA INT,
    ENCARGADO_RECLAMO INT,
    CONSTRAINT PK_ALLNRS_RECLAMOS PRIMARY KEY (ID_RECLAMO),
    CONSTRAINT FK_ALLNRS_RECLAMOS_VISIBILIDAD FOREIGN KEY (ID_VISIBILIDAD) REFERENCES  ALLNRS_VISIBILIDAD (ID_VISIBILIDAD),
    CONSTRAINT FK_ALLNRS_RECLAMOS_RESPUESTA FOREIGN KEY (ID_RESPUESTA) REFERENCES  ALLNRS_RESPUESTA (ID_RESPUESTA),
	CONSTRAINT FK_ALLNRS_RECLAMOS_ESTADO FOREIGN KEY (ID_ESTADO) REFERENCES  ALLNRS_ESTADO (ID_ESTADO),
    CONSTRAINT FK_ALLNRS_RECLAMOS_CATEGORIA FOREIGN KEY (ID_CATEGORIA) REFERENCES  ALLNRS_CATEGORIA (ID_CATEGORIA),
    CONSTRAINT FK_ALLNRS_RECLAMOS_USUARIO FOREIGN KEY (ID_USUARIO) REFERENCES ALLNRS_USUARIO (ID_USUARIO),
    CONSTRAINT FK_ALLNRS_RECLAMOS_AREA FOREIGN KEY (ID_AREA) REFERENCES ALLNRS_AREA (ID_AREA)
);


INSERT INTO ALLNRS_RECLAMOS (ID_RECLAMO, TITULO_RECLAMO, DESCRIPCION_RECLAMO, ID_VISIBILIDAD, ID_ESTADO, FECHA_CREACION_RECLAMO, FECHA_UPDATE_RECLAMO, FECHA_FINALIZADO, ID_USUARIO, ID_AREA, ID_CATEGORIA, ID_RESPUESTA)
VALUES   (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-01-20 09:30:00', '', null, 20170932, 1, 2, 1);
-- Reclamos generados de forma aleatoria


DELIMITER //

CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_RECLAMOS
BEFORE INSERT ON ALLNRS_RECLAMOS
FOR EACH ROW
BEGIN
    SET NEW.ID_RECLAMO = (SELECT MAX(ID_RECLAMO) + 1 FROM ALLNRS_RECLAMOS);
    SET NEW.ENCARGADO_RECLAMO = 2;
    SET NEW.TITULO_RECLAMO = CONCAT(UPPER(SUBSTRING(NEW.TITULO_RECLAMO, 1, 1)), LOWER(SUBSTRING(NEW.TITULO_RECLAMO, 2)));
    SET NEW.DESCRIPCION_RECLAMO = CONCAT(UPPER(SUBSTRING(NEW.DESCRIPCION_RECLAMO, 1, 1)), LOWER(SUBSTRING(NEW.DESCRIPCION_RECLAMO, 2)));
END;

//

DELIMITER ;



DELIMITER //

CREATE TRIGGER TRIGGER_FINALIZADO_ALLNRS_RECLAMOS
BEFORE UPDATE ON ALLNRS_RECLAMOS
FOR EACH ROW
BEGIN
    IF NEW.ID_ESTADO = 3 THEN
        SET NEW.FECHA_FINALIZADO = CURRENT_TIMESTAMP();
    END IF;
END;

//

DELIMITER ;


INSERT INTO ALLNRS_RECLAMOS (ID_RECLAMO, TITULO_RECLAMO, DESCRIPCION_RECLAMO, ID_VISIBILIDAD, ID_ESTADO, FECHA_CREACION_RECLAMO, FECHA_UPDATE_RECLAMO, FECHA_FINALIZADO, ID_USUARIO, ID_AREA, ID_CATEGORIA, ID_RESPUESTA)
VALUES   (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-01-20 09:30:00', '', null, 20170932, 1, 2, 1),
  (0, 'Problemas con contenido de cursos', 'No puedo acceder al material del curso de matemáticas, ¿pueden solucionarlo?', 2, 1, '2023-02-10 14:45:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con documentación académica', 'Necesito una copia de mi expediente académico, ¿cómo puedo obtenerla?', 1, 1, '2023-03-25 11:20:00', '', null, 20802643, 1, 3, 1),
  (0, 'Problemas con evaluaciones', 'No estoy de acuerdo con la calificación de mi última evaluación, ¿pueden revisarla?', 2, 1, '2023-04-15 16:30:00', '', null, 20912750, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases coincide con mis otras actividades, necesito una reprogramación.', 1, 1, '2023-05-20 10:45:00', '', null, 20170932, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo descargar el material del curso de física, ¿pueden ayudarme?', 2, 1, '2023-06-10 13:55:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia de historia no ha dictado clases en dos semanas, ¿qué está sucediendo?', 1, 1, '2023-07-18 12:10:00', '', null, 20802643, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de química está cerrado, necesitamos acceso para realizar nuestras prácticas.', 2, 1, '2023-08-05 15:25:00', '', null, 20912750, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual desde mi dispositivo móvil, ¿pueden solucionarlo?', 1, 1, '2023-09-02 17:40:00', '', null, 20170932, 3, 2, 1),
  (0, 'Problemas con beca', 'No he recibido la beca correspondiente, necesito información al respecto.', 2, 1, '2023-10-10 09:15:00', '', null, 20351192, 4, 1, 1),
  (0, 'Problemas con inscripción', 'No puedo inscribirme a las materias, ¿pueden ayudarme?', 1, 1, '2023-03-15 14:30:00', '', null, 20961749, 1, 1, 1),
  (0, 'Problemas con contenido de cursos', 'El sistema de la plataforma virtual está caído, necesitamos una solución urgente.', 2, 1, '2023-04-10 18:45:00', '', null, 20961749, 2, 5, 1),
  (0, 'Problemas con pago', 'Realicé el pago de la matrícula y no se refleja, ¿pueden verificarlo?', 1, 1, '2023-05-22 15:55:00', '', null, 20961749, 4, 1, 1),
  (0, 'Problemas con evaluaciones', 'Mi calificación en la materia X es incorrecta, necesito que lo revisen.', 2, 1, '2023-06-18 11:10:00', '', null, 20961749, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases asignado tiene errores, necesito una corrección.', 1, 1, '2023-07-05 10:25:00', '', null, 20961749, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo acceder al material de estudio en línea, ¿pueden solucionarlo?', 2, 1, '2023-08-12 13:40:00', '', null, 20961749, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia X no ha subido las notas, ¿pueden contactarlo?', 1, 1, '2023-09-30 16:50:00', '', null, 20961749, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de la carrera de informática está cerrado, necesitamos acceso.', 2, 1, '2023-10-17 14:15:00', '', null, 20961749, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual, ¿pueden ayudarme a solucionarlo?', 1, 1, '2023-11-25 12:30:00', '', null, 20961749, 3, 2, 1),
  (0, 'Problemas con becas', 'No he recibido la beca correspondiente, necesito información', 2, 1, '2023-12-10 17:05:00', '', null, 20961749, 5, 1, 1),
  (0, 'Problemas con inscripción', 'No puedo inscribirme a las materias, ¿pueden ayudarme?', 1, 1, '2023-01-15 09:45:00', '', null, 20961749, 1, 1, 1),
  (0, 'Problemas con contenido de cursos', 'El sistema de la plataforma virtual está caído, necesitamos una solución urgente.', 2, 1, '2023-02-10 08:20:00', '', null, 20961749, 2, 5, 1),
  (0, 'Problemas con pago', 'Realicé el pago de la matrícula y no se refleja, ¿pueden verificarlo?', 1, 1, '2023-03-22 14:50:00', '', null, 20961749, 4, 1, 1),
  (0, 'Problemas con evaluaciones', 'Mi calificación en la materia X es incorrecta, necesito que lo revisen.', 2, 1, '2023-04-18 16:05:00', '', null, 20961749, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases asignado tiene errores, necesito una corrección.', 1, 1, '2023-05-05 11:20:00', '', null, 20961749, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo acceder al material de estudio en línea, ¿pueden solucionarlo?', 2, 1, '2023-06-12 13:35:00', '', null, 20759841, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia X no ha subido las notas, ¿pueden contactarlo?', 1, 1, '2023-07-30 15:50:00', '', null, 20759841, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de la carrera de informática está cerrado, necesitamos acceso.', 2, 1, '2023-08-17 09:05:00', '', null, 20759841, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual, ¿pueden ayudarme a solucionarlo?', 1, 1, '2023-09-25 14:20:00', '', null, 20759841, 3, 2, 1),
  (0, 'Problemas con becas', 'No he recibido la beca correspondiente, necesito información', 2, 1, '2023-10-12 08:30:00', '', null, 20759841, 5, 1, 1),
  (0, 'Problemas con inscripción', 'No puedo inscribirme a las materias, ¿pueden ayudarme?', 1, 1, '2023-11-15 10:45:00', '', null, 20759841, 1, 1, 1),
  (0, 'Problemas con contenido de cursos', 'El sistema de la plataforma virtual está caído, necesitamos una solución urgente.', 2, 1, '2023-12-10 14:20:00', '', null, 20759841, 2, 5, 1),
  (0, 'Problemas con pago', 'Realicé el pago de la matrícula y no se refleja, ¿pueden verificarlo?', 1, 1, '2023-01-22 09:10:00', '', null, 20759841, 4, 1, 1),
  (0, 'Problemas con evaluaciones', 'Mi calificación en la materia X es incorrecta, necesito que lo revisen.', 2, 1, '2023-02-18 13:45:00', '', null, 20759841, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases asignado tiene errores, necesito una corrección.', 1, 1, '2023-03-05 11:30:00', '', null, 20759841, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo acceder al material de estudio en línea, ¿pueden solucionarlo?', 2, 1, '2023-04-12 16:05:00', '', null, 20759841, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia X no ha subido las notas, ¿pueden contactarlo?', 1, 1, '2023-05-30 12:15:00', '', null, 20759841, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de la carrera de informática está cerrado, necesitamos acceso.', 2, 1, '2023-06-17 14:55:00', '', null, 20759841, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual, ¿pueden ayudarme a solucionarlo?', 1, 1, '2023-07-25 10:00:00', '', null, 20759841, 3, 2, 1),
  (0, 'Problemas con becas', 'No he recibido la beca correspondiente, necesito información', 2, 1, '2023-08-12 09:20:00', '', null, 20759841, 5, 1, 1),
  (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-01-20 11:05:00', '', null, 20170932, 1, 2, 1),
  (0, 'Problemas con contenido de cursos', 'No puedo acceder al material del curso de matemáticas, ¿pueden solucionarlo?', 2, 1, '2023-02-10 13:30:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con documentación académica', 'Necesito una copia de mi expediente académico, ¿cómo puedo obtenerla?', 1, 1, '2023-03-25 10:50:00', '', null, 20802643, 1, 3, 1),
  (0, 'Problemas con evaluaciones', 'No estoy de acuerdo con la calificación de mi última evaluación, ¿pueden revisarla?', 2, 1, '2023-04-15 14:15:00', '', null, 20912750, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases coincide con mis otras actividades, necesito una reprogramación.', 1, 1, '2023-05-20 12:30:00', '', null, 20170932, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo descargar el material del curso de física, ¿pueden ayudarme?', 2, 1, '2023-06-10 11:10:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia de historia no ha dictado clases en dos semanas, ¿qué está sucediendo?', 1, 1, '2023-07-18 09:45:00', '', null, 20802643, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de química está cerrado, necesitamos acceso para realizar nuestras prácticas.', 2, 1, '2023-08-05 10:25:00', '', null, 20912750, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual desde mi dispositivo móvil, ¿pueden solucionarlo?', 1, 1, '2023-09-02 11:55:00', '', null, 20170932, 3, 2, 1),
  (0, 'Problemas con beca', 'No he recibido la beca correspondiente, necesito información al respecto.', 2, 1, '2023-10-10 13:40:00', '', null, 20351192, 4, 1, 1),
  (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-11-20 10:20:00', '', null, 20802643, 1, 2, 1),
  (0, 'Problemas con contenido de cursos', 'No puedo acceder al material del curso de matemáticas, ¿pueden solucionarlo?', 2, 1, '2023-12-10 15:30:00', '', null, 20912750, 2, 5, 1),
  (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-01-20 11:05:00', '', null, 20170932, 1, 2, 1),
  (0, 'Problemas con contenido de cursos', 'No puedo acceder al material del curso de matemáticas, ¿pueden solucionarlo?', 2, 1, '2023-02-10 13:30:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con documentación académica', 'Necesito una copia de mi expediente académico, ¿cómo puedo obtenerla?', 1, 1, '2023-03-25 10:50:00', '', null, 20802643, 1, 3, 1),
  (0, 'Problemas con evaluaciones', 'No estoy de acuerdo con la calificación de mi última evaluación, ¿pueden revisarla?', 2, 1, '2023-04-15 14:15:00', '', null, 20912750, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases coincide con mis otras actividades, necesito una reprogramación.', 1, 1, '2023-05-20 12:30:00', '', null, 20170932, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo descargar el material del curso de física, ¿pueden ayudarme?', 2, 1, '2023-06-10 11:10:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia de historia no ha dictado clases en dos semanas, ¿qué está sucediendo?', 1, 1, '2023-07-18 09:45:00', '', null, 20802643, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de química está cerrado, necesitamos acceso para realizar nuestras prácticas.', 2, 1, '2023-08-05 10:25:00', '', null, 20912750, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual desde mi dispositivo móvil, ¿pueden solucionarlo?', 1, 1, '2023-09-02 11:55:00', '', null, 20170932, 3, 2, 1),
  (0, 'Problemas con beca', 'No he recibido la beca correspondiente, necesito información al respecto.', 2, 1, '2023-10-10 13:40:00', '', null, 20351192, 4, 1, 1),
  (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-01-20 11:05:00', '', null, 20170932, 1, 2, 1),
  (0, 'Problemas con contenido de cursos', 'No puedo acceder al material del curso de matemáticas, ¿pueden solucionarlo?', 2, 1, '2023-02-10 13:30:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con documentación académica', 'Necesito una copia de mi expediente académico, ¿cómo puedo obtenerla?', 1, 1, '2023-03-25 10:50:00', '', null, 20802643, 1, 3, 1),
  (0, 'Problemas con evaluaciones', 'No estoy de acuerdo con la calificación de mi última evaluación, ¿pueden revisarla?', 2, 1, '2023-04-15 14:15:00', '', null, 20912750, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases coincide con mis otras actividades, necesito una reprogramación.', 1, 1, '2023-05-20 12:30:00', '', null, 20170932, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo descargar el material del curso de física, ¿pueden ayudarme?', 2, 1, '2023-06-10 11:10:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia de historia no ha dictado clases en dos semanas, ¿qué está sucediendo?', 1, 1, '2023-07-18 09:45:00', '', null, 20802643, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de química está cerrado, necesitamos acceso para realizar nuestras prácticas.', 2, 1, '2023-08-05 10:25:00', '', null, 20912750, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual desde mi dispositivo móvil, ¿pueden solucionarlo?', 1, 1, '2023-09-02 11:55:00', '', null, 20170932, 3, 2, 1),
  (0, 'Problemas con beca', 'No he recibido la beca correspondiente, necesito información al respecto.', 2, 1, '2023-10-10 13:40:00', '', null, 20351192, 4, 1, 1),
  (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-11-20 14:20:00', '', null, 20802643, 1, 2, 1),
  (0, 'Problemas con contenido de cursos', 'No puedo acceder al material del curso de matemáticas, ¿pueden solucionarlo?', 2, 1, '2023-12-10 09:30:00', '', null, 20912750, 2, 5, 1),
  (0, 'Problemas con cambios de carrera', 'Necesito cambiar de carrera y requiero orientación al respecto.', 1, 1, '2023-01-20 09:45:00', '', null, 20170932, 1, 2, 1),
  (0, 'Problemas con contenido de cursos', 'No puedo acceder al material del curso de matemáticas, ¿pueden solucionarlo?', 2, 1, '2023-02-10 10:30:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con documentación académica', 'Necesito una copia de mi expediente académico, ¿cómo puedo obtenerla?', 1, 1, '2023-03-25 11:20:00', '', null, 20802643, 1, 3, 1),
  (0, 'Problemas con evaluaciones', 'No estoy de acuerdo con la calificación de mi última evaluación, ¿pueden revisarla?', 2, 1, '2023-04-15 12:15:00', '', null, 20912750, 2, 6, 1),
  (0, 'Problemas con horario', 'El horario de clases coincide con mis otras actividades, necesito una reprogramación.', 1, 1, '2023-05-20 13:45:00', '', null, 20170932, 2, 5, 1),
  (0, 'Problemas con material de estudio', 'No puedo descargar el material del curso de física, ¿pueden ayudarme?', 2, 1, '2023-06-10 14:30:00', '', null, 20351192, 2, 5, 1),
  (0, 'Problemas con profesor', 'El profesor de la materia de historia no ha dictado clases en dos semanas, ¿qué está sucediendo?', 1, 1, '2023-07-18 15:10:00', '', null, 20802643, 2, 4, 1),
  (0, 'Problemas con laboratorio', 'El laboratorio de química está cerrado, necesitamos acceso para realizar nuestras prácticas.', 2, 1, '2023-08-05 16:20:00', '', null, 20912750, 6, 1, 1),
  (0, 'Problemas con plataforma virtual', 'No puedo acceder a la plataforma virtual desde mi dispositivo móvil, ¿pueden solucionarlo?', 1, 1, '2023-09-02 17:05:00', '', null, 20170932, 3, 2, 1),
  (0, 'Problemas con beca', 'No he recibido la beca correspondiente, necesito información al respecto.', 2, 1, '2023-10-10 18:30:00', '', null, 20351192, 4, 1, 1);









-- ----------- CREAR TABLA FAQ ------------------------------
CREATE TABLE ALLNRS_FAQ(
    ID_FAQ INT,
    PREGUNTAS_FAQ VARCHAR(50),
    RESPUESTA_FAQ VARCHAR(1500),
    ACTIVO INT,
    FECHA_FAQ DATE,
    FECHA_UPDATE DATE,
    CONSTRAINT PK_ALLNRS_FAQ PRIMARY KEY (ID_FAQ)
);

insert into ALLNRS_FAQ(ID_FAQ,PREGUNTAS_FAQ,RESPUESTA_FAQ,ACTIVO,FECHA_FAQ,FECHA_UPDATE)
	values(1,'Pregunta 1','Respuesta 1',1, current_timestamp(),current_timestamp());
DELIMITER //
CREATE TRIGGER TRIGGER_MAYUS_ALLNRS_FAQ
BEFORE INSERT ON ALLNRS_FAQ
FOR EACH ROW
BEGIN
    -- Incrementar la clave primaria
    SET NEW.ID_FAQ = (SELECT MAX(ID_FAQ) + 1 FROM ALLNRS_FAQ);
    -- Convertir a mayúsculas la columna NOMBRE_SEDE
    SET NEW.PREGUNTAS_FAQ = CONCAT(UPPER(SUBSTRING(NEW.PREGUNTAS_FAQ, 1, 1)), LOWER(SUBSTRING(NEW.PREGUNTAS_FAQ, 2)));
    SET NEW.RESPUESTA_FAQ = CONCAT(UPPER(SUBSTRING(NEW.RESPUESTA_FAQ, 1, 1)), LOWER(SUBSTRING(NEW.RESPUESTA_FAQ, 2)));
END;
//
DELIMITER ;




select * from allnrs_reclamos;