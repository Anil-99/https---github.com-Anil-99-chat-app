// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace the values below with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCn4-PX4uDEzqzsFg0YY2o2jZvfXtBeI5A",
  authDomain: "chat-app-a3669.firebaseapp.com",
  projectId: "chat-app-a3669",
  storageBucket: "chat-app-a3669.appspot.com",
  messagingSenderId: "228299590144",
  appId: "1:228299590144:web:6c6bee1807d0608abe26e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

