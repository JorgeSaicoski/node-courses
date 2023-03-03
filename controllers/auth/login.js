const {
    findUser,
    checkPassword,
    passwordsDoNotMatch,
    saveUserAccessAndReturnToken
} = require("./helpers")

const {handleError} = require("../../middlewares")

const login = async (req, res) => {
    console.log("login")
    console.log(req.body)
    try {
        const data = req.body
        console.log(data.email)
        let user = await findUser(data.email)

        const isPasswordMatch = await checkPassword(data.password, user)
        if (!isPasswordMatch) {
            handleError(res, await passwordsDoNotMatch(user))
        } else {
            // all ok, register access and return token
            res.status(200).json(await saveUserAccessAndReturnToken(req, user))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = {login}


