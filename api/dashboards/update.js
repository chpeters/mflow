const connection = require("../database/connection.js");

module.exports = (req, res) => {
  const { name, dashboard_id } = req.body;
  connection.query(`update dashboard set name = "${name}" where dashboard_id = ${dashboard_id}`,
    function (error, results, fields) {
    if (error) throw error;
    if (results.affectedRows === 1) {
      res.end(0);
    } else {
      res.end(-1);
    }
  });
}
