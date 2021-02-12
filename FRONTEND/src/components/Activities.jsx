import React from 'react';
import Card from 'react-bootstrap/Card';
import Smiley from "../images/smiley.png";
import Button from 'react-bootstrap/Button';
import {getFromLocal} from '../functions/localStorage';

export default function Activities(){
    const nombre_completo=getFromLocal('nombre_completo');
    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if(rol_inicio_s!=='Estudiante'){
        window.location.href="/";
    }
    return (
        <section  className="container-fluid w-100">
            <div className="container d-flex container_intro_home mb-5">
                <h4 className='intro_home mt-2 text-white'>
                Consulta las actividades que tienes asignadas por materia y ponte al día con ellas, para que tu conocimiento te abra nuevos caminos y expanda tus fronteras.
                </h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '25rem' }}>
                <div className='mx-auto text-center'>
                    <h3>Consulta de Actividades</h3>
                    <h4>{nombre_completo}</h4>
                    <div>
                        <img src={Smiley} alt="Congrats!" width='150px' className='mx-auto mt-5'/>
                        <h4 className='mt-4 text-center'><b>¡Felicidades! Estás al día con tus actividades</b></h4>
                    </div>
                </div>
                <a href="/estudiante" className='m-auto'><Button variant='danger' className='mt-4 px-5'><b>Regresar</b></Button></a>               
            </Card>        
        </section>
    )

}