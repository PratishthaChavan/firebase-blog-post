const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCGYpzYX_hn2mmfYRCkdJX2iuA41QS0gA0",
  authDomain: "fir-blog-9093d.firebaseapp.com",
  projectId: "fir-blog-9093d",
  storageBucket: "fir-blog-9093d.appspot.com",
  messagingSenderId: "237746770498",
  appId: "1:237746770498:web:bf51162e129b5a04ef93db",
  measurementId: "G-67WRRBQQ99"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports =  { db };

