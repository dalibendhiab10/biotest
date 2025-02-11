import patient from "@assets/icons/patient.svg"
import { Commande } from "types";


type ListCommandeProps = {

    commandes: Commande[]
    onOpen: () => void
    onOpenInfo: () => void
    setCommandeId: (id: number) => void
};

export default function ListCommandes({ commandes, onOpen, onOpenInfo, setCommandeId }: ListCommandeProps) {




    return (
        <div className="overflow-x-auto ps-8 pe-8 mt-10">
            <div className="rounded-t-lg overflow-y">
                <table className="min-w-full">
                    <thead className="bg-green-green">
                        <tr className="text-white">
                            <th className="px-4 py-2 text-center">Code</th>
                            <th className="px-4 py-2 text-center">Status</th>
                            <th className="px-4 py-2 text-center">Laboratoire</th>
                            <th className="px-4 py-2 text-center">Nom</th>
                            <th className="px-4 py-2 text-center">Durée</th>
                            <th className="px-4 py-2 text-center">Date</th>
                            <th className="px-4 py-2 text-center">Prix</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map((commande) => (

                            <tr key={commande.id} className="bg-white shadow-xl rounded-xl border-t-[8px] border-[#f9f9f9] mb-[15xp]" >
                                {(

                                    <>
                                        <td className="px-4 py-2 text-center">{commande.analyse.codeCNAM}</td>
                                        <td className="px-4 py-2 text-center">
                                            {/* <img src={commande.biologiste.logo} width={"90px"} height={"90px"} alt="Logo Laboratoire" />  */}
                                            {commande.etat_commande}
                                        </td>
                                        <td className="px-4 py-2 flex justify-center">
                                            <img src={commande.biologiste.logo} width={"90px"} height={"90px"} alt="Logo Laboratoire" />
                                        </td>
                                        <td className="px-4 py-2 text-center">{commande.analyse.nom}</td>
                                        <td className="px-4 py-2 text-center">{commande.analyse.durée}  </td>
                                        <td className="px-4 py-2 text-center">{new Date(commande.date_commande).toLocaleDateString()}</td>

                                        <td className="px-4 py-2 font-bold text-center"> {commande.prix_total}DT </td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center space-x-4 justify-center">
                                                
                                            <button type="button" className="text-green-green text-2xl" >
                                                    <svg fill="#1e664d" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xmlSpace="preserve">
                                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"> <polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "></polygon> </g>
                                                    </svg>
                                                </button>
                                                <button onClick={() => { onOpenInfo(); setCommandeId(commande.id) }}
                                                    className="flex items-center justify-around font-medium text-5xl 
                                                    w-7 h-7 rounded-full border-[3.2px] border-[#1E664DFA]">
                                                    <div className="w-[0.25rem] h-[0.25rem] bg-green-green rounded-full"></div>
                                                    <div className="w-[0.25rem] h-[0.25rem] bg-green-green rounded-full"></div>
                                                    <div className="w-[0.25rem] h-[0.25rem] bg-green-green rounded-full"></div>
                                                </button>

                                                <button type="button" className="text-green-green text-2xl" onClick={() => { onOpen(); setCommandeId(commande.id) }}>
                                                    <img src={patient} className="mb-1" width={"30px"} />
                                                </button>

                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}
