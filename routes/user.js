const express=require("express")
const router=express.Router()
const LocalUser=require("../models/local_user")
const GoogleUser=require("../models/User")
const {isLoggedIn}=require('../utills/middlewear')
const catchAsync=require("../utills/catchAsync")
const Resume=require("../models/resume")
const cloudinary=require("cloudinary")
const multer  = require('multer')
const{storage,storage2}=require('../cloudinary/app')
const upload = multer({ storage })
const upload2=multer({ storage:storage2 })
const {Verify}=require("../utills/VerifyProfile")
const { default: mongoose } = require("mongoose")
const ExpressError=require('../utills/ExpressError')
const ResumeValidator=require('../SchemaValidation/Resume')

const ValidateResume=(req,res,next)=>{

    const{error}=  ResumeValidator.validate(req.body)
  
    if(error){

        const msg=error.details.map(el=>el.message).join(",")
        throw(new ExpressError(msg,400))
    }
    else{
        next()
    }
    }


router.get('/profile/:id/',isLoggedIn,Verify,catchAsync(async(req,res)=>{
    const {id}=req.params

const local=await LocalUser.findById(id).populate("resume").populate("job")
const google=await GoogleUser.findById(id).populate("resume").populate("job")
if(local){
    const data=local
    
 res.render('User/profile',{data})
}
else{
    const data=google
  
      res.render('User/profile',{data})
}
    
}))

router.get('/profile/:id/edit',isLoggedIn,catchAsync(async(req,res)=>{
    res.render("User/resume")
}))
router.post('/profile/:id/edit',isLoggedIn,upload2.single("profile"),ValidateResume,catchAsync(async(req,res)=>{
    const NewResume= await new Resume(req.body)
    const{id}=req.params
    if(Array.isArray(req.body.role)){
    for(let i in req.body.role){
        NewResume.experience.push({
            enterprise_name:req.body.enterprise_name[i],
            role:req.body.role[i],
            role_from_date:req.body.role_from_date[i],
            role_to_date:req.body.role_to_date[i],
            role_description:req.body.role_description[i]

        })

    }
}else{
    NewResume.experience.push({
        enterprise_name:req.body.enterprise_name,
        role:req.body.role,
        role_from_date:req.body.role_from_date,
        role_to_date:req.body.role_to_date,
        role_description:req.body.role_description

    })
}
  

   const local=await LocalUser.findById(id)
        const google=await GoogleUser.findById(id)
       if(local){
        const userData=local
        userData.resume=NewResume
        await NewResume.save()
        await userData.save()
        req.flash("success","Successfully Submitted Resume")
        res.redirect(`/user/profile/${id}`)
    }
    else{
        const userData=google
        userData.resume=NewResume
        await NewResume.save()
        await userData.save()
        req.flash("success","Successfully Submitted Resume")
        res.redirect(`/user/profile/${id}`)
    }

   
     
       
}))

router.get('/profile/:id/update/:id2',isLoggedIn,catchAsync(async(req,res)=>{
    const data=req.body
    const {id}=req.params
   const local=await LocalUser.findById(id).populate("resume")
    const google=await GoogleUser.findById(id).populate("resume")
   if(local){
    const data=local
   

     res.render(`User/UpdateProfile`,{data})
}
else{
   const data=google
    res.render(`User/UpdateProfile`,{data})
}
}))


router.delete('/profile/:id/delete',catchAsync(async(req,res)=>{
    const {id}= req.params
   const localUser=await LocalUser.findByIdAndDelete(id)
   const googleUser=await GoogleUser.findByIdAndDelete(id)
    req.flash("error","Deleted Successfully")
    res.redirect('/admin')
}))
router.put('/profile/:id/update/:id2',isLoggedIn,upload2.single("profile"),ValidateResume,catchAsync(async(req,res)=>{
    const {id,id2}=req.params
   
    const UpdateResume=await Resume.findByIdAndUpdate(id2,req.body,{ multi: false })
    
   if(Array.isArray(req.body.role)){
        for(let i in req.body.role){
            UpdateResume.experience[i]={
                enterprise_name:req.body.enterprise_name[i],
                role:req.body.role[i],
                role_from_date:req.body.role_from_date[i],
                role_to_date:req.body.role_to_date[i],
                role_description:req.body.role_description[i]
    
            }
    
        }
    }else{
        UpdateResume.experience[0]={
            enterprise_name:req.body.enterprise_name1,
            role:req.body.role,
            role_from_date:req.body.role_from_date,
            role_to_date:req.body.role_to_date,
            role_description:req.body.role_description
    
        }
    }
    if(req.file){
if(UpdateResume.profile.filename){
    await cloudinary.uploader.destroy(UpdateResume.profile.filename)
   
}
UpdateResume.profile.filename=req.file.filename
UpdateResume.profile.url=req.file.path

}


    await UpdateResume.save()
  res.redirect(`/user/profile/${id}`)


}))
module.exports=router
