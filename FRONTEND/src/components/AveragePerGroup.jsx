import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from "../axios/axios";
import { saveToLocal } from '../functions/localStorage';


const AveragePerGroup = () => {
    const [infoUsuario, setInfoUsuario] = useState([]);
    const [group, setGroup] = useState('');
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

    function grupo(e) {
        setGroup(e.target.value);
        console.log(group);
    }

    function sendGroup(e) {
        saveToLocal('group', group);
    }

    return (
        <section className="container-fluid w-100" >
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>
                    Reporte de calificaciones por grupo
                </h4>
            </div>
            <Card className='mx-auto my-5 p-5' style={{ width: '25rem' }}>
                <div className='mx-auto text-center mb-4'>
                    <h3>Selecciona el grupo a buscar</h3>
                </div>

                <Form.Control as="select" required name="grupo" id='grupo' className="shadow-lg my-3" onChange={grupo}>
                    <option>Grupo</option>
                    {infoUsuario.map((item) => <option key={item.id}>{item.codigo}</option>)}
                </Form.Control>
                <a className='m-auto' href="/promedio-grupo"><Button variant='info' className='mt-4 px-5 action-button' onClick={sendGroup} ><b>Ver Reporte</b></Button></a>

                <a href="/reporte-final" className='m-auto'><Button variant='danger' className='mt-4 px-5 action-button'><b>Regresar</b></Button></a>
            </Card>
        </section>
    )
}

export default AveragePerGroup