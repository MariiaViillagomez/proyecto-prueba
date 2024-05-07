// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyXSTr6-0yLPNVWRmw2clWPiHBqqB1kDc",
  authDomain: "database-a78f9.firebaseapp.com",
  projectId: "database-a78f9",
  storageBucket: "database-a78f9.appspot.com",
  messagingSenderId: "382688667613",
  appId: "1:382688667613:web:fe98a700481e736a293834"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos
export default firebaseApp;