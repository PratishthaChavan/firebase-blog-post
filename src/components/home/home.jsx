import React from 'react'
import Follow from './userTofollow/follow';
import Posts from '../common/posts/Posts';

const Home = () => {
  return (

   <div className='w-full h-screen bg-gray-100 overflow-auto'>
   <section className='size flex gap-[5rem] relative '>
  <div className='flex-[2] py-10 mb-[4rem]'>
   <Posts/>
  </div>
  <div className='hidden md:inline-block md:w-[21rem] p-7 border-1 border-gray-300'>
    <h3 className='font-serif text-xl '>Who to follow</h3>
    <Follow></Follow>
  </div>
   </section>
   </div> 
  )
}

export default Home;