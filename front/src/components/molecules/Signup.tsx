import PrimaryBtn from "@components/atoms/PrimaryBtn";
// import TextInput from "@components/atoms/TextInput";
import Title from "@components/atoms/Title";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {post} from "../../api/axiosConfig"




const Signup: React.FC = () => {
  const [matriculeFiscale, setMatriculeFiscale] = useState<string>('');
  const [numTel1, setNumTel1] = useState<number | ''>(''); 
  const [numTel2, setNumTel2] = useState<number | ''>('');
  const [personneConsacre, setPersonneConsacre] = useState<string>('');
  const [adresse, setAdresse] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [laboratoire, setLaboratoire] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [coursier, setCoursier] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

     await post('/biologiste/signup', {
        matricule_fiscale: matriculeFiscale,
        num_tel1: numTel1 !== '' ? numTel1 : undefined, 
        num_tel2: numTel2 !== '' ? numTel2 : undefined,
        personne_consacré: personneConsacre,
        adresse,
        email,
        password,
        laboratoire,
        logo,
        coursier
      });


      navigate('/login');
      

    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
  };

  const handleNumTel1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumTel1(value === '' ? '' : Number(value)); 
  };

  const handleNumTel2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumTel2(value === '' ? '' : Number(value)); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setLogo(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: '20px'}}>
      <Title className="mb-12" text="INSCRIPTION" />
      <form>
        <div>
          <label>Matricule fiscale:</label>
          <input className="w-full border border-black mb-2"
            type="text"
            value={matriculeFiscale}
            onChange={(e) => setMatriculeFiscale(e.target.value)}
            
          />
        </div>

        <div>
          <label>Numéro de téléphone 1:</label>
          <input className="w-full border border-black mb-2"
            type="number" 
            value={numTel1 === '' ? '' : numTel1} 
            onChange={handleNumTel1Change}
            
          />
        </div>

        <div>
          <label>Numéro de téléphone 2:</label>
          <input className="w-full border border-black mb-2"
            type="number"
            value={numTel2 === '' ? '' : numTel2} 
            onChange={handleNumTel2Change}
            
          />
        </div>

        <div>
          <label>Personne Contact:</label>
          <input className="w-full border border-black mb-2"
            type="text"
            value={personneConsacre}
            onChange={(e) => setPersonneConsacre(e.target.value)}
          />
        </div>

        <div>
          <label>Adresse:</label><br></br>
          <input className="w-full border border-black mb-2"
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input className="w-full border border-black mb-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Mot de passe:</label>
          <input className="w-full border border-black mb-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label>Laboratoire:</label>
          <input
            type="text"
            value={laboratoire}
            onChange={(e) => setLaboratoire(e.target.value)}
          />
        </div>

        <div>
          <label>Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {logo && <img src={logo} alt="Logo Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
        </div>

        <div>
          <label>Coursier:</label>
          <input
            type="checkbox"
            checked={coursier}
            onChange={(e) => setCoursier(e.target.checked)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      
        <PrimaryBtn clickFn={handleSubmit} text="S'inscrire" />
      </form>
      <p>Déjà un compte ? <a href="/login">Connectez-vous</a></p>
    </div>
  )
}

export default Signup;
