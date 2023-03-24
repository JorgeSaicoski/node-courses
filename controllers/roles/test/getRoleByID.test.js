const { getRoleByID } = require("../.");
const Role = require("../../../models")
const {getItem} = require("../../../middlewares/mongo");
jest.mock('../../../middlewares/mongo/getItem.js');


describe("getRoleByID", () => {
    test("should return a role with the specified ID", async () => {

        const mockRole = {
            _id: "51688416",
            name: "role"
        }
        const req = {
            params: {
                id: mockRole._id,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        getItem.mockReturnValue(
            mockRole
        )

        await getRoleByID(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRole);
    });

    test("should return a 404 error if role is not found", async () => {

        const mockRole = {
            _id: "51688416",
            name: "role"
        }
        const req = {
            params: {
                id: mockRole._id,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        getItem.mockReturnValue(
            null
        )

        await getRoleByID(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Role not found" });
    });
});