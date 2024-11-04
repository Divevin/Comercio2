// assets/Componentes/Formulario.jsx
import React, { useState } from 'react';
import './Formulario.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../database/firebaseconfig';

const Formulario = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        mensagem: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envia os dados para a coleção "comentarios" no Firestore
            await addDoc(collection(db, "comentarios"), formData);
            alert('Mensagem enviada com sucesso!');

            // Cria a mensagem para o WhatsApp
            const mensagemWhatsApp = `Olá, meu nome é ${formData.nome}. Meu email é ${formData.email}. Meu telefone é ${formData.telefone}. Eu Gostaria de: ${formData.mensagem}`;
            
            // Codifica a mensagem para ser usada na URL
            const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
            
            // Abre o WhatsApp com a mensagem predefinida
            const numeroWhatsApp = '5543998197293'; // Substitua pelo seu número de telefone
            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, '_blank');

            // Limpa os campos do formulário após o envio
            setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
        } catch (error) {
            console.error("Erro ao enviar a mensagem: ", error);
            alert('Ocorreu um erro ao enviar a mensagem.');
        }
    };

    return (
        <form id='form' className="formulario" onSubmit={handleSubmit}>
            <h2>Entre em Contato</h2>
            <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="mensagem">Mensagem:</label>
                <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;
