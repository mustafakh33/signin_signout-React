// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyVY3pvD1ox-SqoB9Z4Esdgm0qls5cOC0",
  authDomain: "react2-lesson8-962b1.firebaseapp.com",
  projectId: "react2-lesson8-962b1",
  storageBucket: "react2-lesson8-962b1.appspot.com",
  messagingSenderId: "237479110840",
  appId: "1:237479110840:web:4b8a80935f17506a7e2c4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);