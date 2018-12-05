const connection = require("../../database/connection.js");
const handler = require("../fetchAllQueries.js");

let endObj = new Object();
endObj.end = function(arg) {
  if (this.statusCode) {
    console.log("Response code: " + this.statusCode);
  } else {
    arg.forEach(a => {
      console.log(`dash id: ${a.dashboard_id} name: ${a.name} query_id: ${a.query_id} visualization_type: ${a.visualization_type}`)
    })
  }
}

handler({body: {user_id: 1}}, endObj);
handler({body: {user_id: 2}}, endObj);
handler({body: {user_id: "silly boi"}}, endObj);
connection.end();
