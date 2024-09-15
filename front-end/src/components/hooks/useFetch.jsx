import React from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const getUser = () => {
      const postRef = query(collection(db, collectionName)
    ,orderBy("created","desc")); 
      const unsubscribe = onSnapshot(postRef,async (snapshot) => {
        const postData = await Promise.all(
     
            snapshot.docs.map(async(docs) => {
              const postItems = {
                id: docs.id,
                ...docs.data(),
              };
              const userRef = doc(db,"users",postItems?.userId);
              const getUser = await getDoc(userRef);
              if (getUser.exists()){
                const {created,...rest} = getUser.data();
                return {...postItems,...rest}
              }
              console.log("this is the postitems",postItems);
            }))
            setData(postData);
        
       
        setLoading(false);
      });

      return unsubscribe; 
    };

    getUser(); 
  }, [collectionName]); 

  return {
    data,
    loading,
  };
};

export default useFetch;
