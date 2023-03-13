const { buildErrObject } = require('../.')
const { buildSort } = require('./buildSort')

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptionsAggregate = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = req.query.order || -1
      const sort = req.query.sort || 'createdAt'
      const sortBy = buildSort(sort, order)
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 5
      const options = {
        sort: sortBy,
        page,
        limit
      }
      resolve(options)
    } catch (error) {
      console.log(error.message)
      reject(buildErrObject(422, 'ERROR_WITH_INIT_OPTIONS'))
    }
  })
}

module.exports = { listInitOptionsAggregate }
