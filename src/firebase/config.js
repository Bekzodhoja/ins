import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnLKtDxj747lkoFbn8MNJ2Xo-d3Zkw4-E",
  authDomain: "insooo-6f173.firebaseapp.com",
  databaseURL: "https://insooo-6f173-default-rtdb.firebaseio.com",
  projectId: "insooo-6f173",
  storageBucket: "insooo-6f173.appspot.com",
  messagingSenderId: "379601684763",
  appId: "1:379601684763:web:9c78cf02ecf74ee9eaebbe",
  measurementId: "G-E74DLRBVP3"
};



const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { firestore, auth, storage, analytics };
