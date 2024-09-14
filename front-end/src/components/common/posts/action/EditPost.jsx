import React, { useEffect } from 'react'
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useBlog } from '../../../../context/context';

const EditPost = () => {
    const {updatePostData,title,setTitle,description,setDescription } = useBlog();
   
    useEffect(() => {
        if(updatePostData) {
            setTitle(updatePostData.title);
            setDescription(updatePostData.description);

        }

    },[])
   
  return (
   <section className='write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
    <input 

    value={title}
    onChange={(e) => setTitle(e.target.value)}
    type="text"
     placeholder='Title' 
     className='w-full text-4xl outline-none'/>
    <ReactQuill
               className='!text-[4rem] my-3'
               placeholder='Description' 
               theme="bubble"
               value={description} 
               onChange={setDescription} />
   </section>
  )
}

export default EditPost