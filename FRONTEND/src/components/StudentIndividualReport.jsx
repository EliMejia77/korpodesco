import {React,useState,useRef} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from "../axios/axios";
import ReactToPrint from 'react-to-print';
import logo from '../images/logokorpodesco.png';


const StudentIndividualReport = () => {
    const ref = useRef();
    const [pdf,setPdf] = useState([]);

    function convertir(a){
        let arr=[];
        a=a.split(",")
        for (let index = 0; index < a.length; index++) {
            arr.push(parseInt(a[index]));
        }
        return arr.reduce((a, b) => a + b) / arr.length.toFixed(1)
    }
    function sumar(segu, auto,coe,prue){
        return parseFloat((segu*0.6)+(auto*0.1)+(coe*0.1)+(prue*0.2)).toFixed(1);
    }
    function convertir(a){
        let arr=[];
        a=a.split(",")
        for (let index = 0; index < a.length; index++) {
            arr.push(parseInt(a[index]));
        }
        return arr.reduce((a, b) => a + b) / arr.length.toFixed(1)
    }
    function sumar(segu, auto,coe,prue){
        return parseFloat((segu*0.6)+(auto*0.1)+(coe*0.1)+(prue*0.2)).toFixed(1);
    }

    const getStudetForReport = (e) => {
        e.preventDefault();
        const codigo_estudiante = document.querySelector('#codigo-estudiante').value;
        
        api.get(`/reporte-estudiante/${codigo_estudiante}`).then((res)=>{
            if(res.data.state === 1){     
                setPdf(res.data.message.rows);        
            }else{
                alert('Error al generar reporte');
            }
        })   
    }
    return(
        <section  className="container-fluid w-100" >
            <div className="container d-flex container_intro_home my-5">
                <h4 className='intro_home mt-2 text-white mx-auto'>
                    Reporte de calificaciones por estudiante
                </h4>
            </div>
            <Card className='mx-auto my-10 p-5' style={{ width: '50rem' }}>
                <div className='mx-auto text-center mb-4'>
                    <h3>Ingresa el código del estudiante</h3>
                </div>
                <Form>
                    
                    <Form.Control type="text" placeholder="Código" required name="codigo-estudiante" id='codigo-estudiante' className="shadow-lg my-3"/>
                       
                </Form>
                
                
                <div className='mb-5 mt-4' ref={ref}>
                    <div className='mx-auto text-center mb-4 d-flex'>
                        <img src={logo} alt='colegio-geek' width='100px'/>
                        <h4 className='my-auto ml-5'> Reporte estudiante: {pdf.length!==0? pdf[0].nombre_completo:''}</h4>
                    </div>           
                    <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Materia</th>
                                    <th scope="col">Seguimiento</th>
                                    <th scope="col">Autoevaluación</th>
                                    <th scope="col">Coevaluación</th>
                                    <th scope="col">Final</th>
                                    <th scope="col">Promedio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pdf.map((info)=>(
                                    <tr key={info.id}>
                                        <td>{info.nombre_materia}</td>
                                        <td>{info.seguimiento}</td>
                                        <td>{info.autoevaluacion}</td>
                                        <td>{info.coevaluacion}</td>
                                        <td>{info.evaluacion_periodo}</td>
                                        <td>{sumar(convertir(info.seguimiento),info.autoevaluacion,info.coevaluacion,info.evaluacion_periodo)}</td>
                                    </tr>
                                    ))}                  
                            </tbody>
                    </table>
                </div>
                <a className='m-auto'><Button  variant='info' className='mt-4 px-5 action-button' onClick={getStudetForReport}><b>Visualizar</b></Button></a>
                <ReactToPrint
                    trigger={() => <Button variant='success' className='mt-4 px-5 action-button'>Descargar Reporte</Button>}
                    content={() => ref.current}/>
                <a href="/reporte-final" className='m-auto'><Button variant='danger' className='mt-4 px-5 action-button'><b>Regresar</b></Button></a>
            </Card>
        </section>
    )
}

export default StudentIndividualReport