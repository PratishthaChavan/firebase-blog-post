import React, { useEffect, useState } from 'react';
import { PiHandsClappingFill } from "react-icons/pi";
import { useBlog } from '../../../../context/context';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';
import UseSingleFetch from '../../../hooks/useSingleFetch';
import { formatnumber } from '../../../../utils/helper';
import Heart from "react-animated-heart";
const Like = ({ postId }) => {
  const { currentUser ,authModel,setAuthModel} = useBlog();
  const [isLiked, setIsLiked] = useState(false); 
  const { data, loading } = UseSingleFetch("posts", postId, "likes");
 


  useEffect(() => {
    if (loading) return; 
    setIsLiked(data.some((item) => item.id === currentUser?.uid));
  }, [data, loading, currentUser?.uid]);

  const handleLike = async () => {
    

    try {
     if(currentUser){
      const likeRef = doc(db, "posts", postId, "likes", currentUser.uid);

      if (isLiked) {
      
        await deleteDoc(likeRef);
      } else {
      
        await setDoc(likeRef, { userId: currentUser.uid });
      }
      
     
      setIsLiked(!isLiked);
     }
     else{
      setAuthModel(true);
     }

    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button 
        onClick={handleLike}
        className={`text-xl flex items-center gap-1 ${isLiked ? "text-black" : "text-gray-500"}`}
      >
        <PiHandsClappingFill />
        
        <span>{formatnumber(data?.length)}</span>
      </button>
    </div>
  );
};

export default Like;
