const express = require('express')
const {getUserByID} = require("../controllers/users/getUserByID");
const {getFilterUsers} = require("../controllers/users/getFilterUsers");
const router = express.Router()


router.get(
    "/id/:id",
    getUserByID
)

router.post(
    '/filter',
    getFilterUsers
)




module.exports = router