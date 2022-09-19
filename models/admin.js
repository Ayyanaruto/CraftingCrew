
const mongoose=require('mongoose')
const{Schema}=mongoose
const passport=require('passport')
const passportLocalmongoose=require("passport-local-mongoose")

const AdminSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true
    }
})
AdminSchema.plugin(passportLocalmongoose)
module.exports=mongoose.model('admin',AdminSchema)