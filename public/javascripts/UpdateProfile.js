

const add_fields=document.querySelector("#add_more_fields")
const remove_fields=document.querySelector("#remove_fields")
const elem=document.querySelector(".cv-content-item")
const parent=document.querySelector("#exp")
add_fields.addEventListener("click",()=>{
    const clone=elem.cloneNode(true)
    const childrens=clone.childNodes
   
    const cloneIt=childrens.forEach(async(e)=>{
     const a= await e.children
     let input
        for(i in a){
           input= a[i].setAttribute("value","")
        }
     
      return input

    })

    parent.appendChild(clone)
})

remove_fields.addEventListener("click",()=>{
    
if(parent.childNodes.length>4){
    parent.removeChild(parent.lastElementChild)
}else{
  
}
})
var loadFile = function (event) {
    var image = document.getElementById("output");
    image.style.backgroundImage=`url(${ URL.createObjectURL(event.target.files[0])})`
  };