import React from 'react'

const ProfileAbout = ({getUserData,setEditModal}) => {
  return (
    <div className='w-full'>
      <p className='text-2xl first-letter:uppercase'>
        {getUserData?.Bio || getUserData?.username + " Has no Bio"}
      </p>
      <div className='text-right'>
        <button
        onClick={() => setEditModal(true)}
         className='border border-black rounded-full text-black px-5 py-2 mt-[3rem]' >Edit</button>
      </div>
      
    </div>
  )
}

export default ProfileAbout