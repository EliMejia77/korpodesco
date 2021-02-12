import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ReportPerGradeGroup from '../components/ReportPerGradeGroup';

export default function VerNotas(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <ReportPerGradeGroup/>
            <br/>
            <Footer/>
        </section>
    )
}