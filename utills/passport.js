const mongoose  = require("mongoose")
const GoogleStrategy=require("passport-google-oauth20").Strategy
const User=require('../models/User')
const catchAsync = require("./catchAsync")
module.exports=function(passport){
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:'/auth/google/callback'
},
async(accessToken,refreshToken,profile,cb)=>{

const newUser={
    googleId:profile.id,
    displayName:profile.displayName,
    firstName:profile.name.givenName,
    lastName:profile.name.familyName,
    image:profile.photos[0].value
}

try{
let user=await User.findOne({googleId:profile.id})
if(user){
    cb(null,user)
}
else{
    user=await User.create(newUser)
    cb(null,user)
}}catch(e){
    console.error(e)
}
}))

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
}
