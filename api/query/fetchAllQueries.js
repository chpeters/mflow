const connection = require('../database/connection.js')
const url = require('url')
// Get all queries needed for a user
const sql =
  'select dashboard_id, query_id, visualization_type, query.name as name, query_json from dashboard ' +
  'join dashboard_to_query using (dashboard_id) ' +
  'join query using (query_id) '

module.exports = (req, res) => {
  const { id } = url.parse(req.url, true).query
  connection.query(
    sql + `where dashboard_id = ${id}`,
    (error, results, fields) => {
      if (!error && results !== null) {
        res.end(results)
      } else {
        res.statusCode = 400
        res.end()
      }
    }
  )
}
