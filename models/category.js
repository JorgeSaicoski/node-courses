const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
    ],
});

const Question = mongoose.model('Category', categorySchema);

module.exports = Question;