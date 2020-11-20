const express = require("express")
const router = express.Router()

const { create } = require("../controllers/product")
const { requireSignin, isAdmin, isAuth, userById } = require("../middlewares")
const { categoryCreateValidation } = require("../validator")

router.post(
    "/product/create/:userId",
    requireSignin,
    isAuth,
    // isAdmin,
    create
)
router.param("userId", userById)

module.exports = router