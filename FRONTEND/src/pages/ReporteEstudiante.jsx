import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import StudentIndividualReport from '../components/StudentIndividualReport';


export default function ReporteFinal(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <StudentIndividualReport />
            <br/>
            <Footer/>
        </section>
    )
}