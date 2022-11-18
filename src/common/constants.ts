import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_WvtUbW-HAXmPYx2nElMDrgejpsQjeFo",
  authDomain: "chat-9beb5.firebaseapp.com",
  projectId: "chat-9beb5",
  storageBucket: "chat-9beb5.appspot.com",
  messagingSenderId: "176201448383",
  appId: "1:176201448383:web:4f74d78b35e4c26338bf0a",
  measurementId: "G-NJ9RSWFQMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const firestore = getFirestore(app);