import React, { useState } from 'react';
import UseHooks from '../../hooks/useHooks';
import Followbtn from './followbtn';
import { useBlog } from '../../../context/context';
import { useNavigate } from 'react-router-dom';

const Follow = () => {
  const { data, loading} = UseHooks("users");
  const { currentUser  } = useBlog();
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No users found.</p>;
  console.log("this is the data length",data?.length);
  const users = data && data.slice(0, count).filter(user => user.userId !== currentUser?.uid);

  return (
    <>
      {users.map(user => {
        const { username, Bio, image, userId } = user;
        return (
          <div key={userId} className='flex items-start gap-2 my-4'>
            <div className='flex-1 flex items-center gap-2 cursor-pointer' onClick={() => navigate(`/profile/${userId}`)}>
              <img className='w-[3rem] h-[3rem] object-cover' src={image || "/profile.jpg"} alt="userImage" />
              <div className='flex flex-col gap-1'>
                <h2 className='font-bold capitalize'>{username}</h2>
                <span className='text-gray-500 leading-4 text-sm line-clamp-2'>{Bio || "This user doesn't have a bio"}</span>
              </div>
            </div>
            <Followbtn userId={userId} />
          </div>
        );
      })}
      {data.length > count  && (
        <button
          onClick={() => setCount((prev) => users.length < data?.length && prev + 3)}
          className='text-green-400 hover:underline mb-3'
        >
          Click here to explore more
        </button>
      )}
    </>
  );
};

export default Follow;
