import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import Activities from '../components/Activities';

export default function Actividades(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <Activities/>
            <br/>
            <Footer/>
        </section>
    )
}