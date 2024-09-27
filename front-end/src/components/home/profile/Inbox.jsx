import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import UseHooks from '../../hooks/useHooks'
import { useBlog } from '../../../context/context';
import { db } from '../../../firebase/firebase';
const Inbox = () => {
    const { data, loading } = UseHooks("users"); 
    const {currentUser} = useBlog();
    const [request,setRequest] = useState([]);
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

    const updateRequestStatus = async(requestId,newstatus) => {
        try {
            const statusRef = doc(db,"users",currentUser?.uid,"request",requestId);
            await updateDoc(statusRef,{
                status: newstatus
            })
            alert("the request is accepted");
        } catch (error) {
            console.log(error);
        }

    }
    


 
  return (
    <>
            <div>
            <h2>Inbox</h2>
            {request.length > 0 ? (
                request.map(request => (
                    <div key={request.id} >
                        
                        <p>Sender: {request.Sendername}</p>
                        <p>Status: {request.status}</p>
                        <p>Created: {new Date(request.created).toLocaleString()}</p>
                       <h1>user <img src={request.ProfileImage} alt="" /></h1>
                        <button onClick={() => updateRequestStatus(request.id, "accepted")}>Accept</button>
                        <button onClick={() => updateRequestStatus(request.id, "declined")}>Decline</button>
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