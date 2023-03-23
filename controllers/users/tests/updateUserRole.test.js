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
                roles: [
                    {
                        _id: "d1232df",
                        name: "admin"
                    }
                ],
            },
            params: {
                id: '12345',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        updateItem.mockResolvedValueOnce({ roles: [
                {
                    _id: "d1232df",
                    name: "admin"
                }
            ] });

        await updateUserRole(req, res);

        expect(updateItem).toHaveBeenCalledWith(
            req.params.id,
            User,
            { roles: req.body.roles }
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ roles: [
                {
                    _id: "d1232df",
                    name: "admin"
                }
            ] });
        expect(handleError).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
        const req = {
            body: {
                roles: [
                    {
                        _id: "d1232df",
                        name: "admin"
                    }
                ],
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

    it('should handle bad req with no role id', async () => {
        const req = {
            body: {
                roles: [{ name: "admin" }],
            },
            params: {
                id: '12345',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateUserRole(req, res);

        expect(updateItem).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Roles must contain an ID" });
        expect(handleError).not.toHaveBeenCalled();
    });

    it('should handle bad req with roles not in a list', async () => {
        const req = {
            body: {
                roles: {
                    _id: "d1232df",
                    name: "admin"
                },
            },
            params: {
                id: '12345',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await updateUserRole(req, res);

        expect(updateItem).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Roles must be in a list" });
        expect(handleError).not.toHaveBeenCalled();
    });
});