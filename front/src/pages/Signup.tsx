
import logo from '../assets/logo.png';
import Signup from "@components/molecules/Signup"

export default function SignUpPage() {
  return (
    <div className="w-screen flex">
         <div className="w-1/2 flex flex-col justify-center items-center bg-custom-green h-screen">
        <img src={logo} className="w-[500px] h-[500px]" />
        <p className="mt-4 text-4xl text-black-shade font-medium">
          Sous-traitance des analyses
        </p>
      </div>
      <div className="w-1/2 my-auto px-52">
        <Signup />
      </div>
    </div>
  )
}