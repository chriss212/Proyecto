import {registerUser, loginUser} from "./firebase.js"
document.getElementById("registerForm").addEventListener("submit", async(e) =>{
    e.preventDefault();

    let fullName = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    
})