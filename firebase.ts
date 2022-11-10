import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNwDFFtUcu9u-Ykofga45IY4ADRlD1cy0",
  authDomain: "netflix-clone-a4876.firebaseapp.com",
  projectId: "netflix-clone-a4876",
  storageBucket: "netflix-clone-a4876.appspot.com",
  messagingSenderId: "370200377425",
  appId: "1:370200377425:web:4f01961d947a706f9be070",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth(app);

export default app;
export { db, auth };