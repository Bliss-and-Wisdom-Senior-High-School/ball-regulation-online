import {initializeApp} from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4L58PKTo4LiUZCnpyIy8LeVSfhBawBOQ",
    authDomain: "ball-regulation-online.firebaseapp.com",
    databaseURL: "https://ball-regulation-online-default-rtdb.firebaseio.com",
    projectId: "ball-regulation-online",
    storageBucket: "ball-regulation-online.appspot.com",
    messagingSenderId: "270073627542",
    appId: "1:270073627542:web:29175a65aeab1b1f3c13b7",
    measurementId: "G-X9MCVE8WBW"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);