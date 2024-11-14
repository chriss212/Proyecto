import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, addDoc, setDoc, getDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "pagina-noticias-80c7e.firebaseapp.com",
    databaseURL: "https://pagina-noticias-80c7e-default-rtdb.firebaseio.com",
    projectId: "pagina-noticias-80c7e",
    storageBucket: "pagina-noticias-80c7e.firebasestorage.app",
    messagingSenderId: "846300969774",
    appId: "1:846300969774:web:846e2a46ed0abb8eadd8bf",
    measurementId: "G-9K7DLK6RRP"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth= getAuth(app);
  const db=getFirestore(app);

    // Función para registrar usuarios
  export async function registerUser(email, password, fullname, username){
  try{
      const userCredencial=await createUserWithEmailAndPassword(auth,email,password);
      const user=userCredencial.user;
      await setDoc(doc(db,"users",user.uid),{
        fullname,
        email,
        username,
        role:"user"
      })
      console.log('Usuario registrado exitosamente: ', userCredencial.user);
      return true;
    }
  catch(error){
      console.log('Error:' , error.message);
      return false;
  }
}