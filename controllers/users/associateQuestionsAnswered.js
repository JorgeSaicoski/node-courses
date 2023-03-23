const {updateItem, getItem} = require("../../middlewares/mongo");
const User = require("../../models/user.js");
const {handleError} = require("../../middlewares/index.js");
const Question = require("../../models/question.js");
const associateQuestionsAnswered = async (req, res) => {
    try {
        let err
        const data = req.body
        const questionsAnswered = data.questionsAnswered
        let userThatAnswer = await getItem(data.user._id, User)
        if (!Array.isArray(questionsAnswered) || questionsAnswered.length < 1) {
            err = "QuestionsAnswered must be in a list"
        } else {
            for (const question of questionsAnswered) {
                if (!question.question._id) {
                    err = "Question must contain an ID"
                } else {
                    const questionToCheck = await getItem(question.question._id, Question)
                    question.isCorrect = questionToCheck.correctOption === question.optionsSelected
                }
            }
        }



        if (err){
            return res.status(400).json({ error: err });
        }else{
            userThatAnswer.questionsAnswered = userThatAnswer.questionsAnswered.concat(questionsAnswered.filter(item => !userThatAnswer.questionsAnswered.includes(item)))
            const result = await updateItem(userThatAnswer._id, User, userThatAnswer)
            res.status(200).json(result)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { associateQuestionsAnswered }