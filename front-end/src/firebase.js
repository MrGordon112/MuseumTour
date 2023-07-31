// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv7GIUi-5Z6wpMyQomcU18DSYqrjg6eRk",
  authDomain: "museum-ee649.firebaseapp.com",
  projectId: "museum-ee649",
  storageBucket: "museum-ee649.appspot.com",
  messagingSenderId: "990053734696",
  appId: "1:990053734696:web:96db6bcb765fc7fe8e181d",
  measurementId: "G-Q5VCD8JW91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app);