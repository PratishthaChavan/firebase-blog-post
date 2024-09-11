import React, { useState } from 'react'
import { useBlog } from '../../../context/context'
import Comments from './comments';
import moment from 'moment';
import { BsThreeDots } from "react-icons/bs";
import Dropdown from '../../../utils/dropdown';
const Comment = ({items:comment,postId}) => {
    const {allUser,currentUser} = useBlog();
    const getUserData = allUser.find((users) => users.id === comment?.userId);
    const {userId,Usercomments,created} = comment;
    const [more,setMore] = useState(false);
    console.log("this is the user comment",Usercomments);
    const [drop,setDrop] = useState(false);
    
  return (
   <section className='border-b'>

    <div className='flex items-center gap-5'>
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
                     <Button title={"Edit Comment"}></Button>
                     <Button title={"Delete Comment"}></Button>
                </Dropdown>
            </>
                
                )}
        </div>
       </div>
    </div>
    <p className='py-4 text-sm'>{Usercomments}</p>
   </section>
  )
}

export default Comment

const Button = ({click,title}) => {
    return(
        <button className='p-2 hover:bg-gray-400 text-left text-sm w-full ' >{title}</button>
    )

}