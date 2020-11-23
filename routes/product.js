const express = require("express")
const router = express.Router()

const { create, read, update, remove } = require("../controllers/product")
const { requireSignin, isAdmin, isAuth, userById, productById } = require("../middlewares")

router.get("/product/:productId", read)
router.post(
    "/product/create/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    create
)
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    // isAuth,
    // isAdmin,
    remove
)

router.patch(
    "/product/:productId/:userId",
    requireSignin,
    // isAuth,
    // isAdmin,
    update
)

router.param("userId", userById)
router.param("productId", productById)

module.exports = router