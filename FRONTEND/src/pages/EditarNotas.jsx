import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ModalGrades from "../components/ModalGrades";

export default function EditarNotas(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <ModalGrades/>
            <Footer/>
        </section>
    )
}