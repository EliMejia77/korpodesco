import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ReportPerSubject from '../components/ReportPerSubject';

export default function VerNotas(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <ReportPerSubject/>
            <br/>
            <Footer/>
        </section>
    )
}