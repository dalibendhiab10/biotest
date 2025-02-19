import { useState, useEffect } from "react";

import { Commande } from "types";
import ListAnalyses from "@components/molecules/ListAnalyses";
import AddUpdateAnalyse from "@components/organisms/AddUpdateAnalyse";
import { Analyse } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { get, update, remove } from "api/axiosConfig";
import Pagination from "@components/molecules/Pagination";
import Footer from "@components/organisms/Footer";
import AnalyseInfo from "@components/organisms/AnalyseInfo";
import NavBar from "@components/organisms/NavBar";
import ListCommandes from "@components/organisms/ListCommande";
import { PatientInfo } from "@components/organisms/PatientInfo";


export default function MyAnalysesPage() {
    const [analyses, setAnalyses] = useState<Analyse[]>([]);
    const [analyseId, setAnalyseId] = useState<number>(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false);
    const [isPopupPatient, setIsPopupPatient] = useState(false);
    const [isListOne, setIsListOne] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [actionAnalyse, setActionAnalyse] = useState("");
    const [commandes, setCommandes] = useState<Commande[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>(""); // New state for selected status
    const [commandeId, setCommandeId] = useState<number>();

    const analysesPerPage = 10;

    // Get biologiste analyses
    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token is missing');
                    return;
                }
                const response = await get('/aa/analyse');

                if (Array.isArray(response.analyses)) {
                    setAnalyses(response.analyses);
                } else {
                    console.error('Données invalides reçues');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des analyses :', error);
            }
        };

        fetchAnalyses();

    }, []);

    // Get biologiste orders  
    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await get('/getAllCommandes');
                setCommandes(response);
            } catch (error: any) {
                console.error("Erreur lors de la récupération des commandes");
            }
        };

        fetchCommandes();
    }, []);

    const modifierAnalyse = async (updatedAnalyse: Analyse) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token is missing');
                return;
            }
            await update(`/aa/analyse/${updatedAnalyse.id}`, updatedAnalyse);
            alert('Analyse modifiée avec succès !');

            setIsPopupOpen(false)
        } catch (error) {
            console.error('Erreur lors de la modification de l\'analyse :', error);
        }
    };

    const supprimerAnalyse = async (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette analyse ?')) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token is missing');
                    return;
                }
                await remove(`/aa/analyse/${id}`);
                setAnalyses((prevAnalyses) => prevAnalyses.filter((analyse) => analyse.id !== id));
                alert('Analyse supprimée avec succès !');
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'analyse :', error);
            }
        }
    };

    const indexOfLastAnalyse = currentPage * analysesPerPage;
    const indexOfFirstAnalyse = indexOfLastAnalyse - analysesPerPage;
    const currentAnalyses = analyses.slice(indexOfFirstAnalyse, indexOfLastAnalyse);

    const totalPages = Math.ceil(analyses.length / analysesPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    // Filter commandes based on selected status
    const filteredCommandes = selectedStatus
        ? commandes.filter(commande => commande.etat_commande === selectedStatus)
        : commandes;

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar switchList={setIsListOne} currentList={isListOne} />
            <div className="flex ps-8 pe-9 justify-between mt-[30px]">
                <h1 className="text-2xl">Liste des commandes</h1>
                <div className="flex items-center gap-4">
                    <button className="text-[#1e2266fa] hover:opacity-80 bg-transparent cursor-pointer"
                        onClick={() => setSelectedStatus("")}>
                        Tous
                    </button>
                    <button className="text-[#1e2266fa] hover:opacity-80 bg-transparent cursor-pointer"
                        onClick={() => setSelectedStatus("En Attente")}>
                        En Attente
                    </button>
                    <button className="text-[#e1a518fa] hover:opacity-80 bg-transparent cursor-pointer"
                        onClick={() => setSelectedStatus("Confirmé")}>
                        Confirmé
                    </button>
                    <button className="text-[#1e2266fa] hover:opacity-80 bg-transparent cursor-pointer"
                        onClick={() => setSelectedStatus("En cours d'analyse")}>
                        En cours d'analyse
                    </button>
                    <button className="text-[#1E664DFA] hover:opacity-80 bg-transparent cursor-pointer"
                        onClick={() => setSelectedStatus("Terminé")}>
                        Terminé
                    </button>
                </div>
            </div>

            {!isListOne && (<h3 className="ml-auto me-10 text-[#A9A7A7FC] mb-2 mt-2 font-semibold"> {totalPages} {totalPages > 1 ? "Pages" : "Page"} </h3>)}

            {!isListOne && (
                <ListAnalyses
                    analyses={currentAnalyses}
                    supprimerAnalyse={supprimerAnalyse}
                    setActionAnalyse={setActionAnalyse}
                    setAnalyseId={setAnalyseId}
                    onOpen={() => setIsPopupOpen(true)}
                    onOpenInfo={() => setIsPopupInfoOpen(true)}
                    listAnalyseType={"myAnalyses"}
                />
            )}

            {
                isListOne && (
                    <ListCommandes
                        commandes={filteredCommandes}
                        onOpen={() => setIsPopupPatient(true)}
                        onOpenInfo={() => setIsPopupInfoOpen(true)}
                        setCommandeId={setCommandeId}
                    />
                )
            }

            {isPopupOpen && (
                <AddUpdateAnalyse
                    ajouterAnalyse={(newAnalyse: Analyse) => {
                        setAnalyses(prevAnalyses => [...prevAnalyses, newAnalyse]);
                        setIsPopupOpen(false);
                    }}

                    onClose={() => setIsPopupOpen(false)}
                    action={actionAnalyse}
                    modifierAnalyse={modifierAnalyse}
                    analyses={currentAnalyses}
                    analyseId={analyseId}
                />
            )}

            {isPopupPatient && (
                <PatientInfo info={commandes.find(commande => commande.id === commandeId)?.patient} onClose={() => setIsPopupPatient(false)} />
            )}

            {isPopupInfoOpen && (
                <AnalyseInfo
                    analyses={currentAnalyses}
                    analyseId={analyseId}
                    onClose={() => setIsPopupInfoOpen(false)}
                    {...(isListOne && { commandes, commandeId })}
                />
            )}

            {
                !isListOne && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )
            }

            <Footer />
        </div>
    );
}
