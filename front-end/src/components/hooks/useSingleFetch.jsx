import React, { useState, useEffect } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const UseSingleFetch = (collectionName, id, subcollection) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!collectionName || !id || !subcollection) return;

    const postRef = collection(db, collectionName, id, subcollection);

 
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

  
    return () => unsubscribe();

  }, [collectionName, id, subcollection]); 

  return {
    data,
    loading,
  };
};

export default UseSingleFetch;
