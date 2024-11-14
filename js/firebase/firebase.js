  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import {gethAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword};
  import { getFirestore, doc, addDoc, setDoc, getDoc, getDocs, collec } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDWhRGfqTk_LcqO60XJxdfclRbuUmDv8eU",
    authDomain: "pagina-noticias-80c7e.firebaseapp.com",
    projectId: "pagina-noticias-80c7e",
    storageBucket: "pagina-noticias-80c7e.firebasestorage.app",
    messagingSenderId: "846300969774",
    appId: "1:846300969774:web:846e2a46ed0abb8eadd8bf",
    measurementId: "G-9K7DLK6RRP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  const db = getFirestore(app);

  export async function registerUser(fullName, email, username, password){
    try{
      const userCredencial = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredencial.user;
      await setDoc(doc(db, "users", user.uid),{
        fullName,
        email,
        role:"user"
      })
      console.log(`Usuario registrado exitosamente: `, userCredencial.user);
      return true;
    }
    catch(error){
      console.log(`Error:`, error.message);
      return false;
    }
  }