const isAdmin=require('../utills/isAdmin')
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()|| !isAdmin) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}