// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "../__config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
// const analytics = getAnalytics(firebase);


export { firestore };
export default firebase;
