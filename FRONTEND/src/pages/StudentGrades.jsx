import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import StudentGrades from '../components/StudentGrades';


export default function UserReg(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <StudentGrades/>
            <br/>
            <Footer/>
        </section>
    )
}