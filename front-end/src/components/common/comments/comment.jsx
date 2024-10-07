import React, { useState, useEffect } from 'react';
import { useBlog } from '../../../context/context';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import Dropdown from '../../../utils/dropdown';
import { deleteDoc, doc, updateDoc, setDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import Nestedcomment from './nestedcomment';

import { BsFillSendPlusFill } from "react-icons/bs";
const Comment = ({ items: comment, postId, commentId }) => {
    const { allUser, currentUser } = useBlog();
    
    

    

  
    
    const getUserData = allUser.find((users) => users.id === comment?.userId);
   
    const { userId, Usercomments, created } = comment;

    const [more, setMore] = useState(false);
    const [edit, setIsEdit] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [drop, setDrop] = useState(false);
    const [showReply, setShowReply] = useState(false); 
    const [replyContent, setReplyContent] = useState("");
    const [replies, setReplies] = useState([]);
    const [showNestedReplies,setShowNestedReply] = useState(false);
    

    useEffect(() => {
        const fetchReplies = async () => {
            const repliesRef = collection(db, "posts", postId, "comments", commentId, "Replies");
            const repliesSnapshot = await getDocs(repliesRef);
            const repliesList = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReplies(repliesList);
        };

        fetchReplies();
    }, [postId, commentId]);

    const handleEdit = async () => {
        try {

          
            const ref = doc(db, "posts", postId, "comments", commentId); 
            await updateDoc(ref, {
                Usercomments: editComment,
                created: Date.now(),
                userId: currentUser?.uid,
                
            });
            setEditComment('');
            setIsEdit(false);
            setDrop(false); 
            alert("The comment is updated");
        } catch (error) {
            console.log("Internal server error:", error);
        }
    }
   
    const currentUserData = allUser.find(user => user.id === currentUser?.uid);
    

   
    const sendRequest =async() => {
       try {
        if(currentUser){
          const requestRef = collection(db,"users",userId,"request");
        await addDoc(requestRef,{
            senderId : currentUser?.uid,
            Sendername: currentUserData?.username,
            ProfileImage : currentUserData?.image,
            senderEmail: currentUserData?.email,
            receiverUserId : comment?.userId,
            status: "pending",
            created: Date.now()
        })
        
        alert("the request is send to receiver");
        }
        else{
            alert("the user is not logged");
        }
       } catch (error) {
        console.log(error);
       }
    }



  
    const removeComments = async () => {
        try {
            const ref = doc(db, "posts", postId, "comments", commentId);
            await deleteDoc(ref);
            alert("The comment is removed");
            setDrop(false);
        } catch (error) {
            console.log("Internal server error");
        }
    }

  
 

    const nestComments = async () => {
        try {
            if (replyContent.trim() === ""){
                alert("Enter the reply");
            }
            else{
            const replyRef = collection(db, "posts", postId, "comments", commentId, "Replies");
            await addDoc(replyRef, {
                replyContent: replyContent,
                userId: currentUser?.uid,
                created: Date.now(),
            });
            alert("Reply added successfully");
            setReplyContent(""); 
            setShowReply(false); 
          
            const repliesSnapshot = await getDocs(replyRef);
            
            const repliesList = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReplies(repliesList);}
        } catch (error) {
            console.log("Error adding reply:", error);
        }
    }
  
    return (
        <section className='border-b'>
            {!edit ? (
                <>
                    <div className='flex items-center gap-5 pt-[1rem]'>
                        <img className='w-[2rem] h-[2rem] object-cover rounded-full' src={getUserData?.image || "/profile.jpg"} alt="" />
                        <div className='flex-1 flex justify-between'>
                            <div>
                                <h3 className='text-sm capitalize'>{getUserData?.username}</h3>
                                <p className='text-sm text-gray-400'>{moment(created).fromNow()}</p>
                            </div>
                            <div className='relative'>
                                {currentUser && currentUser?.uid === userId && (
                                    <>
                                        <button
                                            onClick={() => setDrop(!drop)}
                                            className='text-2xl hover:opacity-70'>
                                            <BsThreeDots />
                                        </button>
                                        <Dropdown showDrop={drop} setShowDrop={setDrop} size="w-[10rem]">
                                            <Button click={() => setIsEdit(true)} title={"Edit Comment"} />
                                            <Button click={removeComments} title={"Delete Comment"} />
                                        </Dropdown>
                                    </>
                                )}
                                {currentUser && currentUser?.uid !== userId && (
                                    <div className='flex justify-end'>
                                        <button
                                        onClick={sendRequest}
                                         className='rounded-full border border-gray-400 bg-green-500 px-2 py-1' >
                                            send request
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className='py-4 text-sm break-words'>
                        {more ? Usercomments : Usercomments.substring(0, 100)}
                        {Usercomments.length > 100 && (
                            <button onClick={() => setMore(!more)} className='text-blue-500'>
                                {more ? "...less" : "...more"}
                            </button>
                        )}
                    </p>
                    <button className='text-blue-500' onClick={() => setShowReply(!showReply)}>
                        {showReply ? "cancel " : "Reply"}
                    </button>
                    <button className='text-blue-500 mt-2' onClick={() => setShowNestedReply(!showNestedReplies)}>
                           {showNestedReplies ? "Hide replies" : "Show replies"}
                        </button>
                    {showReply && (
                        <div>
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className='w-full p-2 border rounded-md outline-none text-sm'
                            placeholder='Write your reply...'
                        ></textarea>
                       <div className='flex gap-2'>
                       
                       
                        <button onClick={nestComments}><BsFillSendPlusFill /></button>
                       </div>
                        
                        </div>
                        
                    )}
                      
                    
                    {showNestedReplies && replies.length > 0 && (
                        <div className='mt-4'>
                            {replies.map(reply => (
                                <Nestedcomment key={reply.id} 
                                replyId={reply.id}
                                 reply={reply}
                                  commentId={commentId} postId={postId}/>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className='bg-white shadows p-4'>
                    <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        placeholder='Write your updated comment'
                        className='w-full outline-none resize-none text-sm'
                    ></textarea>
                    <div className='flex items-center justify-end gap-2'>
                        <button onClick={() => setIsEdit(false)} className='rounded-full text-sm w-fit font-serif bg-red-400 py-1 px-2'>Cancel</button>
                        <button onClick={handleEdit} className='rounded-full text-sm w-fit font-serif bg-green-400 py-1 px-2'>Update</button>
                        
                    </div>
                </div>
            )}
        </section>
    );
};

const Button = ({ click, title }) => {
    return (
        <button
            onClick={click}
            className='p-2 hover:bg-gray-400 text-left text-sm w-full'>{title}</button>
    );
};

export default Comment;
