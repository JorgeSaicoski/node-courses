const express = require('express')
const {getUserByID} = require("../controllers/users/getUserByID");
const {getFilterUsers} = require("../controllers/users/getFilterUsers");
const router = express.Router()
const {isAdmin} = require("../middlewares/authJwt")


router.get(
    "/id/:id",
    getUserByID
)

router.post(
    '/filter',
    isAdmin,
    getFilterUsers
)




module.exports = router