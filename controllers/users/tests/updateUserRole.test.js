const { updateUserRole } = require('../updateUserRole.js');
const { updateItem } = require('../../../middlewares/mongo/updateItem.js');
const { handleError } = require('../../../middlewares/handleError.js');
const User = require('../../../models/user.js');

jest.mock('../../../middlewares/mongo/updateItem.js');
jest.mock('../../../middlewares/handleError.js');

describe('updateUserRole', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update user role', async () => {
        const req = {
            body: {
                roles: ['admin'],
            },
            params: {
                id: '12345',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        updateItem.mockResolvedValueOnce({ roles: ['admin'] });

        await updateUserRole(req, res);

        expect(updateItem).toHaveBeenCalledWith(
            req.params.id,
            User,
            { roles: req.body.roles }
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ roles: ['admin'] });
        expect(handleError).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
        const req = {
            body: {
                roles: ['admin'],
            },
            params: {
                id: '12345',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const error = new Error('Something went wrong');
        updateItem.mockRejectedValueOnce(error);

        await updateUserRole(req, res);

        expect(updateItem).toHaveBeenCalledWith(
            req.params.id,
            User,
            { roles: req.body.roles }
        );

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(handleError).toHaveBeenCalledWith(res, error);
    });
});