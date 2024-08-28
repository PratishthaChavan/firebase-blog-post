import React from 'react'
import useHooks from '../../hooks/useHooks'; 
import { readtime } from '../../../utils/helper';
import moment from 'moment';
import SavePost from './action/SavePost';
const PostCards = ({ post }) => {
  const {title, userId ,desc,postImg,created} = post; 
  const { data, loading } = useHooks("users"); 


  // Find the user data by userId
  const getUserData = data?.find((user) => user?.id === userId);

  return (
 
 <>
      <div className='flex flex-col sm:flex-row gap-4 cursor-pointer'>
      <div className='flex-[2.5]'>
        <p className='pb-2 font-semibold capitalize'>{getUserData?.username}</p>
        <h2 className='text-xl font-bold line-clamp-1 leading-6 capitalize'>{title}</h2>
        <div className='py-1 leading-5 text-gray-500 line-clamp-2 ' dangerouslySetInnerHTML={{__html:desc}} />

      </div>
      <div className='flex-[1]'> <img src={postImg} alt="" /> </div>
      </div>
      <div className='flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0'>
        <p className='text-xs text-gray-400'>{readtime({ __html: desc })} min read.{moment(created).format("MMM DD")} </p>
       <div className='flex items-center gap-3'>
        <SavePost post={post}/>
       </div>
      </div>
 </>
    
  );
}

export default PostCards;
