const {updateItem, getItem} = require("../../middlewares/mongo");
const User = require("../../models/user.js");
const {handleError} = require("../../middlewares/index.js");
const Question = require("../../models/question.js");
const associateQuestionsAnswered = async (req, res) => {
    try {
        let err = null
        let data = req.body
        let questionsAnswered = data.questionsAnswered
        let userThatAnswer = await getItem(data.user._id, User)
        if (!Array.isArray(questionsAnswered) || questionsAnswered.length < 1) {
            err = "QuestionsAnswered must be in a list"
        } else {
            for (let i = 0; i < questionsAnswered.length; i++) {
                if (questionsAnswered[i]&&questionsAnswered[i].question&&questionsAnswered[i].question._id){
                    const questionToCheck = await getItem(questionsAnswered[i].question._id, Question)
                    questionsAnswered[i].isCorrect = questionToCheck.correctOption === questionsAnswered[i].optionsSelected
                    userThatAnswer.questionsAnswered.push(questionsAnswered[i])
                }else if (questionsAnswered[i].question){
                    err = "Question must contain an ID"
                }
            }
        }


        if (err){
            return res.status(400).json({ error: err });
        }else{
            const result = await updateItem(userThatAnswer._id, User, userThatAnswer)
            res.status(200).json(result)

        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { associateQuestionsAnswered }