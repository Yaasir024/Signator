// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtrmZR3L2m_8Uy8eju6j1prm2cBtc9VQM",
  authDomain: "signator-f31e7.firebaseapp.com",
  projectId: "signator-f31e7",
  storageBucket: "signator-f31e7.appspot.com",
  messagingSenderId: "514901624482",
  appId: "1:514901624482:web:98c88c84fca9fcdeb379fb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp)