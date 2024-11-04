import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTKihNuhtkXFpjhTM6BjBvH8-f4fCzLP8",
  authDomain: "comercioeletronicovinide-7febf.firebaseapp.com",
  projectId: "comercioeletronicovinide-7febf",
  storageBucket: "comercioeletronicovinide-7febf.appspot.com",
  messagingSenderId: "624499846163",
  appId: "1:624499846163:web:9ad2ee7cf163575a7023e6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
