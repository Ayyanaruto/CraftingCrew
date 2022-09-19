const select=document.querySelector("select")
const opt=document.querySelectorAll("option")


for (let i of opt) {
   if(i==userData.resume.user_status){
    i.selected=true
   }
    
}