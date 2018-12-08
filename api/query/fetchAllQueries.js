import withCors from '../lib/withCors';
import pico from '../lib/pico';

const url = require('url');
const connection = require('../database/connection.js');
const res = require('../lib/response.js');

// Get all queries needed for a user
const sql = `select dashboard_id, query_id, visualization_type, query.name as name, query_json from dashboard '
  join dashboard_to_query using (dashboard_id) 
  join query using (query_id) `;

export default pico(
  withCors((req) => {
    const { id } = url.parse(req.url, true).query;
    connection.query(`${sql}where dashboard_id = ${id}`, (error, results, fields) => {
      if (!error && results !== null) {
        return res(results);
      }
      return res(error, 400);
    });
  }),
);
