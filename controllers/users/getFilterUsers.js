const User = require('../../models/user')
const {
    cleanPaginationID,
    listInitOptionsAggregate
} = require('../../middlewares/mongo')
const {
    handleError,
    buildErrObject
} = require('../../middlewares')
const { checkQueryFilter } = require('./helpers/checkQueryFilter')
const jwt_decode = require('jwt-decode')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getFilterUsers = async (req, res) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    console.log(req.headers)
    const decoded = jwt_decode(authHeader)

    console.log(decoded);

    try {
        const options = await listInitOptionsAggregate(req)
        let data = req.body
        const query = await checkQueryFilter(data)
        const populate = [
        ]
        const aggregate = User.aggregate(query)
        let result = await new Promise((resolve, reject) => {
            User.aggregatePaginate(aggregate, options, (err, items) => {
                if (err) {
                    return reject(buildErrObject(422, err.message))
                }
                resolve(cleanPaginationID(items))
            })
        })
        result.docs = await User.populate(result.docs, populate)
        res.status(200).json(result)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getFilterUsers }
