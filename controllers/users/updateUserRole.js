const User = require('../../models/user')
const { updateItem } = require('../../middlewares/mongo')
const {handleError} = require("../../middlewares");

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUserRole = async (req, res) => {
    try {
        const data = req.body
        const roles = data.roles
        const {id} = req.params
        const result = await updateItem(id, User, {roles:roles})
        res.status(200).json(result)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateUserRole }