const connection = require("../../database/connection.js");
const handler = require("../delete.js");

let endObj = new Object();
endObj.end = function(arg) {
  console.log("Return code: " + this.statusCode);
}

handler({body: {dashboard_id: 6}}, endObj);
handler({body: {dashboard_id: 1}}, endObj);
connection.end();
