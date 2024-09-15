import React from 'react';
import { useBlog } from '../../context/context';
import { BsGraphUpArrow } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { readtime } from '../../utils/helper';
const Trending = () => {
  const { postdata, allUser } = useBlog();
  const getTrending = postdata?.sort((a, b) => b.pageview - a.pageview);

  return (
    <section className='border-b border-gray-600'>
      <div className='size py-[1rem]'>
        <div className='flex items-center gap-3 font-semibold'>
          <span>
            <BsGraphUpArrow />
          </span>
          <h2>Trending Blog</h2>
        </div>
        <div className='grid grid-cols-card gap-3'>
          {getTrending?.slice(0, 6).map((trend, i) => {
       
            const user = allUser?.find((user) => user.userId === trend.userId);
            return <Trend trend={trend} user={user} key={i} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Trending;


const Trend = ({ trend, user, index }) => {

  const navigate = useNavigate();
  return (
    <main className='flex gap-4 w-full'>
      <span className='text-gray-400 text-4xl mt-4'>{index + 1}</span>
      <div className='py-6 flex flex-col gap-3'>
        <div className=' flex items-center gap-2 '>
          <div
          onClick={() => navigate(`/profile/${trend?.userId}`)}
           className='flex items-center gap-2 cursor-pointer hover:opacity-75'>
            <img className='w-[1.3rem] h-[1.3rem] rounded-full object-cover' src={user?.image || trend?.postImg} alt="" />
            <h2 className='font-semibold'>{user?.username || trend?.username}</h2>
          </div>
          
        </div>
        <div
        onClick={() => navigate(`/post/${trend?.id}`)}
        className='flex flex-col gap-3 cursor-pointer hover:opacity-75 0'>
            <p className='w-full md:w-[18rem] text-md font-bold line-clamp-2'>{trend.title}...</p>
            <p className='text-gray-400 text-xs'>
              {moment(trend?.created).format("MMM YY")}
              {`${readtime(trend?.desc)} min read`} 
            </p>
            

          </div>
      </div>
    </main>
  );
};
