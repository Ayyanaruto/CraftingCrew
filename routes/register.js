const express=require('express')
const router=express.Router()

const passport = require('passport')
const LocalUser=require("../models/local_user")
const { Verify } = require('../utills/VerifyProfile')
//-------------------------------------------------------------------//
router.get("/register",(req,res)=>{
    try{
    res.render("register")}
    catch(e){
        console.log(e)
    }
})
router.post('/register',async(req,res)=>{
    const{email,username,password}=req.body
    const user= new LocalUser({email,username})
    const registeredUser= await LocalUser.register(user,password)
   req.login(registeredUser,err=>{
    if(err){
        return next(err)
    }

   
    req.flash("success","Please LogIn to Open the Gates for your Best Job")
   
    res.redirect(`user/profile/${registeredUser.id}/edit`)
   })
   
})

router.get("/google",passport.authenticate('google',{scope:['profile']}))

router.get('/auth/google/callback',passport.authenticate('google',{failureFlash:true,failureRedirect:'/login'}),Verify,(req,res)=>{
    const redirectUrl=req.session.returnTo||"/"
    
    delete req.session.returnTo
    req.flash("success","Welcome back to InfoStation,Get your Dream Job Here")
    
    res.redirect(redirectUrl)
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.post('/login',passport.authenticate('local',{failureFlash:true,keepSessionInfo: true,failureRedirect:'/login',}),(req,res)=>{
    const redirectUrl=req.session.returnTo||"/"

    delete req.session.returnTo
    req.flash("success","Welcome back to InfoStation, Get your Dream Job Here")
    
    res.redirect(redirectUrl)
    
})
router.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash("success","GoodBye!,Hope you have a Good Day Sir")
        res.redirect("/")
    })
 
})
module.exports=router
