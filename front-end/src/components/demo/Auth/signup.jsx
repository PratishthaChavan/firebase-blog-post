import React, { useState } from 'react';
import Input from '../../../utils/input';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebase';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';

const SignInUser = ({ setModal }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
   
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      console.log(userDoc);

      if (userDoc.exists()) {
       
        toast.success('Login successful');
        setModal(false); 
        navigate('/'); 
      } else {
        
        toast.error('User not found');
      }
    } catch (error) {
      
      toast.error('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className='size mt-[rem] text-center'>
      <h2 className='text-3xl font-bold mt-3 '>Sign in with Email</h2>
      <p className='w-full sm:w-[25rem] mx-auto py-[3rem] '>Enter your Email and Password Correctly</p>
      
      <form className='flex flex-col gap-4' onSubmit={handleSignIn}>
        <Input
          type="email"
          title="Enter Your Email"
          form={form}
          setForm={setForm}
          name="email"
        />
        <Input
          type="password"
          title="Enter Your Password"
          form={form}
          setForm={setForm}
          name="password"
        />
        <button 
          type="submit"
          className='flex px-4 py-1 rounded-full border w-fit mx-auto text-sm bg-green-400 border-green-500'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInUser;
