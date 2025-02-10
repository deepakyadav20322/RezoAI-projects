// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAxxW85B7H28UaguqAgcd4GHOAs_btsRQk",
  authDomain: "fir-8e881.firebaseapp.com",
  projectId: "fir-8e881",
  storageBucket: "fir-8e881.firebasestorage.app",
  messagingSenderId: "307276010866",
  appId: "1:307276010866:web:1030406adf07c5eef039eb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
export { auth, db };
export default app;
