import React, { useState, useEffect } from 'react';
import { useBlog } from '../../../context/context';
import { db } from '../../../firebase/firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import UseSingleFetch from '../../hooks/useSingleFetch';
import { useLocation } from 'react-router-dom';
const Followbtn = ({ userId }) => {  // Ensure userId is passed as a prop
    const [isFollow, setIsFollow] = useState(false);
    const { currentUser } = useBlog();
    const { data, loading } = UseSingleFetch("users", currentUser?.uid, "follow");
    const {pathname} = useLocation();

    useEffect(() => {
        if (data && currentUser?.uid) {
            const isFollowing = data.some(item => item.id === userId);
            setIsFollow(isFollowing);
        }
    }, [data, currentUser?.uid, userId]);

    const handleFollow = async () => {
        try {
            if (currentUser) {
                const followRef = doc(db, "users", currentUser?.uid, "follow", userId);
                const followerRef = doc(db, "users", userId, "follower", currentUser?.uid)
                if (isFollow) {
                    await deleteDoc(followRef);
                    await deleteDoc(followerRef);
                    alert("The user is unfollowed");
                } else {
                    await setDoc(followRef, { userId });
                    await setDoc(followerRef, { userId });
                    alert("The user is followed");
                }
          
                setIsFollow(!isFollow);
            }
        } catch (error) {
            console.error("Error handling follow/unfollow:", error);
        }
    };

    return (
        <button
            onClick={handleFollow}
            className={`
                ${pathname === "/" ? " border  border-black " : "text-gray-500"} 
                ${isFollow ? "px-2 rounded-full border border-black py-[0.2rem]" : " "}  `}
            
        >
          {isFollow ? "Unfollowed" : "Followed"}
        </button>
    );
};

export default Followbtn;
