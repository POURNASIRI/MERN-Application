// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIERBASE_API_KEY,
  authDomain: "ep-blog-d9b9c.firebaseapp.com",
  projectId: "ep-blog-d9b9c",
  storageBucket: "ep-blog-d9b9c.appspot.com",
  messagingSenderId: "1057364576411",
  appId: "1:1057364576411:web:a5d9d766c079f61f225e3e",
  measurementId: "G-6HC2CG3ERT"
};


export const app = initializeApp(firebaseConfig);
