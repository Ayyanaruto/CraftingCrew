const express=require('express')
const router=express.Router()
const {ContactPost}=require('./contact')
const multer  = require('multer')
const{storage2}=require('../cloudinary/app')
const upload2=multer({storage:storage2})
const jobs=require("../models/jobs")
const { MulterError } = require('multer')
const {ValidateJob}=require('../SchemaValidation/JobValidate')
const joi=require('joi')
const catchAsync=require("../utills/catchAsync")
const ValidateContact=require("../SchemaValidation/Contact-Us")
const ExpressError=require("../utills/ExpressError")
const {isLoggedIn}=require('../utills/middlewear')
const Application=require("../models/Application")
const{storage}=require('../cloudinary/app')
const Resume = require('../models/resume')
const User = require('../models/User')
const LocalUser=require('../models/local_user')
const upload = multer({ storage })
//------------------------------------------------------------------------------------------//
const JobValidater=(req,res,next)=>{
    const{error}=  ValidateJob.validate(req.body)
    if(error){

        const msg=error.details.map(el=>el.message).join(",")
        throw(new ExpressError(msg,400))
    }
    else{
        next()
    }
    }
    const ContactValidater=(req,res,next)=>{
        const{error}=ValidateContact.validate(req.body)
        if(error){
            const msg=error.details.map(el=>el.message).join(",")
            throw(new ExpressError(msg,400))
        }
        else{
            next()
        }
        }
//----------------------------------------------------------------------------------------------//
router.get("/",(req,res)=>{
    res.render("index")
    
    })
    router.get("/Contact-us",(req,res)=>{
        res.render("Contactus")
    })
    
    router.post("/Contact-us",ContactValidater,ContactPost) //At routes/contact.js//
  
    router.post("/Jobs",upload2.single('images'),JobValidater,catchAsync(async(req,res)=>{
       const result=ValidateJob.validate(req.body)
    const newJob=await new jobs(req.body)
    if (!req.file){
        newJob.images.url="https://res.cloudinary.com/dcwpxxcd9/image/upload/v1653315208/CraftingCrewProfiles/SeekPng.com_profile-icon-png_9665493_gzxy5r.png"
        newJob.images.filename="CraftingCrewProfiles/SeekPng.com_profile-icon-png_9665493_gzxy5r.png"
    }else{
    newJob.images.filename=req.file.filename
    newJob.images.url=req.file.path}
    await newJob.save()
    req.flash("success","Successfully Submitted new Job")
    res.redirect('/Jobs')
    }))

    router.get('/Jobs',catchAsync( async(req,res)=>{
        const jobsData=await jobs.find({})
        res.render('job',{jobsData})
    }))
    
    router.get("/notes",(req,res)=>{
        res.render("notes")
    })



    router.get('/Jobs/:id',isLoggedIn,catchAsync(async(req,res)=>{
        const {id}=req.params
        const findJob= await jobs.findById(id)
        res.render("show",{findJob})
    }))
    
    router.get("/Jobs/:id/:userId",isLoggedIn,async(req,res)=>{
        const {id,userId}=req.params
        const job= await jobs.findById(id)

        res.render("apply" ,{job})
    })
    router.post("/Jobs/:id/:userId",upload.single("resume"),async(req,res)=>{
  const newApplication=await new Application(req.body)
  const{id,userId}=req.params
  const local=await LocalUser.findById(userId)
  const google=await User.findById(userId)
  const Jobs=await jobs.findById(id)

  if(local){
local.job.push(Jobs)
const newAppsUser=local
newApplication.profile=newAppsUser
await local.save()

  }else{
    const newAppsUser=google
    newApplication.profile=newAppsUser
    google.job.push(Jobs)
    await google.save()
   
  }

  newApplication.resume.url=req.file.path
  newApplication.resume.filename=req.file.filename
  Jobs.applications.push(newApplication)

  await newApplication.save()
  await Jobs.save()
  req.flash("success","Successfully applied,We will Contact Soon")
  res.redirect('/Jobs')

    })


    module.exports=router