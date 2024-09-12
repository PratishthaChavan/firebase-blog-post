import React, { useEffect } from 'react'
import { FaRegComments } from "react-icons/fa";
import Model from '../../../utils/Model';
import { useState } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { useBlog } from '../../../context/context';
import { collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import UseSingleFetch from '../../hooks/useSingleFetch';
import Loading from '../../Loading/Loading';
import Comment from './comment';
const Comments = ({postId}) => {
  
  const {currentUser,allUser,showComment,setShowComment,commentLength,setCommentLength} = useBlog();
  const getUserData = allUser.find((user) => user.id === currentUser?.uid);
  const [comments,setComments] = useState("");
  const {data,loading} = UseSingleFetch("posts" , postId ,"comments");
  console.log("this is the post data",data);

  const writeComments = async() => {
    try {
      if(comments === "") {
        alert("The comment is empty ");
      }
      const commentRef = collection(db,"posts", postId,"comments" );
      await addDoc(commentRef,{
        Usercomments:comments,
        created: Date.now(),
        userId: currentUser?.uid

      });
      setComments("");
    } catch (error) {
      
      console.log("error in comments ",error);
    }
  }

  useEffect(() => {
   if(data) {
    setCommentLength(data.length);
   }
  } ,[data]); 

  return (
  <>
    <Model modal={showComment} setModal={setShowComment}>
<section className={`fixed top-0 right-0 bottom-0 z-50 bg-white w-[22rem] shadows p-5 overflow-y-auto transition-all duration-500
  ${showComment ? "translate-x-0" : "translate-x-[23rem]"}`}>
    <div className='flex items-center justify-between'>
      <h2 className='text-xl font-bold '>Response({data.length})</h2>
      <button
      onClick={() => setShowComment(false)}
       className='text-xl'>
      <LiaTimesSolid />
      </button>
    </div>
    {currentUser && (
      <div className='shadows p-3 my-5 overflow-hidden'>
        <div className='flex items-center gap-2 mb-5'>
        <img className='w-[2rem] h-[2rem] object-cover rounded-full' src={getUserData?.image || "/profile.jpg"} alt="user image" />
        <h3 className='text-sm capitalize '>{getUserData?.username}</h3>
        </div>
        <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder='Share your thought here'
         className='w-full outline-none resize-none text-sm border px-2 pt-4'></textarea>
         <div className='flex items-center justify-end gap-4 mt-[1rem]'>
          <button 
          onClick={() => setComments("")}
          className='bg-red-400 text-sm font-serif hover:bg-violet-700 rounded-full px-2 py-1'>Cancel</button>
          <button 
          onClick={writeComments}
          className='bg-violet-400 text-sm font-serif hover:bg-blue-300 rounded-full px-2 py-1'>Response</button>
         </div>
      </div>
    )}
    {data && data?.length === 0 ? (<p>This post has no comments </p>) : ( 
      <div className='border-t py-4 mt-8 flex flex-col gap-8'>
        {data && data.map((items,i) => (
      loading ? <Loading/> : <Comment items={items}key={i} postId={postId}/>)
    )}
      </div>
    ) }
  </section>
     
    </Model>
  </>
  )
}

export default Comments