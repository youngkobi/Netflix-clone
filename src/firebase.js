// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";
import { addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAcQjzRVepzfY7K4vvWytULSGw7xE9hWdo",
  authDomain: "netflix-clone-bb95a.firebaseapp.com",
  projectId: "netflix-clone-bb95a",
  storageBucket: "netflix-clone-bb95a.firebasestorage.app",
  messagingSenderId: "160703871183",
  appId: "1:160703871183:web:6308a7e7e7b5b451291fba",
  measurementId: "G-FCSXCX9CTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
// const analytics = getAnalytics(app);


const signup = async (name, email, password) => {
try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    })
} catch (error) {
    console.log(error)
   toast.error(error.code.split('/')[1].split('-').join(" "))
}
}



const login = async (email, password) => {
try {
  await signInWithEmailAndPassword(auth, email, password)
} catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
}
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}