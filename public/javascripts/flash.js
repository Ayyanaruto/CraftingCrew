const button=document.querySelector(".alink")
const container=document.querySelector(".flash_container")

button.addEventListener("click",()=>{
    container.style.display="none"
})
setTimeout(()=>{
    container.style.display="none"
},5000)