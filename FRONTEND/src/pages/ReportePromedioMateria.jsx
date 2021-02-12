import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import AveragePerSubject from '../components/AveragePerSubject';


export default function ReporteFinal(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <AveragePerSubject />
            <br/>
            <Footer/>
        </section>
    )
}