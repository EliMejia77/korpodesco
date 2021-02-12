import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import StudentRegistration from '../components/StudentRegistration';


export default function UserReg(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <StudentRegistration/>
            <br/>
            <Footer/>
        </section>
    )
}