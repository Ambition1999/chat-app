import firebase from "firebase/compat/app";

import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAkDHol0nJOQ61a-r0i-5bimMsUg0DO1A",
  authDomain: "chat-app-5af81.firebaseapp.com",
  projectId: "chat-app-5af81",
  storageBucket: "chat-app-5af81.appspot.com",
  messagingSenderId: "978374688687",
  appId: "1:978374688687:web:8727ffb3b872c1af11795a",
  measurementId: "G-2CYYWS7JZB",
};

//Initial firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099");
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", "8080");
}

export { db, auth };
export default firebase;
