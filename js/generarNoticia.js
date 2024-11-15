const fs = require('fs');
const path = require('path');


function crearNoticia(titulo, contenido){
    const directorioNoticias = path.join(__dirname, "noticias")
    const plantillaPath = path.join(__dirname, "plantillaNoticias.html");
    let plantilla = fs.readFileSync(plantillaPath, "utf-8");
    
    const paginaHtml = plantilla.replace("{{titulo}}", titulo).replace("{{contenido}}", contenido);
    const nombreArchivo = path.join(directorioNoticias);
    fs.writeFileSync(nombreArchivo, paginaHtml, "utf-8");
}

const titulo = "";
const contenido = ""

crearNoticia(titulo, contenido);