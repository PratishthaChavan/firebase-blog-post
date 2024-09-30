import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummydata } from './data';
import Message from './utils/Message';
import { useBlog } from './context/context';
import { useRef } from 'react';
import Logo from './design/logo';
import { useParams } from 'react-router-dom';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase/firebase';
const ChatRoom = () => {
  const [message,setMessage] = useState([]);
  const {currentUser} = useBlog();
  const [messageList,setMessageList] = useState([]);
  const {user,setUser} = useBlog();
  const [text,setText] = useState("");
  const lastMsg = useRef(null);

  const {chatId} = useParams();
  
  const fetchMessage = () => {
  const messageRef = collection(db,"chatrooms",chatId,"chatmessages");
  const q = query(messageRef,orderBy("timestamp","asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messageData = snapshot.docs.map(doc => ({
      id:doc.id,...doc.data()
    }))
    setMessage(messageData);
  })

    

  }
  const sendMessagedata = async() => {
  if (text === "") return;
  else {
    const messages = {
      chatmessage : text,
      senderId : currentUser?.uid,  
      timestamp: serverTimestamp()
    } 
    const msgRef = collection(db,"chatrooms",chatId,"chatmessages");
     await addDoc(msgRef,messages);
    setText("");
  }

  } 
  useEffect(() => {
    fetchMessage();
  },[chatId])
  useEffect(() => {
    if(lastMsg){
      lastMsg.current.scrollIntoView();
    }
  },[message])

  const renderMessage = () => {
    return (
      <>
        {message?.map((msg) => {
          return (
          <Message msg={msg} key={msg.id}  currentUserId={currentUser?.uid}/>
          )

        })}
    </>
    )
  }
  const sendMessage = (msg) => {
    setMessage(prev => [...prev,msg]);
  }
  const handlesend = () => {
    const msg = {
      text,
      user
    }
    
    sendMessage(msg);
    setText("");
  }
  return (
    <div className='w-full h-[100vh] flex items-center justify-center '>
        <div className='bg-blue-300 p-6 rounded-xl  shadow-lg w-1/3 flex flex-col items-center justify-between gap-2
        '>
       
            <nav className=' bg-white flex w-full justify-between p-3 shadow-sm rounded-md' >
                <h1 className='font-bold tracking-wider '>chatRoom</h1>
            
                
                <button 
                className='font-bold bg-blue-700 text-yellow-300 rounded-lg px-2 hover:bg-black active:scale-95
                transition-all duration-75'>LogOut</button>
            </nav>
            <div className='w-full h-[70vh] flex flex-col items-start gap-3 overflow-auto'>
             {renderMessage()}
             <div ref={lastMsg}></div>
            </div>
      
        <div className='flex gap-2 w-full sticky'>

            <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text" 
            className='w-full rounded-md py-1' />
            <button
            onClick={sendMessagedata}
             className='font-bold'>send</button>
        </div>
        </div>
    </div>
  )
}

export default ChatRoom