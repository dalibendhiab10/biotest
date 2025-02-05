import { Patient } from "types"
import { format } from 'date-fns';

interface PatientInfoProps{

info:Patient|undefined;
onClose:()=>void


}


export const PatientInfo: React.FC<PatientInfoProps> = ({info, onClose})=>{



return (

<div onClick={onClose} className="fixed z-50 w-full h-full bg-black bg-opacity-30 flex justify-center items-center" >
<div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl px-14 pb-8 pt-4 max-w-2xl w-full pb-12 pt-8 relative">
<button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
&#10005;
</button>
<h2 className="text-xl font-medium text-center text-green-800 mb-8">Patient(e) : <span className="text-green-green">{info?.prenom} {info?.nom} </span></h2>

<div className="grid grid-cols-3 gap-6 mt-4">

<div className="col-span-2 space-y-3">

<p className="flex space-x-2"><span className="font-medium">Nom:</span> 
<span className="text-green-green font-semibold">{info?.nom} </span></p>

<p className="flex space-x-2"><span className="font-medium">Prenom:</span> 
<span className="text-green-green font-semibold">{info?.prenom} </span></p>

<p className="flex space-x-2"><span className="font-medium">Sexe:</span> 
<span className="text-green-green font-semibold">{info?.sexe}</span></p>

<p className="flex space-x-2"><span className="font-medium">Date Naissance:</span> 
<span className="text-green-green font-semibold">{info?.date_naissance ? format(info.date_naissance, 'dd/MM/yyyy') : ''}</span></p>

<p className="flex space-x-2"><span className="font-medium">Num carte:</span> 
<span className="text-green-green font-semibold">{info?.numcarte} </span></p>

<p className="flex space-x-2"><span className="font-medium">Reference:</span> 
<span className="text-green-green font-semibold">{info?.reference} </span></p>

<p className="flex space-x-2"><span className="font-medium">DDR:</span> 
<span className="text-green-green font-semibold">{info?.DDR? format(info.DDR, 'dd/MM/yyyy'):""}</span></p>

<p className="flex space-x-2"><span className="font-medium">Date prelevement:</span> 
<span className="text-green-green font-semibold">{info?.date_prelevement? format(info.date_prelevement, 'dd/MM/yyyy'):""}</span></p>

<p className="flex space-x-2"><span className="font-medium">Heure prélèvement:</span> 
<span className="text-green-green font-semibold">{info?.heure_prelevement}H </span></p>

<p className="flex space-x-2"><span className="font-medium">Nbre Tube:</span> 
<span className="text-green-green font-semibold">{info?.nbretube} </span></p>

<p className="flex space-x-2"><span className="font-medium">Temp:</span> 
<span className="text-green-green font-semibold">{info?.temp} </span></p>

</div>

<div className="col-span-1 space-y-3">
{info?.date_deb_grossesse?  <p className="flex space-x-2"><span className="font-medium">Date début grocesse:</span> 
    <span className="text-green-green font-semibold">{info?.date_deb_grossesse ? format(info.date_deb_grossesse, 'dd/MM/yyyy') : ''} </span></p>:""}

{info?.nbrefoetus? <p className="flex space-x-2"><span className="font-medium">Nbre Foetus:</span> 
<span className="text-green-green font-semibold">{info.nbrefoetus} </span></p>:""}

<p className="flex space-x-2"><span className="font-medium">Congélé:</span> 
<span className="text-green-green font-semibold">{info?.congele} </span></p>

<p className="flex space-x-2"><span className="font-medium">Urgent:</span> 
<span className="text-green-green font-semibold">{info?.urgent} </span></p>
</div>


</div>










</div>
</div>

)





}