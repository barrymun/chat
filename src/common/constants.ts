import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
import {FirebaseApp} from "@firebase/app";
import {Auth} from "@firebase/auth";
import {Firestore} from "@firebase/firestore";
import {Analytics} from "@firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: object = {
  apiKey: "AIzaSyC_WvtUbW-HAXmPYx2nElMDrgejpsQjeFo",
  authDomain: "chat-9beb5.firebaseapp.com",
  projectId: "chat-9beb5",
  storageBucket: "chat-9beb5.appspot.com",
  messagingSenderId: "176201448383",
  appId: "1:176201448383:web:4f74d78b35e4c26338bf0a",
  measurementId: "G-NJ9RSWFQMD"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);

// firestore collection name constants
export const DOCUMENTS_LIMIT: number = 25;
export const ORDER_BY_FIELD_PATH_DEFAULT: string = "createdAt";
export const COLLECTION_MESSAGE: string = "message";