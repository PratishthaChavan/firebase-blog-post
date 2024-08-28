import React, { useState } from 'react'
import { CiSaveDown2 } from "react-icons/ci";
import { useBlog } from '../../../../context/context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
const SavePost = ({post}) => {
    const [isSaved,setIsSaved] = useState();
    const {currentUser} = useBlog();
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