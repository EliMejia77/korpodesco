import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import AssigningGroupSubject from "../components/AssigningGroupSubject";

export default function Docente(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            < AssigningGroupSubject/>
            <Footer/>
        </section>
    )
}