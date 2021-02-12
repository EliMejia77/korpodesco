import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import AveragePerGroup from '../components/AveragePerGroup';


export default function ReporteFinal(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <AveragePerGroup />
            <br/>
            <Footer/>
        </section>
    )
}