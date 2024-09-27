import React,{useState} from 'react';
import { useBlog } from '../../../context/context';
import moment from 'moment';
import { db } from '../../../firebase/firebase';
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import Dropdown from '../../../utils/dropdown';
import { useNavigate } from 'react-router-dom';

const Nestedcomment = ({ reply ,commentId,postId,replyId}) => {
    const { allUser,currentUser } = useBlog();
    const getUserData = allUser.find(user => user.id === reply.userId);
    const [drop, setDrop] = useState(false);
    const [editreply,setEditReply] = useState(reply.replyContent);
    const [isEdit,setIsEdit] = useState(false);
    const navigate = useNavigate();
    
    
    const removeNesteComment =  async() => {
        try {
            const Commentref = doc(db, "posts", postId, "comments", commentId,"Replies",replyId);
            await deleteDoc(Commentref);
            alert("The comment is removed");
            
        } catch (error) {
            console.log("Internal server error");
        }
    }
    const updateComments = async() => {
        try {
            const commentRef = doc(db, "posts", postId, "comments", commentId, "Replies",replyId);
        await updateDoc(commentRef,{
                replyContent: editreply,
                userId: currentUser?.uid,
                created: Date.now(),
        });
        setIsEdit(false);

        } catch (error) {
            
        }

    }

    return (
    <section className='border-b'>
          { !isEdit ? (
        <>
        <div className='border-b py-2 pl-5'>
        <div className='flex items-center gap-3'>
            <img 
                className='w-[1.5rem] h-[1.5rem] object-cover rounded-full' 
                src={getUserData?.image || "/profile.jpg"} 
                alt={getUserData?.username || "User"} 
            />
            <div className='flex-1'>
                <h4 className='text-sm font-semibold'>{getUserData?.username}</h4>
                <p className='text-xs text-gray-500'>{moment(reply.created).fromNow()}</p>
            </div>
        </div>
        <p className='text-sm mt-1'>{reply.replyContent}</p>
       {currentUser?.uid === reply.userId  && (
         <div className='flex gap-2 justify-end'>
         <button 
         className='text-red-500 '
         onClick={removeNesteComment}>Remove</button>
         <button className=' text-green-400' onClick={() => setIsEdit(true)}>Edit</button>
         <button onClick={() => navigate("/chatroom")}>chatroom</button>
         </div>
       )}
                    
        
    </div>
        </>
      ):
      <div>
        <textarea
        value={editreply} 
        onChange={(e) => setEditReply(e.target.value)}
        placeholder='write your reply'
        className='w-full border p-2'

        
        ></textarea>
       <div className='flex gap-3'>
       <button
        className='text-green-400 transition-all duration-700'
         onClick={updateComments}>Update</button>
        <button className='text-red-400' onClick={() => setIsEdit(false)}>Cancel</button>
       </div>
      </div>
     }
    </section>
    );
};

export default Nestedcomment;
