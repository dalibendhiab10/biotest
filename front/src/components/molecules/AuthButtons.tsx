import React from 'react';
import Button from '@components/atoms/Button'


interface AuthButtonsProps {
    onMyAnalysesClick: () => void;
    onConsultAnalysesClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onMyAnalysesClick, onConsultAnalysesClick }) => {
    return (
        <div className="flex w-full justify-between xl:px-[20%] md:px-[10%] px-[8%]" >
            <Button style={"md:text-xl  bg-green-green text-white xl:px-8 xl:py-4  md:px-6 md:py-2 px-5 py-2 rounded-3xl"} onClick={onMyAnalysesClick} label={"Gérer mes analyses"} />
                
            
            <Button style={"md:text-xl  bg-green-green text-white xl:px-8 xl:py-4  md:px-6 md:py-2 px-5 py-2  rounded-3xl"} onClick={onConsultAnalysesClick} label={"Consulter analyses"} />
                
            
        </div>
    );
};

export default AuthButtons;
