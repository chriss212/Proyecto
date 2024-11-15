import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

async function obtenerNoticiasPendientes() {
  const noticiasRef = collection(db, "noticias");
  const q = query(noticiasRef, where("estado", "==", "pendiente"));
  const querySnapshot = await getDocs(q);

  const listaNoticias = document.getElementById("listaNoticias");
  listaNoticias.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const noticia = doc.data();
    const noticiaElement = document.createElement("div");
    noticiaElement.classList.add("noticia");

    noticiaElement.innerHTML = `
      <h3>${noticia.titulo}</h3>
      <p><strong>Autor:</strong> ${noticia.autor}</p>
      <p><strong>Categoría:</strong> ${noticia.categoria}</p>
      <p><strong>Descripción:</strong> ${noticia.descripcion}</p>
      <p><strong>Cuerpo:</strong>${noticia.contenido}</p>
      <div class="botones">
        <button class="boton-aceptar" data-id="${doc.id}" type="button">Aceptar</button>
        <button class="boton-rechazar" data-id="${doc.id}" type="button">Rechazar</button>
      </div>
    `;

    listaNoticias.appendChild(noticiaElement);
  });

  document.querySelectorAll(".boton-aceptar").forEach(button => {
    button.addEventListener("click", async (e) => {
      const noticiaId = e.target.getAttribute("data-id");
      await actualizarEstadoNoticia(noticiaId, "aprobada");
    });
  });

  document.querySelectorAll(".boton-rechazar").forEach(button => {
    button.addEventListener("click", async (e) => {
      const noticiaId = e.target.getAttribute("data-id");
      await actualizarEstadoNoticia(noticiaId, "rechazada");
    });
  });
}

async function actualizarEstadoNoticia(noticiaId, nuevoEstado) {
  const noticiaRef = doc(db, "noticias", noticiaId);
  await updateDoc(noticiaRef, {
    estado: nuevoEstado,
  });

  console.log(`Noticia ${nuevoEstado}: ${noticiaId}`);
  alert(`Noticia ${nuevoEstado} exitosamente.`);
  obtenerNoticiasPendientes();
}

obtenerNoticiasPendientes();
