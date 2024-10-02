import React from 'react'
import { useBlog } from '../context/context';

const Message = ({msg}) => {
  const { currentUser,allUser } = useBlog();
  const senderUser = allUser.find(user => user.id === msg.senderId);
  const displayName = currentUser?.uid === msg.senderId ? "You" : (senderUser ? senderUser.username : msg.senderId);
  return (
    <>
      <div className={`bg-black-600 text-yellow-300 rounded-xl px-5 py-1 max-w-80
        ${currentUser?.uid === msg.senderId ? ("bg-black text-white self-end rounded-br-none") : ("bg-green-800 text-white rounded-bl-none")}`}>
        <p className={`text-xs ${currentUser?.uid === msg.senderId ? ("text-end") : ("text-start")}`}>
        {displayName}
        </p>
        <p>{msg.chatmessage}</p>
      </div>
    </>
  )
}

export default Message;
