import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCB8NYhVXAzQUlinqCH_WOfRazSHDDbVR4",
  authDomain: "pagina-noticias-45a5c.firebaseapp.com",
  projectId: "pagina-noticias-45a5c",
  storageBucket: "pagina-noticias-45a5c.firebasestorage.app",
  messagingSenderId: "808486829176",
  measurementId: "G-PBN9GEDN78",
  appId: "1:808486829176:web:03744a4ef3cd13f95b418d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar noticias aprobadas de la categoría Entretenimiento
async function cargarNoticiasAprobadas() {
  const noticiasRef = collection(db, "noticias");
  const q = query(
    noticiasRef,
    where("estado", "==", "aprobada"),
    where("categoria", "==", "entretenimiento"),
    orderBy("fecha_publicacion", "desc")
  );

  const querySnapshot = await getDocs(q);
  const listaNoticias = document.getElementById("listaNoticias");
  listaNoticias.innerHTML = ''; // Limpiar contenido previo

  querySnapshot.forEach((doc) => {
    const noticia = doc.data();
    const noticiaElement = document.createElement("div");
    noticiaElement.classList.add("noticia");

    noticiaElement.innerHTML = `
      <h3>${noticia.titulo}</h3>
      <p>${noticia.descripcion}</p>
    `;
    listaNoticias.appendChild(noticiaElement);
  });
}

cargarNoticiasAprobadas(); // Llamar a la función para cargar noticias aprobadas
