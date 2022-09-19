const inputs = document.querySelectorAll(".input");
const input=document.querySelector('input[type=text]')
const email=document.querySelector('input[type=email]')
const number=document.querySelector('input[type=tel]')

const form=document.querySelector('#form')
function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


const inputControl=document.querySelectorAll('.input-control')
console.log(inputControl)
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
const isValidNumber=(num)=>{
const re=/[^A-Za-z!@#$%&*()_\-+={[}\]|\:;"'<,>.?\/\\~`]/
return re.test(num)
}
const validateInput=()=>{
    if(input.value==="") {
       
        setError(input,'This field is required')
        
    }
    else{
        
        setSuccess(input)
    }
    if(email.value===""){
        setError(email,'Email is required')
    }
    else if(!isValidEmail(email.value)){
        setError(email,'Email is Invalid')
    }
    else{
        setSuccess(email)
    }
    if(number.value===''){
              setError(number,'Number Required')
          }else if(!isValidNumber(number.value)){
            setError(number,'Please Provide numbers')
          }
          
          else{
              setSuccess(number)
          }}
    function isformValid(){
      const container=form.querySelectorAll('.input-container')
      let result=true
      container.forEach(item => {
        if(item.classList.contains('error')){
           result= false
        }
      
      
      });
      return result
      }
      form.addEventListener('submit',(e)=>{
     validateInput()
        
        if(isformValid()){
        form.submit()
        }
        else{
          e.preventDefault()
        }
      })