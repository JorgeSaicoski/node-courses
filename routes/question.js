const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const {createQuestion} = require("../controllers/question");
const passport = require("../middlewares/passport");

// Route to create a new question
router.post('/', passport.authenticate('jwt', { session: false }),createQuestion);

// Route to get all questions
router.get('/', (req, res) => {
    Question.find((err, questions) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to get questions.' });
        }
        res.json(questions);
    });
});

// Route to get a specific question by ID
router.get('/:id', (req, res) => {
    Question.findById(req.params.id, (err, question) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to get question.' });
        }
        res.json(question);
    });
});

// Route to update a specific question by ID
router.put('/:id', (req, res) => {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'You do not have permission to update questions.' });
    }

    // Update the question
    Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, question) => {
            if (err) {
                return res.status(400).json({ error: 'Failed to update question.' });
            }
            res.json(question);
        }
    );
});

// Route to delete a specific question by ID
router.delete('/:id', (req, res) => {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'You do not have permission to delete questions.' });
    }

    // Delete the question
    Question.findByIdAndDelete(req.params.id, (err, question) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to delete question.' });
        }
        res.json({ message: 'Question deleted successfully.' });
    });
});

module.exports = router;