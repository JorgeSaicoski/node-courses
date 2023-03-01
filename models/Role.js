const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    { collection: 'user-data'}
);

module.exports = mongoose.model('User', UserSchema);