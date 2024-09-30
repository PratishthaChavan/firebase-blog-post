import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import UseHooks from '../../hooks/useHooks'
import { useBlog } from '../../../context/context';
import { db } from '../../../firebase/firebase';
import { setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
    const { data, loading } = UseHooks("users"); 
    const {currentUser,allUser} = useBlog();
    const navigate = useNavigate();
    

    console.log(currentUser);
    const currentUserData = allUser.find(user => user.id === currentUser?.uid);
    const [request,setRequest] = useState([]);
    const [acceptedRequest,setAcceptedRequest] = useState([]);
    const fetchRequest = async() => {
       try {
        if(currentUser){
            const reqRef = collection(db,"users",currentUser?.uid,"request");
            const getreqdata = await getDocs(reqRef);
            const requestList = getreqdata.docs.map(doc => ({
                id:doc.id , ...doc.data()
            })) 
            setRequest(requestList);
        }
       } catch (error) {
        console.log(error);
       }
    }
    useEffect(() => {
        fetchRequest();
    },[currentUser]);
 

    const handleOpenChatroom = async(receiverId,senderId) => {
        const chatId = `${currentUser?.uid}_${request.senderId}`;

        navigate("/chatroom");
    }

    const updateRequestStatus = async(requestId,newstatus,senderId) => {
        try {
            const statusRef = doc(db,"users",currentUser?.uid,"request",requestId);
            await updateDoc(statusRef,{
                status: newstatus
            })
            const senderNotificationRef = doc(db, "users", senderId, "notifications", requestId);
            await setDoc(senderNotificationRef, {
                username: currentUserData?.username,
                image:currentUserData?.image,
                message: `Your friend request was ${newstatus}.`,
                receiverEmail: currentUserData?.email,
                status: newstatus,
                receiverId: currentUser?.uid,
                timestamp: Date.now()
            });

            if (newstatus === "accepted"){
                setAcceptedRequest(prev => ([...prev,{requestId,senderId}]));
            }
            alert( `the request is  ${newstatus}`);
        } catch (error) {
            console.log(error);
        }

    }
    


 
  return (
    <>
            <div className=' rounded-tl-none rounded-md rounded-br-none px-2 py-1'>
            <h2 >friend request</h2>
            {request.length > 0 ? (
                request.map(request => (
                    <div key={request.id} >
                        <div className='flex gap-2 justify-start items-start'>
                        <img className='w-[1.5rem] h-[1.5rem] object-cover rounded-full' src={request.ProfileImage || "/profile.jpg"} alt="" />
                        <p className='text-green-400'> {request.Sendername}</p>
                        </div>
                       
                        <p className='text-gray-500'> {new Date(request.created).toLocaleString()}</p>
                       <div className='flex  items-end justify-end gap-2 '>
                      
                      
                      <button 
                      className='bg-green-500 rounded-full px-2 py-1 active:scale-75 transition-all duration-50'
                       onClick={() => updateRequestStatus(request.id, "accepted",request.senderId)}>Accept</button>
                      <button 
                      className='bg-red-500 rounded-full px-2 py-1 active:scale-75 transition-all duration-50' 
                      onClick={() => updateRequestStatus(request.id, "declined",request.senderId)}>Decline</button>
                         {acceptedRequest.length > 0 && (
                <div >
                    
                    {acceptedRequest.map( requestId => (
                       <div key={requestId} >
                         <button  
                         onClick={handleOpenChatroom}
                         className='bg-blue-500 rounded-full px-2 py-1 active:scale-75 transition-all duration-50'
                                
                        >
                          chatroom 
                        </button>
                       </div>
                    ))}
                </div>
            )}
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

export default Inbox