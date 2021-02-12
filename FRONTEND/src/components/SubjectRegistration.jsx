import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import api from "../axios/axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { getFromLocal, saveToLocal } from '../functions/localStorage';

const SubjectRegistration = () => {
  const rol_inicio_s = getFromLocal('rol_inicio_s');
  if (rol_inicio_s !== 'Administrador') {
    window.location.href = "/";
  }
  const [userData, setUserData] = useState({ primero: "false", segundo: "false", tercero: "false", cuarto: "false", quinto: "false", sexto: "false" });
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    teacherForGroup()
  }, []);

  const teacherForGroup = () => {
    api.get(`/registro-grupo`).then(
      (res) => {
        setTeacher(res.data.rows)
      }
    );
  }

  function grade(e) {
    let name = e.target.id;
    let value = "";
    if (name === "nombre_materia") { value = e.target.value }
    else {
      value = "false";
      if (e.target.checked) { value = "true" }
    }
    setUserData((state) => ({
      ...userData,
      [name]: value
    }));

  }

  function sendInfo(e) {
    e.preventDefault();
    let id_docente = document.querySelector('#nombre_docente').value;
    if (id_docente !== '---Selecciona el Profesor---' && userData.nombre_materia !== '') {
      id_docente = id_docente.split(". ");
      id_docente = id_docente[0];
      console.log(userData);
      const data = {
        nombre: userData.nombre_materia,
        primero: userData.primero,
        segundo: userData.segundo,
        tercero: userData.tercero,
        cuarto: userData.cuarto,
        quinto: userData.quinto,
        sexto: userData.sexto
      };
      swal.fire({
        title: "No podrá modificar estos campos luego",
        text: "¿Está seguro?",
        icon: "warning",
        confirmButtonText: "¡Entendido!",
        cancelButtonText: "Cancelar",
        cancelButtonColor: '#d33',
        showCancelButton: true
      }).then((willDelete) => {
        if (willDelete.isConfirmed) {
          saveToLocal('id_docente', id_docente);
          api.post('/register-subject', data).then((res) => {
            if (res.state === 0) {
              swal.fire({
                title: "Ha ocurrido un error",
                text: "Por favor reintente o vuelva después",
                icon: "error",
                confirmButtonText: "¡Entendido!",
                confirmButtonColor: "#f96332"
              });
            } else {
              saveToLocal('id_materia', res.data.message[0].id);
              window.location.href = "/grupo-materias";
            }
          });
        }
      })
    } else{
      swal.fire({
        title: "Información incorrecta",
        text: "¡Especifique todos los campos!",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#f96332"
      });  
    }
  }

  return (
    <section className="container-fluid w-100">
      <Card className='mx-auto my-5 p-5' style={{ width: '25rem' }}>
        <div className='mx-auto text-center '>
          <h3>Registro de Materias</h3>
        </div>
        <form className="mb-4">
          <Form.Control as="select" required name="rol" id='nombre_docente' className="shadow-lg my-3">
            <option>---Selecciona el docente del grupo---</option>
            {teacher.map((item) =>
              <option key={item.id}>{item.id}. {item.nombre_completo}</option>
            )};
            </Form.Control>
          <div className="mb-0">
            <input
              type="email"
              className="form-control my-3"
              id="nombre_materia"
              aria-describedby="emailHelp"
              placeholder="Nombre de la materia"
              onChange={grade}
            />
            <div className="form-check" id="primero">
              <input className="form-check-input" type="checkbox" value="true" id="primero" onChange={grade} />
              <label className="form-check-label" htmlFor="flexCheckDefault" >
                Primero
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="true" id="segundo" onChange={grade} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Segundo
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="true" id="tercero" onChange={grade} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Tercero
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="true" id="cuarto" onChange={grade} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Cuarto
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="true" id="quinto" onChange={grade} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Quinto
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="true" id="sexto" onChange={grade} />
              <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                Sexto
              </label>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-center align-items-center">
          <a href="/admin" className='m-auto'><Button variant='info' className='mt-4'><b>Regresar</b></Button></a>
          <a className='m-auto'><Button variant='success' className='mt-4' onClick={sendInfo}><b>Guardar</b></Button></a>
        </div>
      </Card>
    </section>
  );
};

export default SubjectRegistration;