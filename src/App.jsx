import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
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
const auth = getAuth(app);

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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


  // Sign Up
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      setUser(userCredential.user);
      console.log('User signed up:', userCredential.user);
    })
    .catch(error => {
      console.log('Error signing up:', error)
    })
  }

  // Sign In
  const signIn = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      setUser(userCredential.user);
      console.log('User signed up:', userCredential.user);
    })
    .catch(error => {
      console.log('Error signing up:', error)
    })
  }
  
  // Sign Out
  const logOut = () => {
    signOut(auth)
    .then(() => {
      setUser(null);
      console.log('User signed out');
    })
    .catch(error => {
      console.error('Error signing out:', error);
    })
  }


  return (
    <>
      <p>Firestore Authentication</p>

      <div>
        <input type="text" placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signIn}>Sign In</button>
        <button onClick={logOut}>Sign Out</button>
      </div>

      {
        user && (
          <div>
            <p>Logged in as: {user.email}</p>
          </div>
        )
      }

    </>
  )
}

export default App
