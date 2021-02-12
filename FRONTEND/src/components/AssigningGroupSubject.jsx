import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import swal from "sweetalert2";

import api from "../axios/axios";
import { getFromLocal, saveToLocal } from '../functions/localStorage';

export default function AssigningGroupStudent() {
    const [infoUsuario, setInfoUsuario] = useState([]);
    saveToLocal('arregloGrupos', JSON.stringify({}));
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if (rol_inicio_s !== 'Administrador') {
        window.location.href = "/";
    }
    useEffect(() => {
        showGroups();
    }, []);

    function showGroups() {
        api.get('/info-grupo').then(
            (res) => {
                setInfoUsuario(res.data.rows);
            }
        );
    }

    return (
        <section className="container-fluid w-100">
            <Card className='mx-auto my-5 p-5' style={{ width: '75vw' }}>
                <div className='mx-auto mb-4'>
                    <h3 className="text-center">Registro de grupo materias</h3>
                </div>
                <div className='mb-5 mt-4'>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Jornada</th>
                                <th scope="col">Semestre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoUsuario.map((item) => (
                                <tr key={item.codigo} className='notasXEstudiante' id={item.codigo}>
                                    <td id={item.codigo}>{item.codigo}</td>
                                    <td>{item.jornada}</td>
                                    <td>{item.grado}</td>
                                    { <td><input id={item.id} type="checkbox" onChange={(e) => {
                                        const anterior = JSON.parse(getFromLocal('arregloGrupos'))
                                        const id = item.id;
                                        if (e.target.checked) {
                                            anterior[id] = item.id;
                                            saveToLocal("arregloGrupos", JSON.stringify(anterior));
                                            console.log("arregloGrupos", JSON.stringify(anterior));
                                        } else {
                                            delete anterior[id]
                                            saveToLocal("arregloGrupos", JSON.stringify(anterior));
                                            console.log("arregloGrupos", JSON.stringify(anterior));
                                        }
                                    }
                                    } /></td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <a className='m-auto'><Button variant='info' className='mt-4 px-5' onClick={() => {
                        const data = {
                            id_materia: getFromLocal('id_materia'),
                            arregloGrupos: JSON.parse(getFromLocal("arregloGrupos")),
                            id_docente: getFromLocal('id_docente')
                        };
                        console.log(data);
                        api.post('/registerGroupSubject', data).then((res) => {
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
                                    title: "¡El registro de la materia fue realizado con éxito!",
                                    icon: "success",
                                    confirmButtonText: "¡Entendido!",
                                    confirmButtonColor: "#54e346",
                                });
                                api.post('registerModelsEval', data).then((res)=>{
                                    if(res.data.state === 0){
                                        console.log('¡Error!');
                                    }else{
                                       
                                        console.log('¡Todo ready en grupo materias!');
                                    }
                                });
                                window.location.href="/admin";
                            }
                        });
                    }} ><b>Guardar</b></Button></a>
                </div>
            </Card>
        </section>
    )
}
