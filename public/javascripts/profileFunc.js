const jobs=document.querySelectorAll(".job-card")
const banner=document.querySelector("#temp")
const items=[...jobs]
 const pagination =document.querySelector(".pagination")
 let current_page=1
 let rows=3


 function display(items,rows,page,parent){
  
    page--
    let start=page*rows
    let end=start+rows
    let paginateItems=items.slice(start,end)
  
    for(let i=0;i<paginateItems.length;i++){
       parent.appendChild(...items)
    }
    
    
 }
 display(items,rows,current_page,banner)