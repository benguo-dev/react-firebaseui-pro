import { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import ReactFirebasePro from 'react-firebaseui-pro';
import './App.css';

const firebaseApp = firebase.initializeApp({
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
});

const uiConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    // add additional auth flows below
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    {
      provider: 'microsoft.com',
      loginHintKey: 'login_hint'
    },
    {
      provider: 'apple.com',
    },
    {
      provider: 'anonymous',
    }
  ],
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: ({ user }: { user: firebase.User }, redirectUrl: string | undefined) => {
      console.log(user, redirectUrl);
      return true; // Ensure the callback returns a boolean
    },
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<firebase.User | null>(null);
  const unregisterAuthObserver = useRef<() => void>(() => {});

  useEffect(() => {
    unregisterAuthObserver.current = firebaseApp.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      setUser(user);
    });
    return () => {
      unregisterAuthObserver.current();
    };
  }, []);

  return (
    <>
      {isSignedIn !== undefined && !isSignedIn && <ReactFirebasePro uiConfig={uiConfig} firebaseAuth={firebaseApp.auth()}/>}
      {isSignedIn && user &&
        <div className="profile-info">
          <img src={user?.photoURL??undefined} alt="Profile image" className="profile-img" width={80} height={80}/>
          <div>{user?.displayName}.</div>
          <div>{user?.email}.</div>
          <button onClick={() => firebaseApp.auth().signOut()}>Sign out</button>
        </div>
      }
    </>
  )
}

export default App
