const connection = require("../database/connection.js");
// The update operation for dashboards will be renaming.
// the dashboard_id will never change, and if we allow
// copying of dashboard we will create a new entry where we will
// change the user_id, so renaming is the only practical update.
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
