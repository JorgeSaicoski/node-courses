
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
        },
        courses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        password: {
            type: String,
            required: true,
        }
    },
    { collection: 'user-data'}
);

module.exports = mongoose.model('User', UserSchema);