const form=document.querySelector('#form')
const username=document.querySelector('#name')
const email=document.querySelector('#email')
const passwords=document.querySelector('#password')
const errorDisplay=document.querySelector('.error')

form.addEventListener("submit",(e)=>{

    validateInput();
    if(isformValid()===true){
        form.submit()
    }else{
        e.preventDefault()
    }
    
    })
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
    const validateInput=()=>{
 
        if(username.value==="") {
           
            setError(username,'Username is required')
            
        }
        else{
            
            setSuccess(username)
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
        if(passwords.value===''){
            setError(passwords,'Password Required')
        }
        else if(password.value.length<8){
            setError(passwords,'Password must be atleast 8 characters')
        }
        else{
            setSuccess(passwords)
        }}
        function isformValid(){
            const container=form.querySelectorAll('.input-control')
            let result=true
            container.forEach(item => {
                if(item.classList.contains('error')){
                   result= false
                }
            
            
            });
            return result
            }
            
      
            