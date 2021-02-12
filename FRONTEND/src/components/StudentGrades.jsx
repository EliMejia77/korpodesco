import React, { useState,useEffect,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getFromLocal } from '../functions/localStorage';
import api from '../axios/axios';
import ReactToPrint from 'react-to-print';
import logo from '../images/logokorpodesco.png';

export default function StudentGrades(){
    const [reporte,setReporte]=useState([]);
    const [cantidadReporte,setCantidadReporte]=useState([]);
    const materia=getFromLocal('nombre_Materia_Reporte');
    const grado=getFromLocal('grado_Reporte');
    const ref = useRef();
    useEffect(() => {
        verReporte();
    },[]);
    function verReporte(){
        api.post('/estudiantes-asignatura',{
        "nombre_materia":materia,
        "grado":grado}).then((res)=>{
            setReporte(res.data['rows']);
            setCantidadReporte(res.data['rowsCount']);
        })
    }
    return(
        <section className="container-fluid w-100">
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>Sección para ver la cantidad de estudiantes según el semestre y la materia</h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '27rem' }}>
            

                <div className='mb-5 mt-4' ref={ref}>
                    <div className='mx-auto text-center mb-4'>
                        <img src={logo} alt="colegio-geek" width='100px'/>
                        <h4>Reporte materia: {materia} - Semestre: {grado}</h4>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Código del estudiante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reporte.map((info)=>(
                                <tr key={info.id}>
                                    <td>{info.id}</td>
                                    <td>{info.codigo}</td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                    <h3>Total de estudiantes: {cantidadReporte}</h3>
                </div>
                <ReactToPrint
                trigger={() => <Button variant='success' className='mt-4 px-5 action-button'>Descargar Reporte</Button>}
                content={() => ref.current}/>
                <div className="d-flex justify-content-center align-items-center">
                
                    <a href="/reporte-final" className='m-auto'><Button variant='info' className='mt-4 px-4'><b>Regresar</b></Button></a>
                </div>
            </Card>
        </section>
)}
