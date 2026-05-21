import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuypfz6I5CrL7n8ikixyy2n3WwJCWKOIY",
  authDomain: "hepcy-13233.firebaseapp.com",
  projectId: "hepcy-13233",
  storageBucket: "hepcy-13233.firebasestorage.app",
  messagingSenderId: "961854148180",
  appId: "1:961854148180:web:8deadb548796de967e27c1",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
