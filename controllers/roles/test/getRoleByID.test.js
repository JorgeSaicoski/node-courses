const { getRoleByID } = require("../.");
const Role = require("../../../models");

describe("getRoleByID", () => {
    test("should return a role with the specified ID", async () => {
        const mockRole = new Role({
            name: "Test Role",
        });

        await mockRole.save();

        const req = {
            params: {
                id: mockRole._id,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getRoleByID(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRole);
    });

    test("should return a 404 error if role is not found", async () => {
        const req = {
            params: {
                id: "nonexistent_id",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getRoleByID(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Role not found" });
    });
});