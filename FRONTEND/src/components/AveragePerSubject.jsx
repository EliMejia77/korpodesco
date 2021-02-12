import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from "../axios/axios";
import { saveToLocal } from '../functions/localStorage';

const AveragePerSubject = () => {   
    const [materia, setMateria] = useState([]);

    const getGradesPerSubject = () => {
        const materia = document.querySelector('#materia').value;      
        saveToLocal("materia", materia);
    }
    useEffect(() => {         
        callSubjects();
    },[]);
    
    const callSubjects=()=>{
        api.get('/reporte-estudiantes-asignatura').then(
            (res)=>{
                setMateria(res.data);   
                console.log(res.data);                             
            }
        )
    }

    return(
        <section  className="container-fluid w-100" >
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>
                    Reporte de calificaciones por materia
                </h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '25rem' }}>
                <div className='mx-auto text-center mb-4'>
                    <h3>Selecciona la materia a buscar</h3>
                </div>
                <Form.Control as="select" required name="materia" id='materia' className="shadow-lg my-3">
                            <option>Materia</option>
                            {materia.map((item)=><option key={item.id}>{item.nombre}</option>)}
                </Form.Control>
                <a href="/pdf-prom-materia" className='m-auto' onClick={getGradesPerSubject}><Button variant='info' className='mt-4 px-5 action-button'><b>Ver Reporte</b></Button></a>

                <a href="/reporte-final" className='m-auto'><Button variant='danger' className='mt-4 px-5 action-button'><b>Regresar</b></Button></a>
            </Card>
        </section>
    )
}

export default AveragePerSubject