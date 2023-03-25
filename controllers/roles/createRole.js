const {createItem} = require("../../middlewares/mongo/index.js");
const Role = require("../../models/role.js");
const createRole = async (req, res) => {
    try {
        const data = req.body
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'You do not have permission to create roles.'});
        }
        const newRole = await createItem(data, Role)
        return res.status(201).json(newRole);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to create item.' });
    }


};

module.exports = { createRole }