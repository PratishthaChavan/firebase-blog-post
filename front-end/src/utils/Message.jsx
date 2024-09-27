import React from 'react'
import { useBlog } from '../context/context';
const Message = ({msg}) => {
  const {user,seUser} = useBlog();
  return (
   <>
      <div className={`bg-black-600 text-yellow-300 rounded-xl px-5 py-1 max-w-80
        ${user === msg.user ? ("bg-black text-white self-end rounded-br-none"):("bg-green-800 text-white rounded-bl-none ")}`}>
              <p className={`text-xs ${user === msg.user ? ("text-end") : ("text-start")} `}>~{msg.user}</p>
              <p>{msg.text}</p>
        </div>
   </>

  )
}

export default Message