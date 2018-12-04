const connection = require("../../database/connection.js");
const handler = require("../read.js");

let endObj = new Object();
endObj.end = function(arg) {
  if (this.statusCode) {
    console.log("Response code: " + this.statusCode);
  } else {
    arg.forEach(a => {
      console.log(`id: ${a.dashboard_id} name: ${a.name} user_id: ${a.user_id}`)
    })
  }
}

handler({body: {user_id: 1}}, endObj);
handler({body: {user_id: 2}}, endObj);
handler({body: {user_id: "silly boi"}}, endObj);
connection.end();
