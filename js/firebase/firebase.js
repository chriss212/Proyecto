import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, addDoc, setDoc, getDoc, getDocs, collection, query, where} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCB8NYhVXAzQUlinqCH_WOfRazSHDDbVR4",
    authDomain: "pagina-noticias-45a5c.firebaseapp.com",
    projectId: "pagina-noticias-45a5c",
    storageBucket: "pagina-noticias-45a5c.firebasestorage.app",
    messagingSenderId: "808486829176",
    measurementId: "G-PBN9GEDN78",
    appId: "1:808486829176:web:03744a4ef3cd13f95b418d"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth= getAuth(app);
  const db=getFirestore(app);
  


  export async function registerUser(email,password,username,fullName){
    try{
        const userCredencial=await createUserWithEmailAndPassword(auth,email,password);
        const user=userCredencial.user;
        await setDoc(doc(db,"users",user.uid),{
          username,
          fullName,
          email,
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

  export async function loginUser(email, password){
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      const dataUser = await getDoc(doc(db, "users", user.uid));

      if (dataUser.exists()){
        console.log("Inicio de sesión exitoso:", dataUser.data().role);
        return dataUser.data();
      } else {
        throw new Error("El ususario no existe en la base de datos.");
      }
    } catch (error){
      console.error("Error en el inicio de sesión:", error.message);
      return null;
    }
}