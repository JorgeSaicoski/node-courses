const { generateToken } = require('./generateToken')


const returnRegisterToken = (
    { _id = '', verification = '' },
    userInfo = {}
) => {
    return new Promise((resolve) => {
        if (process.env.NODE_ENV !== 'production') {
            userInfo.verification = verification
        }
        const data = {
            token: generateToken(_id),
            user: userInfo
        }
        resolve(data)
    })
}

module.exports = { returnRegisterToken }