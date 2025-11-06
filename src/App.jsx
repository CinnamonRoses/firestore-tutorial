import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Your web app's Firebase configuration
// See .env file for details
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// If pushed to git, use .env file to make environment variables

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [name, setName] = useState();

  useEffect(() => {
    // Update specific details
    async function testFirestore() {
      const docRef = doc(db, "testCollection", "testDocument");
      const docSnap = await getDoc(docRef);

      await updateDoc(docRef, {
        age: "9002",
        name: "Mary Poppins ++++"
      })

      if (docSnap.exists()) {
        setName(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    }
    testFirestore();
  }, []) //empty array to prevent from running over and over

  return (
    <>
      <p>Firestore Check {name}</p>
    </>
  )
}

export default App
