import React from "react"

import { Navigate } from "react-router-dom";

//import auth functions and variables from Firebase
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'

//import the component -- pick one!
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; //install option 1

export default function Login({ currentUser }) {

    // Redirect to profile page when logged in
    if (currentUser) {
        return <Navigate to="/profile" />
    }

    //an object of configuration values
    const firebaseUiConfigObj = {
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID,
            { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true }
        ],
        signInFlow: 'popup', //don't redirect to authenticate
        credentialHelper: 'none', //don't show the email account chooser
        callbacks: { //"lifecycle" callbacks
            signInSuccessWithAuthResult: () => {
                return false; //don't redirect after authentication
            }
        }
    }


    return(
        <div className="container">
            <h2>Login</h2>
            <StyledFirebaseAuth 
                firebaseAuth={getAuth()}
                uiConfig={firebaseUiConfigObj}
            />
        </div>
    )
}