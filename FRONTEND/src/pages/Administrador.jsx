import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import ActionsAdmin from "../components/ActionsAdmin";

export default function Administrador(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <ActionsAdmin/>
            <Footer/>
        </section>
    )
}