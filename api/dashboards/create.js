const connection = require("../database/connection.js");
// Create a dashboard.
module.exports = (req, res) => {
  const { user_id, name } = req.body;
  connection.query(`insert into dashboard (name, user_id) values ("${name}", ${user_id})`, function (error, results, fields) {
    if (error) throw error;
    if (results.affectedRows === 1) {
      res.end(0);
    } else {
      res.end(-1);
    }
  });
}
