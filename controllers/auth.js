const User = require("../models/user")
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken")



const signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ status: 'error', message:  errorHandler(err) })
        }

        user.salt = undefined
        user.hashed_password = undefined
        user.__v = undefined

        res.json({
            status: 'success',
            user
        })
    })
}

const signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                status: 'error',
                message: "User with that email does not exists. Please signup"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                status: "Error",
                message: "Email and Password do not match"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.cookie('t', token, { expire: new Date() + 9999 })
        const { _id, name, email, role } = user
        return res.json({
            status: 'success',
            token,
            user: {
                _id,
                email,
                name,
                role,
            }
        })
    })
}

const signout = (req, res, next) => {
    res.clearCookie('t')
    res.json({
        status: 'success',
        message: 'User Signed out Successfully'
    })
}

module.exports = {
    signup,
    signin,
    signout
}