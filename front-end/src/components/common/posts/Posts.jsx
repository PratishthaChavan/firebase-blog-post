import React from 'react'
import UseHooks from '../../hooks/useHooks';
import Loading from '../../Loading/Loading';
import PostCards from './postCards';

const Posts = () => {

  const {data,loading} = UseHooks("posts");
  console.log(data);


  return (
   <section className='flex flex-col gap-[2.5rem]'>
     {loading ? <Loading/> : data.map((post,i) => <PostCards post={post} key={i}/>)}
  </section>
  )
}

export default Posts