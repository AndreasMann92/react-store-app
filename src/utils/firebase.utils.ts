// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signOut, signInWithPopup, GoogleAuthProvider, UserInfo, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, NextOrObserver, User} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-d4pHWrXbweH9DNQK98j7yaDz8GGBlyU",
  authDomain: "react-shop-db-5b802.firebaseapp.com",
  projectId: "react-shop-db-5b802",
  storageBucket: "react-shop-db-5b802.appspot.com",
  messagingSenderId: "92859879739",
  appId: "1:92859879739:web:494a9306853692fd18671e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth,email, password); 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: UserInfo, info = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const {displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createdDate, ...info});
    } catch ({message}) {
      console.log("error creating the user", message);
    }
  
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword =async (email:string, password:string) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStageChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);
