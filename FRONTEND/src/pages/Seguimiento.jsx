import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import FollowUp from '../components/FollowUp';

export default function Seguimiento(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <FollowUp/>
            <br/>
            <Footer/>
        </section>
    )
}