// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBTE5cZDn5pPXEqy3gvTx7H7php6dIrXQ",
  authDomain: "bird-dc9a2.firebaseapp.com",
  projectId: "bird-dc9a2",
  storageBucket: "bird-dc9a2.appspot.com",
  messagingSenderId: "764115759754",
  appId: "1:764115759754:web:e483a626da8f8b569bb373",
  measurementId: "G-ZXNTKJYT4H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
