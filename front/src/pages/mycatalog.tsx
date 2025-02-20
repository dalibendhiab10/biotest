import { useState, useEffect } from "react";
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



export default function MyCatalogPage() {
    const [analyses, setAnalyses] = useState<Analyse[]>([]);
    const [analyseId, setAnalyseId] = useState<number>(0)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [actionAnalyse, setActionAnalyse] = useState("")

    const analysesPerPage = 10;

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
                    console.log(response.analyses)
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

    return (
        <div className="flex flex-col min-h-screen">




            <NavBar />

            <div className="flex ps-8 pe-9 justify-between mt-[30px]">
                <h1 className="text-2xl">Liste des Analyses par votre laboratoire</h1>
                <button className="text-[#1E664DFA] hover:opacity-80 bg-transparent cursor-pointer 
                        text-xl transition-colors duration-300 w-7 h-7 flex items-center justify-center 
                        rounded-full border-[2.5px] border-[#1E664DFA] mt-1" onClick={() => setIsPopupOpen(true)}>
                    <FontAwesomeIcon icon={faPlus} onClick={() => setActionAnalyse("add")} />
                </button>
            </div>


            <h3 className="ml-auto me-10  text-[#A9A7A7FC] mb-2 mt-2 font-semibold"> {totalPages} {totalPages > 1 ? "Pages" : "Page"} </h3>

            <ListAnalyses
                analyses={currentAnalyses}
                supprimerAnalyse={supprimerAnalyse}
                setActionAnalyse={setActionAnalyse}
                setAnalyseId={setAnalyseId}
                onOpen={() => setIsPopupOpen(true)}
                onOpenInfo={() => setIsPopupInfoOpen(true)}
                listAnalyseType={"myAnalyses"}
            />


            {isPopupOpen && (
                <AddUpdateAnalyse
                    ajouterAnalyse={(newAnalyse: Analyse) => {
                        setAnalyses([...analyses, newAnalyse]);
                        setIsPopupOpen(false)
                    }}
                    onClose={() => setIsPopupOpen(false)}
                    action={actionAnalyse}
                    modifierAnalyse={modifierAnalyse}
                    analyses={currentAnalyses}
                    analyseId={analyseId}
                />
            )}





            {isPopupInfoOpen && (
                <AnalyseInfo analyses={currentAnalyses}
                    analyseId={analyseId}
                    onClose={() => setIsPopupInfoOpen(false)}

                />
            )}


            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <Footer />

        </div>
    );
}
