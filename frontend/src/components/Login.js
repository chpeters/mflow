import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../lib/firebase'
import auth from 'firebase/auth'

// Configure FirebaseUI.
const uiConfig = {
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/',
  callbacks: {
    // Avoid redirects after sign-in. uses auth.AuthResult
    signInSuccessWithAuthResult: (authResult) => false,
  },
  signInOptions: [auth.EmailAuthProvider.PROVIDER_ID],
}

const Login = () => (
  <>
    <h1>mFlow</h1>
    <p>Please sign-in:</p>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </>
)

export default Login
