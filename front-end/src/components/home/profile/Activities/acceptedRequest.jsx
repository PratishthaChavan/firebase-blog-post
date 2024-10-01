import React, { useEffect, useState } from 'react';
import { useBlog } from '../../../../context/context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';

import { useNavigate } from 'react-router-dom';

const AcceptedRequest = () => {
    const { currentUser } = useBlog();
    const [acceptedList, setAcceptedList] = useState([]);
    const navigate = useNavigate();

    const fetchReceiverData = async () => {
        if (!currentUser) return; 

        try {
           
            const notificationsRef = collection(db, "users", currentUser.uid, "notifications");
            const notificationsData = await getDocs(notificationsRef);
            
           
            const acceptedNotifications = notificationsData.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(notification => notification.status === "accepted");

            setAcceptedList(acceptedNotifications); 
        } catch (error) {
            console.log("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchReceiverData(); 
    }, [currentUser]); 
    const handleChatroom = (senderId) => {
        const chatId = currentUser?.uid < senderId
            ? `${currentUser?.uid}_${senderId}`
            : `${senderId}_${currentUser?.uid}`;
        navigate(`/chatroom/${chatId}`);
    };

    return (
        <div className='flex gap-2 flex-col '>
            <h2>Accepted Requests</h2>
            {acceptedList.length > 0 ? (
                acceptedList.map(notification => (
                    <div key={notification.id} className='border-b border-gray-400'>
                      <div className='flex gap-2 flex-1'>
                    <div className='flex gap-2'>  <img
                            className='w-[1.5rem] h-[1.5rem] object-cover rounded-full'
                            src={notification.image || "/profile.jpg"}
                            alt=""
                        />
                        <p className='text-green-400'>{notification.username}</p></div>
                       
                      </div>
                      <div className='flex justify-between text-gray-500'>
                      <p> {new Date(notification.timestamp).toLocaleString()}</p>
                            <p>{notification.status}</p>
                            <button 
                            onClick={() => handleChatroom(notification.receiverId)}
                            
                            className='bg-green-400 text-black rounded-full px-2 py-1 '>Chatroom</button>
                           
                        </div>
                       
                    </div>
                ))
            ) : (
                <p>No accepted requests found.</p>
            )}
        </div>
    );
};

export default AcceptedRequest;
