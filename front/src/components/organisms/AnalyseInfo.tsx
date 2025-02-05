import { faEnvelope, faFileArrowDown, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Analyse, Commande } from "types";


interface AnalysePopupProps {
  analyses: Analyse[];
  analyseId:number;
  onClose: () => void;
  commandes?:Commande[]
  commandeId?:number
}

const AnalyseInfo: React.FC<AnalysePopupProps> = ({ analyses, analyseId, onClose, commandes, commandeId }) => {


   const analyse = analyses.find(analyse => analyse.id === analyseId) 
   const commande = commandes?.find(commande=>commande.id===commandeId)
    
   
  return (
    <div className="fixed z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center" >
      <div className="bg-white rounded-xl px-14 pb-8 pt-4 max-w-2xl w-full pb-12 pt-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          &#10005;
        </button>
        <h2 className="text-xl font-medium text-center text-green-800 mb-8">{analyse?analyse.nom.toUpperCase():
        commande?.analyse.nom}</h2>

        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* Left Column */}
          <div className="col-span-2 space-y-3">
            <p className="flex space-x-2"><span className="font-medium">Code:</span> <span className="text-green-green font-semibold">{analyse?analyse.codeCNAM:
            commande?.analyse.codeCNAM}</span></p>
            <p className="flex space-x-2"><span className="font-medium">Nom:</span> <span className="text-green-green font-semibold">{analyse?analyse.nom:commande?.analyse.nom}</span></p>
            <p className="flex space-x-2"><span className="font-medium">Laboratoire:</span> </p>
            <p className="flex space-x-2"><span className="font-medium">Durée:</span> <span className="text-green-green font-semibold">{analyse?analyse.durée:commande?.analyse.durée}</span></p>
            <p className="flex space-x-2"><span className="font-medium">Type prélèvement:</span><span className="text-green-green font-semibold">{analyse?analyse.type_prelevement:
            commande?.analyse.type_prelevement}</span></p>
            <p className="flex space-x-2"><span className="font-medium">Technique:</span> <span className="text-green-green font-semibold">{analyse?analyse.technique:commande?.analyse.technique}</span></p>
            <p className="flex space-x-2"><span className="font-medium">Description:</span> <span>{analyse?analyse.description:commande?.analyse.description}</span></p>
            <p className="flex space-x-2"><span className="font-medium">Machine:</span> <span className="text-green-green font-semibold">{analyse?analyse.machine:commande?.analyse.machine}</span></p>
            <p className="flex space-x-2"><span className="font-medium">Température:</span> <span className="text-green-green font-semibold">{analyse?analyse.temperature:commande?.analyse.temperature}</span></p>
            <p className="font-bold text-xl">Prix: {analyse?analyse.prix:commande?.analyse.prix}DT</p>
          </div>

          {/* Right Column */}
          <div className="col-span-1  flex flex col">

          <div className="border-l border-[#8F8989] h-80 "></div>
          <div className="flex flex-col space-y-10 ms-3">
            <button className="flex text-green-700 hover:text-green-900">
            <FontAwesomeIcon icon={faPrint} className="text-green-600 text-xl me-2" /> <p>Imprimer</p>
            </button>
            <button className="flex text-green-700 hover:text-green-900">
            <FontAwesomeIcon icon={faEnvelope} className="text-green-600 text-xl me-2"/><p>Envoyer un email</p> 
            </button>
            <button className="flex text-green-700 hover:text-green-900">
            <FontAwesomeIcon icon={faFileArrowDown} className="text-green-600 text-xl me-2"/> <p className="text-left">Télécharger fiche de guide d'examen</p>
            </button>
            <p><span className="font-bold">Mot clé:</span> DOC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyseInfo;
