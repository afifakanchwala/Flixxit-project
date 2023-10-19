// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCt1WuyewhU6Dj6uISWQSnIypEDXGatuUw",
  authDomain: "mern-project-flixxit.firebaseapp.com",
  projectId: "mern-project-flixxit",
  storageBucket: "mern-project-flixxit.appspot.com",
  messagingSenderId: "902620237241",
  appId: "1:902620237241:web:a54a5af2939ff6ff01ba68",
  measurementId: "G-HP7267GCJX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
