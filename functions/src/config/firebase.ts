import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();

const Providers = { google: new GoogleAuthProvider() };

export {
    firebaseApp,
    auth,
    Providers
}
