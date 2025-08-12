// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpM8p50NxOov2olFxh1aYePIIb_eKT83w',
  authDomain: 'nanny-services-bd3cb.firebaseapp.com',
  databaseURL:
    'https://nanny-services-bd3cb-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nanny-services-bd3cb',
  storageBucket: 'nanny-services-bd3cb.firebasestorage.app',
  messagingSenderId: '768287185955',
  appId: '1:768287185955:web:0d09dcfdd82bb8d0a92596',
  measurementId: 'G-RGVZGVZMV8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
