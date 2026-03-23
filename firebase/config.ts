import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgFGe8F0lcWl8OBE76Abgd7M08ktAN8Ms",
  authDomain: "backstreet-2dd6c.firebaseapp.com",
  projectId: "backstreet-2dd6c",
  storageBucket: "backstreet-2dd6c.firebasestorage.app",
  messagingSenderId: "565445804025",
  appId: "1:565445804025:web:8e9b6e2a72791456278728",
  measurementId: "G-0GV6JR2PX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;