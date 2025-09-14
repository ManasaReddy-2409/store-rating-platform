import { initializeApp } from "firebase/app";

// Replace these with your actual configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_1234567890abcdefghijklmnopqrstuvwxy",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefghijklm"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
