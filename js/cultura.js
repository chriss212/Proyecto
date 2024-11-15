import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

async function loadNoticias() {
    const q = query(
        collection(db, "noticias"),
        where("categoria", "==", "Cultura"),
        where("estado", "==", "aprobada")
    );

    const noticiasSnapshot = await getDocs(q);
    const noticias = noticiasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return noticias;
}

function renderNoticias(noticias) {
    const noticiasList = document.getElementById("noticiasList");
    noticiasList.innerHTML = '';

    if (noticias.length === 0) {
        noticiasList.innerHTML = '<p>No hay noticias disponibles en esta categoría.</p>';
        return;
    }

    noticias.forEach(noticia => {
        const noticiaElement = document.createElement("div");
        noticiaElement.classList.add("noticia");

        noticiaElement.innerHTML = `
        <div class="noticias">
            <a href="cultura5.html?id=${noticia.id}" target="_blank"">
                <div class="desc">${noticia.titulo}</div>
                <div class="sum">${noticia.descripcion}</div>
            </a>
        </div>
        `;

        noticiasList.appendChild(noticiaElement);
    });
}

loadNoticias().then(renderNoticias).catch(error => {
    console.error("Error al cargar noticias: ", error);
});