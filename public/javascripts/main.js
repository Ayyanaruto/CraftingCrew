const toggle=document.getElementsByClassName('toggle-button')[0]
const navbarLinks=document.getElementsByClassName('links')[0]
toggle.addEventListener('click',()=>{
    navbarLinks.classList.toggle('active')
    navbarLinks.style.animation="navLinkFade 0.5s ease forwards"
})