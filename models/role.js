const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    { collection: 'user-data'}
);

module.exports = mongoose.model('Role', RoleSchema);