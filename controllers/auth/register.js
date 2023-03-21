const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')

const {
    handleError,
} = require('../../middlewares')



const register = async (req, res) => {
    console.log("register")
    console.log(req.body)
    try {
        const data = req.body
        const item = await registerUser(data)
        const userInfo = await setUserInfo(item)
        const response = await returnRegisterToken(item, userInfo)
        res.status(201).json(response)

    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { register }