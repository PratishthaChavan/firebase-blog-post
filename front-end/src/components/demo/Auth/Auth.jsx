import React from 'react'
import Model from '../../../utils/Model'
import { FaRegTimesCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
const Auth = () => {
    const [createUser,setCreateUser] = useState(false);
  return (
    <Model>
        <section
        className='z-40 fixed  top-5 bottom-5 rounded-md left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white shadow'>
            <button className='absolute top-8 right-8 text-2xl hover:opacity-50'><FaRegTimesCircle/></button>
            <div className='flex flex-col items-center justify-center gap-[3rem]'>
                <>
                  <h1 className='text-2xl pt-[5rem]' >Welcome Back</h1>
                 <div className='flex flex-col gap-3 w-fit mx-auto'>
                 <Button icon={<FcGoogle className='text-xl'/>} text={"sign in with Google"}></Button>
                 <Button icon={<TfiEmail className='text-xl'/>} text={"sign in with Google"}></Button>
                 
                 </div>
                 <p>No Account
                 <button className='font-bold text-blue-500 hover:text-blue-600 rounded-full ml-1  '>Create One</button>
                 </p>
                
                
                </>
                
            </div>
        </section>
    </Model>
  )
}

export default Auth

const Button = ({icon,text,click}) => {
    return(
        <>
        <button className='flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full text-1xl'>
            {icon} {text}
        </button>
        
        </>
    )
}