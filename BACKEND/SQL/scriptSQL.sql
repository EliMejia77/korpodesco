CREATE DATABASE colegio_geek;
USE colegio_geek;


DROP TABLE IF EXISTS modelo_evaluacion;
DROP TABLE IF EXISTS grupo_materia;
DROP TABLE IF EXISTS grupo_estudiante;
DROP TABLE IF EXISTS estudiante; 
DROP TABLE IF EXISTS grupo;
DROP TABLE IF EXISTS materia;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario(
    id INT UNSIGNED AUTO_INCREMENT,
    documento VARCHAR(15) UNIQUE NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    contrasena VARCHAR(25),
    correo VARCHAR(50) NOT NULL,
    rol ENUM('Estudiante','Administrador','Docente') NOT NULL,
    fecha_registro DATETIME DEFAULT NOW(),
    estado ENUM ('A','I') NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE materia(
    id INT UNSIGNED AUTO_INCREMENT, 
    codigo VARCHAR(10) UNIQUE NOT NULL, 
    nombre VARCHAR(25) NOT NULL, 
    sexto ENUM('true','false') NOT NULL,
    septimo ENUM('true','false') NOT NULL,
    octavo ENUM('true','false') NOT NULL,
    noveno ENUM('true','false') NOT NULL,
    decimo ENUM('true','false') NOT NULL,
    once ENUM('true','false') NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE grupo(
    id INT UNSIGNED AUTO_INCREMENT,
    codigo VARCHAR(10) UNIQUE NOT NULL, 
    id_docente INT UNSIGNED NOT NULL,
    jornada ENUM('M','T') NOT NULL,
    ano INT NOT NULL,
    grado ENUM('6','7','8','9','10','11'),
    PRIMARY KEY(id),
    FOREIGN KEY(id_docente) REFERENCES usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE estudiante(
    id INT UNSIGNED AUTO_INCREMENT, 
    codigo VARCHAR(10) UNIQUE NOT NULL,
    id_usuario INT UNSIGNED NOT NULL,
    tipo_documento ENUM('TI','CC','NUIP') NOT NULL,
    sexo ENUM('F','M','O') NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(100),
    ciudad VARCHAR(25),
    telefono VARCHAR(10),
    celular VARCHAR(10),
    url_foto TEXT NOT NULL,
    url_doc_identidad TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


CREATE TABLE grupo_estudiante(
    id INT UNSIGNED AUTO_INCREMENT,
    id_grupo INT UNSIGNED NOT NULL,
    id_estudiante INT UNSIGNED NOT NULL,
    nota_promedio FLOAT NOT NULL,
    estado ENUM('A','N') NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_grupo) REFERENCES grupo(id),
    FOREIGN KEY(id_estudiante) REFERENCES estudiante(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE grupo_materia(
    id INT UNSIGNED AUTO_INCREMENT,
    id_materia INT UNSIGNED NOT NULL,
    id_grupo INT UNSIGNED NOT NULL,
    id_docente INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_grupo) REFERENCES grupo(id),
    FOREIGN KEY(id_materia) REFERENCES materia(id),
    FOREIGN KEY(id_docente) REFERENCES usuario(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE modelo_evaluacion(
    id INT UNSIGNED AUTO_INCREMENT,
    seguimiento VARCHAR(255), 
    autoevaluacion FLOAT,
    coevaluacion FLOAT,
    evaluacion_periodo FLOAT,
    id_estudiante INT UNSIGNED NOT NULL,
    id_materia INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_estudiante) REFERENCES estudiante(id),
    FOREIGN KEY(id_materia) REFERENCES materia(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);