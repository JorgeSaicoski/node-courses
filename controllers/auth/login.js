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
        console.log(data.email)
        let user = await findUser(data.email)

        const isPasswordMatch = await checkPassword(data.password, user)
        if (!isPasswordMatch) {
            handleError(res, await passwordsDoNotMatch(user))
        } else {
            console.log(user)
            const response = await saveUserAccessAndReturnToken(req, user)
            console.log(response)
            res.status(200).json(response)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = {login}


