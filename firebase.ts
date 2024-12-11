import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR_RbGDBEW6oRVmplP64V_sgjwj9XkE1c",
  authDomain: "netflix-clone-4d63d.firebaseapp.com",
  projectId: "netflix-clone-4d63d",
  storageBucket: "netflix-clone-4d63d.firebasestorage.app",
  messagingSenderId: "977394554774",
  appId: "1:977394554774:web:77803c4900d7f887926fb7",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth(app);

export default app;
export { db, auth };
