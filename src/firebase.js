import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtdGNE2J7F_lx1OkXntvyETBzEH5nFF3w",
  authDomain: "protfolio-cdbec.firebaseapp.com",
  projectId: "protfolio-cdbec",
  storageBucket: "protfolio-cdbec.firebasestorage.app",
  messagingSenderId: "77193451448",
  appId: "1:77193451448:web:3c8d49d4fe687f6d1e614d",
  measurementId: "G-QM3LFHZHHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };