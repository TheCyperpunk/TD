import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiPLuIQos2hqvIX22e-rG0vvNX3NsouGs",
  authDomain: "recycle-776bf.firebaseapp.com",
  projectId: "recycle-776bf",
  storageBucket: "recycle-776bf.firebasestorage.app",
  messagingSenderId: "624778965037",
  appId: "1:624778965037:web:46108d55e0bc59232688a4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 