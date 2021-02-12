import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import GroupRegistration from '../components/GroupRegistration';


export default function RegistroMaterias(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <GroupRegistration />
            <br/>
            <Footer/>
        </section>
    )
}