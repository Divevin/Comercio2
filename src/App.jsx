// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './assets/Componentes/Header.jsx';
import Footer from './assets/Componentes/Footer.jsx';
import Apresentacao from './assets/Componentes/Apresentacao.jsx';
import Servicos from './assets/Componentes/Servicos.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/slickOverrides.css";
import Formulario from './assets/Componentes/Formulario.jsx';
import AdminPage from './assets/Componentes/Adminpage.jsx';
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from './assets/database/firebaseconfig.js';

function App() {
  // Estado para armazenar as imagens adicionadas via página de administração
  const [addedImages, setAddedImages] = useState([]);

  // Função para adicionar uma nova imagem ao estado
  const handleAddImage = (newImage) => {
    setAddedImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <Router>
      <div className="central-container">
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="content">
              <Apresentacao />
              <div className='main-container'>
                {/* Passando as imagens adicionadas para o componente Servicos */}
                <Servicos addedImages={addedImages} />
              </div>
              <Formulario />
            </div>
          } />
          {/* Passando a função handleAddImage para a página de administração */}
          <Route path="/admin" element={<AdminPage onAddImage={handleAddImage} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
