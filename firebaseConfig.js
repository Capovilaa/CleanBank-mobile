import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANGjRdBMTzKdcwyAANsfyUms-oIbqa3G8",
  authDomain: "fastbank-6b05c.firebaseapp.com",
  projectId: "fastbank-6b05c",
  storageBucket: "fastbank-6b05c.appspot.com",
  messagingSenderId: "1017661958473",
  appId: "1:1017661958473:web:ed5764eedd5805f80d5298"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
