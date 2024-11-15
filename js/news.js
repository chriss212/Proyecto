// Importación de módulos necesarios de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCB8NYhVXAzQUlinqCH_WOfRazSHDDbVR4",
  authDomain: "pagina-noticias-45a5c.firebaseapp.com",
  projectId: "pagina-noticias-45a5c",
  storageBucket: "pagina-noticias-45a5c.firebasestorage.app",
  messagingSenderId: "808486829176",
  measurementId: "G-PBN9GEDN78",
  appId: "1:808486829176:web:03744a4ef3cd13f95b418d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("registerNews").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Capturar los datos del formulario
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;
  const fechaPublicacion = document.getElementById("fecha_publicacion").value;
  const autor = document.getElementById("autor").value;
  const contenido = document.getElementById("contenido").value;

  if (!titulo || !descripcion || !categoria || !fechaPublicacion || !autor || !contenido) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const newsData = {
    titulo: titulo,
    descripcion: descripcion,
    categoria: categoria,
    fecha_publicacion: new Date(fechaPublicacion),
    autor: autor,
    contenido: contenido,
    estado: "pendiente",
    fecha_creacion: serverTimestamp()
  };

  try {
    const docRef = await addDoc(collection(db, "noticias"), newsData);
    console.log("Noticia publicada con ID: ", docRef.id);
    alert("Noticia publicada exitosamente.");
    document.getElementById("registerNews").reset();
  } catch (error) {
    console.error("Error al publicar la noticia: ", error);
    alert("Hubo un error al publicar la noticia. Inténtalo nuevamente.");
  }
});