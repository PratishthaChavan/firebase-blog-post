import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react';
import { auth } from '../firebase/firebase';
import Loading from '../components/Loading/Loading';

import { onSnapshot ,collection , query, doc} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const BlogContext = createContext();
const Context = ({children}) => {
    const [currentUser,setCurrentUser] = useState(true);
    const [loading,setLoading] = useState(true);
    const [allUser,setAllUser] = useState([]);
    const [userLoading,setUserLoading] = useState(true);
    const [publish,setPublish] = useState(false);
    useEffect(() => {
   
       const unsubscribe = onAuthStateChanged(auth,(users)=> {
      if(users){
        setCurrentUser(users);
      }
     else{
      setCurrentUser(null);
      
     }
  
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
  
  return (
   
    <div > 
        <BlogContext.Provider value={{
          currentUser,setCurrentUser,allUser,userLoading,publish,setPublish}}>{children}</BlogContext.Provider>
    </div>
  )
}


export default Context;

export const useBlog = () => useContext(BlogContext);