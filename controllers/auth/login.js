const {
    findUser,
    checkPassword,
    passwordsDoNotMatch,
    saveUserAccessAndReturnToken
} = require("./helpers")

const {handleError} = require("../../middlewares")

const login = async (req, res) => {
    try {
        const data = req.body
        let user = await findUser(data.username)

        const isPasswordMatch = await checkPassword(data.password, user)
        if (!isPasswordMatch) {
            handleError(res, await passwordsDoNotMatch(user))
        } else {
            // all ok, register access and return token
            user.loginAttempts = 0
            res.status(200).json(await saveUserAccessAndReturnToken(req, user))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = {login}


