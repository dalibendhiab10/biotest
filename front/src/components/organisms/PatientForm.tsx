import React, { useState } from 'react';
import { Patient } from 'types';
import 'styles/PatientForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import FormInput from '@components/atoms/FormInput';
import { post } from 'api/axiosConfig';

import { Navigate, useNavigate } from 'react-router-dom';



interface PatientFormProps {
  onClose: () => void;
  analyseId: number
}

const PatientForm: React.FC<PatientFormProps> = ({ onClose, analyseId }) => {

  const [patient, setPatient] = useState<Patient>({
    nom: '',
    prenom: '',
    date_naissance: undefined,
    sexe: '',
    numcarte: 0,
    reference: '',
    DDR: undefined,
    date_deb_grossesse: undefined,
    nbrefoetus: 0,
    date_prelevement: undefined,
    heure_prelevement: 0,
    diurese: 0,
    nbretube: 0,
    temp: 0,
    congele: false,
    urgent: false,
    enceinte: false,
    commentaire: '',
  });





  // const [error, setError] = useState("")


    const navigate = useNavigate();





  // Updated handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]:
        type === 'number' ? Number(value) :   // Convert numeric inputs to numbers
          type === 'date' ? (value ? new Date(value) : undefined) :  // Convert date strings to Date objects
            value,  // Default to string for other types
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    try {

      await post(`/patients/${id}`, patient)

      alert('Analyse ajoutée avec succèsssssssss !');
      onClose();
      navigate('/panier');

    } catch (err: any) {

      // setError(err.message)
      console.error(err.message)
    }

  };

  return (
    <div onClick={onClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-6 max-w-xl w-full">
        <FontAwesomeIcon icon={faXmark} className='float-right cursor-pointer' onClick={onClose} />
        <h2 className="text-xl font-semibold text-center text-green-800 mb-8 mt-2">
          Information patient
        </h2>

        {/* Form */}
        <form className="grid grid-cols-2 gap-4 place-items-center" onSubmit={(e) => handleSubmit(e, analyseId)}>

          <FormInput label={"Nom"} name={"nom"} type={"text"} value={patient.nom} onChange={handleChange} />
          <FormInput label={"Prenom"} name={"prenom"} type={"text"} value={patient.prenom} onChange={handleChange} />
          <FormInput label={"Date Naissance"} name={"date_naissance"} type={"date"} value={patient.date_naissance ? patient.date_naissance.toISOString().split('T')[0] : ''} onChange={handleChange} />

          <div>
            <label htmlFor="sexe" className="block text-gray-700 ms-2 mb-2">
              Sexe
            </label>
            <select
              id="sexe"
              name="sexe"
              className="mt-1 w-[180px] p-2 bg-[#D6EFD8] rounded-3xl shadow-[0px_4px_4px_0px_#0000000D]"
              value={patient.sexe}
              onChange={(e) => setPatient({ ...patient, sexe: e.target.value })}
            >
              <option></option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>

          {patient.sexe === 'femme' && (
            <div className="col-span-2">
              <input
                type="checkbox"
                id="enceinte"
                name="enceinte"
                checked={patient.enceinte}
                onChange={(e) => setPatient({ ...patient, enceinte: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="enceinte" className="text-gray-700">
                Enceinte
              </label>
            </div>
          )}

          {patient.enceinte && (
            <>
              <FormInput label={"DDR"} name={"DDR"} type={"date"} value={patient.DDR ? patient.DDR.toISOString().split('T')[0] : ''} onChange={handleChange} />
              <FormInput label={"Date debut grossesse"} name={"date_deb_grossesse"} type={"date"} value={patient.date_deb_grossesse ? patient.date_deb_grossesse.toISOString().split('T')[0] : ''} onChange={handleChange} />
              <FormInput label={"Nombre foetus"} name={"nbrefoetus"} type={"number"} value={patient.nbrefoetus} onChange={handleChange} />
            </>
          )}

          <FormInput label={"Nombre de tubes"} name={"nbretube"} type={"number"} value={patient.nbretube} onChange={handleChange} />


          <FormInput label={"Heure de prélèvement"} name={"heure_prelevement"} type={"number"} value={patient.heure_prelevement} onChange={handleChange} />
          <FormInput label={"Commentaire"} name={"commentaire"} type={"text"} value={patient.commentaire} onChange={handleChange} />
          
          <div className="col-span-2">
            <input
              type="checkbox"
              id="urgent"
              name="urgent"
              checked={patient.urgent}
              onChange={(e) => setPatient({ ...patient, urgent: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="urgent" className="text-gray-700">
              Urgent
            </label>
          </div>


          {/* Buttons */}
          <button type="submit" className="px-8 py-2 col-span-2 mt-4 bg-green-green text-white rounded-3xl hover:bg-green-700">
            Passer commande
          </button>

        </form>
      </div>
    </div>
  );
};

export default PatientForm;
