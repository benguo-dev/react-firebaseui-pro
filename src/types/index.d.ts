
import firebase from 'firebase/compat/app';
import firebaseui from 'firebaseui';

export interface FirebaseProps {
  uiConfig: firebaseui.auth.Config;
  firebaseAuth: firebase.auth.Auth;
  className?: string;
  uiCallback?: (ui: firebaseui.auth.AuthUI) => void;
}

export type FirebaseUser = firebase.User;