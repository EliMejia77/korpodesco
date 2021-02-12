import React from 'react';
import Header from '../components/base/Header';
import Footer from '../components/base/Footer';
import Fondo from "../images/fondo_colegio.jpg";
import TableAveragePerGroup from '../components/TableAveragePerGroup';


export default function TablaPromedioPorGrupo(){
    return(
        <section style={{backgroundImage: `url(${Fondo})`}}>
            <Header/>
            <br/>
            <TableAveragePerGroup/>
            <br/>
            <Footer/>
        </section>
    )
}