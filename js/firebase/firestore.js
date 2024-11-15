import { db } from "./firebase.js"

export async function getUserRole(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        
        if (userDoc.exists) {
            return userDoc.data().role;
        } else {
            console.error("Usuario no encontrado en la base de datos.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        return null;
    }
}
