import React, { useState } from 'react'
import Model from '../../../utils/Model'
import { FaRegTimesCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth,provider,db } from '../../../firebase/firebase';
import Signin from './signin';
import {doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
 
const Auth = ({ modal, setModal }) => {
    const [createUser,setCreateUser] = useState(false);
    const navigate = useNavigate();
    const googleAuth = async() => {
        try {
            const createUser = await signInWithPopup(auth,provider );
            const newUser = createUser.user;
            const ref = doc(db,"users",newUser.uid);
            const userDoc = await getDoc(ref)
            if (!userDoc.exists()){
              await setDoc(ref,{
                userId: newUser.uid,
                username: newUser.displayName,
                email: newUser.email,
                Bio:"",
                image:""
               

              });
              navigate('/');
              toast.success("user is Successfully Login");
              setModal(false);
            }
        } catch (error) {
            toast.error("user is Login unsuccessful");
        }
    }
  
    
  return (
    <Model modal={modal} setModal={setModal}>
        <section
        className={`z-40 fixed  top-10 bottom-5 rounded-md left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white shadow
            ${modal ? "visible opacity-100" : "invisible opacity-0 transition-all duration-500"}`

        }>
            <button className='absolute top-8 right-8 text-2xl hover:opacity-50' onClick={() => setModal(false)}><FaRegTimesCircle/></button>
            <div className='flex flex-col items-center justify-center gap-[3rem]'>
                <Signin setModel={setModal}></Signin>
            <Button click={googleAuth} icon={<FcGoogle className='text-xl'/>} text={`${createUser ? "sign in" : "sign up"} with google`}></Button>
                
            </div>
        </section>
    </Model>
  )
}

export default Auth

const Button = ({icon,text,click}) => {
    return(
        <>
        <button
        onClick={click}
         className='flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full text-1xl'>
            {icon} {text}
        </button>
        
        </>
    )
}