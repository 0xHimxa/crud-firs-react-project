// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO4-nxgcPJWxAiWArkNe57GhwnlvcW4eA",
  authDomain: "shit-posting-33453.firebaseapp.com",
  projectId: "shit-posting-33453",
  storageBucket: "shit-posting-33453.firebasestorage.app",
  messagingSenderId: "35238148333",
  appId: "1:35238148333:web:acf26969ae08473f57b4e4",
  measurementId: "G-NQLH4VEL7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
