import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import SeeReportTeacher from '../components/SeeReportTeacher';

export default function VerReporteProfe(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <SeeReportTeacher/>
            <br/>
            <Footer/>
        </section>
    )
}