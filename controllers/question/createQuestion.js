const Question = require("../../models/question");
const {createItem} = require("../../middlewares/mongo");

const createQuestion = async (req, res) => {
    try {
        const data = req.body
        console.log(req.user)

        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'You do not have permission to create questions.'});
        }
        const newQuestion = await createItem(data, Question)
        return res.status(201).json(newQuestion);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create item.' });
    }


};

module.exports = { createQuestion }