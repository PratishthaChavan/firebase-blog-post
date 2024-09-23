import React, { useState } from 'react';
import Preview from './preview';
import ReactQuill,{ Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useBlog } from '../../../context/context';
import ImageResize from 'quill-image-resize-module-react';


Quill.register('modules/imageResize', ImageResize);
const Write = () => {
    const [description, setDescription] = useState('');
    const { publish, setPublish } = useBlog(false);
    const [title, setTitle] = useState('');
    

    
    const toolbarOptions = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'], 
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        [{ 'align':['', 'center', 'right', 'justify']}],
        ['clean'] 
    ];


  

    return (
        <div>
            <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]' >
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    placeholder='Title' 
                    className='text-4xl outline-none w-full border-b border-green-400'
                />
                <ReactQuill
                    className='write resize-auto my-5'
                    placeholder='Tell your Story...' 
                    theme="snow" 
                    value={description} 
                    onChange={setDescription}
                    modules={{
                        toolbar: toolbarOptions,
                        imageResize: {
                            modules: ["Resize", "DisplaySize"],
                          },
                    }}
                    
                />
                <div className={`${publish ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200`}>
                    <Preview setPublish={setPublish} title={title} description={description} />
                </div>
            </section>
        </div>
    );
}

export default Write;
