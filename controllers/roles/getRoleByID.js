const Role = require('../../models/role')
const { getItem } = require('../../middlewares/mongo')
const {handleError} = require("../../middlewares");


const getRoleByID = async (req, res) => {
    try {
        const {id} = req.params
        const role = await getItem(id, Role)
        if (!role){
            return res.status(404).json({message: "Role not found"})
        } else{
            return res.status(200).json(role)
        }

    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getRoleByID }