import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faInfoCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import 'styles/PanierPage.css';
import { Analyse_commande } from 'types';
import Footer from '@components/organisms/Footer';

const PanierPage: React.FC = () => {
    const [analyseCommandes, setAnalyseCommandes] = useState<Analyse_commande[]>([]);
    const [submittedForms, setSubmittedForms] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalyseCommandes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/panier/analysecommande', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Analyse Commandes:', response.data);
                setAnalyseCommandes(response.data);
            } catch (error) {
                console.error('Error fetching analyse commandes:', error);
            }
        };

        fetchAnalyseCommandes();
    }, []);

    // Grouper les commandes par laboratoire
    const commandesParLaboratoire = analyseCommandes.reduce((grouped, ac) => {
        const laboratoire = ac.analyse?.biologiste?.laboratoire;
        if (ac.analyse && laboratoire) {
            if (!grouped[laboratoire]) {
                grouped[laboratoire] = {
                    laboratoire,
                    commandes: [],
                    totalPrix: 0,
                    nombreAnalyses: 0
                };
            }
            grouped[laboratoire].commandes.push(ac);
            grouped[laboratoire].totalPrix += ac.prix * ac.quantite;
            grouped[laboratoire].nombreAnalyses += ac.quantite;
        } else {
            console.warn('Laboratoire non défini pour l\'analyse:', ac);
        }
        return grouped;
    }, {} as { [key: string]: { laboratoire: string; commandes: Analyse_commande[]; totalPrix: number; nombreAnalyses: number } });

    // Calculer le prix total de toute la commande
    const prixTotalCommande = Object.values(commandesParLaboratoire).reduce(
        (total, laboratoire) => total + laboratoire.totalPrix,
        0
    );

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/panier/analysecommande/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAnalyseCommandes(analyseCommandes.filter(ac => ac.id !== id));
        } catch (error) {
            console.error('Error deleting analyse commande:', error);
        }
    };

    const handleViewPatientInfo = (id: number) => {
        if (!submittedForms.includes(id)) {
            navigate(`/patient/${id}`);
            setSubmittedForms([...submittedForms, id]);
        } else {
            alert('Le formulaire de patient a déjà été rempli pour cette commande.');
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="panier-page">

            <button className="icon-button back-button" onClick={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1>Panier</h1>

            {Object.values(commandesParLaboratoire).length === 0 ? (
                <p>Aucune commande trouvée</p>
            ) : (
                Object.values(commandesParLaboratoire).map(labo => (
                    <div key={labo.laboratoire} className="laboratoire-section">
                        <h2>{labo.laboratoire}</h2>
                        <table className="panier-table">

                           
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Analyse ID</th>
                                    <th>Quantité</th>
                                    <th>Date de la commande</th>
                                    <th>Prix Unitaire</th>
                                    <th>Total Prix</th>
                                    <th>Description Analyse</th>
                                    <th>Biologiste</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {labo.commandes.map(ac => (
                                    <tr key={ac.id}>
                                        <td>{ac.id}</td>
                                        <td>{ac.analyse?.id ?? 'Non disponible'}</td>
                                        <td>{ac.quantite}</td>
                                        <td>{ac.delai_prevu ? new Date(ac.delai_prevu).toLocaleDateString() : 'Non défini'}</td>
                                        <td>{ac.analyse?.prix ?? 'Non disponible'}</td>
                                        <td>{ac.prix * ac.quantite}</td>
                                        <td>{ac.analyse?.description ?? 'Non disponible'}</td>
                                        <td>
                                            {ac.analyse?.biologiste?.email ?? 'Non disponible'} - 
                                            {ac.analyse?.biologiste?.laboratoire ?? 'Non disponible'}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleViewPatientInfo(ac.id)}
                                                className="info-button"
                                            >
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ac.id)}
                                                className="delete-button"
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                    </tr>
                                
                                ))}
                            </tbody>
                         
                        </table>
                        <div className="total-price-laboratoire">
                            <h3>Total pour {labo.laboratoire} : {labo.totalPrix} DT</h3>
                            <h3>Nombre d'analyses : {labo.nombreAnalyses}</h3>
                        </div>
                    </div>
                ))
            )}

            <div className="total-price">
                <h2>Prix Total de la Commande : {prixTotalCommande} DT</h2>
            </div>
            <button type="submit">Commander</button>
            <Footer />
    
        </div>
    );
};

export default PanierPage;
