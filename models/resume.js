const mongoose=require('mongoose')
const{Schema}=mongoose
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');
const now=new Date()
const resumeSchema=new Schema({
    date:{
    type:String,
    default:date.format(now, 'ddd, MMM DD YYYY'),
    },
    month:{
        type:String,
    default:date.format(now, 'MMMM'), 
    },
    year:{
        type:String,
        default:date.format(now, ' YYYY'),
    },
    name:{
        type:String,required:true,
        
    },
    email:{
        type:String,required:true,
    },
    contact_number:{
        type:Number,
        required:true
    },
    field:{
    type:String,
    required:true
    },
    school_name:{
        type:String,
        required:true
    },
    school_qualification:{
        type:String,
        required:true
    },
    school_completion_date:{
        type:String,
        required:true
    },
    college_name:{
        type:String,
        required:true
    },
    degree_name:{
        type:String,
        required:true
    },
    college_completion_date:{
        type:String,
        required:true
    },
    skills:[],
    secondary_skills:[],
    github:{
        type:String,
      
        
    },
    linkedin:{
        type:String,
       
    },
    experience:[
        
    ],
    profile:{
        url:{type:String,default:"https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"},
        
        filename:String
    },

    admin_checked:{
            type:String,
            default:'uncheck'
        
    }
    }
)
const Resume=mongoose.model('Resume',resumeSchema)
module.exports=Resume