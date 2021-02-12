import React from 'react';
import '../../styles/styles.css';
import Logo from '../../images/logokorpodesco.png';

const Header=()=> {
    return (
        <div>
            <nav className="navbar navbar-light nav_Bar shadow-lg">
                <div className="container-fluid shadow-lg">
                    <img width="60px" height="60px" src={Logo} alt="Logo_Colegio_Geek"/>
                    <span className="letra_Nav text-light">Corporación Educativa Laboral</span>
                </div>
            </nav>
        </div>
        );
};
export default Header;