import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import swal from "sweetalert2";
import api from "../axios/axios";
import logo from '../images/logokorpodesco.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { getFromLocal } from '../functions/localStorage';

export default function TableAveragePerGroup() {
    const [infoUsuario, setInfoUsuario] = useState([]);

    const group = getFromLocal("group");
    const ref = useRef();
    var fecha = new Date();

    const rol_inicio_s = getFromLocal('rol_inicio_s');
    if (rol_inicio_s !== 'Administrador') {
        window.location.href = "/";
    }

    let promFinal = [];

    useEffect(() => {
        showGroups();
    }, []);

    function convertir(a) {
        let arr = [];
        a = a.split(",")
        for (let index = 0; index < a.length; index++) {
            arr.push(parseInt(a[index]));
        }
        return arr.reduce((a, b) => a + b) / arr.length.toFixed(1)
    }

    function sumar(segu, auto, coe, prue) {
        return parseFloat((segu * 0.6) + (auto * 0.1) + (coe * 0.1) + (prue * 0.2)).toFixed(1);
    }

    function showGroups() {
        api.get(`/reporte-prom-grupo/${group}`).then((res) => {
            if (res.status === 200) {
                setInfoUsuario(res.data);
            } else {
                swal.fire({
                    title: "Error 500",
                    text: "Por favor reintente o vuelva después",
                    icon: "error",
                    confirmButtonText: "¡Entendido!",
                    confirmButtonColor: "#f96332"
                });
            }
        });
    }

    infoUsuario.map((info) => {
        promFinal.push(parseFloat(sumar(convertir(info.seguimiento), info.autoevaluacion, info.coevaluacion, info.evaluacion_periodo)))
    });

    promFinal = (promFinal.reduce((a, b) => a + b, 0) / promFinal.length).toFixed(2);

    // setPromedioGrado(promFinal);
    console.log(promFinal);


    return (
        <section className="container-fluid w-100">
            <Card className='mx-auto my-5 p-5' style={{ width: '75vw' }}>
                <div className='mx-auto mb-4'>
                </div>
                <div className='mx-auto'>
                    <a href="/reporte-prom-grupo" className='mx-4'><Button variant='danger' className='mt-4 px-5'><b>Regresar</b></Button></a>
                </div>
                <div className='mb-5 mt-4' ref={ref}>

                    <h3 className='my-5 text-center'>Reporte promedio del grupo: {group}</h3>
                    <Card>
                        <div className='d-flex mx-auto'>
                            <img src={logo} width='100px' alt="colegio-geek" />

                        </div>
                        <h6 className='p-4 mx-auto'>
                            <h5>Saludos Cordiales,</h5><br />

                            <p>En el presente reporte se informa que el promedio general del grupo: {group}, durante este año lectivo en Corporación de educación laboral KORPODESCO es de <b>{promFinal}</b>.<br /></p>

                            <p>Este reporte es generado con el fin de reafirmar nuestro compromiso con la educación.<br /></p>

                            <p>Generado en la ciudad de Ciénaga el día: {fecha.getDate()}/{fecha.getMonth()+1}/{fecha.getFullYear()}<br/></p>

                            <h5 className='text-center'>Corporación de educación laboral KORPODESCO</h5>
                        </h6>
                    </Card>
                </div>
                <ReactToPrint
                    trigger={() => <Button variant='success' className='mt-4 px-5 action-button'>Descargar Reporte</Button>}
                    content={() => ref.current} />
            </Card>
        </section>
    )
}
