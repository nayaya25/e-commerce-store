const express = require("express")
const router = express.Router()

const { create } = require("../controllers/category")
const { requireSignin, isAdmin, isAuth, userById } = require("../middlewares")
const { categoryCreateValidation } = require("../validator")

router.get(
    "/category/create/:userId",
    requireSignin,
    categoryCreateValidation,
    isAuth,
    isAdmin,
    create
)
router.param("userId", userById)

module.exports = router