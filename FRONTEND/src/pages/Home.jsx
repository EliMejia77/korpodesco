import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Login from '../components/Login';
import Fondo from "../images/fondo_colegio.jpg";

export default function Home(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <Login/>
            <br/>
            <Footer/>
        </section>
    )
}