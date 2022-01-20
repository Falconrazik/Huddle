// Import the functions you need from the SDKs you need
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKTqkpw0rAECGNpt4FPbP56HUlkIKoGyY",
  authDomain: "huddle-1cc3c.firebaseapp.com",
  projectId: "huddle-1cc3c",
  storageBucket: "huddle-1cc3c.appspot.com",
  messagingSenderId: "538336495011",
  appId: "1:538336495011:web:9bae42ef507acb5e7e4616",
  storageBucket: "gs://huddle-1cc3c.appspot.com",
  measurementId: "G-FJSWGTYN1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}
