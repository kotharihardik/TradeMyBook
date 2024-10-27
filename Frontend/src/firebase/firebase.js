// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjpI6zS3YAWQ93mVLnnIrLF7MAUETiDZM",
  authDomain: "book-exchange-platform-f3543.firebaseapp.com",
  projectId: "book-exchange-platform-f3543",
  storageBucket: "book-exchange-platform-f3543.appspot.com",
  messagingSenderId: "272159698808",
  appId: "1:272159698808:web:bf8dc1b2178608667f628d",
  measurementId: "G-J7MLMY9HYS"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Ensure 'auth' is defined here
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Function for signing up with email and password
const signupWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Function for signing in with email and password
const loginWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function for signing in with Google
const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Function for logging out
const logout = () => {
  return signOut(auth);
};

// Export everything at the end
export { auth, db, googleProvider, signupWithEmailPassword, loginWithEmailPassword, signInWithGoogle, logout };


