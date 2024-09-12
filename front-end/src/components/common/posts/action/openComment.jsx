import React from 'react'
import { useBlog } from '../../../../context/context';
import { TfiCommentsSmiley } from "react-icons/tfi";
import { formatnumber } from '../../../../utils/helper';
const OpenComment = () => {
         
    const {setShowComment,commentLength} = useBlog();
    
  return (
    <>

    <button
    onClick={() => setShowComment(true)}
    className='flex  items-center gap-1 text-sm'
   
    ><TfiCommentsSmiley /></button>
    <span>{formatnumber(commentLength)}</span>
    </>
  )
}

export default OpenComment