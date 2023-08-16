import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxEc1VZmrEYVSzkks6i-VRcQWwI_fpRzs",
  authDomain: "fir-auth-db-44014.firebaseapp.com",
  databaseURL: "https://fir-auth-db-44014-default-rtdb.firebaseio.com",
  projectId: "fir-auth-db-44014",
  storageBucket: "fir-auth-db-44014.appspot.com",
  messagingSenderId: "242548861954",
  appId: "1:242548861954:web:0d4577ecd32537895c8b1b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);