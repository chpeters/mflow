const connection = require("../../database/connection.js");
const handler = require("../update.js");

let endObj = new Object();
endObj.end = function(arg) {
  console.log("Return code: " + arg);
}

handler({body: {dashboard_id: 5, name: "newName"}}, endObj);
connection.end();
