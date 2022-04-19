
// Link para FirebaseUI React https://github.com/firebase/firebaseui-web-react
// Configurações aceitas: https://github.com/firebase/firebaseui-web#configuration

// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';

import firebase from '../../services/firebase';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, Auth } from 'firebase/auth';

import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import UIButton from '../UI/fields/Button';
import Hidden from '../UI/dataDisplay/Hidden';

const auth: Auth = getAuth(firebase);
auth.languageCode = 'pt_br';

const ui = new firebaseui.auth.AuthUI(auth);


ui.start('#firebaseui-auth-container', {
  signInFlow: 'popup',
  signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  callbacks: { signInSuccessWithAuthResult: () => false }, // Avoid redirects after sign-in.
});

const Login: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [firstLoading, setFirstLoading] = useState(false); // Avoid showing the login screen when the user is already logged in.

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, user => {
      setIsSignedIn(!!user);
      setFirstLoading(true);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <Hidden status={!firstLoading} mode='visibility'>
        <div>
          <div id='firebaseui-auth-container'></div>
        </div>
      </Hidden>
    );
  }
  return (
    <>
      <a style={{ textDecoration: 'none' }} href='/'><UIButton>Home</UIButton></a>
      <UIButton onClick={() => auth.signOut()}>LogOut</UIButton>
      { children }
    </>
  );
}

export default Login;
