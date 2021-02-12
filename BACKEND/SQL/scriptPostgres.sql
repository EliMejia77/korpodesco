CREATE DATABASE korpodesco_bd;

DROP TABLE IF EXISTS modelo_evaluacion;
DROP TABLE IF EXISTS grupo_materia;
DROP TABLE IF EXISTS grupo_estudiante;
DROP TABLE IF EXISTS estudiante; 
DROP TABLE IF EXISTS grupo;
DROP TABLE IF EXISTS materia;
DROP TABLE IF EXISTS usuario;

DROP TYPE IF EXISTS rol_enum;
DROP TYPE IF EXISTS estado_usuario_enum;
CREATE TYPE rol_enum AS ENUM('Estudiante','Administrador','Docente');
CREATE TYPE estado_usuario_enum AS ENUM('Activo','Inactivo');
CREATE TABLE usuario(
    id SERIAL NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    documento VARCHAR(15) UNIQUE NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contrasena VARCHAR(25),
    rol rol_enum NOT NULL,
    fecha_registro TIMESTAMP DEFAULT NOW(),
    estado estado_usuario_enum NOT NULL,
    PRIMARY KEY(id)
);

DROP TYPE IF EXISTS primero_enum;
DROP TYPE IF EXISTS segundo_enum;
DROP TYPE IF EXISTS tercero_enum;
DROP TYPE IF EXISTS cuarto_enum;
DROP TYPE IF EXISTS quinto_enum;
DROP TYPE IF EXISTS sexto_enum;
CREATE TYPE primero_enum AS ENUM('true','false');
CREATE TYPE segundo_enum AS ENUM('true','false');
CREATE TYPE tercero_enum AS ENUM('true','false');
CREATE TYPE cuarto_enum AS ENUM('true','false');
CREATE TYPE quinto_enum AS ENUM('true','false');
CREATE TYPE sexto_enum AS ENUM('true','false');
CREATE TABLE materia(
    id SERIAL NOT NULL, 
    codigo VARCHAR(10) UNIQUE NOT NULL, 
    nombre VARCHAR(25) NOT NULL, 
    primero primero_enum NOT NULL,
    segundo segundo_enum NOT NULL,
    tercero tercero_enum NOT NULL,
    cuarto cuarto_enum NOT NULL,
    quinto quinto_enum NOT NULL,
    sexto sexto_enum NOT NULL,
    PRIMARY KEY(id)
);

DROP TYPE IF EXISTS jornada_enum;
DROP TYPE IF EXISTS grado_enum;
CREATE TYPE jornada_enum AS ENUM('AM','PM');
CREATE TYPE grado_enum AS ENUM('1','2','3','4','5','6');
CREATE TABLE grupo(
    id SERIAL NOT NULL, 
    codigo VARCHAR(20) UNIQUE NOT NULL, 
    id_docente INT NOT NULL,
    jornada jornada_enum NOT NULL,
    grado grado_enum,
    PRIMARY KEY(id),
    FOREIGN KEY(id_docente) REFERENCES usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

DROP TYPE IF EXISTS tipo_documento_enum;
DROP TYPE IF EXISTS sexo_enum ;
CREATE TYPE tipo_documento_enum AS ENUM('TI','CC','NUIP');
CREATE TYPE sexo_enum AS ENUM('Femenino','Masculino','Otro');
CREATE TABLE estudiante(
    id SERIAL NOT NULL,
    codigo VARCHAR(15) UNIQUE NOT NULL,
    id_usuario INT NOT NULL,
    tipo_documento tipo_documento_enum NOT NULL,
    sexo sexo_enum NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(100),
    ciudad VARCHAR(25),
    telefono VARCHAR(10),
    celular VARCHAR(10),
    grado grado_enum NOT NULL,
    url_foto TEXT NOT NULL,
    url_doc_identidad TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

DROP TYPE IF EXISTS estado_grupo_estudiante_enum;
CREATE TYPE estado_grupo_estudiante_enum AS ENUM('Aprobado','Reprobado','En curso'); 
CREATE TABLE grupo_estudiante(
    id SERIAL NOT NULL,
    id_grupo INT NOT NULL,
    id_estudiante INT NOT NULL,
    nota_promedio FLOAT,
    estado estado_grupo_estudiante_enum NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_grupo) REFERENCES grupo(id),
    FOREIGN KEY(id_estudiante) REFERENCES estudiante(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE grupo_materia(
    id SERIAL NOT NULL,
    id_materia INT NOT NULL,
    id_grupo INT NOT NULL,
    id_docente INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_grupo) REFERENCES grupo(id),
    FOREIGN KEY(id_materia) REFERENCES materia(id),
    FOREIGN KEY(id_docente) REFERENCES usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE modelo_evaluacion(
    id SERIAL NOT NULL,
    seguimiento VARCHAR(255), 
    autoevaluacion FLOAT,
    coevaluacion FLOAT,
    evaluacion_periodo FLOAT,
    id_estudiante INT NOT NULL,
    id_materia INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_estudiante) REFERENCES estudiante(id),
    FOREIGN KEY(id_materia) REFERENCES materia(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);
INSERT INTO usuario (documento, nombre_completo, contrasena, correo, rol, estado) VALUES
('777777', 'Rio Futaba', 'Korpodesco2021.', 'rio@gmail.com', 'Docente', 'Activo');

INSERT INTO usuario (documento, nombre_completo, contrasena, correo, rol, estado) VALUES
('1000747248', 'Jacobo Garces Oquendo', 'Korpodesco2021.', 'jacobogarcesoquendo@gmail.com', 'Estudiante', 'Activo'),
('023940834', 'Santiago Betancur', 'Korpodesco2021.', 'santiago@gmail.com', 'Estudiante', 'Activo'),
('07979786', 'Leisy Vasquez', 'Korpodesco2021.', 'leisy@gmail.com', 'Estudiante', 'Activo'),
('93792331', 'Kaguya Shinomiya', 'Korpodesco2021.', 'kaguya@gmail.com', 'Estudiante', 'Activo'),
('322536634', 'Mai Sakurajima', 'Korpodesco2021.', 'mai@gmail.com', 'Estudiante', 'Activo'),
('32254', 'Chizuru Ichinose', 'Korpodesco2021.', 'chizuru@gmail.com', 'Estudiante', 'Activo'),
('24456573', 'Dubenis Lopez', 'Korpodesco2021.', 'dubenis@gmail.com', 'Docente', 'Activo'),
('55555', 'Faber Cimiki', 'Korpodesco2021.', 'faber@gmail.com', 'Docente', 'Activo'),
('1515151', 'Samuel Villegas', 'Korpodesco2021.', 'samu@gmail.com', 'Administrador', 'Activo');

INSERT INTO estudiante (codigo, id_usuario, tipo_documento, sexo, fecha_nacimiento, direccion, ciudad, telefono, celular, grado, url_foto, url_doc_identidad) VALUES
('2021001', 1, 'TI', 'Masculino', '2003-09-07', 'CRR 74 # 25C-26', 'Bello', '3146310861', '3116657131', '1', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'),
('2021002', 2, 'CC', 'Masculino', '2000-09-07', 'CRR111 # 747', 'Medellin', '928397', '30093283', '1', 'esfgdthneryneryhyr', 'agtagtsgfbhrsthbrr'),
('2021003', 3, 'TI', 'Femenino', '2021-01-03', 'f34f34', 'Medellín', '56345', '74687468','1', '34gf34gf34gf34', '34g3434g4g'),
('2021004', 4, 'TI', 'Femenino', '2021-01-30', 'ergwergr', 'Medellín', '6846846', '4574687','2', 'qerqetqe', 'etrbqeb'),
('2021005', 5, 'TI', 'Femenino', '2021-01-19', '5t4tgf4q', 'Medellín', '654574', '7457453','2', 'etbetb', 'ebterb'),
('2021006', 6, 'CC', 'Femenino', '2000-09-07', '3r4f3f', 'Medellín', '57457', '5758736','2', '454tgh', '4t5g4tgh54h');


INSERT INTO materia (codigo, nombre, primero, segundo, tercero, cuarto, quinto, sexto) VALUES
('SOC001', 'Fisiología Animal', 'true', 'true', 'true', 'true', 'true', 'true'),
('MAT001', 'Zoonosis', 'true', 'true', 'true', 'true', 'true', 'true'),
('ESP001', 'Estética Canina', 'true', 'true', 'true', 'true', 'true', 'true'),
('EDF001', 'Bioseguridad', 'true', 'true', 'true', 'true', 'true', 'true'),
('ETI001', 'Salud y nutrición animal', 'true', 'true', 'true', 'true', 'true', 'true');

INSERT INTO modelo_evaluacion (seguimiento, autoevaluacion, coevaluacion, evaluacion_periodo, id_estudiante, id_materia) VALUES
('5,5,5,5,3', 5, 5, 5, 1, 1),
('5,5,5,5,5', 5, 5, 5, 1, 2),
('5,4,3,3,3', 5, 5, 5, 1, 3),
('5,5,5,5,5', 5, 5, 5, 1, 4),
('4,3,3,4,4', 5, 5, 5, 1, 5),
('5,5,5,5,1', 5, 5, 5, 2, 1),
('5,5,5,5,5', 5, 5, 5, 2, 2),
('1,2,3,3,5', 5, 5, 5, 2, 3),
('5,5,5,5,5', 5, 5, 5, 2, 4),
('5,5,5,5', 5, 5, 5, 2, 5),
('5,4,4,3,3', 5, 5, 5, 3, 1),
('5,5,3,3,3,3', 5, 5, 5, 3, 2),
('5,4,3,3,3,2', 5, 5, 5, 3, 3),
('5,5,3,3,4,4,5', 5, 5, 5, 3, 4),
('5,4,4,3,3', 5, 5, 5, 3, 5),
('5,4,4,3,3', 5, 5, 5, 4, 1),
('5,5,3,3,3,3', 4, 5, 5, 4, 2),
('5,4,3,3,3,2', 5, 5, 5, 4, 3),
('5,5,3,3,4,4,5', 5, 5, 5, 4, 4),
('5,4,4,3,3', 5, 5, 5, 4, 5),
('5,5,4,3,2', 5, 5, 5, 5, 1),
('4,4,4,4,4', 5, 5, 5, 5, 2),
('4,3,2,2,3,4', 5, 5, 5, 5, 3),
('5,4,3,3,2,2', 5, 5, 5, 5, 4),
('4,4,4,4,4', 5, 5, 5, 5, 5),
('4,3,2,1,3', 5, 5, 5, 6, 1),
('5,4,3,3', 5, 5, 5, 6, 2),
('4,3,2,4', 5, 5, 5, 6, 3),
('5,4,3,2,5', 5, 5, 5, 6, 4),
('5,4,3,2,4', 5, 5, 5, 6, 5);


INSERT INTO grupo (codigo, id_docente, jornada, grado) VALUES
('202106001', 7, 'PM', '1'),
('202107002', 8, 'AM', '2');


INSERT INTO grupo_estudiante (id_grupo, id_estudiante, nota_promedio, estado) VALUES
(1, 1, 5, 'En curso'),
(1, 2, 5, 'En curso'),
(1, 3, 5, 'En curso'),
(2, 4, 5, 'En curso'),
(2, 5, 5, 'En curso'),
(2, 6, 5, 'En curso');


INSERT INTO grupo_materia (id_materia, id_grupo, id_docente) VALUES
(1, 1, 7),
(2, 1, 7),
(3, 1, 7),
(4, 1, 8),
(5, 1, 8),
(1, 2, 7),
(2, 2, 7),
(3, 2, 7),
(4, 2, 8),
(5, 2, 8);
