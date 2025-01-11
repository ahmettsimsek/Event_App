import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUFIzVzU-VxOxJxga1YPPK3vpjDT8-lvo",
  authDomain: "fir-auth-46ca4.firebaseapp.com",
  projectId: "fir-auth-46ca4",
  storageBucket: "fir-auth-46ca4.firebasestorage.app",
  messagingSenderId: "432346186332",
  appId: "1:432346186332:web:3996ab56e8887fd1315c99"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
