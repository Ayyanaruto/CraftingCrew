



// const inputs=document.querySelector('input[type=text]')
const form=document.querySelector('#form')






const inputControl=document.querySelectorAll('.input-control')
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// const validateInput=()=>{

 
//     if(inputs.value==="") {
       
//         setError(inputs,'This field is required')
        
//     }
//     else{
        
//         setSuccess(inputs)
//     }
//     if(email.value===""){
//         setError(email,'Email is required')
//     }
//     else if(!isValidEmail(email.value)){
//         setError(email,'Email is Invalid')
//     }
//     else{
//         setSuccess(email)
//     }
//     if(number.value===''){
//         setError(number,'Number Required')
//     }
    
//     else{
//         setSuccess(number)
//     }
//     if(age.value===""){
//         setError(age,'Age is Required')
//     }else{
//         setSuccess(age)
//     }
//     if(address.value===""){
//         setError(address,"Address required")
//     }else if(address.value.length<10){
//         setError(address,'Address should be bigger than 10 characters')
//     }else
//     {
//         setSuccess(address)
//     }
//     if(bio.value===""){
//         setError(bio,"Bio required")
//      }else if(bio.value.length<200){
//          setError(bio,'Bio should be atleast 250 characters')
//      }
//     if(job.value===""){
//         setError(job,"Job-Role is required")
//     }
//     else{
//         setSuccess(job)
//     }
//     if(currstatus.value===""){
//         setError(currstatus,'Please Select your current Status')
//     }
//     else{
//         setSuccess(currstatus)
//     }if(fileValidation(resume)==false)
//     {
//         setError(resume,"Invalid File")
//     }
//     else if(resume.value===""){
//         setError(resume,"Please upload your resume")
//     }
//     else{
//         setSuccess(resume)
//     }
// }

var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");
var form_4 = document.querySelector(".form_4");


var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");
var form_4_btns = document.querySelector(".form_4_btns");


var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");
var form_3_next_btn = document.querySelector(".form_3_btns .btn_next");
var form_4_back_btn = document.querySelector(".form_4_btns .btn_back");

var form_2_progessbar = document.querySelector(".form_2_progessbar");
var form_3_progessbar = document.querySelector(".form_3_progessbar");
var form_4_progessbar = document.querySelector(".form_4_progessbar");

var btn_done = document.querySelector(".btn_done");
var modal_wrapper = document.querySelector(".modal_wrapper");
var shadow = document.querySelector(".shadow");


form_1_next_btn.addEventListener("click", function(e){
	
	Validateform1()
	if(isform1Valid()){
	form_1.style.display = "none";
	form_2.style.display = "block";

	form_1_btns.style.display = "none";
	form_2_btns.style.display = "flex";

	form_2_progessbar.classList.add("active");}
	else{
		e.preventDefault()
	}
	
});

form_2_back_btn.addEventListener("click", function(){
	form_1.style.display = "block";
	form_2.style.display = "none";

	form_1_btns.style.display = "flex";
	form_2_btns.style.display = "none";

	form_2_progessbar.classList.remove("active");
});

form_2_next_btn.addEventListener("click", function(e){
	Validateform2()
	if(isform2Valid()){
	form_2.style.display = "none";
	form_3.style.display = "block";

	form_3_btns.style.display = "flex";
	form_2_btns.style.display = "none";

	form_3_progessbar.classList.add("active");}
	else{
		e.preventDefault()
	}
});

form_3_back_btn.addEventListener("click", function(){
	form_2.style.display = "block";
	form_3.style.display = "none";

	form_3_btns.style.display = "none";
	form_2_btns.style.display = "flex";

	form_3_progessbar.classList.remove("active");
});
form_3_next_btn.addEventListener("click", function(){
	form_4.style.display = "block";
	form_3.style.display = "none";

	form_3_btns.style.display = "none";
	form_4_btns.style.display = "flex";

	form_4_progessbar.classList.add("active");
});
form_4_back_btn.addEventListener("click", function(){
	form_3.style.display = "block";
	form_4.style.display = "none";

	form_4_btns.style.display = "none";
	form_3_btns.style.display = "flex";

	form_4_progessbar.classList.remove("active");
});


btn_done.addEventListener("click", function(){
	modal_wrapper.classList.add('.active')
})

shadow.addEventListener("click", function(){
	modal_wrapper.classList.remove("active");
})
//Add fields//
let field=document.querySelector(".experience_num")
let addField=document.querySelector("#add_more_fields")
let removeField=document.querySelector("#remove_fields")
let form3=document.querySelector("#experience")
addField.addEventListener("click",(e)=>{
const elem=field.cloneNode(true)
const input=elem.querySelectorAll('input')
input.forEach(i=>{
	i.attributes.value=''
})
form3.appendChild(elem)
})
const Validateform1=()=>{
	const inputs=form_1.querySelectorAll("input")
	const email=form_1.querySelector('input[type=email]')
	for(let input of inputs){
		if(input.value===''){
			setError(input,'This field is required')
		}else if(input.type=='email'){
			
			if(!isValidEmail(email.value)){
				setError(email,"Email is Wrong")
			}else{
				setSuccess(email)
			}
		}
		else{
			setSuccess(input)
		}
	}
}
function isform1Valid(){
	const container=form_1.querySelectorAll('.input_wrap')
	let result=true
	container.forEach(item => {
		if(item.classList.contains('error')){
		   result= false
		}
	
	
	});
	return result
	}
	
	const Validateform2=()=>{
	const inputs=form_2.querySelectorAll("input")
	for(let input of inputs){
		if(input.value===''){
			setError(input,'This field is required')
		}
		else{
			setSuccess(input)
		}
	}
	}
	function isform2Valid(){
		const container=form_2.querySelectorAll('.input_wrap')
		let result=true
		container.forEach(item => {
			if(item.classList.contains('error')){
			   result= false
			}
		
		
		});
		return result
		}
		const Validateform4=()=>{
			const inputs=form_4.querySelectorAll("input")
			for(let input of inputs){
				if(input.value===''){
					setError(input,'This field is required')
				}
				else{
					setSuccess(input)
				}
			}
			}
			function isform4Valid(){
				const container=form_4.querySelectorAll('.input_wrap')
				let result=true
				container.forEach(item => {
					if(item.classList.contains('error')){
					   result= false
					}
				
				
				});
				return result
				}
				form.addEventListener('submit',(e)=>{
					Validateform4()
					
					if(isform4Valid()){
					form.submit()
					}
					else{
						e.preventDefault()
					}
				})