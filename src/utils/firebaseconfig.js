                                                                // PART1 : Initialize App

// we have to initialize a instance of firebase here...

import { initializeApp } from "firebase/app";

const key = import.meta.env.VITE_FIREBASE_API_KEY;
// console.log(key); 

const firebaseConfig = {                                    // configuration given by firebase to our account 
    apiKey: key,          // api key
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

const auth = getAuth(); // auth is a key ( our authority is encapsulated in it)

                                                                // PART3: Google auth
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
                                                                // PART4: Connection With Database
import { getFirestore } from "firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// Initialize firebase storage and get a reference to the service
 import { getStorage}  from "firebase/storage";
 const storage = getStorage(app);

export { auth , provider , db  , storage }; // exporting all the keys to be used in other files