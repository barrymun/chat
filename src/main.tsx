import './global.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import {FirebaseApp} from "@firebase/app";
import {initializeApp} from "firebase/app";
import {Analytics} from "@firebase/analytics";
import {getAnalytics} from "firebase/analytics";
import {FIREBASE_CONFIG} from "./common/constants";

// Initialize Firebase
const app: FirebaseApp = initializeApp(FIREBASE_CONFIG);
export const analytics: Analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
