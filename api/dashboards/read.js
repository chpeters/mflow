import withCors from '../lib/withCors';
import pico from '../lib/pico';

const url = require('url');
const res = require('../lib/response.js');
const connection = require('../database/connection.js');
// Get all dashboards for a user.
// This will be the way we use this endpoint because
// a user should see all their dashboards after they log in
// and once they're loaded on the front end we'll most likely
// save the data there and use it, so we won't need to query
// for a specific dashboard.
export default pico(
  withCors((req) => {
    const { id } = url.parse(req.url, true).query;
    connection.query(`select * from dashboard where user_id = ${id}`, (error, results, fields) => {
      if (!error && results !== null) {
        console.log('results');
        return res(results);
      }
      return res(error, 400);
    });
  }),
);
