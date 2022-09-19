const mongoose=require('mongoose')
const {Schema}=mongoose

const ApplicationSchema=new Schema({

    resume:{
        url:String,
        filename:String
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:"User"

    }
})
const Application= mongoose.model("Application",ApplicationSchema)
module.exports=Application
