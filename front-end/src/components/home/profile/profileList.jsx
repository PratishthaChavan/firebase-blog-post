import React from 'react'
import UseSingleFetch from '../../hooks/useSingleFetch'
import { useBlog } from '../../../context/context'
import PostCards from '../../common/posts/postCards';

const ProfileList = ({ getUserData }) => {
  const { currentUser } = useBlog();
  const { data, loading } = UseSingleFetch("users", currentUser?.uid, "savePost");

  // Check if it's still loading
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle case where no data is available
  if (!data || data.length === 0) {
    return (
      <div>
        {currentUser?.uid === getUserData?.userId && (
          <p className='text-green-600 font-light text-xl'> <span>{getUserData?.username}</span> has no posts.</p>
        )}
      </div>
    );
  }

  // Render the data when available
  return (
    <div>
      {currentUser?.uid === getUserData?.userId && (
        <div className='flex flex-col gap-[2rem] mb-[2rem]'>
          {data?.map((post,i) => <PostCards post={post} key={i}/>)}
        </div>
      )}
    </div>
  );
};

export default ProfileList;
