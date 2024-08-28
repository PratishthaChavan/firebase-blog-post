import React from 'react'
import Banner from './banner';
import Trending from './Trending';
import Posts from '../common/posts/Posts';
import Discover from './discover';
const Demo = () => {
  return (
    <>
    
<Banner/>
<Trending/>
<div className='size py-7 flex flex-col-reverse md:flex-row gap-[7rem]'>
  <div className='flex-[1.5rem]'>
    <Posts></Posts>

  </div>
  <div className='flex-[1] relative'>
    <Discover></Discover>
  </div>
</div>


    
    </>
  
  )
}

export default Demo;