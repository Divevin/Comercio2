import React from 'react';
import './Header.css';
import logo from '../images/logo.png'; // Atualize o caminho conforme a localização da imagem

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <button href="#form" className="contact-button">Entre em Contato</button>
        </header>
    );
}

export default Header;
