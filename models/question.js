const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOption: {
        type: Number,
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;