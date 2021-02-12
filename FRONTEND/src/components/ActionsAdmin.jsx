import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {getFromLocal} from '../functions/localStorage';

export default function ActionsAdmin(){
    const nombre_completo=getFromLocal('nombre_completo');
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Administrador'){
        window.location.href="/";
    }
    return (
        <section className="container-fluid w-100">
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>Sección de administrador</h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '30rem' }}>
                <div className='mx-auto text-center mb-4'>
                    <h3>Estimado administrador</h3>
                    <h4>{nombre_completo}</h4>
                </div>
                <a href="/user-registration" className='m-auto px-5'><Button variant='info' className='mt-4 action-button'><b>Registrar Docentes y administrador</b></Button></a>
                <a href="/student-registration" className='m-auto px-5'><Button variant='info' className='mt-4 action-button'><b>Registrar estudiante</b></Button></a>
                <a href="/registro-materias" className='m-auto'><Button variant='info' className='mt-4 action-button'><b>Registrar materia</b></Button></a>
                <a href="/registro-grupo" className='m-auto'><Button variant='info' className='mt-4 action-button'><b>Registrar grupo</b></Button></a>
                <a href="/reporte-final" className='m-auto px-5'><Button variant='info' className='mt-4 action-button'><b>Reporte final</b></Button></a>
                <a href="/" className='m-auto'><Button variant='danger' className='mt-4 action-button'><b>Cerrar Sesión</b></Button></a>
            </Card>        
        </section>
    )
}