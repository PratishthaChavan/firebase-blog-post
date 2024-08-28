import React, { useState } from 'react';
import Preview from './preview';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useBlog } from '../../../context/context';

const Write = () => {
    const [description, setDescription] = useState('');
    const {publish,setPublish} = useBlog(false);
    const [title,setTitle] = useState('');
  return (
    <div>
        <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" placeholder='Title' 
            className='text-4xl outline-none w-full border-b border-green-400'/>
              <ReactQuill
               className='write my-5'
               placeholder='Tell your Story...' 
               theme="bubble" value={description} 
               onChange={setDescription} />
              <div className={`${publish ? "visible opacity-100" :"invisible opacity-0" }
               transition-all duration-200 `} >
              <Preview setPublish={setPublish} title={title} description={description}></Preview>
              </div>
               
        </section>

    </div>
  )
}

export default Write