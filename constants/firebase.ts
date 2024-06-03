// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-rwnb-Fvf6TMvR26L6Dy0c4iGlihopjU",
  authDomain: "no-face-avatar.firebaseapp.com",
  projectId: "no-face-avatar",
  storageBucket: "no-face-avatar.appspot.com",
  messagingSenderId: "937854920288",
  appId: "1:937854920288:web:92f686d6942e6d862cc505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}