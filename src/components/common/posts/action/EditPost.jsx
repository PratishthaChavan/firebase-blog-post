import React, { useEffect } from 'react'

import { useBlog } from '../../../../context/context';
import 'react-quill/dist/quill.snow.css';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
const EditPost = () => {
    const {updatePostData,title,setTitle,description,setDescription } = useBlog();
   
    useEffect(() => {
        if(updatePostData) {
            setTitle(updatePostData.title);
            setDescription(updatePostData.description);

        }

    },[])
   
   
  return (
    <div className='w-full h-screen bg-gray-100 overflow-auto'>
   <section className='write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem] '>
    <input 

    value={title}
    onChange={(e) => setTitle(e.target.value)}
    type="text"
     placeholder='Title' 
     className='w-full text-4xl outline-none'/>
    <SunEditor 
                setContents={description}
                onChange={setDescription}
                setOptions={{
                    
                    height: 300,
                    buttonList: [
                        ['font', 'fontSize', 'formatBlock'],
                        ['bold', 'underline', 'italic', 'strike'],
                        ['list', 'lineHeight', 'paragraphStyle'],
                        ['link', 'image', 'video'],
                        ['align', 'horizontalRule'],
                       
                        ['undo', 'redo'],
                
                        
                    ],
                   
                }}
            />
   </section>
   </div>
  )
}

export default EditPost