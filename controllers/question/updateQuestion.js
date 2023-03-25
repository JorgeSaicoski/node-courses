const {updateItem} = require("../../middlewares/mongo/index.js");
const Question = require("../../models/question.js");
const {handleError} = require("../../middlewares");
const updateQuestion = async (req, res) => {
    try {
        let err
        const data = req.body
        const {id} = req.params
        if (err){
            return res.status(400).json({ error: err });
        }else{
            const result = await updateItem(id, Question, data)
            res.status(200).json(result)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateQuestion }