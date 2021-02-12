import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ActionsStudent from "../components/ActionsStudent";

export default function Estudiante(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <ActionsStudent/>
            <Footer/>
        </section>
    )
}