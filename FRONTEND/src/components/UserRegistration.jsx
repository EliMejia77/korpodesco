import React, { useState, useEffect } from "react";
import api from "../axios/axios";
import swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getFromLocal } from "../functions/localStorage";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const UserRegistration = () => {
  const { register, handleSubmit, watch, errors } = useForm({criteriaMode: "all"});


  const rol_inicio_s = getFromLocal("rol_inicio_s");
  if (rol_inicio_s !== "Administrador") {
    window.location.href = "/";
  }
  const [userData, setUserData] = useState({});
  useEffect(() => {});
  function insertUser(e) {
    let name = e.target.id;
    let value = e.target.value;
    setUserData((state) => ({
      ...userData,
      [name]: value,
    }));
    console.log(userData);
  }

  const onSubmit = (data) => {
    console.log(data);
    const userRole = document.querySelector('#rol').value;
    console.log(userRole);
    if(userRole!=='Rol'){guardarUsuario()
    }else{
      swal.fire({
        title: "Error en el rol",
        text: "Por favor seleccione el rol",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#f96332"
      });
    }
  }

  const guardarUsuario = () => {
      const data = {
        documento: userData.documento,
        nombre_completo: userData.nombre_completo,
        contrasena: userData.contrasena,
        correo: userData.correo,
        rol: userData.rol,
        estado: "Activo"
      }
      api.post('/register_user',data).then((res) => {
        if (res.data.state ===0) {
          swal.fire({
            title: "Error 500",
            text: "Por favor reintente o vuelva después",
            icon: "error",
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#f96332"
          });
          console.log(res.data);
        } else {
          swal.fire({
            title: "Usuario creado correctamente",
            icon: "success",
            confirmButtonText: "¡Entendido!",
            confirmButtonColor: "#54e346"
          });

          api.post('/sendEmail',data).then((res)=>{
            if(res.state === 0){
              alert('No se pudo enviar la confimación de credenciales al correo proporcionado');
            }
            clearFields();
          }); 
        }
      });
  }

  const clearFields = () => {
    const userName = document.querySelector('#nombre_completo');
    const userDocument = document.querySelector('#documento');
    const userEmail = document.querySelector('#correo');
    const userPassword = document.querySelector('#contrasena');
    const userRole = document.querySelector('#rol');

    const userInputs = [userName, userDocument, userEmail, userPassword, userRole]

    for (const input of userInputs) {
      input.value = ''
    }

    userRole.value = 'Rol';
  }
  
  return (
    <section className="container-fluid w-100">
      <Card className="mx-auto my-5 p-5" style={{ width: "40rem" }}>
        <div className="mx-auto text-center ">
          <h3>Registro de Usuarios</h3>
        </div>
        <form className="mb-4">
          <div className="mb-0">
            <Form.Control
              as="select"
              className="my-3"
              id="rol"
              onChange={insertUser}>
              <option>Rol</option>
              <option>Docente</option>
              <option>Administrador</option>
              
            </Form.Control>
            <input
              name="nombre_completo"
              type="text"
              className="form-control my-3"
              id="nombre_completo"
              aria-describedby="emailHelp"
              placeholder="Nombre Completo"
              onChange={insertUser}
              ref={register({
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/g,
                  message: "Solo caracteres alfanumericos",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nombre_completo"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>

            <input
              name="documento"
              type="text"
              className="form-control my-3"
              id="documento"
              placeholder="Documento de identidad"
              onChange={insertUser}
              ref={register({
                required: "Este campo es obligatorio",
                minLength:{
                  value:6,
                  message:"Mínimo 6 caracteres"
                },
                maxLength:{
                  value:10,
                  message:"Máximo 10 caracteres"
                },
                pattern: {
                  value: /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/g,
                  message: "La longitud del documento debe ser 8, 10 o 11 dígitos y/o deben ser números"
                }
              })}/>

            <ErrorMessage
              errors={errors}
              name="documento"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>

            <input
              name="email"
              type="email"
              className="form-control my-3"
              id="correo"
              placeholder="Correo"
              onChange={insertUser}
              ref={register({
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: "Ingrese un correo válido"
                }
              })} />
              <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>

            <input
              name="password"
              type="password"
              className="form-control my-3"
              id="contrasena"
              placeholder="Contraseña"
              onChange={insertUser}
              ref = {register({
                required: "Este campo es obligatorio",
                pattern: {
                  value:  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/ ,
                  message: "La contraseña debe tener mínimo 8 caracteres, mínimo una mayuscula, mínimo una mayuscula y mínimo un digito."
                }
              })}
              />

            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>
          </div>

        </form>
        <div className="d-flex justify-content-center align-items-center">
          <a href="/admin" className='m-auto'><Button variant='info' className='mt-4 px-5'><b>Regresar</b></Button></a>
          <a className='m-auto'><Button variant='success' className='mt-4 px-5' onClick={handleSubmit(onSubmit)}><b>Guardar</b></Button></a>
        </div>
      </Card>
    </section>
  );
};
export default UserRegistration;
