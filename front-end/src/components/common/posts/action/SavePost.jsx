import React, { useEffect, useState } from 'react';
import { CiSaveDown2 } from "react-icons/ci";
import { useBlog } from '../../../../context/context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import UseSingleFetch from '../../../hooks/useSingleFetch';

const SavePost = ({ post }) => {
    const [isSaved, setIsSaved] = useState(false);
    const { currentUser,setAuthModel } = useBlog();
    const { data, loading } = UseSingleFetch("users", currentUser?.uid, "savePost");

    useEffect(() => {
        if (data && post?.id) {
            setIsSaved(data.find((item) => item.id === currentUser?.uid));
        }
    }, [data, post?.id]);

    const handleSave = async () => {
        try {
            if (currentUser && post?.id) {
                const saveRef = doc(db, "users", currentUser.uid, "savePost", post.id);
                if (isSaved) {
                    await deleteDoc(saveRef);
                    alert("Post has been unsaved");
                } else {
                    await setDoc(saveRef, { ...post });
                    alert("The Post is saved");
                }
                
                setIsSaved(!isSaved);
            }
            else{
                setAuthModel(true);
            }
        } catch (error) {
            console.error("Error saving post:", error);
            alert("An error occurred while saving the post");
        }
    }

    return (
        <button
            onClick={handleSave}
            className='hover:opacity-60'>
            <CiSaveDown2 className={`text-2xl pointer-events-none ${isSaved ? "text-yellow-400" : ""}`} />
        </button>
    );
}

export default SavePost;
