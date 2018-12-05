const connection = require("../database/connection.js");
// Get all queries needed for a user
const sql = "select dashboard_id, query_id, visualization_type, query.name as name, query_json from dashboard " +
"join dashboard_to_query using (dashboard_id) " +
"join query using (query_id) ";

module.exports = (req, res) => {
  const { user_id } = req.body;
  connection.query(sql + `where user_id = ${user_id}` , function (error, results, fields) {
    if (!error && results !== null) {
      res.end(results);
    } else {
      res.statusCode = 400;
      res.end();
    }
  });
}
