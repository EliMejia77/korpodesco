import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import api from "../axios/axios";
import { getFromLocal, saveToLocal } from '../functions/localStorage';

export default function SeeGrades() {
    const [infoUsuario, setInfoUsuario] = useState([]);
    const subject = getFromLocal("subject");
    const group = getFromLocal("group");
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Docente'){
        window.location.href="/";
    }
    let registro;
    useEffect(() => {
        verNotasGrupo();
    },[]);

    function convertir(a) {
        let arr = [];
        a = a.split(",")
        for (let index = 0; index < a.length; index++) {
            arr.push(parseInt(a[index]));
        }
        return arr.reduce((a, b) => a + b) / arr.length.toFixed(1)
         
    }
    function sumar(segu, auto, coe, prue) {
        return parseFloat((segu * 0.6) + (auto * 0.1) + (coe * 0.1) + (prue * 0.2)).toFixed(1);
    }

    const verNotasGrupo = () => {
        const id = getFromLocal("id");
        if (id) {
            api.post(`ver-notas/${id}`, {
                "nombre_materia": subject,
                "codigo_grupo": group
            }).then(
                (res) => {
                    registro = res.data.rows.slice(0, (Math.floor(res.data.rows.length / 2)));
                    setInfoUsuario(registro);
                }
            );
        }
    }    

    return (
        <section className="container-fluid w-100">
            <Card className='mx-auto my-5 p-5' style={{ width: '75vw' }}>
                <div className='mx-auto mb-4'>
                    <h3 className="text-center">Notas {subject} de {group}</h3>
                </div>
                <div className='mx-auto'>
                    <a href="/docente" className='mx-4'><Button variant='danger' className='mt-4 px-5'><b>Regresar</b></Button></a>
                </div>
                <div className='mb-5 mt-4'>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Estudiante</th>
                                <th scope="col">Seguimiento</th>
                                <th scope="col">Autoevaluación</th>
                                <th scope="col">Coevaluación</th>
                                <th scope="col">Final</th>
                                <th scope="col">Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoUsuario.map((info) => (                             
                                <tr key={`user-${info.id}`} className='notasXEstudiante' id={info.id}>
                                    <td>{info.codigo}</td>
                                    <td>{info.nombre_completo}</td>
                                    <td>{info.seguimiento}</td>
                                    <td>{info.autoevaluacion}</td>
                                    <td>{info.coevaluacion}</td>
                                    <td>{info.evaluacion_periodo}</td>
                                    <td>{sumar(convertir(info.seguimiento),info.autoevaluacion, info.coevaluacion, info.evaluacion_periodo)}</td>
                                    <td><Button className='btn btn-info' onClick={() => {
                                        saveToLocal("id_estudiante", info.id);
                                        saveToLocal("nombre_estudiante", info.nombre_completo);
                                        saveToLocal("id_materia", info.id_materia);
                                        console.log(info.id_materia)
                                        window.location.href="/editar-notas";
                                            }
                                        }>Editar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>            
        </section>
    )

}