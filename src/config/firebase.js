
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuGzsGDxh3gwPo8P2B6KCY0ayEESgOgkw",
    authDomain: "adotapet-web.firebaseapp.com",
    projectId: "adotapet-web",
    storageBucket: "adotapet-web.appspot.com",
    messagingSenderId: "1044424163319",
    appId: "1:1044424163319:web:a4d1b784770856f53978f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { app, analytics, db, auth,provider};