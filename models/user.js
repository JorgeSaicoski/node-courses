

const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')


const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            default: null
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        questionsAnswered:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'QuestionAnswered'
            },
        ],
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        createdAt: {
            type: Date,
            default: Date.now
        },
        password: {
            type: String,
            required: true,
        }

    },
    { collection: 'user-data'}
);
const hash = (user, salt, next) => {
    bcrypt.hash(user.password, salt, (error, newHash) => {
        if (error) {
            return next(error)
        }
        user.password = newHash
        return next()
    })
}

const genSalt = (user, SALT_FACTOR, next) => {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        }
        return hash(user, salt, next)
    })
}

UserSchema.pre('save', function (next) {
    const that = this
    const SALT_FACTOR = 5
    if (!that.isModified('password')) {
        return next()
    }
    return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
        err ? cb(err) : cb(null, isMatch)
    )
}

UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('User', UserSchema);
