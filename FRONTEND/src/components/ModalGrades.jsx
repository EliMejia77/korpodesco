import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getFromLocal} from "../functions/localStorage";
import api from "../axios/axios";
import { Formik } from "formik";

const ModalGrades = () => (
    <Formik
        initialValues={{
            seguimiento: "",
            autoevaluacion: "",
            coevaluacion: "",
            evaluacionPeriodo: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500)
        }}
        validate={(values) => {
            let errors = {};
            const seguRegex = /^(?:\d+(?:\.\d*)?|\.\d+)(?:,(?:\d+(?:\.\d*)?|\.\d+))*$/;
            if (!seguRegex.test(values.seguimiento)) {
                errors.seguimiento = "Ingresa un valor válido";
            }
            const numberRegex = /^\d*\.?\d*$/;
            if (!numberRegex.test(values.autoevaluacion)) {
                errors.autoevaluacion = "Ingresa un valor válido";
            }
            if (!numberRegex.test(values.coevaluacion)) {
                errors.coevaluacion = "Ingresa un valor válido";
            }
            if (!numberRegex.test(values.evaluacionPeriodo)) {
                errors.evaluacionPeriodo = "Ingresa un valor válido";
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
                <section className="my-5">
                    <Card
                        className="mx-auto my-5 p-5"
                        style={{ width: "75vw" }}
                        onSubmit={handleSubmit}
                    >
                        <Card.Header>
                            <Card.Title>
                                Registrar notas {getFromLocal("subject")} de {getFromLocal("group")}
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <h4>Notas de {getFromLocal("nombre_estudiante")}</h4>
                            <br />
                            <p>
                                <b>OBSERVACIÓN: </b>Recuerda ingresar las notas de seguimiento
                                separadas por comas "," (3.2, 4.5, ...) y que se deben ingresar
                                todos los campos en un único registro.
                            </p>
                            <br />
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Seguimiento</th>
                                        <th scope="col">Autoevaluación</th>
                                        <th scope="col">Coevaluación</th>
                                        <th scope="col">Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type="text"
                                                name="seguimiento"
                                                id="input-seguimiento"
                                                className={
                                                    errors.seguimiento &&
                                                    touched.seguimiento &&
                                                    "error" &&
                                                    "col"
                                                }
                                                value={values.seguimiento}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.seguimiento && touched.seguimiento && (
                                                <div className="mt-2 input-feedback">
                                                    {errors.seguimiento}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="input-autoevaluacion"
                                                name="autoevaluacion"
                                                className={
                                                    errors.autoevaluacion &&
                                                    touched.autoevaluacion &&
                                                    "error" &&
                                                    "col-7"
                                                }
                                                value={values.autoevaluacion}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.autoevaluacion && touched.autoevaluacion && (
                                                <div className="mt-2 input-feedback">
                                                    {errors.autoevaluacion}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="input-coevaluacion"
                                                name="coevaluacion"
                                                className={
                                                    errors.coevaluacion &&
                                                    touched.coevaluacion &&
                                                    "error" &&
                                                    "col-7"
                                                }
                                                value={values.coevaluacion}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.coevaluacion && touched.coevaluacion && (
                                                <div className="mt-2 input-feedback">
                                                    {errors.coevaluacion}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="input-evaluacion-periodo"
                                                name="evaluacionPeriodo"
                                                className={
                                                    errors.evaluacionPeriodo &&
                                                    touched.evaluacionPeriodo &&
                                                    "error" &&
                                                    "col-7"
                                                }
                                                value={values.evaluacionPeriodo}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.evaluacionPeriodo &&
                                                touched.evaluacionPeriodo && (
                                                    <div className="mt-2 input-feedback">
                                                        {errors.evaluacionPeriodo}
                                                    </div>
                                                )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                        <div className="mx-auto">
                            <a
                                href="/ver-notas"
                                className="mx-4"
                                onClick={(event) => {
                                    const seg = document.querySelector('#input-seguimiento').value;
                                    const autoev = document.querySelector('#input-autoevaluacion').value;
                                    const coev = document.querySelector('#input-coevaluacion').value;
                                    const evalFinal = document.querySelector('#input-evaluacion-periodo').value;
                                    api.patch(`editar-notas/`, {
                                        "seguimiento": seg,
                                        "autoevaluacion": autoev,
                                        "coevaluacion": coev,
                                        "evaluacion_periodo": evalFinal,
                                        "id_estudiante": getFromLocal("id_estudiante"),
                                        "id_materia": getFromLocal("id_materia")
                                    }).then((res) => {
                                        console.log(res)
                                    })
                                }}
                            >
                                <Button
                                    variant="success"
                                    className="mt-4 px-5"
                                    disabled={isSubmitting}

                                >
                                    <b>Guardar</b>
                                </Button>
                            </a>
                            <a href="/ver-notas" className="mx-4">
                                <Button variant="danger" className="mt-4 px-5">
                                    <b>Cancelar</b>
                                </Button>
                            </a>
                        </div>
                    </Card>
                </section>
            );
        }}
    </Formik>
);

export default ModalGrades;