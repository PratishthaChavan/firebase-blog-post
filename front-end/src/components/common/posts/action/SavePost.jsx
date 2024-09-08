import React, { useEffect, useState } from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import { useBlog } from '../../../../context/context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import UseSingleFetch from '../../../hooks/useSingleFetch';
const SavePost = ({post}) => {
    const [isSaved,setIsSaved] = useState(false);
    const {currentUser} = useBlog();
    const {data,loading} = UseSingleFetch("users" , currentUser?.uid , "savePost" );
    useEffect(() => {
        setIsSaved( data && data.find((item) => item.id === post.id));
    },[data,[post?.id]]);
    const handleSave = async() => {
        try {
            if(currentUser){
                const saveRef = doc(db,"users",currentUser?.uid,"savePost",post?.id);
                if(isSaved){
                    await deleteDoc(saveRef)
                    alert("post has been unsaved");
                }
                else{
                    await setDoc(saveRef,{...post},)
                    alert("the Post is saved");
                }
            }
           
        } catch (error) {
            
        }

    }
  return (
    <>
    <button
    onClick={handleSave}
     className='hover:opacity-60'>
        <CiSaveDown2 className={`text-2xl pointer-event-none ${isSaved ? "text-yellow-400 ": ""}`} />
        </button>
    </>
  )
}

export default SavePost