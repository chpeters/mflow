const connection = require("../../database/connection.js");
const handler = require("../fetchTransactionsFromQuery.js");

let endObj = new Object();
endObj.end = function(arg) {
  if (this.statusCode) {
    console.log("Response code: " + this.statusCode);
  } else {
    arg.forEach(a => {
      console.log(a);
    })
  }
}

handler({body: {user_id: 1, query: {select: ["date", "amount", "name"], function: [], where: [{key: "category", operator: "=", value: "Food and Drink", conjunction: "and"}], group: []}}}, endObj);
handler({body: {user_id: 1, query: {select: [], function: [{key: "amount", function: "sum"}], where: [{key: "name", operator: "=", value: "Wollaston's West Village", conjunction: "and"}], group: []}}}, endObj);
handler({body: {user_id: 1, query: {select: ["name"], function: [{key: "amount", function: "sum"}], where: [], group: ["name"]}}}, endObj);
handler({body: {user_id: 1, query: {select: ["name"], function: [{key: "amount", function: "sum"}], where: [{key: "name", operator: "=", value: "Back Bay Social Club", conjunction: "and"}, {key: "name", operator: "=", value: "Bangkok Pinto", conjunction: "or"}], group: ["name"]}}}, endObj);
connection.end();
