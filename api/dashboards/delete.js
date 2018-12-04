const connection = require("../database/connection.js");
// Delete a dashboard.
// Loading a dashboard on the front end will retrieve it's dashboard_id,
// so we can expect this as the argument here and is a sure way to
// delete the right entry
module.exports = (req, res) => {
  const { dashboard_id } = req.body;
  connection.query(`delete from dashboard where dashboard_id = ${dashboard_id}`, function (error, results, fields) {
    if (error || results.affectedRows !== 1) {
      res.statusCode = 400;
    }
    res.end();
  });
}
