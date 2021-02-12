import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ReportTeacherYear from '../components/ReportTeacherYear';

export default function ReporteProfesGrado(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <ReportTeacherYear/>
            <br/>
            <Footer/>
        </section>
    )
}