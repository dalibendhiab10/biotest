import React from 'react';
import axios from 'axios';
import 'styles/CommandPopup.css';
import { Analyse } from 'types';

interface CommandPopupProps {
    analyse: Analyse;
    onClose: () => void;
    onAddToPanier: () => void;
}

const CommandPopup: React.FC<CommandPopupProps> = ({ analyse, onClose, onAddToPanier }) => {
    const token = localStorage.getItem('token');
    console.log('Token récupéré:', token);

    // La date actuelle en format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const handleAddToPanier = async () => {
        try {
            await axios.post('http://localhost:3000/panier/analysecommande', {
                analyseId: analyse.id,
                delai_prevu: today,  
                quantite: 1,       
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onAddToPanier();
            alert('Analyse ajoutée au panier avec succès !');
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erreur lors de l\'ajout au panier:', error.response?.data || error.message);
            } else {
                console.error('Erreur lors de l\'ajout au panier:', error);
            }
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Commander Analyse</h2>
                <div>
                    <p>Date de la commande: {today}</p>
                </div>
                <div>
                    <p>Quantité: 1</p>
                </div>
                <div className="popup-buttons">
                    <button onClick={handleAddToPanier} className="submit-button">Ajouter au Panier</button>
                    <button onClick={onClose} className="cancel-button">Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default CommandPopup;
