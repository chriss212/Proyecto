import { registerUser } from "./firebase/firebase.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("r_email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("r_password").value;

    const status = await registerUser(fullname, email, username, password)

    if(status){
        alert("Usuario creado exitosamente");

        document.getElementById("fullname").value = '';
        document.getElementById("r_email").value = '';
        document.getElementById("username").value = '';
        document.getElementById("r_password").value = '';
    }else{
        alert("Ya existe un usuario asociado a este correo");
    }
});