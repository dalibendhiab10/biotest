import React from 'react';
import Button from '@components/atoms/Button';


interface LaboratoireCardProps {
    nom: string;
    logo?: string;
    setCurrentLabId:()=>void 
    setAnalysisByLab:()=>void
}

const LaboratoireCard: React.FC<LaboratoireCardProps> = ({ nom, logo, setCurrentLabId, setAnalysisByLab}) => {
    return (
        <div className="flex flex-col items-center justify-around w-[300px] h-[300px]">
            <div className='flex flex-col justify-around rounded-xl w-full h-3/4 text-center py-3 
            bg-white shadow-[0px_4px_4px_0px_#0000001A]'>

            {logo ? (
                <img src={logo} alt={`Logo du laboratoire ${nom}`} className="w-[80%] self-center" />
            ) : (
                <div className="">Aucun Logo</div>
            )}

            <h3>{nom}</h3>

            </div>
           <Button type={"button"} onClick={()=>{setCurrentLabId();setAnalysisByLab()}} label={"Voir Analyses"}  
           style={"bg-green-green text-white py-2 px-4 rounded-xl"} />


        </div>
    );
};

export default LaboratoireCard;
