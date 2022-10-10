import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBh2mSL89OofnoyANgs6NTF3vnfEp3S2iI",
  authDomain: "instagramm-1f58d.firebaseapp.com",
  databaseURL: "https://instagramm-1f58d-default-rtdb.firebaseio.com",
  projectId: "instagramm-1f58d",
  storageBucket: "instagramm-1f58d.appspot.com",
  messagingSenderId: "132502149494",
  appId: "1:132502149494:web:29883ac8b8fdc439fac257"
};




const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { firestore, auth, storage, analytics };
