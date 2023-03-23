const User = require('../../models/user')
const { getItem } = require('../../middlewares/mongo')
const {handleError} = require("../../middlewares");


const getUserByID = async (req, res) => {
    try {
        const {id} = req.params
        const user = await getItem(id, User)
        if (!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserByID }