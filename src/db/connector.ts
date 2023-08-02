import { initializeApp } from "firebase/app"
import { getFirestore, getDocs, collection, doc, setDoc } from "firebase/firestore"
import { ScoreData } from "views/Scout/ScoringTable"
import { v4 as uuidv4 } from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fnc-united.firebaseapp.com",
  projectId: "fnc-united",
  storageBucket: "fnc-united.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// eslint-disable-next-line  @typescript-eslint/no-unused-vars
const db = getFirestore(app)

let endpoint: string
if (process.env.REACT_APP_ENVIRONMENT === 'local') {
  endpoint = "fnc-united-db-dev"
} else {
  endpoint = ''
}

type NewReport = {
  reporting_team: string,
  alliance: string,
  year: number,
  event: string,
  match: string,
  scouted_team: string,
} | ScoreData

export const testDB = async () => {
  console.log("Hello")
  const querySnapshot = await getDocs(collection(db, 'fnc-united-db-dev'))
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  })
}

export const addReport = async (value: NewReport) => {
  try {
    await setDoc(doc(db, endpoint, uuidv4()), value)
  } catch (e) {
    console.error(e)
  }
}