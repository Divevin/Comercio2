// assets/Componentes/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../database/firebaseconfig.js';
import './Adminpage.css';

const AdminPage = ({ onAddImage }) => {
    const [leads, setLeads] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "comentarios"));
                const leadsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setLeads(leadsData);
            } catch (error) {
                console.error("Erro ao buscar as leads:", error);
            }
        };

        fetchLeads();
    }, []);

    const handleImageUpload = async () => {
        if (!selectedImage) {
            alert("Por favor, selecione uma imagem primeiro.");
            return;
        }

        try {
            // Cria a URL local da imagem selecionada
            const imageUrl = URL.createObjectURL(selectedImage);

            // Salva a URL local no Firestore
            await addDoc(collection(db, "servicos"), { imageUrl });

            // Limpa o campo após o upload
            setSelectedImage(null);
            alert("Imagem adicionada com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar imagem:", error);
            alert("Erro ao adicionar imagem.");
        }
    };

    return (
        <div className="admin-container">
            <h2>Leads Cadastradas</h2>
            <table className="leads-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Mensagem</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.nome}</td>
                            <td>{lead.email}</td>
                            <td>{lead.telefone}</td>
                            <td>{lead.mensagem}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="image-upload">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <button onClick={handleImageUpload}>Adicionar Imagem ao Serviço</button>
            </div>
        </div>
    );
};

export default AdminPage;
