import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { FilterAnalyse } from 'types';

interface SearchFormProps {
  searchOpen: boolean;
  setSearchOpen: (b: boolean) => void;
  filterAnalyse?: FilterAnalyse;
  setFilterAnalyse?: (filterAnalyse: FilterAnalyse) => void;
  setFilterActive?:(b:boolean)=>void
}

const SearchForm: React.FC<SearchFormProps> = ({ searchOpen, setSearchOpen, filterAnalyse, setFilterAnalyse, setFilterActive}) => {
  const [formValues, setFormValues] = useState<FilterAnalyse>({
    examen: '',
    nature_prelevement: '',
    specialite: '',
    technique: '',
    temperature: 0,
    tarification: 0,
    ...filterAnalyse, // Set initial form values from filterAnalyse if provided
  });

  // Handle input changes by updating the formValues state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (setFilterAnalyse) {
      setFilterAnalyse(formValues); // Update filterAnalyse with the form values
      setFilterActive&&setFilterActive(true)
    }
  };

  return (
    <div className={`absolute top-0 z-10 left-[-551px] h-full flex duration-300 ${searchOpen ? 'transform translate-x-[551px]' : ''}`}>
      <div className="bg-white p-6 rounded-md shadow-md overflow-y-auto px-10">
        <h2 className="text-2xl font-semibold mb-8">Veuillez remplir votre filtre de recherche</h2>

        <p className='mb-2'>Recherche Alphabétique</p>

        <h2 className='text-green-green font-medium text-2xl leading-[1.5] mb-5 tracking-[.55em]'>
          ABCDEFGHIJKLMNO<br />PQRSTUVWXYZ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col mb-5">
          <FormInput
            label={"Examen(Titre,Code,Syndrome)"}
            name={"examen"}
            type={"text"}
            value={formValues.examen}
            onChange={handleInputChange}
            styleInput={"mt-1 w-full p-3 bg-[#D6EFD8] rounded-3xl"}
            styleLabel="block text-gray-700 mb-4"
          />

          <FormInput
            label={"Nature prélèvement"}
            name={"nature_prelevement"}
            type={"text"}
            value={formValues.nature_prelevement}
            onChange={handleInputChange}
            styleInput={"mt-1 w-full p-3 bg-[#D6EFD8] rounded-3xl"}
            styleLabel="block text-gray-700 mb-4"
          />

          <FormInput
            label={"Spécialité"}
            name={"specialite"}
            type={"text"}
            value={formValues.specialite}
            onChange={handleInputChange}
            styleInput={"mt-1 w-full p-3 bg-[#D6EFD8] rounded-3xl"}
            styleLabel="block text-gray-700 mb-4"
          />

          <FormInput
            label={"Technique"}
            name={"technique"}
            type={"text"}
            value={formValues.technique}
            onChange={handleInputChange}
            styleInput={"mt-1 w-full p-3 bg-[#D6EFD8] rounded-3xl"}
            styleLabel="block text-gray-700 mb-4"
          />

          <FormInput
            label={"Température"}
            name={"temperature"}
            type={"number"}
            value={formValues.temperature}
            onChange={handleInputChange}
            styleInput={"mt-1 w-full p-3 bg-[#D6EFD8] rounded-3xl"}
            styleLabel="block text-gray-700 mb-4"
          />

          <FormInput
            label={"Tarification"}
            name={"tarification"}
            type={"number"}
            value={formValues.tarification}
            onChange={handleInputChange}
            styleInput={"mt-1 w-full mb-6 p-3 bg-[#D6EFD8] rounded-3xl"}
            styleLabel="block text-gray-700 mb-4"
          />

          <Button type={"submit"} style={"w-1/3 bg-green-green text-xl text-white p-2 rounded-3xl self-center"} label={"Recherche"} />
        </form>
      </div>

      {/* Toggle search bar */}
      <div onClick={() => setSearchOpen(!searchOpen)} className='cursor-pointer flex justify-center self-center bg-[#80AF81D6] w-[30px] h-[110px] rounded-e-xl opacity-50'>
        <FontAwesomeIcon className='self-center' icon={faChevronRight} />
      </div>
    </div>
  );
};

export default SearchForm;
