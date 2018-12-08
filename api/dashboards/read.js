const connection = require('../database/connection.js')
// Get all dashboards for a user.
// This will be the way we use this endpoint because
// a user should see all their dashboards after they log in
// and once they're loaded on the front end we'll most likely
// save the data there and use it, so we won't need to query
// for a specific dashboard.
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth'
  )

  const { id } = url.parse(req.url, true).query
  console.log(`id: ${id}`)
  connection.query(
    `select * from dashboard where user_id = ${user_id}`,
    function(error, results, fields) {
      if (!error && results !== null) {
        res.end(results)
      } else {
        res.statusCode = 400
        res.end()
      }
    }
  )
}
