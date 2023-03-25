const {updateItem} = require("../../middlewares/mongo/index.js");
const Role = require("../../models/role.js");
const {handleError} = require("../../middlewares/index.js");
const updateRole = async (req, res) => {
    try {
        let err
        const data = req.body
        const {id} = req.params
        if (err){
            return res.status(400).json({ error: err });
        }else{
            const result = await updateItem(id, Role, data)
            res.status(200).json(result)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateRole }