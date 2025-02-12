import React from 'react';
import { Link } from 'react-router-dom';



const AuthButtons: React.FC = () => {
    return (
        <div className="flex w-full justify-between xl:px-[20%] md:px-[10%] px-[8%]" >
            <Link to={"/analyses"} className={"md:text-xl  bg-green-green text-white xl:px-8 xl:py-4  md:px-6 md:py-2 px-5 py-2  rounded-3xl"}> Mes commandes</Link>

            <Link to={"/mycatalog" } className={"md:text-xl  bg-green-green text-white xl:px-8 xl:py-4  md:px-6 md:py-2 px-5 py-2  rounded-3xl"} >Mon catalogue </Link> 


            <Link to={"/consult-analyses" } className={"md:text-xl  bg-green-green text-white xl:px-8 xl:py-4  md:px-6 md:py-2 px-5 py-2  rounded-3xl"}>  Commander analyse</Link>
            <Link to={"/panier"} className={"md:text-xl  bg-green-green text-white xl:px-8 xl:py-4  md:px-6 md:py-2 px-5 py-2  rounded-3xl"}> Panier</Link>

            
            
        </div>
    );
};

export default AuthButtons;
