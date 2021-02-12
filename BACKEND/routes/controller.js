const fs = require("fs");
const path = require("path");
const variable = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../variables.json"))
);
const { pool } = require("../config/database");

module.exports = {
  reporteTeacherYear: (req,res)=>{
    try{
      const {id_docente, grado}=req.body;
      pool.query(`SELECT estudiante.grado, estudiante.codigo, grupo_materia.id_docente from estudiante 
      INNER JOIN grupo_estudiante on estudiante.id = grupo_estudiante.id_estudiante 
      INNER JOIN grupo on grupo_estudiante.id_grupo = grupo.id 
      INNER JOIN grupo_materia on grupo_materia.id_grupo = grupo.id 
      WHERE estudiante.grado = '${grado}' AND grupo_materia.id_docente='${id_docente}';`,(err,resulset,fields)=>{
        if(err){
          res.json({ message: 'Se ha generado un error' });
          console.log(err);
        }else{
          res.json({rows:resulset.rows, rowsCount:resulset.rowCount});
        }
      })
    }catch(e){
      console.log(e)
      res.json({message:"Error inesperado"})
    }
  },
  callTeachers: (req,res)=>{
    try {
      pool.query(`SELECT id,nombre_completo FROM usuario WHERE rol='Docente';`, (err, resulset, fields) => {
        if (err) {
          res.json({ message: 'Se ha generado un error' });
          console.log(err);
        } else {
          res.json(resulset.rows);
        }
      })
    } catch (e) {
      res.json({ message: 'Error' })
      console.log(e)
    }
  },
  reportStudentsGrades: (req, res) => {
    try {
      const { nombre_materia, grado } = req.body;
      pool.query(`SELECT materia.id,materia.nombre,grupo_estudiante.id_grupo, estudiante.id,estudiante.codigo, estudiante.grado 
      FROM materia INNER JOIN grupo_materia ON materia.id=grupo_materia.id_materia INNER JOIN grupo_estudiante ON 
      grupo_estudiante.id_grupo=grupo_materia.id_grupo INNER JOIN estudiante ON estudiante.id=grupo_estudiante.id_estudiante
      WHERE materia.nombre='${nombre_materia}' AND estudiante.grado='${grado}';`, (err, resulset, fields) => {
        if (err) {
          res.json({ message: 'Se ha generado un error' });
          console.log(err);
        } else {
          res.json({ rows: resulset.rows, rowsCount: resulset.rowCount });
        }
      })
    } catch (e) {
      res.json({ message: 'Error' })
      console.log(e)
    }
  },
  seeGrades: (req, res) => {
    try {
      pool.query(`SELECT id, nombre FROM materia;`, (err, resulset, fields) => {
        if (err) {
          res.json({ message: 'Se ha generado un error' });
          console.log(err);
        } else {
          res.json(resulset.rows);
        }
      })
    } catch (e) {
      res.json({ message: 'Error' })
      console.log(e)
    }
  },
  setUserLogin: (req, res) => {
    const { correo, contrasena, rol } = req.body;
    pool.query(
      `SELECT * FROM usuario WHERE correo='${correo}' AND contrasena='${contrasena}' AND rol='${rol}'`,
      (err, resulset, fields) => {
        if (err) {
          res.json({ message: `Error` });
          return console.log(err.message);
        }
        if (resulset.rowCount > 0) {
          res.json({ message: `Bienvenido`, resulset });
        } else {
          res.json({
            message: `Info incorrecta`,
          });
        }
      }
    );
  },

  getSegStudent: (req, res) => {
    const id = req.params.id;
    pool.query(
      `SELECT modelo_evaluacion.id,nombre_completo,nombre,seguimiento,autoevaluacion,coevaluacion, evaluacion_periodo FROM usuario
        INNER JOIN estudiante
        ON usuario.id=estudiante.id_usuario
        INNER JOIN modelo_evaluacion
        ON modelo_evaluacion.id_estudiante=estudiante.id
        INNER JOIN materia
        ON materia.id=modelo_evaluacion.id_materia
        WHERE usuario.id='${id}';`,
      (err, resulset, fields) => {
        if (err) {
          res.sendStatus(500).json({ message: "Error inesperado" });
          console.log(err);
        } else {
          res.json(resulset);
        }
      }
    );
  },

  getSubjectsByTeacher: (req, res) => {
    try {
      const id = req.params.id;
      pool.query(
        `SELECT grupo_materia.id, usuario.nombre_completo, grupo.jornada, grupo.codigo, materia.nombre FROM grupo_materia INNER JOIN usuario ON grupo_materia.id_docente=usuario.id INNER JOIN grupo ON grupo_materia.id_grupo=grupo.id INNER JOIN materia ON grupo_materia.id_materia= materia.id WHERE usuario.id=${id};`,
        (err, resulset, fields) => {
          if (err) {
            res.sendStatus(500).json({ message: "Error inesperado" });
            console.log(err);
          } else {
            res.json(resulset);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
  getRecordsGroup: (req, res) => {
    try {
      const { nombre_materia, codigo_grupo } = req.body;
      pool.query(
        `SELECT estudiante.id, estudiante.codigo, usuario.nombre_completo, modelo_evaluacion.seguimiento, modelo_evaluacion.autoevaluacion, modelo_evaluacion.id_materia, modelo_evaluacion.coevaluacion, modelo_evaluacion.evaluacion_periodo FROM modelo_evaluacion INNER JOIN estudiante ON modelo_evaluacion.id_estudiante = estudiante.id INNER JOIN usuario ON estudiante.id_usuario=usuario.id INNER JOIN materia ON modelo_evaluacion.id_materia = materia.id INNER JOIN grupo_estudiante ON estudiante.id= grupo_estudiante.id_estudiante INNER JOIN grupo ON grupo_estudiante.id_grupo=grupo.id INNER JOIN grupo_materia ON materia.id = grupo_materia.id_materia WHERE materia.nombre = '${nombre_materia}' AND grupo.codigo='${codigo_grupo}'`,
        (err, resulset, fields) => {
          if (err) {
            res.sendStatus(500).json({ message: "Error inesperado" });
            console.log(err);
          } else {
            res.json(resulset);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  },

  registerUser: async (req, res) => {
    try {
      const {
        documento,
        nombre_completo,
        correo,
        contrasena,
        rol,
        estado,
      } = req.body;
      result = await pool.query(
        `INSERT INTO usuario (documento,nombre_completo,contrasena,correo,rol,estado) VALUES($1,$2,$3,$4,$5,$6)`,
        Object.values(req.body)
      );
      res.status(201).json({ state: 1, message: "Good" });
    } catch (e) {
      res.status(500).json({ state: 0, message: "Bad", error: e });
      console.log(e);
    }
  },
  registerStudent: async (req, res) => {
    try {
      const values = Object.values(req.body);
      console.log(values);

      const registro_usuario = await pool.query(
        `INSERT INTO usuario (documento,nombre_completo,contrasena,correo,rol,estado)
         VALUES($1,$2,$3,$4,$5,$6)`,
        values.slice(0, 6)
      );

      console.log(registro_usuario);

      const id_usuario = await pool.query(`SELECT usuario.id FROM usuario WHERE usuario.documento='${req.body.documento}'`);

      var fecha = new Date();
      const arr_aux = [id_usuario['rows'][0]['id'], fecha.getFullYear() + req.body.grado + "00" + variable.id];
      values.push(...arr_aux);
      variable.id++;

      console.log(values.slice(6, 18));

      registro_estudiante = await pool.query(`INSERT INTO estudiante (tipo_documento,sexo,fecha_nacimiento,direccion,ciudad,telefono,celular,grado,url_foto,url_doc_identidad,id_usuario,codigo)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, values.slice(6, 18));

      res.status(201).json({ message: "Good" });

    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Bad", error: e });

    }
  },

  registerSubject: async (req, res) => {
    try {

      const values = Object.values(req.body);
      console.log(values)

      const registro_usuario = await pool.query(`INSERT INTO usuario (documento,nombre_completo,contrasena,correo,rol,estado)
         VALUES($1,$2,$3,$4,$5,$6)`, values.slice(0, 6));


      const id_usuario = await pool.query(`SELECT usuario.id FROM usuario WHERE usuario.documento='${req.body.documento}'`);

      var fecha = new Date();
      const arr_aux = [id_usuario['rows'][0]['id'], fecha.getFullYear() + req.body.grado + "00" + variable.id];
      values.push(...arr_aux);
      variable.id++;

      console.log(values.slice(6, 17));

      setTimeout(() => {
        fs.writeFileSync(path.join(__dirname, '../variables.json'), JSON.stringify(variable, null, 4));
      }, 1000)

      registro_estudiante = await pool.query(`INSERT INTO estudiante (tipo_documento,sexo,fecha_nacimiento,direccion,ciudad,telefono,celular,grado,url_foto,url_doc_identidad,id_usuario,codigo)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, values.slice(6, 18));

      registro_estudiante = await pool.query(
        `INSERT INTO estudiante (tipo_documento,sexo,fecha_nacimiento,direccion,ciudad,telefono,celular,grado,url_foto,url_doc_identidad,id_usuario,codigo)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        values.slice(6, 18)
      );

      res.status(201).json({ state: 1, message: "Good" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ state: 0, message: "Bad", error: e });
    }
  },

  registerGrades: async (req, res) => {
    try {
      const {
        seguimiento,
        autoevaluacion,
        coevaluacion,
        evaluacion_periodo,
        id_estudiante,
        id_materia
      } = req.body;
      const registroNotasEstudiante = await pool.query(
        `UPDATE modelo_evaluacion SET seguimiento = '${seguimiento}', autoevaluacion = '${autoevaluacion}', coevaluacion = '${coevaluacion}', evaluacion_periodo = '${evaluacion_periodo}' WHERE modelo_evaluacion.id_estudiante = '${id_estudiante}' AND modelo_evaluacion.id_materia = '${id_materia}';`,
        (err, resulset, fields) => {
          if (err) {
            res.json({ message: "Error inesperado" });
            console.log(err);
          } else {
            res.json(resulset);
            console.log(resulset);
          }
        }
      );
    } catch (e) {
      res.status(500).json({ message: "Bad", error: e });
      console.log(e);
    }
  },
  registerSubjects: async (req, res) => {
    try {
      const values = Object.values(req.body);
      values.unshift(
        req.body.nombre.substr(0, 3).toUpperCase() + "00" + variable.materia
      );
      variable.materia++;
      setTimeout(() => {
        fs.writeFileSync(
          path.join(__dirname, "../variables.json"),
          JSON.stringify(variable, null, 4)
        );
      }, 1000);
      const registroMateria = await pool.query(
        `INSERT INTO materia(codigo,nombre,primero,segundo,tercero,cuarto,quinto,sexto) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
        values);
      res.status(201).json({ state: 1, message: registroMateria.rows });
    } catch (e) {
      res.status(500).json({ state: 0, message: "Bad", error: e });
      console.log(e);
    }
  },
  getTeacheRegistrationGroup: (req, res) => {
    try {
      //¿Para que es el req.body?
      const {
        id, nombre_completo
      } = req.body;
      pool.query(`SELECT id, nombre_completo FROM usuario WHERE rol = 'Docente'`, (err, resulset, fields) => {
        if (err) {
          res.sendStatus(500).json({ message: "Error inesperado" });
          console.log(err);
        } else {
          res.json(resulset);
        }
      })
    } catch (e) {
      res.status(500).json({ state: 0, message: "Bad", error: e });
      console.log(e);
    }
  },
  getStudentsRegristrationGroup: (req, res) => {
    try {
      const grado = req.body.grado;
      pool.query(`SELECT estudiante.id, estudiante.codigo, usuario.nombre_completo, estudiante.grado FROM usuario INNER JOIN estudiante ON usuario.id = estudiante.id_usuario WHERE estudiante.grado = '${grado}';`,
        (err, resulset, fields) => {
          if (err) {
            res.json({ message: "Error inesperado" });
          } else {
            res.json(resulset);
          }
        })
    } catch (e) {
      console.log('catch')
      res.status(500).json({ state: 0, message: "Bad", error: e });
      console.log(e);
    }
  },
  getSubjectRegistrationGroup: async (req, res) => {
    try {
      await pool.query(`SELECT  id, codigo, jornada, grado FROM grupo;`,
        (err, resulset, fields) => {
          if (err) {
            res.json({ message: "Error inesperado" });
          } else {
            res.json(resulset);
          }
        })
    } catch {
      res.status(500).json({ state: 0, message: "Bad", error: e });
      console.log(e);
    }
  },
  //En el registro grupos sale error cuando queremos agregar jornada mañana.
  registerGroups: async (req, res) => {
    try {
      const values = Object.values(req.body);
      const ano = new Date();
      values.unshift(
        ano.getFullYear() + "0" + req.body.grado + "0" + variable.grado
      );
      variable.grado++;
      setTimeout(() => {
        fs.writeFileSync(
          path.join(__dirname, "../variables.json"),
          JSON.stringify(variable, null, 4)
        );
      }, 1000);
      console.log(values)
      const id = await pool.query(`INSERT INTO grupo (codigo,id_docente,jornada,grado) VALUES($1,$2,$3,$4) RETURNING id`, values)
      res.status(201).json({ state: 1, message: id.rows });
    } catch (e) {
      console.log('catch')
      res.status(500).json({ state: 0, message: "Bad", error: e });
      console.log(e);
    }
  },
  registerGroupStudent: async (req, res) => {
    try {
      const id_grupo = req.body.id_grupo;
      const arregloEstudiantes = Object.keys(req.body.arregloEstudiantes);
      let query = `INSERT INTO grupo_estudiante(id_grupo,id_estudiante,estado) VALUES`;
      for (let i = 0; i < arregloEstudiantes.length; i++) {
        query += `(${id_grupo},${arregloEstudiantes[i]},'En curso'),`
      }
      query = query.slice(0, -1);
      const result = await pool.query(query,
        (err, resulset, fields) => {
          if (err) {
            res.json({ state: 0, message: "Error inesperado", error: err });
            console.log(err);
          } else {
            res.json({ state: 1, message: resulset });
            console.log(resulset);
          }
        });
    } catch (e) {
      res.status(500).json({ state: 0, message: "Bad", error: e });
    }
  },
  registerGroupSubject: async (req, res) => {
    try {
      const { id_materia, id_docente } = req.body;
      const arregloGrupos = Object.keys(req.body.arregloGrupos);

      let query = `INSERT INTO grupo_materia (id_materia, id_grupo, id_docente) VALUES`;
      for (let i = 0; i < arregloGrupos.length; i++) {
        query += `(${id_materia},${arregloGrupos[i]},${id_docente}),`
      }
      query = query.slice(0, -1);
      const result = await pool.query(query);
      res.status(201).json({ state: 1, message: result });
    } catch (e) {
      res.status(500).json({ state: 0, message: "Bad", error: e });
    }
  },
  registerModelsEval: async (req, res) => {
    try {

      const { id_materia } = req.body;
      const arregloGrupos = Object.keys(req.body.arregloGrupos);

      let estudiantesQuery = `SELECT grupo_estudiante.id_estudiante, grupo_estudiante.id_grupo FROM grupo_estudiante WHERE`;

      for (let i = 0; i < arregloGrupos.length; i++) {
        estudiantesQuery += ` grupo_estudiante.id_grupo = ${arregloGrupos[i]} or`;
      }
      estudiantesQuery = estudiantesQuery.slice(0, -2);

      const resEstudiantesGrupo = await pool.query(estudiantesQuery);
      let query = `INSERT INTO modelo_evaluacion (seguimiento, autoevaluacion, coevaluacion, evaluacion_periodo, id_estudiante, id_materia) VALUES`
      for (let i = 0; i < resEstudiantesGrupo.rows.length; i++) {
        query += `(0,0,0,0,${resEstudiantesGrupo.rows[i].id_estudiante},${id_materia}),`
      }
      query = query.slice(0, -1);

      const result = await pool.query(query);
      res.status(201).json({ state: 1, message: result });

    } catch (e) {
      console.log(e)
      res.status(500).json({ state: 0, message: "Bad", error: e });
    }
  },

  reportAverageSubject: (req, res) => {
    const {materia} = req.params;
    try {
      pool.query(`select materia.nombre, modelo_evaluacion.seguimiento, modelo_evaluacion.autoevaluacion, modelo_evaluacion.coevaluacion, modelo_evaluacion.evaluacion_periodo from materia inner join modelo_evaluacion on materia.id = modelo_evaluacion.id_materia where materia.nombre = '${materia}';`, (err, resulset, fields) => {
        if (err) {
          res.json({ message: 'Se ha generado un error' });
          console.log(err);
        } else {
          res.json(resulset.rows);
          console.log(resulset.rows)
        }
      })
    } catch (e) {
      res.json({ message: 'Error' })
      console.log(e)
    }
  },
  reportAverageGroup: async (req, res) => {
    try {
      const { codigo_grupo } = req.params;
      const query =  await pool.query(`SELECT grupo.codigo as grupo, modelo_evaluacion.seguimiento, modelo_evaluacion.autoevaluacion, modelo_evaluacion.coevaluacion, modelo_evaluacion.evaluacion_periodo FROM grupo INNER JOIN grupo_estudiante on grupo.id = grupo_estudiante.id_grupo INNER JOIN estudiante on grupo_estudiante.id_estudiante = estudiante.id INNER join modelo_evaluacion on modelo_evaluacion.id_estudiante = estudiante.id WHERE grupo.codigo = '${codigo_grupo}';`)
      console.log(query);
      res.status(200).send(query.rows);
    } catch (e) {
      res.status(500).json({ message: 'Error' });
      console.log('cath');
      console.log(e)
    }
  },
  reportAverageGroupGrade: (req,res)=>{    
    try {
      const { grado } = req.params;
      pool.query(`SELECT estudiante.grado, modelo_evaluacion.seguimiento, modelo_evaluacion.autoevaluacion, modelo_evaluacion.coevaluacion, modelo_evaluacion.evaluacion_periodo FROM estudiante INNER join modelo_evaluacion on modelo_evaluacion.id_estudiante = estudiante.id WHERE estudiante.grado = '${grado}';`, (err, resulset, fields) => {
        if (err) {
          res.json({ message: 'Se ha generado un error' });
          console.log(err);
        } else {
          res.json(resulset);
          console.log(resulset);
        }
      })
    } catch (e) {
      res.json({ message: 'Error' })
      console.log(e)
    }
  }
};
