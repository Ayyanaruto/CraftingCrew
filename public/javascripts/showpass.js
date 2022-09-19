const togglePassword = document.querySelector(".toggle-password");
const password = document.querySelector("#password");

togglePassword.addEventListener("click",()=>{
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle("fa-eye-slash");
})
