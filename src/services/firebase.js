import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Kimlik doğrulama için eklendi
import { getFirestore } from "firebase/firestore"; // Veritabanı için eklendi

const firebaseConfig = {
  apiKey: "AIzaSyBO7HyuBUeVcLKWbEZRhxVlHPdRpw0c6so",
  authDomain: "ibrahim-portfolio-db.firebaseapp.com",
  projectId: "ibrahim-portfolio-db",
  storageBucket: "ibrahim-portfolio-db.firebasestorage.app",
  messagingSenderId: "345575101109",
  appId: "1:345575101109:web:05047760b5f585f6ade4fc",
  measurementId: "G-GZMCS5ZF1W"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Dışarı aktarılan bu değişkenler sayesinde diğer sayfalar giriş yapabilir ve veri okuyabilir
export const auth = getAuth(app); 
export const db = getFirestore(app);