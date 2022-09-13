// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, NextOrObserver, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserInfo } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch } from "firebase/firestore";
import { Product } from "../contexts/categories.context";
import { ProductGroup } from "../shop-data";
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

export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd:ProductGroup[]) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef,obj.title.toLowerCase());
    batch.set(docRef, obj);
  })

  await batch.commit();
}

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{} as {[key: string]: Product[]})
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth: UserInfo, info = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const {displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createdDate, ...info});
    } catch ({message}) {
      console.error("error creating the user", message);
    }
  
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if(!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => {
  signOut(auth).then();
}

export const onAuthStageChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);
