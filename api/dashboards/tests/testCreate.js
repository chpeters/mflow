const connection = require("../../database/connection.js");
const handler = require("../create.js");

let endObj = new Object();
endObj.end = function(arg) {
  console.log("Return code: " + this.statusCode);
}

handler({body: {name: "test",user_id: 1}}, endObj);
handler({body: {name: "test",user_id: "break"}}, endObj);
connection.end();
