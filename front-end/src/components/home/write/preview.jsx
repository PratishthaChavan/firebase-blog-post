import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from "react-icons/io";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import TagsInput from 'react-tagsinput';
import { db, storage } from '../../../firebase/firebase';
import { useBlog } from '../../../context/context';
import { useNavigate } from 'react-router-dom';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const Preview = ({ setPublish, title, description }) => {
    const [desc, setDesc] = useState('');
    const imgRef = useRef(null);
    const { currentUser } = useBlog();
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const [preview, setPreview] = useState({ title: "", photo: "" });
    const [tags, setTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [username, setUsername] = useState("");

    const handleSubmit = async () => {
        if (isSubmitting) return; 

        setIsSubmitting(true); 

        try {
            if (preview.title === "" || desc === "" || tags.length === 0) {
                alert('All fields are required');
                setIsSubmitting(false); 
                return;
            }
            if (preview.title.length < 15) {
                alert("The title must be at least 15 characters long");
                setIsSubmitting(false);
                return;
            }

            const coll = collection(db, "posts");
            let url;
            if (imageUrl) {
                const storageRef = ref(storage, `image/${preview.photo.name}`);
                await uploadBytes(storageRef, preview.photo);
                url = await getDownloadURL(storageRef);
            }
            
            await addDoc(coll, {
                userId: currentUser.uid,
                title: preview.title,
                desc,
                tags,
                postImg: url || "",
                created: Date.now(),
                pageview: 0,
            });

            alert("The post has been successfully added");
            setPreview({ title: "", photo: "" });
            setDesc("");
            setTags([]);
            setPublish(false);
            navigate("/");

        } catch (error) {
            console.error("Error adding document: ", error);
        } finally {
            setIsSubmitting(false); 
        }
    };

    useEffect(() => {
        if (title || description) {
            setPreview(prev => ({ ...prev, title }));
            setDesc(description);
        } else {
            setPreview(prev => ({ ...prev, title: "" }));
            setDesc("");
        }
    }, [title, description]);

    const handleClick = () => {
        imgRef.current.click();
    };

    const fetchUsername = async () => {
        if (currentUser) {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                setUsername(userSnapshot.data().username);
            } else {
                console.log("No such document!");
            }
        }
    };

    useEffect(() => {
        fetchUsername();
    }, [currentUser]); 
    return (
        <section className='absolute inset-0 bg-gray-400 z-30'>
            <div className='size my-[2rem]'>
                <span
                    onClick={() => setPublish(false)}
                    className='absolute right-[1rem] md:right-5 top-[3rem] text-2xl cursor-pointer'>
                    <IoMdClose />
                </span>
                <div className='mt-[8rem] flex flex-col md:flex-row gap-10'>
                    <div className='flex-[1]'>
                        <h3>Story Preview</h3>
                        <div
                            style={{ backgroundImage: `url(${imageUrl})` }}
                            onClick={handleClick}
                            className='w-full h-[300px] object-cover bg-gray-100 my-3 grid 
                            place-items-center cursor-pointer bg-cover'>
                            Add Image
                        </div>
                        <input
                            onChange={(e) => {
                                setImageUrl(URL.createObjectURL(e.target.files[0]));
                                setPreview(prev => ({ ...prev, photo: e.target.files[0] }));
                            }}
                            ref={imgRef} type="file" hidden />
                        <input type="text" placeholder='Preview Title'
                            value={preview.title}
                            onChange={(e) => setPreview(prev => ({ ...prev, title: e.target.value }))}
                            className='outline-none w-full border-b border-green-400 py-2' />
                        <ReactQuill
                            className='py-3 border-b border-gray-300'
                            placeholder='Preview story...'
                            theme="snow" value={desc}
                            onChange={setDesc} />
                        <p className='text-green-500 font-sans'><span className='font-bold'>Note:</span> Changes here will affect how your story appears in Public</p>
                    </div>
                    <div className='flex-[1] flex flex-col mb-5 gap-4 md:mb-0'>
                        <h3 className='text-3xl font-bold caption-bottom'>Publish to: <span>{username}</span></h3>
                        <p>Add and change topics so readers know what the story is about</p>

                        <TagsInput value={tags} onChange={setTags} />

                        <button
                            onClick={handleSubmit}
                            className='btn rounded-full bg-green-600 w-fit'>
                            {isSubmitting ? "Publishing..." : "Publish now"}
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Preview;
