import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import api from "../axios/axios";
import swal from "sweetalert2";
import { saveToLocal,getFromLocal } from '../functions/localStorage';


const GroupRegistration = () => {
  const [teacher, setTeacher] = useState([]);
  const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Administrador'){
        window.location.href="/";
    }
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

  const nextGroupStudents = () => {
    
    let id_director_grupo = document.querySelector('#nombre_docente').value;
    const jornada = document.querySelector('#jornada').value;
    const grado = document.querySelector('#grado').value;
    id_director_grupo=id_director_grupo.split(". ");
    id_director_grupo=id_director_grupo[0];
    saveToLocal('id_director_grupo', id_director_grupo); 
    saveToLocal('grado', grado);
    if(grado!=='Grado' && id_director_grupo!=='---Selecciona el director de grupo---' && jornada!=='Jornada'){
      const data = {
        id_director_grupo: id_director_grupo,
        jornada: jornada,
        grado: grado
      }
      swal.fire({
        title: "No podrá modificar estos campos luego",
        text: "¿Está seguro?",
        icon: "warning",
        confirmButtonText: "¡Entendido!",
        cancelButtonText: "Cancelar",
        cancelButtonColor: '#d33',
        showCancelButton: true
      })
      .then((willDelete) => {
        if (willDelete.isConfirmed) {       
          api.post('/register_groups',data).then((res)=>{
            if(res.status === 201){
              console.log(res.data);
              saveToLocal('id_grupo', res.data.message[0].id);
              console.log(res.data.message[0].id);
              window.location.href="/grupo-estudiantes";
            }else{
              swal.fire({
                title: "Ha ocurrido un error",
                text: "Por favor reintente o vuelva después",
                icon: "error",
                confirmButtonText: "¡Entendido!",
                confirmButtonColor: "#f96332"
              });      
            }
          })
        }
      });
      
    }else{
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
      <div className="container d-flex container_intro_home mb-5">
        <h4 className="intro_home mt-2 text-white mx-auto">
          Esta sección está destinada a generar la distribuición de los grupos
            </h4>
      </div>
      <Card className='mx-auto my-5 p-5' style={{ width: '40rem' }}>
        <div className='mx-auto text-center '>
          <h3>Registro de Grupos</h3>
        </div>
        <form className="mb-4">
          <div className="mb-0">
            <Form.Control as="select" required name="rol" id='nombre_docente' className="shadow-lg my-3">
              <option>---Selecciona el director de grupo---</option>
              {teacher.map((item) =>
                <option key={item.id}>{item.id}. {item.nombre_completo}</option>
              )};
            </Form.Control>
            <Form.Control as="select" className="my-3" id="jornada"  >
              <option>Jornada</option>
              <option>AM</option>
              <option>PM</option>
            </Form.Control>
            <Form.Control as="select" className="my-3" id="grado" >
              <option>Semestre</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Form.Control>
          </div>
        </form>
        <div className="d-flex justify-content-center align-items-center">
          <a href="/admin" className='m-auto'><Button variant='info' className='mt-4 px-5'><b>Regresar</b></Button></a>
          <a className='m-auto' onClick={nextGroupStudents}><Button variant='success' className='mt-4 px-5' ><b>Siguiente</b></Button></a>
        </div>
      </Card>
    </section>
  );
};
export default GroupRegistration;
