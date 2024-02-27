import { initializeApp } from "firebase/app"
import { getFirestore, getDocs, collection, doc, setDoc, getCountFromServer } from "firebase/firestore"
import { ScoreData } from "views/Scout/Crescendo/ScoutForm"
import { v4 as uuidv4 } from 'uuid'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fnc-united.firebaseapp.com",
  projectId: "fnc-united",
  storageBucket: "fnc-united.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

let endpoint = 'crescendo-dev'


export const testDB = async () => {
  console.log("Connecting to DB")
  let snapshot = await getCountFromServer(collection(db, 'crescendo-dev'))
  console.log(`${snapshot.data().count} entries found`)
}

export const addReport = async (value: ScoreData) => {
  try {
    await setDoc(doc(db, endpoint, uuidv4()), value)
  } catch (e) {
    console.error(e)
  }
}

export const getReports = async () => {
  try {
    let response = await getDocs(collection(db, endpoint))
    return response ? response : []
  } catch (e) {
    console.error(e)
  }
}