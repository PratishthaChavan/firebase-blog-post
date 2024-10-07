import { collection, doc, getDocs, updateDoc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import UseHooks from '../../hooks/useHooks';
import { useBlog } from '../../../context/context';
import { db } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';

const Inbox = () => {
    const { data, loading } = UseHooks("users"); 
    const { currentUser, allUser } = useBlog();
    const navigate = useNavigate();
    
    const currentUserData = allUser.find(user => user.id === currentUser?.uid);
    const [requests, setRequests] = useState([]);

    const fetchRequest = async() => {
        try {
            if (currentUser) {
                const reqRef = collection(db, "users", currentUser?.uid, "request");
                const getreqdata = await getDocs(reqRef);
                const requestList = getreqdata.docs.map(doc => ({
                    id: doc.id, 
                    ...doc.data()
                }));
                setRequests(requestList);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRequest();
    }, [currentUser]);



    
    const handleOpenChatroom = async(receiverId) => {
        try {
            const chatId = currentUser?.uid < receiverId
                ? `${currentUser?.uid}_${receiverId}`
                : `${receiverId}_${currentUser?.uid}`;
    
            const chatRef = doc(db, "chatrooms", chatId);
            const chatroomSnap = await getDoc(chatRef);
    
            if (!chatroomSnap.exists()) {
                const senderName = currentUserData?.username;
            const receiverDoc = await getDoc(doc(db, "users", receiverId));
            const receiverName =  receiverDoc.data().username;
           
                await setDoc(chatRef, {
                    chatId: chatId,
                    members: [currentUser?.uid, receiverId],
                    createdAt: Date.now(),
                    senderName: senderName,
                    receiverName: receiverName,
                    
                });
                
            }
           
    
            navigate(`/chatrooms?email=${currentUserData?.email}`);
            console.log(currentUserData?.email);
        } catch (error) {
            console.log(error);
        }
    }

    const updateRequestStatus = async(requestId, newStatus, senderId) => {
        try {
            const statusRef = doc(db, "users", currentUser?.uid, "request", requestId);
            await updateDoc(statusRef, {
                status: newStatus
            });
            const senderNotificationRef = doc(db, "users", senderId, "notifications", requestId);
            await setDoc(senderNotificationRef, {
                username: currentUserData?.username,
                image: currentUserData?.image,
                message: `Your friend request was ${newStatus}.`,
                receiverEmail: currentUserData?.email,
                status: newStatus,
                receiverId: currentUser?.uid,
                timestamp: Date.now()
            });
            
            alert(`The request is ${newStatus}`);
            fetchRequest(); 
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRequest = async(requestId) => {
        try {
            const requestRef = doc(db, "users", currentUser?.uid, "request", requestId);
            await deleteDoc(requestRef);
            alert('Request deleted successfully');
            fetchRequest(); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='rounded-tl-none rounded-md rounded-br-none px-2 py-1'>
                <h2>Friend Requests</h2>
                {requests.length > 0 ? (
                    requests.map(request => (
                        <div key={request.id}>
                            <div className='flex gap-2 justify-start items-start'>
                                <img className='w-[1.5rem] h-[1.5rem] object-cover rounded-full' src={request.ProfileImage || "/profile.jpg"} alt="" />
                                <p className='text-green-400'> {request.Sendername}</p>
                            </div>
                            <p className='text-gray-500'> {new Date(request.created).toLocaleString()}</p>
                            <div className='flex items-end justify-end gap-2'>
                                {request.status === "pending" ? (
                                    <>
                                      <button onClick={() => navigate("/chatroom")} >
                                        chatroom
                                      </button>
                                        <button 
                                            className='bg-green-500 rounded-full px-2 py-1 active:scale-75 transition-all duration-50'
                                            onClick={() => updateRequestStatus(request.id, "accepted", request.senderId)}>
                                            Accept
                                        </button>
                                        <button 
                                            className='bg-red-500 rounded-full px-2 py-1 active:scale-75 transition-all duration-50'
                                            onClick={() => updateRequestStatus(request.id, "declined", request.senderId)}>
                                            Decline
                                        </button>
                                    </>
                                ) : request.status === "accepted" ? (
                                    <button  
                                        onClick={() => handleOpenChatroom(request.senderId)}
                                        className='bg-blue-500 rounded-full px-2 py-1 active:scale-75 transition-all duration-50'>
                                        Chatroom
                                    </button>
                                    
                                ) : ( 
                                    <p className='text-red-500'>Request Declined</p>
                                )}
                              
                                <button 
                                    className='bg-gray-500 rounded-full px-2 py-1 active:scale-75 transition-all duration-50'
                                    onClick={() => deleteRequest(request.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No requests found.</p>
                )}
            </div>
        </>
    )
}

export default Inbox;
