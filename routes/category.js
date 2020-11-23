const express = require("express")
const router = express.Router()

const { create, read, update, remove, list } = require("../controllers/category")
const { requireSignin, isAdmin, isAuth, userById, categoryById } = require("../middlewares")
const { categoryCreateValidation } = require("../validator")

router.get(
    "/category/create/:userId",
    requireSignin,
    categoryCreateValidation,
    isAuth,
    isAdmin,
    create
)
router.get(
    "/category/:categoryId",
    requireSignin,
    read
)
router.put(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
)
router.delete(
    "/category/categoryId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
)

router.get(
    "/categories",
    requireSignin,
    list
)

router.param("userId", userById)
router.param("categoryId", categoryById)


module.exports = router