import React, {useEffect, useState,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import api from '../axios/axios';
import { getFromLocal } from '../functions/localStorage';
import ReactToPrint from 'react-to-print';
import logo from '../images/logokorpodesco.png';

export default function SeeReportTeacher() {
    const [reporte, setReporte]=useState([]);
    const [cantidadReporte, setCantidadReporte]=useState([]);
    let profe_reporte=getFromLocal("profe-reporte");
    const grado_Reporte_profe=getFromLocal("grado_Reporte_profe");
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    const ref = useRef();
    profe_reporte=profe_reporte.split('. ');
    if(rol_inicio_s!=='Administrador'){
    window.location.href="/";
    }
    useEffect(()=>{
        verReporte();
    },[]);
    function key(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function verReporte(){
        api.post('/profes-grado',{"id_docente":profe_reporte[0], "grado":grado_Reporte_profe}).then(
            (res)=>{
                setReporte(res.data['rows']);
                setCantidadReporte(res.data['rowsCount']);
            }
        )
    }
    return (
        <section className="container-fluid w-100">
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>Reporte final de profesores en cada semestre</h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '30rem' }}>
                <div className='mb-5 mt-4' ref={ref}>
                    <div className='mx-auto text-center mb-5'>
                        <img src={logo} alt="colegio-geek" width='100px'/>
                        <h4>Reporte Docente: {profe_reporte[1]} - Semestre: {grado_Reporte_profe}</h4>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Código del estudiante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reporte.map((info)=>(
                                <tr key={key(0,1000)}>
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
                    <a href="/reporte-profes-grado" className='m-auto'><Button variant='info' className='mt-4 px-4'><b>Regresar</b></Button></a>
                </div>    
            </Card>
        </section>
    )
}