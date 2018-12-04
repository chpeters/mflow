const connection = require("../database/connection.js");

module.exports = (req, res) => {
  const { user_id } = req.body;
  connection.query(`select * from dashboard where user_id = ${user_id}`, function (error, results, fields) {
    if (error) throw error;
    if (results !== null) {
      res.end(results);
    } else {
      res.end(-1);  
    }
  });
}
