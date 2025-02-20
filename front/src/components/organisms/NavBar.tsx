import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '@assets/logo.png';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import admin from "@assets/icons/admin.svg"
import cart from "@assets/icons/cart.svg"



interface NavBarProps {

    currentList?: boolean
    switchList?: React.Dispatch<React.SetStateAction<boolean>>
    setAnalysisByLab?: (b: boolean) => void
    setFilterActive?: (b: boolean) => void
}



const NavBar: React.FC<NavBarProps> = ({ currentList, switchList, setAnalysisByLab, setFilterActive }) => {

    const navigate = useNavigate();
    const location = useLocation();

    return (<div className="flex items-center justify-between">


        <img src={logo} alt="Logo" className="w-[120px] h-[120px] cursor-pointer ms-5 mt-5" onClick={() => navigate("/home")} />


        <div className="flex text-xl font-medium">
            <h3  className={`cursor-pointer me-10 ${currentList == true ? "border-b-2 border-green-green text-green-green" : "cursor-pointer me-10 text-[#A9A7A7FC]"}`}> {location.pathname === "/analyses" ? "Liste des commandes" : " Commander une analyse "}</h3>
            {/* <h3 onClick={() => { switchList(false); setAnalysisByLab && setAnalysisByLab(false) }} className={`cursor-pointer ${currentList == false ? "border-b-2 border-green-green text-green-green" : "cursor-pointer text-[#A9A7A7FC]"}`}> {location.pathname === "/analyses" ? "Liste des analyses" : "Laboratoires"} </h3> */}
        </div>



        <div className="me-5 flex">


            {location.pathname === "/consult-analyses" && (
                <button>
                    <img src={cart} className="w-[23px] h-[23px] me-5" />
                </button>)
            }

            <button className='me-5'>
                <img src={admin} className="w-[21px] h-[21px]" />
            </button>

            <button className="text-[#1E664DFA] hover:opacity-80 bg-transparent cursor-pointer 
text-2xl transition-colors duration-300" onClick={() => {
                    localStorage.removeItem('token');
                    navigate("/login");
                }}>
                <FontAwesomeIcon icon={faSignOutAlt} className='mt-1' />
            </button>







        </div>

    </div>)



}



export default NavBar