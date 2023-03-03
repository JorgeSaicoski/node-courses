
const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middlewares')


const registerUser = (req = {}) => {
    return new Promise((resolve, reject) => {
        const user = new User({
            username: req.username,
            name: req.name,
            email: req.email,
            password: req.password,
            role: req.role,
            verification: uuid.v4()
        })
        user.save((err, item) => {
            if (err) {
                reject(buildErrObject(422, err.message))
            }
            resolve(item)
        })
    })
}

module.exports = { registerUser }