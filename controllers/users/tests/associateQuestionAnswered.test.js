const { associateQuestionsAnswered } = require('../associateQuestionsAnswered');
const { getItem, updateItem } = require('../../../middlewares/mongo');
const User = require('../../../models/user');
const Question = require('../../../models/question');
const { handleError } = require('../../../middlewares/handleError');

jest.mock('../../../middlewares/mongo');
jest.mock('../../../middlewares');
jest.mock('../../../models/user');
jest.mock('../../../models/question');

describe('associateQuestionsAnswered', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error if questionsAnswered is not an array or is empty', async () => {
        const req = {
            body: {
                user: {
                    _id: 'user123',
                },
                questionsAnswered: null,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await associateQuestionsAnswered(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'QuestionsAnswered must be in a list' });
    });

    it('should return an error if any question in questionsAnswered does not have an ID', async () => {
        const req = {
            body: {
                user: {
                    _id: 'user123',
                },
                questionsAnswered: [
                    { question: {} },
                ],
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await associateQuestionsAnswered(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Question must contain an ID' });
    });


    it('should call handleError if an error occurs', async () => {
        const req = { body: { user: { _id: 'user_id' }, questionsAnswered: [{ question: { _id: 'question_id' }, optionsSelected: 1 }] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        const error = new Error('Something went wrong');
        getItem.mockRejectedValueOnce(error);
        getItem.mockRejectedValueOnce(error);
        updateItem.mockRejectedValueOnce(error);

        await associateQuestionsAnswered(req, res);



        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
    it('should create an AnsweredQuestion with isCorrect as true if the answer is correct', async () => {
        const req = {
            body: {
                user: { _id: 'userId' },
                questionsAnswered: [{ question: { _id: 'questionId' }, optionsSelected: 'option1' }]
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const user = { _id: 'userId', questionsAnswered: [] };
        const question = { _id: 'questionId', correctOption: 'option1' };
        const answeredQuestion = { question: { _id: 'questionId' }, optionsSelected: 'option1', isCorrect: true };
        const newUser = { _id: 'userId', questionsAnswered: [answeredQuestion] };
        let err = null

        getItem.mockResolvedValueOnce(question);
        User.mockResolvedValueOnce(user);
        Question.mockReturnValueOnce(question);
        updateItem.mockResolvedValueOnce(user);

        await associateQuestionsAnswered(req, res);

        expect(err).toBeNull();
        expect(getItem).toHaveBeenCalledWith(answeredQuestion.question._id, Question)
        expect(updateItem).toHaveBeenCalledWith(user._id, User, newUser);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
        expect(handleError).not.toHaveBeenCalled();
    });

    it('should create an AnsweredQuestion with isCorrect as false if the answer is wrong', async () => {
        const req = {
            body: {
                user: { _id: 'userId' },
                questionsAnswered: [{ question: { _id: 'questionId' }, optionsSelected: 'option1' }]
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const user = { _id: 'userId', questionsAnswered: [] };
        const question = { _id: 'questionId', correctOption: 'option2' };
        const answeredQuestion = { question: { _id: 'questionId' }, optionsSelected: 'option1', isCorrect: false };
        const newUser = { _id: 'userId', questionsAnswered: [answeredQuestion] };
        let err = null

        getItem.mockResolvedValueOnce(question);
        User.mockResolvedValueOnce(user);
        Question.mockReturnValueOnce(question);
        updateItem.mockResolvedValueOnce(user);

        await associateQuestionsAnswered(req, res);

        expect(err).toBeNull();
        expect(getItem).toHaveBeenCalledWith(answeredQuestion.question._id, Question)
        expect(updateItem).toHaveBeenCalledWith(user._id, User, newUser);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
        expect(handleError).not.toHaveBeenCalled();
    });


});