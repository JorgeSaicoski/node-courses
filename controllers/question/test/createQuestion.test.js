const { createQuestion } = require('../createQuestion');
const { createItem } = require('../../../middlewares/mongo/createItem.js');
const Question = require('../../../models/question');

jest.mock('../../../middlewares/mongo/createItem.js');

describe('createQuestion', () => {
    test('returns a new question when user is admin', async () => {
        const req = { body: { title: 'Test Question' }, user: { role: 'admin' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const expectedQuestion = { _id: 'abc123', title: 'Test Question' };

        createItem.mockResolvedValue(expectedQuestion);

        await createQuestion(req, res);

        expect(createItem).toHaveBeenCalledWith(req.body, Question);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedQuestion);
    });

    test('returns 403 error when user is not admin', async () => {
        const req = { body: { title: 'Test Question' }, user: { role: 'user' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const expectedError = { error: 'You do not have permission to create questions.' };

        await createQuestion(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(expectedError);
    });

    test('returns 500 error when there is an error creating the question', async () => {
        const req = { body: { title: 'Test Question' }, user: { role: 'admin' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const expectedError = { error: 'Failed to create item.' };

        createItem.mockRejectedValue(new Error('Failed to create question'));

        await createQuestion(req, res);

        expect(createItem).toHaveBeenCalledWith(req.body, Question);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expectedError);
    });
});