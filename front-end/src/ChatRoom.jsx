import React from 'react'

const ChatRoom = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center '>
        <div className='bg-blue-300 p-6 rounded-xl  shadow-lg w-1/2 flex flex-col items-center justify-between'>
        <div  className=''>
            <nav className=' bg-white flex w-full justify-between p-3 shadow-sm rounded-md' >
                <h1 className=''>chatRoom</h1>
                <h1>signOut</h1>
            </nav>
        </div>
        <div>
            <input type="text"  />
            <button>send</button>
        </div>
        </div>
    </div>
  )
}

export default ChatRoom