const form=document.querySelector('form')
const file =document.querySelector('#file')
const fileInput=document.querySelector('.file-name')
const fileName=document.querySelector(".wrapper-file")

file.addEventListener('change',(e)=>{
const element =document.createElement("p")
element.innerText=`${file.files[0].name}`

fileName.appendChild(element)

fileInput.style.display="block"
   
})


