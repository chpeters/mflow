import withCors from '../lib/withCors';
import pico from '../lib/pico';
import res from '../lib/response';

const url = require('url');
const mysql = require('promise-mysql');
const config = require('../database/config.js');

// Get all queries needed for a user
const sql = `select dashboard_id, query_id, visualization_type, query.name as name, query_json from dashboard
  join dashboard_to_query using (dashboard_id) 
  join query using (query_id) `;

export default pico(async (req) => {
  const { id } = url.parse(req.url, true).query;
  try {
    const conn = await mysql.createConnection(config);
    const results = await conn.query(`${sql}where dashboard_id = ${id}`);
    conn.end();
    return withCors(res(results, 200));
  } catch (error) {
    console.log(error);
    return withCors(res(error, 400));
  }
});
