if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const express=require("express")
const app=express()
const mongoose=require("mongoose")

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/CraftinCrew';


mongoose.connect(dbUrl,{
    useNewUrlParser:true,
   
    useUnifiedTopology:true,
   
})
.then(()=>{
    console.log("Database connected")
})
.catch((e)=>{
    console.log(e)
})
const path=require("path")
const ejs=require("ejs")
const ejsMate=require("ejs-mate")
const main=require('./routes/Main')
const admin=require('./routes/admin')
const register=require("./routes/register")
const methodOverride=require("method-override")
const ExpressError=require("./utills/ExpressError")
const session=require('express-session')
const sessionConfig=require("./utills/sessionConfig")
const flash=require("connect-flash")
const passport=require("passport")
const mongoSanitize=require("express-mongo-sanitize")
const helmet=require("helmet")
const Localpassport=require("passport-local")
const LocalUser=require("./models/local_user")
const Admin=require("./models/admin")
const googleUser=require("./models/User")
const UserRoutes=require("./routes/user")


app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));




app.use(session(sessionConfig))
app.use(flash())
app.use(mongoSanitize())


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js",
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
    'https://unpkg.com/ionicons@5.5.2/dist/ionicons/p-e26ac56f.js',
   ' https://fonts.google.com/',
  ' https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/'
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net", 
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
    'https://fonts.google.com/',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/',
    

];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://cdn.jsdelivr.net",
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
    "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
    'https://fonts.google.com/',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/'
   
    
];
const fontSrcUrls = ['https://fonts.google.com/',
'https://fonts.gstatic.com',
'https://unpkg.com/aks-fonts@1.0.0/Product-Sans/Product-Sans-Bold-italic.ttf',
'https://unpkg.com/aks-fonts@1.0.0/Product-Sans/Product-Sans-Bold.ttf',
'https://unpkg.com/aks-fonts@1.0.0/Product-Sans/Product-Sans-Regular.ttf',
'https://unpkg.com/aks-fonts@1.0.0/Product-Sans/Product-Sans-italic.ttf'


];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dcwpxxcd9/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

require('./utills/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Localpassport(LocalUser.authenticate()))
passport.use(new Localpassport(Admin.authenticate()))
passport.serializeUser(LocalUser.serializeUser());
passport.deserializeUser(LocalUser.deserializeUser());
passport.serializeUser(Admin.serializeUser(function(user, cb) {
    process.nextTick(function() {
        
      cb(null, { id: user.id, username: user.username, role: user.role });
    });
  }));
passport.deserializeUser(Admin.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  }));



app.use((req,res,next)=>{
    if(!["/login","/register","/favicon.ico","/google"].includes(req.originalUrl)){
        
        
        req.session.returnTo=req.originalUrl
 
    }
    
    res.locals.currentUser=req.user
   
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next()
})
//--------------------------------------------------//

app.use('/',main)
app.use('/admin',admin,)
app.use('/',register)
app.use('/user',UserRoutes)



//----------------------------------------------------------//

app.all('*',(req,res,next)=>{
    next(new ExpressError("Somethin went wrong",404))
})
app.use((err,req,res,next)=>{
    const{statusCode=500,message='Something went wrong'}=err
    if(err.statusCode==404){
        res.render("error404")
    }else{
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render("error",{err})}
})
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Connected to ${port}`)
})
