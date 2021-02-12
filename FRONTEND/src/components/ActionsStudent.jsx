import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {getFromLocal} from '../functions/localStorage';

export default function ActionsStudent(){
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Estudiante'){
        window.location.href="/";
    }
    const nombre_completo=getFromLocal('nombre_completo');
    return (
        <section className="container-fluid w-100">
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white'>
                Recuerda que podrás dar seguimiento a tus calificaciones en la sección de "Seguimiento" y consultar las tareas y actividades de cada materia en la sección de "Actividades".
                </h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '25rem' }}>
                <div className='mx-auto text-center mb-4'>
                    <h3>Estimado Estudiante</h3>
                    <h4>{nombre_completo}</h4>
                </div>
                <a href="/seguimiento" className='m-auto'><Button variant='info' className='mt-4 px-5 action-button'><b>Seguimiento</b></Button></a>
                <a href="/actividades" className='m-auto'><Button variant='info' className='mt-4 px-5 action-button'><b>Actividades</b></Button></a>
                <a href="/" className='m-auto'><Button variant='danger' className='mt-4 px-5 action-button'><b>Cerrar Sesión</b></Button></a>
            </Card>        
        </section>
    )
}