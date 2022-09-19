
const mongoose=require("mongoose")
const {Schema}=mongoose
const date = require('date-and-time');
const now=new Date()
 const JobSchema=new Schema({
    month:{
        type:String,
        default:date.format(now ,'MMMM'),
    },
     title:{
         type:String
     },
     images:{
    url:String,
    filename:String
     },
     responsiblity:{
        type:String
     },
     skills:{
         type:String
     },
     experience:{
         type:String
     },
     location:{
        type:String
     },
     applications:[{
        type:Schema.Types.ObjectId,
        ref:"Application"
    }],
 })
 module.exports=mongoose.model("Job",JobSchema)