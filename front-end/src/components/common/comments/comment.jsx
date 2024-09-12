import React, { useState } from 'react'
import { useBlog } from '../../../context/context'
import Comments from './comments';
import moment from 'moment';
import { BsThreeDots } from "react-icons/bs";
import Dropdown from '../../../utils/dropdown';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
const Comment = ({items:comment,postId}) => {
    const {allUser,currentUser} = useBlog();
    const getUserData = allUser.find((users) => users.id === comment?.userId);
    const {userId,Usercomments,created} = comment;
    const [more,setMore] = useState(false);
    const [edit,setIsEdit] = useState(false);
   const [editComment,setEditComment] = useState("");
    const [drop,setDrop] = useState(false);
    
    const EditCommonComments = () => {
        setIsEdit(true);
            setDrop(false);
            setEditComment(Usercomments);
        
    }
    const handleEdit = async() => {
        try {
            const ref = doc(db, "posts", postId, "comments", comment?.id); // Use comment?.id
            await updateDoc(ref, {
                Usercomments: editComment,
                created: Date.now(),
                userId: currentUser?.uid
            });
            setEditComment('');
            setIsEdit(false);
            setDrop(false);
            alert("The comment is updated");
        } catch (error) {
            console.log("Internal server error:", error);
        }
    }

    const removeComments = async() => {
        try {
            const ref = doc(db,"posts",postId,"comments",comment?.id);
            await deleteDoc(ref);
            alert("The comment is removed");
            setDrop(false);
        } catch (error) {
            console.log("Internal server error");
            
        }


    }

 
  return (
   <section className='border-b'>

    {!edit ? (
        <>
        <div className='flex items-center gap-5 pt-[1rem]'>
        <img className='w-[2rem] h-[2rem] object-cover rounded-full' src={getUserData?.image || "/profile.jpg"} alt="" />
       <div className='flex-1 flex justify-between'>
        <div>
            <h3 className='text-sm capitalize'>{getUserData?.username}</h3>
            <p className='text-sm text-gray-400'>{moment(created).fromNow()}</p>
        </div>
        <div className='relative'>
            {currentUser && currentUser?.uid === userId && (<>
                <button
                onClick={() => setDrop(!drop)}
                     className='text-2xl hover:opacity-70'>
                <BsThreeDots />
                </button> 

                <Dropdown showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
                     <Button
                     click={EditCommonComments}
                      title={"Edit Comment"}></Button>
                     <Button
                     click={removeComments}
                      title={"Delete Comment"}></Button>
                </Dropdown>
            </>
                
                )}
        </div>
       </div>
    </div>
    <p className='py-4 text-sm break-words'>{more ? Usercomments : Usercomments.substring(0, 100)}
    {Usercomments.length > 100 && (
        <button onClick={() => setMore(!more)} className='text-blue-500'>
            {more ? "...less" : "...more"}
        </button>
    )}
</p>
        </>
    ): <div className='bg-white shadows p-4'>
        <textarea
        value={editComment}
        onChange={(e) => setEditComment(e.target.value)}
         placeholder='Write your updated comment' className='w-full outline-none resize-none text-sm'></textarea>
        <div className='flex items-center justify-end gap-2'>
          <button
          onClick={() => {
            setIsEdit(false);
            setDrop(false);
          }} 
           className='rounded-full text-sm w-fit font-serif bg-red-400 py-1 px-2'>Cancel</button>
          <button 
          onClick={handleEdit}
          className='rounded-full text-sm w-fit font-serif bg-green-400 py-1 px-2'>Update</button>
        </div>
    </div> }
   </section>
  )
}

export default Comment

const Button = ({click,title}) => {
    return(
        <button 
        onClick={click}
        className='p-2 hover:bg-gray-400 text-left text-sm w-full ' >{title}</button>
    )

}