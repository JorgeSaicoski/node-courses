const User = require('../../models/user')
const { updateItem } = require('../../middlewares/mongo')
const {handleError} = require("../../middlewares");


const updateUserRole = async (req, res) => {
    try {
        let err
        const data = req.body
        const roles = data.roles
        const {id} = req.params
        if (!Array.isArray(roles) || roles.length < 1) {
            err = "Roles must be in a list"
        }else{
            roles.forEach((role)=>{
                if (!role._id){
                    err = "Roles must contain an ID"

                }
            })
        }

        if (err){
            return res.status(400).json({ error: err });
        }else{
            const result = await updateItem(id, User, {roles:roles})
            res.status(200).json(result)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateUserRole }