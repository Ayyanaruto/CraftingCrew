function isAdmin(req, res, next) {
    if (req.isAuthenticated() && (req.user.id == `${process.env.ADMIN}`)) {
        return next();

    }

    res.redirect('/admin/login')
}
module.exports=isAdmin