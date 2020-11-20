const express = require("express")
const router = express.Router()

const { signup, signin, signout} = require("../controllers/auth")
const { requireSignin, isA } = require("../middlewares")
const { userSignupValidator, userSigninValidator } = require("../validator")

router.post('/signup', userSignupValidator, signup)
router.post('/signin', userSigninValidator, signin)
router.get('/signout',  signout)

router.get('/hello', requireSignin,  (req, res) => {
    res.send("Hello")
})


module.exports = router