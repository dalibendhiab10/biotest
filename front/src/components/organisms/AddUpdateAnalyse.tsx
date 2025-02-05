import  { useEffect, useState } from 'react';
import { Analyse } from 'types'; 
import FormInput from '@components/atoms/FormInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark } from "@fortawesome/free-solid-svg-icons";
import {post} from 'api/axiosConfig';


interface AddUpdateAnalyseProps {
  ajouterAnalyse: (analyse: Analyse) => void;
  onClose: () => void;
  action:string;
  modifierAnalyse: (analyse: Analyse) => void;
  analyses:Analyse[];
  analyseId:number;
}

const AddUpdateAnalyse: React.FC<AddUpdateAnalyseProps> = ({ ajouterAnalyse, onClose, action, 
  modifierAnalyse, analyses, analyseId}) => {


  const analyse = analyses.find(analyse => analyse.id === analyseId)

  const [nouvelleAnalyse, setNouvelleAnalyse] = useState<Analyse>({
    id: analyse?analyse.id:0,
    codeCNAM:analyse?analyse.codeCNAM:'',
    nom:analyse?analyse.nom:'',
    description:analyse?analyse.description:'',
    prix:analyse?analyse.prix:0,
    durée:analyse?analyse.durée: 0,
    type_prelevement:analyse?analyse.type_prelevement:'',
    technique:analyse?analyse.technique:'',
    machine:analyse?analyse.machine: '',
    temperature:analyse?analyse.temperature:0,
    urgent:analyse?analyse.urgent:false,
    specialité:analyse?analyse.specialité:'',
    biologiste:analyse?analyse.biologiste:null,
  });

  //const token = localStorage.getItem('token');
  //console.log('Token récupéré:', token);


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNouvelleAnalyse({ ...nouvelleAnalyse, [name]: value });

 /*   if (name === 'codeCNAM' && value) {
      try {
        const response = await axios.get(`http://localhost:3000/CNAM/analyse_cnam/${value}`);
        const { nom, description, specialité } = response.data;
        setNouvelleAnalyse((prev) => ({
          ...prev,
          nom,
          description,
          specialité
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'analyse CNAM :', error);
      }
    } */

  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
   setNouvelleAnalyse({...nouvelleAnalyse, urgent: e.target.value==="true"})

  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await post('/api/analyse', nouvelleAnalyse);
      ajouterAnalyse(response);
      alert('Analyse ajoutée avec succès !');
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'analyse :', error);
    }
  };


  const handleUpdateSubmit = async(e:React.FormEvent, updatedAnalyse:Analyse)=>{

  e.preventDefault();

  modifierAnalyse(updatedAnalyse)
  
  } 



useEffect(()=>{

if(action=="add"){

setNouvelleAnalyse({
  id: 0,
  codeCNAM:'',
  nom:'',
  description:'',
  prix:0,
  durée:0,
  type_prelevement:'',
  technique:'',
  machine:'',
  temperature:0,
  urgent:false,
  specialité:'',
  biologiste:null,
})


}
   
}, [action])







return (

<div onClick={onClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
  
<div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-xl w-full">

<FontAwesomeIcon icon={faXmark} className='float-right cursor-pointer' onClick={onClose}/>

<h2 className="text-xl font-semibold text-center text-green-800 mb-10 mt-2">
{action=="add"?"Ajouter":"Modifier"} une nouvelle Analyse
</h2>


{/* Form */}
<form className="grid grid-cols-2 gap-4 place-items-center" onSubmit={(e)=>{action=="add"?handleAddSubmit(e):(action=="update"&&analyse)?handleUpdateSubmit(e, nouvelleAnalyse):""} }>

<FormInput  label={"Nom Analyse"} name={"nom"} type={"text"} 
 value={nouvelleAnalyse.nom} onChange={handleChange} />



<FormInput  label={"Code Analyse"} name={"codeCNAM"} type={"text"} 
 value={nouvelleAnalyse.codeCNAM} onChange={handleChange} />


<FormInput  label={"Prix DT"} name={"prix"} type={"number"} 
 value={nouvelleAnalyse.prix} onChange={handleChange} />



<FormInput  label={"Durée"} name={"durée"} type={"number"} 
 value={nouvelleAnalyse.durée} onChange={handleChange} />



<FormInput  label={"Type Prélèvement"} name={"type_prelevement"} type={"text"} 
 value={nouvelleAnalyse.type_prelevement} onChange={handleChange} />


<FormInput  label={"Technique"} name={"technique"} type={"text"} 
 value={nouvelleAnalyse.technique} onChange={handleChange} />


<FormInput  label={"Machine"} name={"machine"} type={"text"} 
 value={nouvelleAnalyse.machine} onChange={handleChange} />


<FormInput  label={"Température"} name={"temperature"} type={"number"} 
 value={nouvelleAnalyse.temperature} onChange={handleChange} />


<div>
<label htmlFor="urgent" className="block text-gray-700 ms-2 mb-2">
Urgent
</label>
<select 
id="urgent"
name="urgent"
className="mt-1 w-[180px] p-2 bg-[#D6EFD8] rounded-3xl shadow-[0px_4px_4px_0px_#0000000D]"
value={nouvelleAnalyse.urgent?"true":"false"}
onChange={handleSelectChange}
>
<option value="true">OUI</option>
<option value="false">NON</option>
</select>
</div>


<FormInput  label={"Spécialité"} name={"specialité"} type={"text"} 
 value={nouvelleAnalyse.specialité} onChange={handleChange} />

{/* Buttons */}
<div className="flex justify-between w-1/2 mt-12 col-span-2 mb-5">

<button type="button" className="px-8 h-8 bg-white text-gray-600 border
 border-gray-400 rounded-3xl hover:bg-gray-100 text-sm" onClick={onClose}>
Annuler
</button>

<button type="submit" className="px-8 bg-green-green text-white rounded-3xl hover:bg-green-700">
{action=="add"?"Ajouter":"Modifier"}  
</button>

</div>




</form>






</div>










</div>
  );
};

export default AddUpdateAnalyse;
