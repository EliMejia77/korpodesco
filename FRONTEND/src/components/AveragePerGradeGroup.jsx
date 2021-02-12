import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { saveToLocal } from '../functions/localStorage';


const AveragePerGradeGroup = () => {
    const getGradesPerGradeGroup = () => {
        const grado = document.querySelector('#grado').value;
        saveToLocal("grado", grado);
    }

    return(
        <section  className="container-fluid w-100" >
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>
                    Reporte de calificaciones por semestre
                </h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '25rem' }}>
                <div className='mx-auto text-center mb-4'>
                    <h3>Selecciona el semestre a buscar</h3>
                </div>
                <Form.Control as="select" required name="grado" id='grado' className="shadow-lg my-3" onChange={getGradesPerGradeGroup}>
                            <option>Semestre</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                </Form.Control>

                <a href="/pdf-prom-grado" className='m-auto'><Button variant='info' className='mt-4 px-5 action-button'><b>Ver Reporte</b></Button></a>

                <a href="/reporte-final" className='m-auto'><Button variant='danger' className='mt-4 px-5 action-button'><b>Regresar</b></Button></a>
            </Card>
        </section>
    )
}

export default AveragePerGradeGroup