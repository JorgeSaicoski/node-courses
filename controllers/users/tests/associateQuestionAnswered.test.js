const {associateQuestionsAnswered} = require("../associateQuestionsAnswered.js");
const User = require("../../../models/user.js");
const {handleError} = require("../../../middlewares/handleError.js");
const {getItem, updateItem} = require("../../../middlewares/mongo/index.js");

describe('associateQuestionsAnswered', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a question answered to the user', async () => {
        const req = {
            body: {
                questionsAnswered: [
                    {
                        question: {
                            _id:"555666"
                        },
                        user: {
                            _id: "132456"
                        },
                        optionsSelected: "a",
                    },
                ],
                user: {
                    _id: "132456"
                }
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        getItem.mockResolvedValueOnce({
            title:"title",
            description: "description",
            options: [
                "a","b","c","d","e"
            ],
            correctOption: "a"
        })

        updateItem.mockResolvedValueOnce({ roles: [
                {
                    _id: "d1232df",
                    name: "admin"
                }
            ] });

        await updateUserRole(req, res);

        expect(updateItem).toHaveBeenCalledWith(
            req.body.user._id,
            User,
            { questionsAnswered: req.body.questionsAnswered }
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ questionsAnswered: [
                {
                    question: {
                        _id:"555666"
                    },
                    user: {
                        _id: "132456"
                    },
                    optionsSelected: "a",
                    isCorrect: true
                },
            ] })
        expect(handleError).not.toHaveBeenCalled();
    });
    it('should return isCorrect as false if answer is wrong', async () => {
        const req = {
            body: {
                questionsAnswered: [
                    {
                        question: {
                            _id: "555666"
                        },
                        user: {
                            _id: "132456"
                        },
                        optionsSelected: "b", // set incorrect answer
                    },
                ],
                user: {
                    _id: "132456"
                }
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        getItem.mockResolvedValueOnce({
            title: "title",
            description: "description",
            options: [
                "a", "b", "c", "d", "e"
            ],
            correctOption: "a"
        });

        updateItem.mockResolvedValueOnce({
            roles: [{
                _id: "d1232df",
                name: "admin"
            }]
        });

        await associateQuestionsAnswered(req, res);

        expect(updateItem).toHaveBeenCalledWith(
            req.body.user._id,
            User,
            {
                questionsAnswered: [{
                    question: {
                        _id: "555666"
                    },
                    user: {
                        _id: "132456"
                    },
                    optionsSelected: "b",
                    isCorrect: false // expect isCorrect to be false
                }]
            }
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            questionsAnswered: [{
                question: {
                    _id: "555666"
                },
                user: {
                    _id: "132456"
                },
                optionsSelected: "b",
                isCorrect: false
            }]
        });
        expect(handleError).not.toHaveBeenCalled();
    });
});