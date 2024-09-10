import React, { useState } from 'react'
import UseHooks from '../../hooks/useHooks'
import Followbtn from './followbtn';
import { useBlog } from '../../../context/context';
import { useNavigate } from 'react-router-dom';
const Follow = () => {
  const {data,loading} = UseHooks("users");
  const {currentUser} = useBlog();
  const [count,setCount] = useState(5);
  const users = data && data?.slice(0,count).filter((users) => users.userId !== currentUser?.uid);
  console.log(users);
  const navigate = useNavigate();
    return (

    <>
    {users?.map((user) => 
   
    {

      const {username,Bio,image,userId} = user;
      return(
        <div key={userId} className='flex items-start gap-2 my-4'>
          <div className='flex-1 flex items-center gap-2 cursor-pointer'
             onClick={() =>{
              navigate(`/profile/${userId}`);
           }}
          >
            <img className='w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer' 
         
            src={image} alt="userImage" />
            <div className='flex flex-col gap-1'>
            <h2 className='font-bold capitalize'> {username}</h2>
            <span className='text-gray-500 leading-4 text-sm line-clamp-2'>{Bio || "This user dont have bio"}</span>
           
          </div>
          </div>
        
          <Followbtn userId={userId}></Followbtn>
        </div>
      );
    }
   
    )}
    {data?.length > 5 && (

      <button
      onClick={() => setCount((prev) => users.length < data?.length && prev + 5)}
       className='text-green-400 hover:underline mb-3'>Click here Explore more </button>
    ) }
     
    </>
  )
}

export default Follow;