import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyCr28j05ByetUzfW8UwR-zfjiOfy3eazOg",
    authDomain: "olx-react-cf52a.firebaseapp.com",
    projectId: "olx-react-cf52a",
    storageBucket: "olx-react-cf52a.appspot.com",
    messagingSenderId: "663821065476",
    appId: "1:663821065476:web:aca7b3a9b478e8451c8451",
    measurementId: "G-31ZY247515"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage=getStorage()
export default app