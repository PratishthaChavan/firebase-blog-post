import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Dropdown from '../../../../utils/dropdown';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../../../context/context';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';

const Button = ({ title, onClick }) => {
  return (
    <button
      className={`px-2 hover:bg-slate-400 w-full text-sm text-left py-1 hover:text-black ${title === "Delete Story" ? "text-red-500":""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const Action = ({postId,title,desc}) => {
  const {setUpdatePostData,currentUser} = useBlog();
  const [showDrop,setShowDrop] = useState(false);
  const navigate = useNavigate(null);
  const handleDropDown = () => {
    setShowDrop(true);
  }
  const handleEdit = () => {
    navigate(`/editpost/${postId}`);
    setUpdatePostData({title,description:desc});
  }

  const handleDelete = async() => {
    try {
      const likeRef = doc(db,"posts",postId,"likes",currentUser?.uid);
      const ref = doc(db,"posts",postId);
      const commentRef = doc(db,"posts",postId,"comments",currentUser?.uid);
      const savePostRef = doc(db,"users",currentUser?.uid,"savePost",postId);
      await deleteDoc(ref);
      await deleteDoc(likeRef);
      await deleteDoc(commentRef);
      await deleteDoc(savePostRef);
      navigate("/");
      
    } catch (error) {
      console.log("Problem deleting Post");
    }
  }
return (
    <div className='relative'>
      <button >
        <BsThreeDots className='text-2xl' onClick={handleDropDown} />
      </button>
        <Dropdown showDrop={showDrop} 
                  setShowDrop={setShowDrop} 
                  size="w-[7rem]">
          <Button 
            title="Edit Story" 
            onClick={handleEdit}
          />
          <Button 
            title="Delete Story" 
            onClick={handleDelete}
          />
        </Dropdown>
      
    </div>
  );
};

export default Action;
