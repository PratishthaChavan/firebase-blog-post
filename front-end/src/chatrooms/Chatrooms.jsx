import React, { useEffect, useState, useMemo, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';


import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { useBlog } from '../context/context';

const Chatrooms = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { allUser, currentUser } = useBlog();
  const [emoji,setEmoji] = useState(false);
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
  
  
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format: HH:MM AM/PM
    } else {
      return date.toLocaleDateString(); 
    }
  };
  const saveToFirestore = async (data) => {
    try {
      const messageref = collection(db, "chatrooms", chatId, "userchats");
      await addDoc(messageref, {
        senderId: data.senderId,
        username: data.username,
        message: data.message,
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      console.error("Error saving message to Firestore:", error);
    }
  };

 const handleDeleteChat = async(id) => {
    const delref = doc(db,"chatrooms",chatId,"userchats",id);
    await deleteDoc(delref,{
      message: "This message has been deleted",
    });
    
  }

  const fetchMessages = async () => {
    const msgref = collection(db, "chatrooms", chatId, "userchats");
    const q = query(msgref, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchchat = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchchat);
    });

    return () => unsubscribe();
  };

  const fetchChatData = async () => {
    try {
      const chatRef = doc(db, "chatrooms", chatId);
      const chatroomSnap = await getDoc(chatRef);

      if (chatroomSnap.exists()) {
        const chatData = chatroomSnap.data();
       
        const members = chatData.members;
        const [senderId, receiverId] = members;

        const sender = allUser.find(user => user.id === senderId);
        const receiver = allUser.find(user => user.id === receiverId);

        setUsername(currentUser.uid === senderId ? sender?.username : receiver?.username);
      } else {
        setError("Chatroom does not exist.");
      }
    } catch (error) {
      console.error("Error fetching chatroom data: ", error);
      setError("Failed to load chatroom.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (allUser && allUser.length > 0 && currentUser) {
      const user = allUser.find(user => user.id === currentUser?.uid);
      if (user) {
        setCurrentUserEmail(user.email);
        fetchChatData();
        fetchMessages(); 
        
      }
    }
  }, [chatId]);

  useEffect(() => {
   
    if (currentUserEmail && username) {
      socket.emit('register', { email: currentUserEmail, userId: currentUser?.uid, username });
      socket.emit("join-room", chatId);
    }
  }, [currentUserEmail, username]);

  useEffect(() => {
    socket.on("received-message", async (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      await saveToFirestore(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage.trim() === "") return;

    const messageData = { 
      senderId: currentUser.uid, 
      username: username, 
      message: userMessage 
    };

    socket.emit("message", { message: userMessage, chatId: chatId, ...messageData });
    setUserMessage('');
  };

  const handleLeaveChat = () => {
    socket.emit("leave-room", chatId);
    navigate('/');
  };
  const handleEmojiSelect = (emoji) => {
    setUserMessage(prevMessage => prevMessage + emoji.native);
   setEmoji(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div>
      
      <div className='w-full h-[100vh] flex items-center justify-center '>
        
        <div className='bg-black p-6 shadow-lg w-full h-screen flex flex-col items-center justify-between gap-2'>
          <nav className='bg-white flex w-full justify-between p-3 shadow-sm rounded-md'>
            <h1 className='font-bold tracking-wider capitalize'>ChatRoom:{username}</h1>
            <button
              onClick={handleLeaveChat}
              className='font-bold bg-blue-700 text-yellow-300 rounded-lg px-2 hover:bg-black active:scale-95 transition-all duration-75'
            >
              Leave
            </button>
          </nav>

          <div className='w-full h-[70vh] flex flex-col items-start gap-3 overflow-auto '>
        
<div class="container">
    <div class="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="bubble">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    
  
 </div>
            
            
            {messages.map((data, i) => (
              <div
                key={i}
              
    
                className={`message  text-green-400 ${data.senderId === currentUser.uid ? 'text-end' : 'text-start'} flex justify`}
                style={{
                  
                  alignSelf: data.senderId === currentUser.uid ? 'flex-end' : 'flex-start',
                  backgroundColor: data.senderId === currentUser.uid ? '#DCF8C6' : '#FFFFFF',
                  padding: '5px',
                  borderRadius: '10px',
                  maxWidth: '80%',
                }}
              >
               <div className="flex flex-col w-60"> 
   
    
    <span className="text-start">
        {data.message}
      </span>
      <span className='text-end'>{formatDate(data.timestamp)}</span>
    <span ></span>
    {data.senderId === currentUser?.uid && (
    <button onClick={() => handleDeleteChat(data.id)} className="bin-button ">

    <svg
      class="bin-top"
      viewBox="0 0 39 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
      <line
        x1="12"
        y1="1.5"
        x2="26.0357"
        y2="1.5"
        stroke="white"
        stroke-width="3"
      ></line>
    </svg>
    <svg
      class="bin-bottom"
      viewBox="0 0 33 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_8_19" fill="white">
        <path
          d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
        ></path>
      </mask>
      <path
        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
        fill="white"
        mask="url(#path-1-inside-1_8_19)"
      ></path>
      <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
      <path d="M21 6V29" stroke="white" stroke-width="4"></path>
    </svg>
  </button>
      
    )}
   


  </div>
    </div>

            ))}
            
            <div ref={messagesEndRef} />
          </div>
          

          <div className='flex gap-2 w-full sticky'>
            <form onSubmit={handleSendMessage} className='flex w-full'>
            <div class="form-control">
  <input class="input input-alt "
   placeholder="Send your message"
    required="" type="text"
    value={userMessage}
    onChange={(e) => setUserMessage(e.target.value)}/>
  <span className="input-border input-border-alt"></span>
</div>

              <button
                type="button"
                onClick={() => setEmoji(!emoji)}
               className='text-3xl'
              >
                 😊
              </button>
               {emoji && (
                <div className="absolute bottom-12 right-0 z-10">
                  <Picker 
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="dark"
                    style={{ position: 'absolute', bottom: '50px', right: '0' }}
                  />
                </div>
              )}


              <button type='submit' className='px-4 bg-blue-500 text-white rounded'>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatrooms;
