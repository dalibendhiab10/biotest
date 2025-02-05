import LaboratoireCard from "@components/molecules/LaboratoireCard"
import { useIdUser } from "@helpers/useIdUser"
import { Biologiste } from "types"




interface LaboListProps{

biologists: Biologiste[]
setCurrentLabId:(id:number)=>void
setAnalysisByLab:(b:boolean)=>void
} 



const LaboList:React.FC<LaboListProps> = ({biologists, setCurrentLabId, setAnalysisByLab})=>{


const {userId} = useIdUser()


return <div className="grid grid-cols-3 gap-4 place-items-center">


{biologists
  .filter((biologist) => biologist.id !== userId)  // Exclude the biologist with id equal to userId
  .map((biologist) => (
    <LaboratoireCard
      key={biologist.id}
      nom={biologist.laboratoire}
      logo={biologist.logo}
      setCurrentLabId={() => setCurrentLabId(biologist.id)}
      setAnalysisByLab={() => setAnalysisByLab(true)}
    />
  ))
}




</div>




}


export default LaboList















