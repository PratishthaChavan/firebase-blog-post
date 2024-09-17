import React from 'react';
import UseSingleFetch from '../../hooks/useSingleFetch';
import { useBlog } from '../../../context/context';
import PostCards from '../../common/posts/postCards';
import Loading from '../../Loading/Loading';

const ProfileList = ({ getUserData }) => {
  const { currentUser } = useBlog();
  const { data, loading } = UseSingleFetch("users", currentUser?.uid, "savePost");

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // If the user has no saved posts
  const hasNoSavedPosts = data.length === 0;

  return (
    <div>
      {currentUser?.uid === getUserData?.userId ? (
        <div className='flex flex-col gap-[2rem] mb-1'>
          {hasNoSavedPosts ? (
            <p className='text-gray-400'>
              <span className='capitalize mr-1'>{getUserData?.username}</span> has no saved post
            </p>
          ) : (
            data?.map((post, i) => <PostCards post={post} key={i} />)
          )}
        </div>
      ) : (
        <p>You do not have permission to view these posts.</p>
      )}
    </div>
  );
};

export default ProfileList;
