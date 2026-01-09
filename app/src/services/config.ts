import { initializeApp } from 'firebase/app'
// @ts-ignore: getReactNativePersistence exists at runtime
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env'

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementID: MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})
export const db = getFirestore(app)
export const functions = getFunctions(app, "europe-west2")
