import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import AveragePerGradeGroup from '../components/AveragePerGradeGroup';


export default function ReporteFinal(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <AveragePerGradeGroup />
            <br/>
            <Footer/>
        </section>
    )
}