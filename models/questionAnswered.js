const mongoose = require("mongoose")

const QuestionAnsweredSchema = new mongoose.Schema({
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        optionsSelected: String,
        isCorrect: Boolean
    },
);

module.exports = mongoose.model('QuestionAnswered', QuestionAnsweredSchema);