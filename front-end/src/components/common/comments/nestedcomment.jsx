import React,{useState} from 'react';
import { useBlog } from '../../../context/context';
import moment from 'moment';
import { db } from '../../../firebase/firebase';
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import Dropdown from '../../../utils/dropdown';
const Nestedcomment = ({ reply ,commentId,postId,replyId}) => {
    const { allUser } = useBlog();
    const getUserData = allUser.find(user => user.id === reply.userId);
    const [drop, setDrop] = useState(false);
    console.log(reply);
    const removeNesteComment =  async() => {
        try {
            const Commentref = doc(db, "posts", postId, "comments", commentId,"Replies",replyId);
            await deleteDoc(Commentref);
            alert("The comment is removed");
            
        } catch (error) {
            console.log("Internal server error");
        }
    }

    return (
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
            <button onClick={removeNesteComment}>Remove</button>
                        <button>Update</button>
            
        </div>
    );
};

export default Nestedcomment;
