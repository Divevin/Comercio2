// assets/componentes/Servicos.jsx
import React, { useState, useEffect } from 'react';
import './Servicos.css'; // Certifique-se de que este arquivo CSS existe
import um from '../images/Servicos/1.png';
import dois from '../images/Servicos/2.png';
import tres from '../images/Servicos/3.png';
import quatro from '../images/Servicos/4.png';
import cinco from '../images/Servicos/5.png';
import seis from '../images/Servicos/6.png';
import { db, storage } from '../database/firebaseconfig.js';
import { collection, getDocs } from "firebase/firestore";

const Servicos = () => {
    const [expandedImage, setExpandedImage] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "servicos"));
                const imagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(imagesData);
            } catch (error) {
                console.error("Erro ao buscar imagens:", error);
            }
        };

        fetchImages();
    }, []);

    const handleImageClick = (img) => {
        setExpandedImage(img);
    };

    const handleCloseModal = () => {
        setExpandedImage(null);
    };

    return (
        <section className="servicos">
            <h2>Serviços Feitos</h2>
            <div className="servicos-grid">
                {services.map((service) => (
                    <div key={service.id} className="service-item">
                        {service.imageUrl ? ( // Verifica se a URL da imagem existe
                            <img
                                src={service.imageUrl} // URL da imagem do Firestore
                                alt={`Serviço ${service.id}`} // Texto alternativo para a imagem
                                onClick={() => handleImageClick(service.imageUrl)} // Ação ao clicar na imagem
                                onError={() => console.error(`Erro ao carregar a imagem: ${service.imageUrl}`)} // Tratamento de erro
                            />
                        ) : (
                            <p>Imagem não disponível</p> // Mensagem caso a URL não exista
                        )}
                    </div>
                ))}
            </div>
            {expandedImage && (
                <div className="modal" onClick={handleCloseModal}>
                    <img src={expandedImage} alt="Imagem expandida" />
                </div>
            )}
        </section>
    );
};

export default Servicos;