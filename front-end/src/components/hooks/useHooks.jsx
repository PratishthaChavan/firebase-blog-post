import React from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';

const UseHooks = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const getUser = () => {
      const postRef = query(collection(db, collectionName)); 
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
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

export default UseHooks;
