// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSjksdfhkhsdkjfhsdkjfh--fake-key",
  authDomain: "fir-fakedata-81.firebaseapp.com",
  projectId: "fir-8e546545646881",
  storageBucket: "firdfjh-8e8--fake",
  messagingSenderId: "3454507276010866",
  appId: "1:307276010866:web:--fake"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
