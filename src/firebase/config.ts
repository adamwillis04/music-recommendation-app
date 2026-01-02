import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB-IFQa7ziSWGMubBW_eR7ZkGsHenNerw8",
  authDomain: "music-recommendation-app-f3f9f.firebaseapp.com",
  projectId: "music-recommendation-app-f3f9f",
  storageBucket: "music-recommendation-app-f3f9f.firebasestorage.app",
  messagingSenderId: "50300578946",
  appId: "1:50300578946:web:be7a82ccccd2a8bba4189b",
  measurementId: "G-1T7SKMGZ4N"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
