// assets/componentes/Footer.jsx
import React from 'react';
import './Footer.css'; // Certifique-se de que este arquivo CSS exista
import facebook from  '../images/Facebook.png';
import instagram from '../images/Instagram.png';
import whatsapp from '../images/Whatsapp.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://facebook.com/vinicius.dossantos.1297943?locale=pt_BR" target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" className="icon" />
                </a>
                <a href="https://instagram.com/viniciusgsdesigner" target="_blank" rel="noopener noreferrer">
                    <img src={instagram} alt="Instagram" className="icon" />
                </a>
                <a href={`https://wa.me/43998197293`} target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp} alt="WhatsApp" className="icon" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
