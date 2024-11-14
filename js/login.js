import { registerUser, loginUser } from "./firebase/firebase.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let correo = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let username = document.getElementById("username").value;
    let fullName = document.getElementById("fullName").value;

    const status = await registerUser(correo, password, username, fullName)

    if(status){
        alert("Usuario creado exitosamente");

        document.getElementById("registerEmail").value = '';
        document.getElementById("registerPassword").value = '';
        document.getElementById("username").value = '';
        document.getElementById("fullName").value = '';
    }else{
        alert("Ya existe un usuario asociado a este correo");
    }
});

// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {

      const userData = await loginUser(email, password);
      
      if (userData) {

      window.location.href = "home.html";
      } else {
        alert("Usuario y/o contraseña incorrectos.");
      }
    } catch (error) {
      alert("Hubo un problema al iniciar sesión.");
      console.error("Error al iniciar sesión:", error.message);
    }
});