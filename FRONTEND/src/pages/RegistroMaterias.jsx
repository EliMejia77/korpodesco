import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import SubjectRegistration from '../components/SubjectRegistration';


export default function RegistroMaterias(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <SubjectRegistration />
            <br/>
            <Footer/>
        </section>
    )
}