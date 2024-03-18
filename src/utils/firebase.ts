// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8BFes8F-jHpuDKLQG1Iexys3a3PKVulQ",
  authDomain: "cemic-c588c.firebaseapp.com",
  projectId: "cemic-c588c",
  storageBucket: "cemic-c588c.appspot.com",
  messagingSenderId: "764803976911",
  appId: "1:764803976911:web:9c6910afaab7e00f2971ba",
  measurementId: "G-17RTS2612P",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
