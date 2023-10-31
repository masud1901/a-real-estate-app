// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbNftmbAjDn3iEH2BZQ1sUpwAJtYEkzMI",
  authDomain: "realtor-clone-react-6d9d6.firebaseapp.com",
  projectId: "realtor-clone-react-6d9d6",
  storageBucket: "realtor-clone-react-6d9d6.appspot.com",
  messagingSenderId: "801198849202",
  appId: "1:801198849202:web:5dc30023efcffd5addddab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { app,db };

