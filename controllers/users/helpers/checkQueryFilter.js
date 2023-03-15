const { buildErrObject } = require('../../../middlewares')

/**
 * Checks the query request for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 */
const checkQueryFilter = (query = {}) => {
    return new Promise((resolve, reject) => {
        try {
            const lookupUser = {
                from: 'usuarios',
                localField: 'user',
                foreignField: '_id',
                as: 'userLookup'
            }
            const match = {
                $and: []
            }
            if (query.term && typeof query.term !== 'undefined') {
                const term = query.term.replace(/[&\/\\#^+()$~%.'":*?<>{}!@-]/g, '')
                match.$and.push({
                    $or: [
                        { 'userLookup.name': { $regex: new RegExp(term, 'i') } },
                        { 'userLookup.username': { $regex: new RegExp(term, 'i') } },
                        { 'userLookup.email': { $regex: new RegExp(term, 'i') } }
                    ]
                })
            }
            if (query.role) {
                match.$and.push({ 'userLookup.role': { $eq: query.role } })
            }
            if (query.ip) {
                match.$and.push({ ip: { $regex: new RegExp(query.ip, 'i') } })
            }
            let matchFecha = {}
            match.$and.push(matchFecha)
            resolve([
                {
                    $lookup: lookupUser
                },
                {
                    $match: match
                },
                {
                    $unset: 'userLookup'
                }
            ])
        } catch (err) {
            console.log(err.message)
            reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
        }
    })
}

module.exports = { checkQueryFilter }