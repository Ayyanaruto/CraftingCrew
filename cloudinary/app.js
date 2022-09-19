const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
});
const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'CraftingCrewResumes',
        format:'pdf'
    }
})
const storage2=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'CraftingCrewProfiles',
        
    }
})
module.exports={
    cloudinary,
    storage,
    storage2
}