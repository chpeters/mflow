import withCors from '../lib/withCors';
import pico from '../lib/pico';
import res from '../lib/response';

const url = require('url');
const makeConnection = require('../database/connection.js');

// Get all queries needed for a user
const sql = `select dashboard_id, query_id, visualization_type, query.name as name, query_json from dashboard '
  join dashboard_to_query using (dashboard_id) 
  join query using (query_id) `;

export default pico(async (req) => {
  const { id } = url.parse(req.url, true).query;
  try {
    const conn = await makeConnection();
    const results = await conn.query(`${sql}where dashboard_id = ${id}`);
    return withCors(res(results, 200));
  } catch (error) {
    return withCors(res(error, 400));
  }
});
