
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For the USER: You need to replace this with your actual Firebase config
// You can get this from the Firebase Console (Settings -> Project Settings -> General)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKey_ReplaceMe",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "virality-studio-demo.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "virality-studio-demo",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "virality-studio-demo.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:000000000000"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
