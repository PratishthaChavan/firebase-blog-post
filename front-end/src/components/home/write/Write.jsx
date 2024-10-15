import React, { useState } from 'react';
import Preview from './preview';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useBlog } from '../../../context/context';

const Write = () => {
    const [description, setDescription] = useState('');
    const { publish, setPublish } = useBlog(false);
    const [title, setTitle] = useState('');

    const handleEditorChange = (content) => {
        setDescription(content);
    };

    return (
        <div className='w-full h-screen bg-gray-100 overflow-auto'>
            <section className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]'>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    placeholder='Title' 
                    className='text-4xl outline-none w-full border-b border-green-400'
                />
                <SunEditor
                    setContents={description}
                    onChange={handleEditorChange}
                    setOptions={{
                        height: 300,
                        buttonList: [
                            ['font', 'fontSize', 'formatBlock'],
                            ['bold', 'underline', 'italic', 'strike'],
                            ['list', 'lineHeight', 'paragraphStyle'],
                            ['link', 'image', 'video'],
                            ['align', 'horizontalRule', 'lineHeight'],
                            
                            ['undo', 'redo'],
                            
                        ],
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
