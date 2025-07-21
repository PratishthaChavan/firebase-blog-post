import React, { useState, useEffect } from 'react';
import Model from '../../../utils/Model';
import { FaRegTimesCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../../../firebase/firebase';
import Signin from './signin';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SignInUser from './signup'; 

const Auth = ({ modal, setModal }) => {
  const [createUser, setCreateUser] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false); 
  const navigate = useNavigate();

  
  const googleAuth = async () => {
    try {
      const createUser = await signInWithPopup(auth, provider);
      const newUser = createUser.user;
      const ref = doc(db, "users", newUser.uid);
      const userDoc = await getDoc(ref);
   console.log(userDoc);
      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          Bio: "",
          image: ""
        });

        navigate('/');
        toast.success("User successfully logged in");
        setModal(false);
      }
    } catch (error) {
      toast.error("Login unsuccessful");
    }
  };

  return (
    <Model modal={modal} setModal={setModal}>
      <section
        className={`z-40 fixed top-10 bottom-5 left-2 right-2 md:left-[10rem] md:right-[10rem] overflow-auto bg-white rounded-md shadow transition-all duration-500
    ${modal ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <button className='absolute top-8 right-8 text-2xl hover:opacity-50'
          onClick={() => setModal(false)}><FaRegTimesCircle /></button>
        <div className='flex flex-col items-center justify-center gap-[3rem]'>

     
          {showSignInForm ? (
            <SignInUser />
          ) : (
            <>
              <Signin setModel={setModal} />
              <Button click={googleAuth}
                icon={<FcGoogle className='text-xl' />}
                text={`${createUser ? "Sign in" : "Sign up"} with Google`} />
              <div className='font-bold'>
                Already have an account? 
                <button 
                  className='text-blue-500 font-semibold hover:text-blue-600'
                  onClick={() => setShowSignInForm(true)}  
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </Model>
  );
};

export default Auth;

const Button = ({ icon, text, click }) => {
  return (
    <>
      <button
        onClick={click}
        className='flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full text-1xl'>
        {icon} {text}
      </button>
    </>
  );
};
