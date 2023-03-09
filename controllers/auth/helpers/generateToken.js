const jwt = require('jsonwebtoken')


/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user = '') => {
    try {
        // Gets expiration time
        const expiration =
            Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

        // returns signed and encrypted token
        return (
            jwt.sign(
                {
                    data: {
                        _id: user._id
                    },
                    exp: expiration
                },
                process.env.SECRET
            )
        )
    } catch (error) {
        throw error
    }
}

module.exports = { generateToken }