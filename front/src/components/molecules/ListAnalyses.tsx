import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Analyse, FilterAnalyse } from "types";
import check from "@assets/icons/check.svg"

type ListAnalyseProps = {
    analyses: Analyse[];
    supprimerAnalyse?: (id: number) => void;
    setActionAnalyse?:(value: string) => void
    setAnalyseId:(id: number)=> void
    onOpen:()=>void
    onOpenInfo:() => void
    listAnalyseType:string
    analysisByLab?:boolean
    currentLabId?:number
    filterAnalyse?:FilterAnalyse
    filterActive?:boolean
};

export default function ListAnalyses({ analyses, supprimerAnalyse, 
    setActionAnalyse, setAnalyseId, onOpen, onOpenInfo, listAnalyseType, 
    analysisByLab, currentLabId, filterAnalyse, filterActive}: ListAnalyseProps) {
    
// Extract all analysis or filter by biologist
const analysis = filterActive?analyses.filter(analyse => {
    return (
      (!filterAnalyse?.examen || (analyse.codeCNAM == filterAnalyse.examen || analyse.nom == filterAnalyse.examen)) &&
      (!filterAnalyse?.nature_prelevement || analyse.type_prelevement === filterAnalyse.nature_prelevement) &&
      (!filterAnalyse?.specialite || analyse.specialité === filterAnalyse.specialite) &&
      (!filterAnalyse?.technique || analyse.technique === filterAnalyse.technique) &&
      (!filterAnalyse?.temperature || analyse.temperature == filterAnalyse.temperature) &&
      (!filterAnalyse?.tarification || analyse.prix == filterAnalyse.tarification)
    )}

):!analysisByLab?
analyses:analyses.filter(analyse => analyse.biologiste?.id === currentLabId)


return (
        <div className="overflow-x-auto ps-8 pe-8">
        <div className="rounded-t-lg overflow-y">
        <table className="min-w-full">
            <thead className="bg-green-green">
                <tr className="text-white">
                    <th className="px-4 py-2 text-center">Code</th>
{listAnalyseType=="analyseLab"&&<th className="px-4 py-2 text-center">Laboratoire</th>}  
                    <th className="px-4 py-2 text-center">Nom</th>
                    <th className="px-4 py-2 text-center">Durée</th>
                    <th className="px-4 py-2 text-center">Type prélèvement</th>
                    <th className="px-4 py-2 text-center">Technique</th>
            {listAnalyseType=="myAnalyses"&&<th className="px-4 py-2 text-center">Machine</th>}
                    <th className="px-4 py-2 text-center">Prix</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {analysis && analysis.length > 0&&analysis.map((analyse) => (
                    <tr key={analyse.id} className="bg-white shadow-xl rounded-xl
                    border-t-[8px] border-[#f9f9f9] mb-[15xp]" >
                        {  (
                            <>
                                <td className="px-4 py-2 text-center">{analyse.codeCNAM}</td>
{listAnalyseType=="analyseLab"&&<td className="px-4 py-2 flex justify-center">
    <img src={analyse.biologiste?.logo} width={"90px"} height={"90px"} alt="Logo Laboratoire" /> </td>}
                                <td className="px-4 py-2 text-center">{analyse.nom}</td>
                                <td className="px-4 py-2 text-center">{analyse.durée}</td>
                                <td className="px-4 py-2 text-center">{analyse.type_prelevement}</td>
                                <td className="px-4 py-2 text-center">{analyse.technique}</td>
                        {listAnalyseType=="myAnalyses"&&<td className="px-4 py-2 text-center">{analyse.machine}</td>}        
                                <td className="px-4 py-2 font-bold text-center">{analyse.prix}DT</td>
                                <td className="px-4 py-2">
                                <div className="flex items-center space-x-4 justify-center">
                                    <button onClick={()=>{onOpenInfo();setAnalyseId(analyse.id)}} className="flex items-center justify-around font-medium text-5xl flex w-7 h-7 rounded-full 
                                    border-[3.2px] border-[#1E664DFA]">
                                    <div className="w-[0.25rem] h-[0.25rem] bg-green-green rounded-full"></div>
                                    <div className="w-[0.25rem] h-[0.25rem] bg-green-green rounded-full"></div>
                                    <div className="w-[0.25rem] h-[0.25rem] bg-green-green rounded-full"></div>
                                   </button>
                                    {listAnalyseType=="myAnalyses"&&<><button type="button" className="text-green-green text-2xl" onClick={onOpen}>
                                        <FontAwesomeIcon icon={faEdit} onClick={()=>{setActionAnalyse&&setActionAnalyse("update");setAnalyseId(analyse.id);}} />
                                    </button>
                                    <button type="button" onClick={() => supprimerAnalyse && supprimerAnalyse(analyse.id)} className="text-[red] text-2xl">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button></>}

                                {listAnalyseType=="analyseLab"&&<button onClick={()=>{onOpen();setAnalyseId(analyse.id)}} type="button">
                                    
                                    <img src={check}  />

                                    </button>}


                                    </div>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
      {(analysis.length == 0)&&<p className="text-[red] text-center mt-10 font-bold">aucune analyse trouvée</p>}  
        </div>
        </div>
    );


}
