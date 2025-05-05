// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5iGqWKVvno0sAK2bcSc0gefKFAESPG0I",
  authDomain: "finance-5a9ff.firebaseapp.com",
  projectId: "finance-5a9ff",
  storageBucket: "finance-5a9ff.firebasestorage.app",
  messagingSenderId: "651272191055",
  appId: "1:651272191055:web:e75bc1c0f634c6df017e3a",
  measurementId: "G-PH2QW55V7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };