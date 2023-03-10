const express = require('express')
const {getUserByID} = require("../controllers/users/getUserByID");
const router = express.Router()


router.get(
    "/id/:id",
    getUserByID
)






module.exports = router