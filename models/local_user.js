const mongoose=require('mongoose')
const{Schema}=mongoose
const passport=require('passport')
const passportLocalmongoose=require("passport-local-mongoose")
const localSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
  
    resume:{
        type:Schema.Types.ObjectId,
        ref:"Resume"
    },
    job:[{
        type:Schema.Types.ObjectId,
        ref:"Job"
    }]
});
localSchema.post('findOneAndDelete',async(doc)=>{
    if(doc){
         await Resume.remove({_id:{
        $in:doc.resume
        }})
    }
    })
localSchema.plugin(passportLocalmongoose)
module.exports=mongoose.model("LocalUser",localSchema)