import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

const urlParams = new URLSearchParams(window.location.search);
const noticiaId = urlParams.get('id');

async function cargarNoticia() {
    if (!noticiaId) {
        alert("No se ha encontrado el ID de la noticia.");
        return;
    }

    const noticiaRef = doc(db, "noticias", noticiaId);
    const docSnap = await getDoc(noticiaRef);

    if (docSnap.exists()) {
        const noticia = docSnap.data();
        console.log("Noticia obtenida de Firestore:", noticia);

        const titulo = noticia.titulo;

        document.title = titulo;

        const tituloElement = document.getElementById("tituloNoticia");
        tituloElement.textContent = titulo;

        document.getElementById("contenido").innerHTML = noticia.contenido;

        if (noticia.fecha_publicacion) {
            const fechaPublicacion = noticia.fecha_publicacion.toDate();
            const fechaFormateada = fechaPublicacion.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            document.getElementById("fecha").textContent = `Fecha de publicación: ${fechaFormateada}`;
        } else {
            document.getElementById("fecha").textContent = 'Fecha de publicación: No disponible';
        }

        const categoria = noticia.categoria ? noticia.categoria.toLowerCase() : "generica";
        const extensionImagen = ".jpg"; 
        const urlImagen = `Recursos proyecto/img/${categoria}${extensionImagen}`;

        console.log("URL de la imagen:", urlImagen);

        const imagenElement = document.querySelector(".img");
        imagenElement.src = urlImagen;
        imagenElement.alt = `Imagen de categoría: ${categoria}`;

        const autorElement = document.getElementById("autor");
        if (noticia.autor) {
            autorElement.textContent = `Autor: ${noticia.autor}`;
        } else {
            autorElement.textContent = 'Autor: Desconocido';
        }
    } else {
        alert("No se ha encontrado la noticia.");
    }
}

document.addEventListener("DOMContentLoaded", cargarNoticia);
