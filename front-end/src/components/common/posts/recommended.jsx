import React from 'react'
import UseHooks from '../../hooks/useHooks';
import { useEffect,useState } from 'react';

const Recommended = ({post:SinglePost}) => {
  const {data} = UseHooks("posts");
  const [commonTags,setCommonTags] = useState([]);
  useEffect(() => {
    let recommendedPost = [];
    data && data.forEach((post)=> {
      const postTag = post.tags;
      const commonTags = postTag.filter((tag) => SinglePost?.tags?.includes(tag));
      if (commonTags>0) {
        recommendedPost.push({
          ...post,commonTags
        });
        
      }
    })
setCommonTags(recommendedPost);
  },[data,SinglePost]);

  console.log(commonTags);
  return (
    <div></div>
  )
}

export default Recommended;