                                                                // PART1 : Initialize App

// we have to initialize a instance of firebase here...

import { initializeApp } from "firebase/app";


const firebaseConfig = {                                    // configuration given by firebase to our account 
    apiKey: "AIzaSyC8Jo8Xm-4Ixd0MWhjbL1dzYZuPdjmls80",          // api key
    authDomain: "reactxfirebase-37a7e.firebaseapp.com",
    projectId: "reactxfirebase-37a7e",
    storageBucket: "reactxfirebase-37a7e.appspot.com",
    messagingSenderId: "563746344844",
    appId: "1:563746344844:web:3c48ea463759752d68d0a9",
    measurementId: "G-JBJEJWZ4BY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


                                                                // PART2 : Create a key

// will be using authentication service of firebase(SDK) here...which is in auth module of firebase
import { getAuth} from "firebase/auth";

export const auth = getAuth(); // auth is a key ( our authority is encapsulated in it)

