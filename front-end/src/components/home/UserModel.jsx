import React from 'react'
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { FaPenToSquare } from "react-icons/fa6";
import { MdAutoStories } from "react-icons/md";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { MdOutlineQueryStats } from "react-icons/md";
import { useBlog } from '../../context/context';
import { SecretEmail } from '../../utils/helper';
const UserModel = () => {
    const { currentUser } = useBlog();
    const userModal = [
        {
            title:"Profile",
            icon:<CgProfile/>,
            path:`/profile/${currentUser?.uid}`        
        },
        {
            title:"Libraries",
            icon:<MdOutlineLocalLibrary/>,
            path:"/libraries"

        },
        {
            title:"Stories",
            icon:<MdAutoStories/>,
            path:"/stories"

        },
        {
            title:"Stats",
            icon:<MdOutlineQueryStats/>,
            path:"/stats"

        },
        

    ]
  return (
   <section className='absolute w-[13rem] p-4 bg-white right-0 top-[100%] shadows rounded-md z-50 text-gray-500'>
     <Link to="/write" className='flex md:hidden items-center gap-2  text-gray-500'>
            <span className='text-2xl'><FaPenToSquare /></span>
            <span className='text-sm mt-1'>Write</span>
          </Link>
          <div className='flex flex-col gap-4 border-b border-gray-300 pb-5'>
          {userModal.map((link, i) => (
          <Link to={link.path} key={i} className='flex items-center gap-2 text-gray-500 hover:text-black '>
            <span className='text-2xl'>{link.icon}</span>
            <h2 className='text-lg text-md'>{link.title}</h2>
          </Link>
        ))}
          </div>
          <button className='flex flex-col pt-5 cursor-pointer hover:text-black'>
            Sign Out
            <span>{SecretEmail(currentUser?.email)}</span>
          </button>
   </section>
  )
}

export default UserModel