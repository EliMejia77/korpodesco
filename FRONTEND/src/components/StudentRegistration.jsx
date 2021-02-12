import React, { useState, useEffect } from "react";
import api from "../axios/axios";
import swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getFromLocal } from "../functions/localStorage";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const StudentRegistration = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    criteriaMode: "all",
  });
  const rol_inicio_s = getFromLocal("rol_inicio_s");
  if (rol_inicio_s !== "Administrador") {
    window.location.href = "/";
  }
  const [fileImg, setFileImg] = useState("");
  const [fileDoc, setFileDoc] = useState("");
  const [docname, setDocname] = useState("Cargar Documento");
  const [imgname, setImgname] = useState("Cargar Imagen");
  const [pathImg, setPathImg] = useState("");
  const [pathDoc, setPathDoc] = useState("");
  const [userData, setUserData] = useState({});
  useEffect(() => {});

  const onChangeImg = (e) => {
    setFileImg(e.target.files[0]);
    console.log(e.target.files[0]);
    setImgname(e.target.files[0].name);
    console.log(e.target.files[0].name);
  };
  const onChangeDoc = (e) => {
    setFileDoc(e.target.files[0]);
    console.log(e.target.files[0]);
    setDocname(e.target.files[0].name);
    console.log(e.target.files[0].name);
  };

  const onSubmitDoc = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("doc", fileDoc, docname);
    try {
      const res = await api.post("/send-doc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status === 0) {
        setFileDoc("");
        setDocname("Cargue un archivo válido...");
      } else {
        setPathDoc(res.data.message.path);
        swal.fire({
          title: "¡Documento subido!",
          text: "Puede continuar",
          icon: "success",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#54e346",
        });
      }
    } catch (err) {
      alert("Error en el servidor");
    }
  };
  const onSubmitImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", fileImg, imgname);
    try {
      const res = await api.post("/send-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === 0) {
        setFileImg("");
        setImgname("Cargue un archivo válido...");
      } else {
        setPathImg(res.data.message.path);
        swal.fire({
          title: "¡Imagen subida!",
          text: "Puede continuar",
          icon: "success",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#54e346",
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = (data) => {

    const userTarjeta = document.querySelector("#tipo_documento");
    const userSexo = document.querySelector("#sexo");
    const userGrado = document.querySelector("#grado");


    var cont = 0;
    if(userTarjeta.value==='Tipo de documento' || userSexo.value==='Sexo'|| userGrado.value==='Grado'){
      swal.fire({
        title: "Faltan campos por seleccionar",
        text: "Por favor ingrese todos los campos",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#f96332",
      });
    }else{
      cont++;
    }
    if(pathImg==='' || pathDoc==='' && cont===1){
      swal.fire({
        title: "Debes carcar la imagen y/o documento",
        text: "Por favor cargue y presione en upload",
        icon: "error",
        confirmButtonText: "¡Entendido!",
        confirmButtonColor: "#f96332",
      });
    }else{
      cont++;
    }

    if(cont===2) sendInfo();

  };

  function insertUser(e) {
    let name = e.target.id;
    let value = e.target.value;
    setUserData((state) => ({
      ...userData,
      [name]: value,
    }));
    console.log(userData);
  }

  const sendInfo = () => {
    console.log(userData);
    const data = {
      documento: userData.documento,
      nombre_completo: userData.nombre_completo,
      contrasena: userData.contrasena,
      correo: userData.correo,
      rol: "Estudiante",
      estado: "Activo",
      tipo_documento: userData.tipo_documento,
      sexo: userData.sexo,
      fecha_nacimiento: userData.fecha_nacimiento,
      direccion: userData.direccion,
      ciudad: userData.ciudad,
      telefono: userData.telefono,
      celular: userData.celular,
      grado: userData.grado,
      url_foto: pathImg,
      url_doc_identidad: pathDoc,
    };

    //Envio de correo y registro en BD
    api.post("/sendEmail", data).then((res) => {
      if (res.state === 0) {
        alert(
          "No se pudo enviar la confimación de credenciales al correo proporcionado"
        );
      }else{
        api.post("/register_student", data).then((res) => {
          if (res.data.state === 0) {
            swal.fire({
              title: "Error 500",
              text: "Por favor reintente o vuelva después",
              icon: "error",
              confirmButtonText: "¡Entendido!",
              confirmButtonColor: "#f96332",
            });
            console.log(res.data);
          } else {
            console.log(res.data);
            swal.fire({
              title: "¡Estudiante registrado con éxito!",
              icon: "success",
              confirmButtonText: "¡Entendido!",
              confirmButtonColor: "#54e346",
            });
            clearFields();
          }
        });
      }
    });

    
  };

  const clearFields = () => {
    const userName = document.querySelector("#nombre_completo");
    const userDocument = document.querySelector("#documento");
    const userEmail = document.querySelector("#correo");
    const userPassword = document.querySelector("#contrasena");
    const userTarjeta = document.querySelector("#tipo_documento");
    const userSexo = document.querySelector("#sexo");
    const userFechaNacimiento = document.querySelector("#fecha_nacimiento");
    const userDireccion = document.querySelector("#direccion");
    const userCiudad = document.querySelector("#ciudad");
    const userTelefono = document.querySelector("#telefono");
    const userCelular = document.querySelector("#celular");
    const userGrado = document.querySelector("#grado");

    const userInputs = [
      userName,
      userDocument,
      userEmail,
      userPassword,
      userTarjeta,
      userSexo,
      userFechaNacimiento,
      userDireccion,
      userCiudad,
      userTelefono,
      userCelular,
      userGrado,
    ];
    for (const input of userInputs) {
      input.value = "";
    }

    userTarjeta.value = "Tipo de documento";
    userSexo.value = "Sexo";
    userGrado.value = "Grado";

    setImgname("Cargar Imagen");
    setDocname("Cargar Documento");
  };

  return (
    <section className="container-fluid w-100">
      <Card className="mx-auto my-5 p-5" style={{ width: "40rem" }}>
        <div className="mx-auto text-center ">
          <h3>Registro de Estudiantes </h3>
        </div>
        <form className="mb-4">
          <div className="mb-0">
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
              }}
            />
            <input
              name="documento"
              type="text"
              className="form-control my-3"
              id="documento"
              placeholder="Documento de identidad"
              onChange={insertUser}
              ref={register({
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "Mínimo 6 caracteres",
                },
                maxLength: {
                  value: 10,
                  message: "Máximo 10 caracteres",
                },
                pattern: {
                  value: /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/g,
                  message:
                    "La longitud del documento debe ser 8, 10 o 11 dígitos y/o deben ser números",
                },
              })}
            />

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
              }}
            />

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
                  message: "Ingrese un correo válido",
                },
              })}
            />
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
              }}
            />

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

            <Form.Control
              as="select"
              id="tipo_documento"
              className="my-3"
              onChange={insertUser}
            >
              <option>Tipo de documento</option>
              <option>TI</option>
              <option>CC</option>
              <option>NUIP</option>
            </Form.Control>
            <Form.Control
              as="select"
              id="sexo"
              className="my-3"
              onChange={insertUser}
            >
              <option>Sexo</option>
              <option>Femenino</option>
              <option>Masculino</option>
              <option>Otro</option>
            </Form.Control>
            <input
              name="fecha_nacimiento"
              type="text"
              className="form-control my-3"
              id="fecha_nacimiento"
              placeholder="Fecha de nacimiento"
              onChange={insertUser}
              ref = {register({
                required: "Este campo es obligatorio",
                pattern: {
                  value:  /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/ ,
                  message: "La estructura de la fecha debe ser dd/mm/yyy"
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="fecha_nacimiento"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>
            <input
              name="direccion"
              type="text"
              className="form-control my-3"
              id="direccion"
              placeholder="Direccion"
              onChange={insertUser}
              ref = {register({
                required: "Este campo es obligatorio",
                pattern: {
                  value:  /^(Autopista|Avenida|Avenida Calle|Avenida Carrera|Avenida|Carrera|Calle|Carrera|Circunvalar|Diagonal|Kilometro|Transversal|AUTOP|AV|AC|AK|CL|KR|CCV|DG|KM|TV)(\s)?([a-zA-Z]{0,15}|[0-9]{1,3})(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(#(\s)?[0-9]{1,2}(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(-)?(\s)?[0-9]{1,3}(\s)?(Este|Norte|Occidente|Oeste|Sur)?)?((\s)?(Agrupación|Altillo|Apartamento|Apartamento Sótano|Barrio|Bloque|Bodega|Cabecera Municipal|Callejón|Camino|Carretera|Casa|Caserio|Célula|Centro|Centro Comercial|Centro Urbano|Circular|Condominio|Conjunto|Consultorio|Corregimiento|Deposito|Deposito |Sótano|Edificio|Entrada|Esquina|Etapa|Finca|Garaje|Garaje Sótano|Grada|Inferior|Inspección de Policia|Interior|Kilometro|Local|Local Mezzanine|Local Sótano|Lote|Manzana|Manzanita|Mejora|Mezzanine|Módulo|Municipio|Núcleo|Oficina|Oficina Sótano|Parcela|Parcelación|Pasaje|Penthouse|Piso|Porteria|Predio|Principal|Puente|Quebrada|Salon|Sector|Semisótano|Suite|Supermanzana|Terraza|Torre|Troncal|Unidad|Urbanización|Vereda|Via|Zona|AGN|AL|APTO|AS|BR|BL|BG|CM|CLJ|CN|CT|CA|CAS|CEL|CE|CECO|CEUR|CIR|CDM|CONJ|CS|CO|DP|DS|ED|EN|ESQ|ET|FCA|GJ|GS|GR|INF|IP|IN|KM|LC|LM|LS|LT|MZ|MZTA|MJ|MN|MD|MUN|NCO|OF|OS|PA|PCN|PSJ|PH|PI|PT|PD|PPAL|PN|QDA|SA|SEC|SS|SU|SMZ|TZ|TO|TRL|UN|URB|VDA|VIA|ZN)?(\s)?[1-9][0-9]{0,3})*$/i,
                  message: "Ingrese una direccion válida"
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="direccion"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>
            <input
              name="ciudad"
              type="text"
              className="form-control my-3"
              id="ciudad"
              placeholder="Ciudad"
              onChange={insertUser}
              ref = {register({
                required: "Este campo es obligatorio"
              })}
            />
            <ErrorMessage
              errors={errors}
              name="ciudad"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>

            <input
              name="telefono"
              type="text"
              className="form-control my-3"
              id="telefono"
              placeholder="Telefono"
              onChange={insertUser}
              ref = {register({
                required: "Este campo es obligatorio",
                minLength:{
                  value: 7,
                  message:"El telefono tiene que tener solo 7 digitos"
                },
                maxLength:{
                  value: 7,
                  message:"El telefono tiene que tener solo 7 digitos"
                }
              })}/>

              <ErrorMessage
              errors={errors}
              name="telefono"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>
            <input
              name="celular"
              type="text"
              className="form-control my-3"
              id="celular"
              placeholder="Celular"
              onChange={insertUser} 
              ref = {register({
                required: "Este campo es obligatorio",
                minLength:{
                  value: 10,
                  message:"El telefono tiene que tener solo 11 digitos"
                },
                maxLength:{
                  value: 10,
                  message:"El telefono tiene que tener solo 11 digitos"
                }
              })}          
            />

          <ErrorMessage
              errors={errors}
              name="celular"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}/>


            <Form.Control
              as="select"
              id="grado"
              className="my-3"
              onChange={insertUser}
            >
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
        <form onSubmit={onSubmitDoc}>
          <div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChangeDoc}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {docname}
              </label>
            </div>
            <input
              type="submit"
              value="Cargar"
              className="btn btn-primary btn-block mt-4"
            />
          </div>
        </form>
       
        <form onSubmit={onSubmitImg}>
          <div>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="customFile1"
                onChange={onChangeImg}
              />
              <label className="custom-file-label" htmlFor="customFile1">
                {imgname}
              </label>
            </div>
            <input
              type="submit"
              value="Cargar"
              className="btn btn-primary btn-block mt-4"
            />
          </div>
        </form>

        <div className="d-flex justify-content-center align-items-center">
          <a href="/admin" className="m-auto">
            <Button variant="info" className="mt-4 px-5">
              <b>Regresar</b>
            </Button>
          </a>
          <a href="#" className="m-auto">
            <Button
              variant="success"
              className="mt-4 px-5"
              onClick={handleSubmit(onSubmit)}
            >
              <b>Guardar</b>
            </Button>
          </a>
        </div>
      </Card>
    </section>
  );
};

export default StudentRegistration;
