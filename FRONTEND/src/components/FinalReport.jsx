import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getFromLocal } from '../functions/localStorage';

export default function FinalReport() {
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Administrador'){
    window.location.href="/";
    }
    return (
        <section className="container-fluid w-100">
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>Reporte final</h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '27rem' }}>
                <div className='mx-auto text-center mb-4'>
                    <h3>
                        Opciones del reporte final
                    </h3>
                </div>
                <a href="/reporte-estudiantes-asignatura" className='m-auto px-5'><Button variant='success' className='mt-3 action-button'><b>Cantidad estudiantes por materia y semestre</b></Button></a>
                <a href="/reporte-profes-grado" className='m-auto px-5'><Button variant='success' className='mt-4 action-button'><b>Cantidad estudiantes por docente y semestre</b></Button></a>
                <a href="/reporte-estudiante" className='m-auto px-5'><Button variant='success' className='mt-4 action-button'><b>Calificaciones por estudiante</b></Button></a>
                <a href="/reporte-prom-grupo" className='m-auto px-5'><Button variant='success' className='mt-4 action-button'><b>Promedio de notas por grupo</b></Button></a>
                <a href="/reporte-prom-materia" className='m-auto px-5'><Button variant='success' className='mt-4 action-button'><b>Promedio de notas por materia</b></Button></a>
                <a href="/reporte-prom-grado" className='m-auto px-5'><Button variant='success' className='mt-4 action-button'><b>Promedio de notas por semestre</b></Button></a>
                <a href="/admin" className='m-auto px-5'><Button variant='info' className='mt-4 action-button'><b>Regresar</b></Button></a>
            </Card>
        </section>
    )
}