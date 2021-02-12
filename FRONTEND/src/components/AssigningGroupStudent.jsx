import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import swal from "sweetalert2";

import api from "../axios/axios";
import { getFromLocal, saveToLocal } from '../functions/localStorage';

export default function AssigningGroupStudent() {
    const [infoUsuario, setInfoUsuario] = useState([]);
    saveToLocal('arregloEstudiantes',JSON.stringify({})); //¿Qué hace?
    const grado = getFromLocal("grado");
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Administrador'){
        window.location.href="/";
    }
    useEffect(() => {
        showStudentGrade();
    }, []);

    function showStudentGrade() {
        if (grado) {
            api.post(`/grupo-estudiantes`, {'grado': grado}).then(
                (res) => {
                    setInfoUsuario(res.data.rows);
                }
            );
        }
    }

    return (
        <section className="container-fluid w-100">
            <Card className='mx-auto my-5 p-5' style={{ width: '75vw' }}>
                <div className='mx-auto mb-4'>
                    <h3 className="text-center">Estudiantes registrados para el semestre {grado}</h3>
                </div>
                <div className='mx-auto'>
                    <a href="/registro-grupo" className='mx-4'><Button variant='danger' className='mt-4 px-5'><b>Regresar</b></Button></a>
                </div>
                <div className='mb-5 mt-4'>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Estudiante</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoUsuario.map((item) => (
                                <tr key={item.codigo} className='notasXEstudiante' id={item.codigo}>
                                    <td id={item.codigo}>{item.codigo}</td>
                                    <td>{item.nombre_completo}</td>
                                    { <td><input id={item.id} type="checkbox" onChange={(e)=>{
                                        const anterior = JSON.parse(getFromLocal('arregloEstudiantes'))
                                        const id = item.id;                                                   
                                        if(e.target.checked){
                                            anterior[id] = item.id; 
                                            saveToLocal("arregloEstudiantes", JSON.stringify(anterior));
                                            console.log("arregloEstudiantes", JSON.stringify(anterior));
                                        }else{
                                            delete anterior[id]
                                            saveToLocal("arregloEstudiantes", JSON.stringify(anterior));
                                            console.log("arregloEstudiantes", JSON.stringify(anterior));
                                        }                              
                                    }
                                    }/></td> }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <a className='m-auto'><Button variant='info' className='mt-4 px-5' onClick={()=>{
                        const data = {
                            id_grupo: getFromLocal('id_grupo'),
                            arregloEstudiantes: JSON.parse(getFromLocal("arregloEstudiantes"))
                        };    
                        api.post('registerGroupStudent',data).then((res)=>{
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
                            }
                        })
                    }}><b>Guardar</b></Button></a>
                </div>
            </Card>
        </section>
    )
}