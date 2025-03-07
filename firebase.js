import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaoOVXtT0HhsQW3UMPDlJg5M1Q5mSXjx8",
  authDomain: "cooksphere-4ced1.firebaseapp.com",
  projectId: "cooksphere-4ced1",
  storageBucket: "cooksphere-4ced1.appspot.com",
  messagingSenderId: "1083870268265",
  appId: "1:1083870268265:web:2fbd40d37efbcbff874bf8",
  measurementId: "G-BCWGVJDE6B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
