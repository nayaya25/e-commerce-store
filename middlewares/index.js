const expressJwt = require("express-jwt")
const User = require("../models/user")

const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    requestProperty: "auth"
})

const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                status: 'error',
                message: "User Not Found"
            })
        }
        const {_id, name, email, role} = user
        req.profile = {_id, name, email, role};
        next();
    })
}

const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        res.status(400).json({
            status: 'warning',
            message: "Access Denied"
        })
    } 

    next()
}

const isAdmin = (req, res, next) => {
    if(req.profile.role == 0){
        res.status(403).json({
            status: 'warning',
            message: "Admin Resources! Access Denied"
        })
    }

    next()
}

module.exports = {
    isAdmin,
    isAuth,
    userById,
    requireSignin,
}