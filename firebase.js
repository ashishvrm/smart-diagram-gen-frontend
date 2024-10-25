// frontend/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBigStJNqXODeWEO9eItSGHbC-uXur3VVc",
    authDomain: "smart-diagram-gen-eea1d.firebaseapp.com",
    projectId: "smart-diagram-gen-eea1d",
    storageBucket: "smart-diagram-gen-eea1d.appspot.com",
    messagingSenderId: "618288935612",
    appId: "1:618288935612:web:5215618cfec9f189a416b9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
