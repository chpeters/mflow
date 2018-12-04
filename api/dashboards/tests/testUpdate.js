const connection = require("../../database/connection.js");
const handler = require("../update.js");

let endObj = new Object();
endObj.end = function(arg) {
  console.log("Return code: " + this.statusCode);
}

handler({body: {dashboard_id: 7, name: "newName"}}, endObj);
handler({body: {dashboard_id: 1, name: "newName"}}, endObj);
connection.end();
