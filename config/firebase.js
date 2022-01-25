import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCkprn2tTFTFrZ-8SkbVjJVIO2yl7BZ0gg",
  authDomain: "saloon-34010.firebaseapp.com",
  projectId: "saloon-34010",
  storageBucket: "saloon-34010.appspot.com",
  messagingSenderId: "16865713208",
  appId: "1:16865713208:web:7c539b153e48b2ea579acd"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);