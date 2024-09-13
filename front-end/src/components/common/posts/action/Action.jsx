import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import Dropdown from '../../../../utils/dropdown';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../../../context/context';


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
  const {setUpdatePostData} = useBlog();
  const [showDrop,setShowDrop] = useState(false);
  const navigate = useNavigate(null);
  const handleDropDown = () => {
    setShowDrop(true);
  }
  const handleEdit = () => {
    navigate(`/editpost/${postId}`);
    setUpdatePostData({title,description:desc});
  }



  return (
    <div className='relative'>
      <button >
        <BsThreeDots className='text-2xl' onClick={handleDropDown} />
      </button>

 
        <Dropdown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[7rem]">
          <Button 
            title="Edit Story" 
            onClick={handleEdit}
          />
          <Button 
            title="Delete Story" 
            onClick={() => console.log("Delete Story clicked")}
          />
        </Dropdown>
      
    </div>
  );
};

export default Action;
