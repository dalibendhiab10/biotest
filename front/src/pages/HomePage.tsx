import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButtons from '@components/molecules/AuthButtons';
import Footer from '@components/organisms/Footer';
import logoLabTech from '../assets/logo.png';



const HomePage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleNavigateToMyAnalyses = () => navigate('/analyses');
    const handleNavigateToConsultAnalyses = () => navigate('/consult-analyses');

    return (
        <>
        <div className='flex flex-col min-h-screen'>
        <div className='flex flex-col justify-center items-center mt-1'>
            
            <img src={logoLabTech} alt="Logo" className="h-[300px]"/>
            

            <h2 className="text-xl sm:text-3xl  tracking-widest mb-[70px]">Veuillez choisir votre type d’utilisateur</h2>

            {isAuthenticated ? (

                <AuthButtons 
                    onMyAnalysesClick={handleNavigateToMyAnalyses} 
                    onConsultAnalysesClick={handleNavigateToConsultAnalyses} 
                />

            ) : (
                <p>Vous devez être connecté pour accéder à cette page.</p>
            )}
         </div>

            <Footer />
            </div>
        </>
    );
};

export default HomePage;
