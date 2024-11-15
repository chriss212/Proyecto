import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener el ID de la noticia desde la URL
const urlParams = new URLSearchParams(window.location.search);
const noticiaId = urlParams.get('id'); // Obtener el ID de la noticia desde la URL

// Función para cargar los detalles de la noticia desde Firestore
async function cargarNoticia() {
    if (!noticiaId) {
        alert("No se ha encontrado el ID de la noticia.");
        return;
    }

    // Referencia al documento de la noticia en Firestore
    const noticiaRef = doc(db, "noticias", noticiaId);
    const docSnap = await getDoc(noticiaRef);

    // Si el documento existe, mostramos los detalles
    if (docSnap.exists()) {
        const noticia = docSnap.data();
        console.log("Noticia obtenida de Firestore:", noticia); // Mensaje de depuración

        // **Obtenemos el título de la noticia desde el objeto de Firestore** y actualizamos el título de la página
        const titulo = noticia.titulo;

        // Actualizamos el título de la página en la pestaña del navegador
        document.title = titulo; // Cambiar el título de la página
        // Actualizamos el título de la noticia en el contenido del HTML
        const tituloElement = document.getElementById("tituloNoticia");
        tituloElement.textContent = titulo; // Mostrar el título en el HTML

        // Mostrar el contenido de la noticia
        document.getElementById("contenido").innerHTML = noticia.contenido;

        // Mostrar la fecha de publicación si está presente
        if (noticia.fecha_publicacion) {
            // Convertir la fecha de Firestore (Timestamp) a una fecha legible
            const fechaPublicacion = noticia.fecha_publicacion.toDate(); // Convertimos Timestamp a Date
            const fechaFormateada = fechaPublicacion.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            document.getElementById("fecha").textContent = `Fecha de publicación: ${fechaFormateada}`;
        } else {
            document.getElementById("fecha").textContent = 'Fecha de publicación: No disponible';
        }

        // **Construcción de la URL de la imagen**:
        // Aquí usamos la categoría de la noticia (noticia.categoria) para construir el nombre de la imagen.
        const categoria = noticia.categoria ? noticia.categoria.toLowerCase() : "generica"; // Usamos "generica" si no hay categoría definida
        const extensionImagen = ".jpg"; // Puedes cambiar esto si tienes otros formatos de imagen
        const urlImagen = `Recursos proyecto/img/${categoria}${extensionImagen}`;

        // Mensaje de depuración para verificar la URL de la imagen
        console.log("URL de la imagen:", urlImagen);

        // Mostrar la imagen si existe
        const imagenElement = document.querySelector(".img");
        imagenElement.src = urlImagen;
        imagenElement.alt = `Imagen de categoría: ${categoria}`; // Añadir alt con el nombre de la categoría

        // Mostrar el autor al final del contenido
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

// Asegurarse de que el DOM esté listo antes de cargar la noticia
document.addEventListener("DOMContentLoaded", cargarNoticia);
