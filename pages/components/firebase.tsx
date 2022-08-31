import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApVafK_2gMNtrf_dw4j4HjFgl9MMqLbRY",
  authDomain: "next-todo-app-263fe.firebaseapp.com",
  projectId: "next-todo-app-263fe",
  storageBucket: "next-todo-app-263fe.appspot.com",
  messagingSenderId: "467735939260",
  appId: "1:467735939260:web:b0e2e1e0f36158233ae8b9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// export const userAuth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

export { auth, provider };
