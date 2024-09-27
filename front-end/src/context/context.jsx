import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react';
import { auth } from '../firebase/firebase';
import Loading from '../components/Loading/Loading';


import { onSnapshot ,collection , query, doc} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import UseHooks from '../components/hooks/useHooks';
const BlogContext = createContext();
const Context = ({children}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [currentUser,setCurrentUser] = useState(true);
    const [loading,setLoading] = useState(true);
    const [allUser,setAllUser] = useState([]);
    const [userLoading,setUserLoading] = useState(true);
    const [publish,setPublish] = useState(false);
    const [showComment,setShowComment] = useState(false);
    const [commentLength,setCommentLength] = useState(0);
    const [updatePostData,setUpdatePostData] = useState({});
    const [authModel,setAuthModel] = useState(false); 
    const [user,setUser] = useState("me");
    useEffect(() => {
   
       const unsubscribe = onAuthStateChanged(auth,(users)=> {
      if(users){
        setCurrentUser(users);
      }
     else{
      setCurrentUser(null);
      
     } cxzasDFGHJGFDSA
  
       });

       return () => unsubscribe();
       
    },[currentUser]);
    useEffect(() => {
      const getUser = () => {
        const postRef = query(collection(db, "users"));
        const unsubscribe = onSnapshot(postRef, (snapshot) => {
          setAllUser(snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        );
        setUserLoading(false);

        });

  
        return unsubscribe;
      };

  
      getUser();
    }, []);

    const { data : postdata,loading:postLoading} = UseHooks("posts");
    
  
  return (
   
    <div > 
        <BlogContext.Provider value={{
          currentUser,setCurrentUser,allUser,userLoading,publish,setPublish,showComment,setShowComment
          ,commentLength,setCommentLength,updatePostData,setUpdatePostData,title,setTitle,description,setDescription,
          postdata,postLoading,authModel,setAuthModel,user,setUser
             }}>{children}</BlogContext.Provider>
    </div>
  )
}


export default Context;

export const useBlog = () => useContext(BlogContext);