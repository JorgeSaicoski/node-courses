const getAllRoles = require('../.');


describe('getAllRoles', () => {
    it('should retrieve all roles from the database', async () => {
        // Call the getAllRoles function
        const roles = await getAllRoles();

        // Assert that the roles array contains objects with "id" and "name" properties
        roles.forEach(role => {
            expect(role).toHaveProperty('id');
            expect(role).toHaveProperty('name');
        });
    });
    it('should return an empty array if the database is empty', async () => {
        // Create a fake database with no data
        const emptyDatabase = {
            db: jest.fn().mockReturnValue({
                collection: jest.fn().mockReturnValue({
                    find: jest.fn().mockReturnValue({
                        toArray: jest.fn().mockResolvedValue([]),
                    }),
                }),
            }),
        };

        // Call the getAllRoles function with the fake database
        const roles = await getAllRoles(emptyDatabase);

        // Assert that the roles array is empty
        expect(roles).toEqual([]);
    });
});