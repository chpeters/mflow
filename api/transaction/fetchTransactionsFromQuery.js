const connection = require("../database/connection.js");
// Fetch all transactions specified by a given query for a specific user
// This requires translating JSON formatted MRQL queries into SQL

// format the columns to be selected into SQL
function formatSelect(selects) {
  let selectSql = "";
  selects.forEach(select => {
    selectSql += `,${select}`
  });
  return "select " + selectSql.substr(1);
}

// format any functions that are applied to columns into SQL
function addFunctions(selectSql, funcs, hasComma) {
  let functionSql = "";
  funcs.forEach(func => {
    functionSql += `,${func.function}(${func.key})`;
  });
  if (hasComma) {
    return `${selectSql} ${functionSql}`;
  } else {
    return `${selectSql} ${functionSql.substr(1)}`;
  }
}

// format where clauses into SQL
function formatWheres(wheres) {
  let whereSql = "";
  wheres.forEach(where => {
    whereSql += `and ${where.key}${where.operator}"${where.value}"`;
  });
  return whereSql;
}

// format group by statements into SQL
function formatGroups(groups) {
  let groupSql = "";
  groups.forEach(group => {
    groupSql += `,${group}`;
  });
  if (groups.length > 0) {
    return "group by " + groupSql.substr(1);
  } else {
    return "";
  }
}

// organizer function for formatting the entire SQL statement
function getSql(query, user_id) {
  const selectStr = formatSelect(query.select);
  const selectWithFuncs = addFunctions(selectStr, query.function, query.select.length > 0);
  const whereStr = formatWheres(query.where);
  const groupStr = formatGroups(query.group);
  return `${selectWithFuncs} from transaction where user_id=${user_id} ${whereStr} ${groupStr}`;
}

// handle the actual request and response
module.exports = (req, res) => {
  const { query, user_id } = req.body;
  const sqlStr = getSql(query, user_id);
  connection.query(sqlStr, function (error, results, fields) {
    if (error) {
      throw error;
    } else if (results !== null) {
      res.end(results);
    } else {
      res.statusCode = 400;
      res.end();
    }
  });
}
