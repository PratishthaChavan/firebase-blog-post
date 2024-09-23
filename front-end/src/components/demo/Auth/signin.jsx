import React from 'react'
import Input from '../../../utils/input';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc,getDoc, setDoc } from 'firebase/firestore';
import {useNavigate } from 'react-router-dom';
import { auth,db } from '../../../firebase/firebase';
const Signin = ({setModel}) => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    username:"",
    email:"",
    password:"",
    
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (form[("username","email","password")] === "") {
      alert("Please enter all required details");
      return;
    }
    try{
      const {user} = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
   const ref = doc(db,"users",user.uid);
   const userDoc = await getDoc(ref);
   if (!userDoc.exists()){
    await setDoc(ref,{
      userId: user.uid,
      username: form.username,
      email: form.email,
      password: form.password,
      Bio:"",
      image: "",
      createdAt:Date.now()

    });
    navigate('/');
    setModel(false);
   }
    }
    catch(error){
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("This email is already registered. Please try logging in.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }
  return (
    <div className='size mt-[2rem] text-center'>
        <h1 className='text-3xl text-blue-600 font-bold' >Login</h1>
        <p className='w-full sm:w-[25rem] mx-auto py-[1rem]'>
            Enter your Details
        </p>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <Input
          type="text"
          title="Username"
          form={form}
          setForm={setForm}
          name="username"
          
        
        />
            
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
            className='px-4 py-1 rounded-full text-sm bg-blue-700 hover:bg-blue-600 w-fit mx-auto'>Sign In</button>

        </form>
     

    </div>
  )
}

export default Signin;