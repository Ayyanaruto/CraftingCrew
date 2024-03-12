const express=require('express')
const router=express.Router()
const multer  = require('multer')
const{storage2}=require('../cloudinary/app')
const upload2=multer({storage:storage2})
const Resume=require('../models/resume')
const jobs=require("../models/jobs")
const {cloudinary}=require('../cloudinary/app')
const catchAsync=require("../utills/catchAsync")
const ResumeValidator=require("../SchemaValidation/Resume")
const {ValidateJob}=require('../SchemaValidation/JobValidate')
const ExpressError=require("../utills/ExpressError")
const passport=require('passport')
const {isLoggedIn}=require('../utills/middlewear')
const Users=require("../models/User")
const LocalUser=require("../models/local_user")
const { concat } = require('../SchemaValidation/Resume')
const { request } = require('express')
const { admin } = require('googleapis/build/src/apis/admin')
const Admin=require('../models/admin')
const isAdmin=require("../utills/isAdmin")


//-------------------------------------------------------------------------------------------//
const JobValidater=(req,res,next)=>{
    const{error}=ValidateJob.validate(req.body)
    if(error){

        const msg=error.details.map(el=>el.message).join(",")
        throw(new ExpressError(msg,400))
    }
    else{
        next()
    }
    }
    //--------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------//

router.get("/",isAdmin,async(req,res)=>{
  const User=await Users.find({}).populate('resume')
  const User1=await LocalUser.find({}).populate('resume')
  const TotalUsers=[...User,...User1]
    const JobsData=await jobs.find({})
    const UsersData=await Resume.aggregate([
        {
            $match:{},
        },
        {$facet:{
            "categorizedByMonth":[
                {
                    $group:{_id:"$month",y:{$sum:1}}
                }
            ],"categorizedByDate":[
                {
                    $group:{_id:"$date",y:{$sum:1}}
                }
            ],"categorizedByYear":[
                {
                    $group:{_id:"$year",y:{$sum:1}}
                }
            ]
        }
    }
    ]
        )
   
  const activeUsers= await Users.aggregate([{
    $match:{}},
    {
    $group:{_id:"$month",active:{$push:"$job"}}
}])


const active=activeUsers[0].active.filter(e=>e.length)


    res.render('admin',{JobsData,UsersData,active,TotalUsers})
})

router.post('/register',async(req,res)=>{
    const{email,username,password,role}=req.body
    const user= new Admin({email,username,role})
    const registeredUser= await Admin.register(user,password)
  req.login(registeredUser,err=>{
     if(err){
        return next(err)
     }

   
    req.flash("success","Please Add your Information ")
   
    res.redirect(`/admin/`)
    })
   
 })
 router.get("/json",async(req,res)=>{
    const JobsData=await jobs.find({})
   const UsersData=await Resume.find({})
    const google= await Users.find({})
     const local= await LocalUser.find({})
   
 const data1=google.map((g)=>{
     const data=[...g.job]    return data
 }) res.json(JobsData)
})
router.get("/AddJobs",isAdmin,(req,res)=>{
    req.flash("error","Something went Wrong")
    res.render('admin/jobs/AddJob')
})
router.get("/submittedcv",catchAsync(async(req,res)=>{
    const resume= await Resume.find({})
    req.flash("error","Something went Wrong")
 res.render('admin/submitted',{resume})

}))

router.get('/login',(req,res)=>{
    res.render('admin/login')
})
router.post('/login',passport.authenticate('local',{failureFlash:true,keepSessionInfo: true,failureRedirect:'/admin/login',}),(req,res)=>{
    
    req.flash("success","Welcome back to CraftingCrew")
    res.redirect('/admin')
    
})

router.put("/submittedcv/:id",catchAsync( async(req,res)=>{
    const {id}=req.params
    const check=await Resume.findByIdAndUpdate(id,req.body)
    req.flash("success","Seen Resume")
    res.redirect("/admin/submittedcv")


}))



router.get('/user_profile/:id',isAdmin,catchAsync( async(req,res)=>{
    const {id}=req.params
    const findResume=await Resume.findById(id)
    res.render("admin/showsubmitted",{findResume})

}))


router.get('/AddJobs/:id/update',isAdmin,catchAsync(async(req,res)=>{
    const {id}=req.params;
    const update= await jobs.findById(id)
    req.flash("error","Something went Wrong")
    res.render('admin/jobs/updateJob',{update})
}))
router.put('/AddJobs/:id/update',upload2.single('images'),JobValidater,catchAsync(async(req,res)=>{
  
const {id}=req.params
const newData=await jobs.findByIdAndUpdate(id,req.body)

if (!req.file){
    newData.images.url="https://res.cloudinary.com/dcwpxxcd9/image/upload/v1653315208/CraftingCrewProfiles/SeekPng.com_profile-icon-png_9665493_gzxy5r.png"
    newData.images.filename="CraftingCrewProfiles/SeekPng.com_profile-icon-png_9665493_gzxy5r.png"
}else{
    if(newData.images.filename=="CraftingCrewProfiles/SeekPng.com_profile-icon-png_9665493_gzxy5r.png"){
        newData.images.filename=req.file.filename
        newData.images.url=req.file.path
    }
await cloudinary.uploader.destroy(newData.images.filename)
newData.images.filename=req.file.filename
newData.images.url=req.file.path
}
await newData.save()
req.flash("success","Successfully Updated Job")
res.redirect('/Jobs')
}))
router.delete('/AddJobs/:id/delete',catchAsync(async(req,res)=>{
    const{id}=req.params
    const profile=await jobs.findById(id)
    if(profile.images.filename!="CraftingCrewProfiles/SeekPng.com_profile-icon-png_9665493_gzxy5r.png"){
        await cloudinary.uploader.destroy(profile.images.filename)
    }
    const del=await jobs.findByIdAndDelete(id)
    req.flash("error","Deleted Successfully")
    res.redirect('/Jobs')
   
    
}))

router.get('/applications',isAdmin,async(req,res)=>{
    const jobsData=await jobs.find({})
    res.render('admin/applications',{jobsData})
})

router.get('/applications/:id',isAdmin,async(req,res)=>{
const {id}=req.params
const Jobs=await jobs.findById(id).populate("applications")

res.render("admin/showApplications",{Jobs})

})
// router.get("/api/users",async(req,res)=>{
//     const mail=req.query.mail
//     if(req.query.mail){
//     const user=await Resume.find({email:mail})
//     if(!user){
//         res.send("Please type Correct Email")
//     }
//     res.send(user)
//     }
//     else{
//         res.send("Something went wrong")
//     }
// })



module.exports=router

