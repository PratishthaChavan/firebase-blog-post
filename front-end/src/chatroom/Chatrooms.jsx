import React, { useEffect,useState } from 'react'
import {io} from "socket.io-client"
import { useMemo } from 'react';
import { db } from '../firebase/firebase';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useBlog } from '../context/context';

const Chatrooms = () => {
    
    const {allUser,currentUser} = useBlog();

   
   
    const socket = useMemo(() => io("http://localhost:4000"),[]);
    const [messgesArray,setMessagesArray] = useState([]);
    const [message,setMessage] = useState('');
    const [usermessage,setUserMessage] = useState('');
    const [room,setRoom] = useState("");
    const [socketId,setSocketId] = useState("");
    const [email,setEmail] = useState('');
    const [receiverEmail,setReceiverEmail] = useState('');
    const [senderEmail,setSenderEmail] = useState('');
    const [chatId,setChatId] = useState('');
    const [currentUserEmail,setCurrentUserEmail] = useState('');
    const chatData = async () => {
       try {
         const chatroomsRef = collection(db, "chatrooms");
            const chatroomsSnapshot = await getDocs(chatroomsRef);
            const chatroomsList = chatroomsSnapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data() 
            }));
           
            
            setChatId(chatroomsList[0].chatId); 
            if (chatroomsList.length > 0) {
                const selectedChat = chatroomsList[0]; 
                setChatId(selectedChat.members);


                const senderId = selectedChat.members[0]; 
                const receiverId = selectedChat.members[1];
                 
                
                const isCurrentUserSender = currentUser?.uid === senderId;

              
                const senderIdEmail = isCurrentUserSender ? senderId : receiverId;
                const receiverIdEmail = isCurrentUserSender ? receiverId : senderId;
    
                
                const sender = allUser.find(user => user.id === senderIdEmail);
                const receiver = allUser.find(user => user.id === receiverIdEmail);
    
                const senderEmail = sender ? sender.email : "Unknown Sender";
                console.log("the sender email",senderEmail);
                const receiverEmail = receiver ? receiver.email : "Unknown Receiver";
    
                setSenderEmail(senderEmail);
                setReceiverEmail(receiverEmail);
             }

        } catch (error) {
            console.error("Error fetching chatrooms: ", error);
        }
    };

    const sendMessage = () => {
        if (usermessage.trim() === "") return;
        socket.emit("private_message", { sender: senderEmail, receiver: receiverEmail, message: usermessage });
        setUserMessage('');
    };
    

    useEffect(() => {
        if (allUser && allUser.length > 0) {
            const user = allUser.find(user => user.id === currentUser.uid);
            if (user) {
                setCurrentUserEmail(user.email);
                setSenderEmail(user.email); 
                chatData();
            }
        }
    },[allUser]);

const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message",{message,chatId});
        setMessage("");


    };
 


    const joinRoomHandler = (e) => {
        e.preventDefault();
        socket.emit("join-room",chatId);
        setRoomName("");
    }
    useEffect(() => {
         socket.on("connect" ,() => {
            console.log("connected",socket.id);
            setSocketId(socket.id);
            if (currentUserEmail){
                socket.emit('register',currentUserEmail);
            }
         
        });
        socket.on("welcome",(s)=> {
            console.log(s);
        })
        socket.on("received-message",(data) => {
                console.log(data);
                setMessagesArray((messgesArray) => [...messgesArray,data]);

        })
      
    },[socket, currentUserEmail]);

    const handleLeaveButton = () => {
        socket.emit("disconnect-socket", () => {
            console.log("socket disconnected")
        })
    }



  return (
  
    <div> <h2>{socketId} hello</h2>
         <form onSubmit={joinRoomHandler}>
            <input type="text" placeholder="enter Room name" value={chatId} onChange={(e) => setChatId(e.target.value)} />
            
            <button type='submit' >Join</button>
        </form>
   
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="enter data" value={message} onChange={(e) => setMessage(e.target.value)} />
            <input type="text" placeholder="room " value={chatId} onChange={(e) => setChatId(e.target.value)} />
            <button type='submit' >Send</button>
        </form>
        <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={usermessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                <button type='button' onClick={sendMessage}>Send</button>
            </form>

        {messgesArray.map((data,i) => (
            
        <h2 key={i}>{data.usermessage}</h2>

    ))}

<div className='w-full h-[100vh] flex items-center justify-center '>
          <div className='bg-blue-300 p-6 rounded-xl  shadow-lg w-1/3 flex flex-col items-center justify-between gap-2
          '>
        
              <nav className=' bg-white flex w-full justify-between p-3 shadow-sm rounded-md' >
                  <h1 className='font-bold tracking-wider '>chatRoom</h1>
              
                  
                  <button 
                    onClick={handleLeaveButton}
                  className='font-bold bg-blue-700 text-yellow-300 rounded-lg px-2 hover:bg-black active:scale-95
                  transition-all duration-75'>Leave</button>
              </nav>


              <div className='w-full h-[70vh] flex flex-col items-start gap-3 overflow-auto'>
            
              {messgesArray.map((data, i) => (
                        <div key={i} className={`message ${data.sender}`}>
                             {data.message}
                        </div>
                    ))}
              </div>
        
          <div className='flex gap-2 w-full sticky'>

          <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={usermessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                <button type='button' onClick={sendMessage}>Send</button>
            </form>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Chatrooms