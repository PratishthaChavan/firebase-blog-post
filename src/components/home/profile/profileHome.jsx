import React from 'react'
import PostCards from '../../common/posts/postCards'
import UseHooks from '../../hooks/useHooks'
import Loading from '../../Loading/Loading'
const ProfileHome = ({getUserData}) => {
  const {data,loading} = UseHooks("posts");
  console.log("this is the post data",data)
   const userPost = data && data?.filter((post) => post.userId === getUserData?.userId);

  return (
    <div className='flex flex-col mb-[4rem] gap-4 '>
      {userPost.length === 0 && (<p className='text-gray-500'>
        <span className='capitalize'>{getUserData?.username}  <span>Has no posts yet</span> </span>
      </p>)  }
      {loading ? <Loading/> : userPost.map((post,i) => (
        <PostCards post={post} key={i}  />
      )) }
    </div>
  )
}

export default ProfileHome