import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import api from '../axios/axios';
import swal from "sweetalert2";
import { saveToLocal } from "../functions/localStorage";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

const Login = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}
    validate={(values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Requerido";
      } else if (!EmailValidator.validate(values.email)) {
        errors.email = "Correo inválido";
      }
      const passwordRegex = /(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9])/;
      if (!values.password) {
        errors.password = "Requerido";
      } else if (values.password.length < 8) {
        errors.password = "La contraseña debe tener 8 caracteres";
      } else if (!passwordRegex.test(values.password)) {
        errors.password =
          "Contraseña inválida. Debe contener un número, una mayúscula, una minúscula y un caracter especial";
      }
      return errors;
    }}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;

      return (
        <section className="container-fluid w-100">
          <div className="container d-flex container_intro_home mb-5">
            <h4 className="intro_home mt-2 text-white">
              Bienvenido a la plataforma académica de Korpodesco, en esta
              plataforma se encuentran diferentes servicios para la comunidad
              educativa y dependiendo de su rol en la institución, podrán
              acceder a ellos.
            </h4>
          </div>

          <Card
            style={{ width: "25rem" }}
            className="col-8 mx-auto mt-2 mb-5 container-fluid"
          >
            <Card.Title className="mt-3 mx-auto">Inicia tu sesión</Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  as="select"
                  required
                  name="rol"
                  id="rol"
                  className="shadow-lg my-3 mb-5"
                >
                  <option>---Selecciona tu rol---</option>
                  <option>Estudiante</option>
                  <option>Docente</option>
                  <option>Administrador</option>
                </Form.Control>
                <Form.Control
                  required
                  name="email"
                  type="text"
                  placeholder="Correo"
                  className={
                    errors.email && touched.email && "error" && "shadow-lg my-3"
                  }
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
                <Form.Control
                  required
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  className={
                    errors.password &&
                    touched.password &&
                    "error" &&
                    "shadow-lg my-3"
                  }
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form>
              <div className="mx-auto d-flex">
                <Button
                  variant="primary"
                  className="shadow-lg mt-4 mx-auto"
                  disabled={isSubmitting}
                  onClick={(event) => {
                    const rol=document.querySelector('#rol').value;
                    if(values['email']!=='' &&values['password']!=='' && rol!=='---Selecciona tu rol---'){
                      event.preventDefault();
                      api.post("http://34.66.222.19:8083/", {
                        correo: values.email,
                        contrasena: values.password,
                        rol: rol
                      }).then((res) => {
                          if (res.data.message === "Info incorrecta") {
                            swal.fire({
                              title: "Información incorrecta",
                              text: "Los datos que ingresó no están registrados",
                              icon: "error",
                              confirmButtonText: "¡Entendido!",
                              confirmButtonColor: "#f96332"
                            });
                            console.log(res.data);
                          } else {
                            console.log(res.data);
                            const id = res.data.resulset.rows[0]['id'];
                            const nombre = res.data.resulset.rows[0]['nombre_completo'];
                            saveToLocal('id', id);
                            saveToLocal('nombre_completo', nombre);
                            saveToLocal('rol_inicio_s', rol);
                            if (rol === "Estudiante") {
                              window.location.href = "/estudiante";
                            } else if (rol === "Docente") {
                              window.location.href = "/docente";
                            } else if (rol === "Administrador") {
                              window.location.href = "/admin";
                            }
                          }
                        });
                    }else{
                      swal.fire({
                            title: "Información incorrecta",
                            text: "Por favor llene todos los campos",
                            icon: "error",
                            confirmButtonText: "¡Entendido!",
                            confirmButtonColor: "#f96332"
                        });
                    }
                  }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="danger"
                  className="shadow-lg mt-4 mx-auto"
                  onClick={window.close}
                >
                  Salir
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      );
    }}
  </Formik>
);

export default Login;
