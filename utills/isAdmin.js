function isAdmin(req, res, next) {
    if (req.isAuthenticated() && (req.user.id == `${process.env.ADMIN}`)) {
        return next();

    }else{

    res.redirect('/')}
}
module.exports=isAdmin