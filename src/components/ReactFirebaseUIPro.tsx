
import { useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'

export interface FirebaseProps {
  uiConfig: firebaseui.auth.Config;
  firebaseAuth: firebase.auth.Auth;
  className?: string;
  uiCallback?: (ui: firebaseui.auth.AuthUI) => void;
}

export type FirebaseUser = firebase.User;

const firebaseUiDeletion = Promise.resolve();

export default function ReactFirebaseUIPro(props: FirebaseProps) {
  const { uiConfig, firebaseAuth, className, uiCallback } = props;
  const unregisterAuthObserverRef = useRef<(() => void) | null>(null); 
  const firebaseAuthUI = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);

  useEffect(() => {
    firebaseUiDeletion.then(() => {
      if (uiConfig.signInFlow === 'popup') {
        firebaseAuthUI.reset();
      }
      unregisterAuthObserverRef.current = firebaseAuth.onAuthStateChanged((user: FirebaseUser | null) => {
        if (!user) {
          firebaseAuthUI.reset();
        }
      });
      if (uiCallback) {
        uiCallback(firebaseAuthUI);
      }
      firebaseAuthUI.start('#firebaseui-auth-container', uiConfig);
    });

    return () => {
      firebaseUiDeletion.then(() => {
        if (unregisterAuthObserverRef.current) {
          unregisterAuthObserverRef.current();
        }
        firebaseAuthUI.delete();
      });
    };

  }, []);

  return (
    <div id="firebaseui-auth-container" className={className} />
  )
}

