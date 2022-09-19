const express=require('express')
const nodemailer=require("nodemailer")
const {google}=require("googleapis")

const Contact=require('../models/contact')
const fs=require("fs")
const catchAsync=require('../utills/catchAsync')

//-----------------------------------------------------------------------------------//



module.exports.ContactPost=catchAsync(async(req,res,next)=>{
    const data= await new Contact(req.body)
    await data.save()
   async function main() {
      const html=fs.readFileSync("C:/Users/ayyan/OneDrive/Desktop/portfolio/views/admin/emailTemplate.ejs")
        let testAccount = await nodemailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: "ayyan.shaikh.narotu@gmail.com, baz@example.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html:html, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
      main().catch(console.error);
 req.flash("success","Successfully Sent")
 res.redirect('/Contact-us')
 })