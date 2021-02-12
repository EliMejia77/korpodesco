import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ReportStudentGrade from '../components/ReportStudentGrade';


export default function ReporteFinal(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <ReportStudentGrade/>
            <br/>
            <Footer/>
        </section>
    )
}