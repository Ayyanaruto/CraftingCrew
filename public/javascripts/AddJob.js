const images=document.querySelector('#image')

var uploadedImage=""
images.addEventListener("change",function(){
    const reader=new FileReader()
    reader.addEventListener("load",function(){
        uploadedImage=reader.result
        document.querySelector(".input_image").style.backgroundImage=`url(${uploadedImage})`
    })
    reader.readAsDataURL(this.files[0])
})