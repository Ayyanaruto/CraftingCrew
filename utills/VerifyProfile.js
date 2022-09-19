const LocalUser=require("../models/local_user")
const googleUser=require("../models/User")
module.exports.Verify=async(req,res,next)=>{

    const {id}=req.user
    const local=await LocalUser.findById(id)
    const google= await googleUser.findById(id).populate('resume')
    if(id!==`${process.env.ADMIN}`){
      
        if(local){
            if(local.resume==null||undefined){
             req.flash("error","Please Add your Profile")
             return res.redirect(`/user/profile/${id}/edit`)
             
            }else{
             return next()
            }
         }
         else{
             if(google.resume==null||undefined){
                 req.flash("error","Please Add your Profile")
                 return res.redirect(`/user/profile/${id}/edit`)
                }else{
                 return next()
                }
         }  
    }

    next()
   }