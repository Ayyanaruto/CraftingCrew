
const bar=document.querySelector('.searchTerm')
const profile=document.querySelectorAll('.profile')


bar.addEventListener('input',async(e)=>{
    const query=e.target.value.toLowerCase()
    
  

 profile.forEach(profile=>{
    const values=profile.attributes.value.value
    const isVisible=values.includes(query)
    profile.classList.toggle('hide',!isVisible)
    
 })


 

})