// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWenDevjJf_C-OCEzo0mYNuReACl_ojPw",
  authDomain: "power-rise-websites.firebaseapp.com",
  projectId: "power-rise-websites",
  storageBucket: "power-rise-websites.firebasestorage.app",
  messagingSenderId: "906922615082",
  appId: "1:906922615082:web:58aac03b75999cc4b97e53",
  measurementId: "G-91M3ZT27T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only on client side)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app; 