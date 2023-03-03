const { findUser } = require('./findUser')
const { generateToken } = require('./generateToken')
const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const {
    saveUserAccessAndReturnToken
} = require('./saveUserAccessAndReturnToken')
const { setUserInfo } = require('./setUserInfo')
const {checkPassword} = require("./checkPassword");


module.exports = {
    checkPassword,
    findUser,
    generateToken,
    passwordsDoNotMatch,
    saveUserAccessAndReturnToken,
    setUserInfo,
}