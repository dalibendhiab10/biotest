import Title from "@components/atoms/Title"
import userIcon from "@assets/icons/user.svg"
import passwordIcon from "@assets/icons/password.svg"
import { useState } from "react"
import TextInput from "@components/atoms/TextInput"
import PrimaryBtn from "@components/atoms/PrimaryBtn"
import { useNavigate } from "react-router-dom"
import { post } from "api/axiosConfig"

//type Props = {}

export default function Login(/*{}: Props*/) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  //const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await post('/biologiste/login', { email, password });
   
      localStorage.setItem('token', response.token);
      
      //localStorage.setItem('biologisteId', response.id);
      //console.log('biologisteId c est:', response.id);
      //console.log('Token stocké:', response.token);
      /*const token =*/ localStorage.getItem('token');
      //console.log('Token récupéré:', token);
      //setIsAuthenticated(true); 
      navigate('/home'); 
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez vérifier vos informations.');
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center ">
      <Title className="mb-12" text="CONNEXION" />
      <TextInput
        placeholder="Adresse email"
        icon={userIcon}
        value={email}
        setValue={setEmail}
      />
      <TextInput
        type="password"
        placeholder="Mot de passe"
        icon={passwordIcon}
        value={password}
        setValue={setPassword}
      />
      <div className="h-3"></div>
      <PrimaryBtn clickFn={handleLogin} text="Confirmer" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Pas encore de compte ? <a href="/signup">Inscrivez-vous ici</a></p>
      
    </div>
  )
}
