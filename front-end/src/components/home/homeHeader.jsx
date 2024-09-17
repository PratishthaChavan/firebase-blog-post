import React, { useState } from 'react';
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineNotificationsActive, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import UserModel from './UserModel';
import { CiSearch } from "react-icons/ci";
import Search from './Search';
import { FaBlogger } from "react-icons/fa";
import { useBlog } from '../../context/context';
import Loading from '../Loading/Loading';
import { useLocation } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase';
const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  const [searchModel, setSearchModel] = useState(false);
  const {allUser,userLoading,currentUser,setPublish,updatePostData,title,description } = useBlog();
  const {pathname} = useLocation();
  const [loading,setLoading] = useState(false);
  const navigate= useNavigate();
  const editpath = pathname.split("/")[1];
  const postId = pathname.split("/")[2];
 
  


  const handleEdit = async() => {
try {
  const ref = doc(db,"posts",postId);
  await updateDoc(ref,{
    title,
    desc: description
  }
 
   
)
navigate(`/post/${postId}`);
alert("The post has been updated");
} catch (error) {
  console.log("internal server error");
}

}

  
  const getUserData = allUser.find((users) => users.id === currentUser?.uid)

  const toggleSearch = () => {
    setSearchModel(prev => !prev);
  };

  return (
    <header className='border-b border-gray-200'>
      {userLoading && <Loading/>}
      <div className='size h-[60px] flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link to="/demo">
            <span className='text-5xl'>
              <FaBlogger />
            </span>
          </Link>
       
          <div className='hidden sm:flex'>
            <Search modal={true} setModal={() => {}} /> 
          </div>
        </div>
        
        <div className='flex items-center gap-2 sm:gap-7'>
          
          <span 
            className='flex sm:hidden text-3xl text-gray-300 cursor-pointer'
            onClick={toggleSearch} 
          >
            <CiSearch />
          </span>
      {pathname === "/write"? <button
      onClick={() => setPublish(true )}
      className='btn !bg-green-500 !py-1 text-yellow-900 rounded-full !px-5'
      >Publish</button> : editpath === "editpost" ? (<button className='px-2 hover:bg-violet-400 
        
          bg-violet-300 rounded-full'
          onClick={
            handleEdit
          }
          >{loading ? "Updating..." : "Save and Update"}</button> ) : 
      (<Link to="/write" className='hidden md:flex items-center gap-1 text-gray-500'>
        <span className='text-2xl'><FaPenToSquare /></span>
        <span className='text-sm mt-1'>Write</span>
      </Link> )  }
      
          <span className='text-3xl text-gray-500 cursor-pointer'>
            <MdOutlineNotificationsActive />
          </span>
          <div className='flex items-center relative'>
            <img 
              src={getUserData?.image ? getUserData?.image : "/profile.jpg"} 
              alt="Profile" 
              className='w-[2.3rem] h-[2.3rem] object-cover rounded-full cursor-pointer'
            />
            <span className='text-gray-500 cursor-pointer'>
              <MdKeyboardArrowDown onClick={() => setModal(!modal)} />
            </span>
            {modal && (
              <div className='absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg'>
                <UserModel />
              </div>
            )}
          </div>
        </div>
      </div>
     
      <div className={`fixed top-[60px] left-0 w-full bg-white shadow-lg transition-transform ${searchModel ? "translate-y-0" : "-translate-y-full"} transition-all duration-300`}>
        <Search modal={searchModel} setModal={setSearchModel} />
      </div>
    </header>
  );
};

export default HomeHeader;
