import React from 'react'
import ProfileHome from './profileHome'
import ProfileAbout from './profileAbout'
import ProfileList from './profileList'
import { useState } from 'react'
import Model from '../../../utils/Model'
import { IoSettings } from "react-icons/io5";
import { discoverAction } from '../../../data';
import EditProfile from './Activities/EditProfile'
import { useBlog } from '../../../context/context'
import { useParams } from 'react-router-dom';
import UseSingleFetch from '../../hooks/useSingleFetch'

const Profile = () => {
    const [modal,setModal] = useState(false);
    const [editModal,setEditModel] = useState(false);
    const {allUser} = useBlog();
    const {userId} = useParams();
    const { currentUser } = useBlog();
    const activities = [
        {
            title: "Home",
            comp:ProfileHome
        },
        {
            title:"lists",
            comp: ProfileList
        },
        {
            title:"About",
            comp: ProfileAbout
        }
    ]
    const [currentActivity,setCurrentActivity] = useState(activities[0]);
    const getUserData = allUser.find((user) => user.id === userId || user.id === currentUser?.uid);
    const {data:follow} = UseSingleFetch("users",userId,"follow");
    const {data:follower} = UseSingleFetch("users", userId,"follower");

    console.log(getUserData);
  return (
   <section className='size flex gap-[4rem] relative'>
    <div className='mt-[9rem] flex-[2]'>
        <div className='flex items-end gap-4'>
          <h2 className='text-3xl sm:text-5xl font-bold capitalize'> {getUserData?.username} </h2>
          <p className=' text-gray-400 text-xs sm:text-sm'>
            follower({follower.length})
          </p>
          <p className=' text-gray-400 text-xs sm:text-sm'>
            following({follow.length})
          </p>
        </div>
        <div className=' flex items-center gap-5 mt-[1rem]  border-b border-gray-500 mb-[3rem]'>
        {activities.map((prof, i) => (
  <div key={i} className={`py-[0.5rem] ${prof.title === currentActivity.title 
    ? "border-b border-blue-700" : ""}`
     }>
    <button onClick={() => setCurrentActivity(prof)}>{prof.title}</button>
  </div>
))}
        </div>
        <currentActivity.comp getUserData={getUserData} setEditModal={setEditModel}/>
    </div>
    <button onClick={() => {
        setModal(true)
    }}
     className='fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white 
    grid place-items-center md:hidden'><IoSettings /></button>

 <Model modal={modal} setModal={setModal} >
    <div className= {`flex-[1] border-l border-gray-400 p-[2rem] z-10 fixed right-0 bottom-0 
    top-0 w-[18rem] md:relative ${modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}
     transition-all duration-500 
     `}> 
     <div className='pb-4 text-right'>
        <button onClick={() => setModal(false)} className='inline-block md:hidden'>
        <IoSettings />
        </button>
     </div>
     <div className='sticky top-7 flex flex-col justify-between '>
        <img className='w-[3.5rem] h-[3.5rem] object-cover border rounded-full' src={getUserData?.image || "profile.jpg"} alt="" />
        <h1  className='py-2 font-bold capitalize'>{getUserData?.username}</h1>
        <p className='text-blue-400 first-letter:uppercase text:sm'>I am a content creater </p>
        <button 
        onClick={() => setEditModel(true)}
        className='text-green-500 pt-6 text:sm w-fit'>Edit Profile</button>

        <div className='flex-[1] flex items-center flex-wrap gap-3 pt-8'>
        {discoverAction.map((item, i) => (
                                <button key={i} className='text-sm text-black'>{item}</button>
                            ))}
        </div>

     </div>
     </div>

</Model>
{editModal && <EditProfile getUserData={getUserData} editModal={editModal} setEditModel={setEditModel}/>}
    
   </section>
  )
}

export default Profile  