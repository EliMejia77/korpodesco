import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import { getFromLocal, saveToLocal, removeFromLocal } from '../functions/localStorage';
import api from '../axios/axios';
import swal from "sweetalert2";

export default function ReportStudentGrade() {
    const [materia, setMateria] = useState([]);
    useEffect(() => {
        removeFromLocal('nombre_Materia_Reporte');  
        removeFromLocal('grado_Reporte');  
        callGrades();
    },[]);
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Administrador'){
    window.location.href="/";
    }
    const callGrades=()=>{
        api.get('/reporte-estudiantes-asignatura').then(
            (res)=>{
                setMateria(res.data);
            }
        )
    }
    return (
        <section className="container-fluid w-100">
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>Sección para ver la cantidad de estudiantes según el semestre y la materia</h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '27rem' }}>
            <div className='mx-auto text-center mb-4'>
                    <h3>
                        Escoja un semestre y una materia
                    </h3>
                </div>
                <Form className="mb-4">
                    <div className="mb-0">
                        <Form.Control as="select" required name="rol" id='grado' className="shadow-lg my-3">
                            <option>Semestre</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </Form.Control>
                        <Form.Control as="select" required name="materia" id='materia' className="shadow-lg my-3">
                            <option>Materia</option>
                            {materia.map((item)=><option key={item.id}>{item.nombre}</option>)}
                        </Form.Control>
                    </div>
                </Form>
                <div className="d-flex justify-content-center align-items-center">
                    <a href="/reporte-final" className='m-auto'><Button variant='info' className='mt-4 px-4'><b>Regresar</b></Button></a>
                    <a className='m-auto' onClick={(e)=>{
                        const materias=document.querySelector('#materia').value;
                        const grado=document.querySelector('#grado').value;
                        if (grado!=='Grado' && materias!=='Materia'){
                            saveToLocal("nombre_Materia_Reporte",materias);
                            saveToLocal("grado_Reporte",grado);
                            window.location.href="/estudiantes-asignatura";
                        }else{
                            swal.fire({
                                title: "Ha ocurrido un error",
                                text: "Por favor ingrese la información solicitada",
                                icon: "error",
                                confirmButtonText: "¡Entendido!",
                                confirmButtonColor: "#f96332"
                              });
                              removeFromLocal('nombre_Materia_Reporte');  
                              removeFromLocal('grado_Reporte');  
                        }
                        
                    }}><Button variant='success' className='mt-4 px-4' ><b>Visualizar</b></Button></a>
                </div>
            </Card>
        </section>
    )
}