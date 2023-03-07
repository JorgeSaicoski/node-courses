const UserAccess = require('../../../models/userAccess')
const { setUserInfo } = require('./setUserInfo')
const { generateToken } = require('./generateToken')
const requestIp = require('request-ip')
const getBrowserInfo = ({ headers }) => headers['user-agent']
const getCountry = ({ headers }) => headers['cf-ipcountry'] ? headers['cf-ipcountry'] : 'XX'
const {buildErrObject} = require('../../../middlewares')


const saveUserAccessAndReturnToken = (req = {}, user = {}) => {
    return new Promise((resolve, reject) => {
        const userAccess = new UserAccess({
            email: user.email,
            username: user.username,
            ip: requestIp.getClientIp(req),
            browser: getBrowserInfo(req),
            country: getCountry(req)
        })
        userAccess.save(async (err) => {
            try {
                if (err) {
                    return reject(buildErrObject(422, err.message))
                }
                const userInfo = await setUserInfo(user)
                // Returns data with access token
                resolve({
                    token: generateToken(user._id),
                    user: userInfo
                })
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { saveUserAccessAndReturnToken }