const userModel = require("../models/user-model")
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","you need to login first")
        return res.redirect("/")
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = userModel
            .findOne({email:decoded.email})
            .select("-password")

        req.user = user;

        
        next();
    } catch (error) {
        req.flash("error","Something went wrong!")
        res.redirect("/")
    }
}