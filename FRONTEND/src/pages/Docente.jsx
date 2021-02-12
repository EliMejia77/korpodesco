import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ActionsTeacher from "../components/ActionsTeacher";

export default function Docente(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <ActionsTeacher/>
            <Footer/>
        </section>
    )
}