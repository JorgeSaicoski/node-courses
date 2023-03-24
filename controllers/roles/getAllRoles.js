const Role = require("../../models/role")
const {getItems} = require("../../middlewares/mongo");
const {handleError} = require("../../middlewares");

const getAllRoles = async (req,res)=>{
    try{
        res.status(200).json(await getItems({},Role))
    } catch (err){
        handleError(res, err)
    }
}
module.exports = {getAllRoles}