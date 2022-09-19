const session=require('express-session')
const MongoStore=require("connect-mongo")
const secret = process.env.SESSION_SECRET || 'thisshouldbeabettersecret!';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/CraftinCrew';
const store =MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
});
store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})
const sessionConfig={
    store,
    name:'narut',
    secret,
    resave:false,
    savUinitialized:true,
    cookie:{
        httpOnly:true,
        // secure:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        
        
        
     
    }
}
module.exports=sessionConfig