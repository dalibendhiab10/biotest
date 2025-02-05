
interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    styleInput?:string;
    styleLabel?:string;
  }


const FormInput:React.FC<FormInputProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    styleInput="mt-1 w-[180px] p-2 bg-[#D6EFD8] rounded-3xl shadow-[0px_4px_4px_0px_#0000000D]",
    styleLabel="block text-gray-700 ms-2 mb-2"
  })=>{



return ( 
<div>

<label htmlFor={name} className={styleLabel}  >
        {label}
</label>

<input  id={name}
name={name}
type={type}
value={value}
onChange={onChange}
placeholder={placeholder}
required={required}
className={styleInput} />

</div>)

}




export default FormInput