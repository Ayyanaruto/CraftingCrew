const { required } = require("joi")
const mongoose=require("mongoose")
const Resume = require("./resume")
const {Schema}=mongoose
const userSchema=new Schema({
    
    googleId:{
        type:String,
        required:true
    },
   displayName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    resume:{
        type:Schema.Types.ObjectId,
        ref:"Resume"
    },
    job:[{
        type:Schema.Types.ObjectId,
        ref:"Job"
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    },
  

})
userSchema.post('findOneAndDelete',async(doc)=>{
    if(doc){
         await Resume.remove({_id:{
        $in:doc.resume
        }})
    }
    })
module.exports=mongoose.model('User',userSchema)

