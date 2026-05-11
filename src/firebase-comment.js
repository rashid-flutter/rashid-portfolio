import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtdGNE2J7F_lx1OkXntvyETBzEH5nFF3w",
    authDomain: "protfolio-cdbec.firebaseapp.com",
    projectId: "protfolio-cdbec",
    storageBucket: "protfolio-cdbec.firebasestorage.app",
    messagingSenderId: "77193451448",
    appId: "1:77193451448:web:3c8d49d4fe687f6d1e614d",
    measurementId: "G-QM3LFHZHHD"
  };

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };