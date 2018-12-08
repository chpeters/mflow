import withCors from '../lib/withCors';
import pico from '../lib/pico';
import res from '../lib/response';

const url = require('url');
const makeConnection = require('../database/connection.js');
// Get all dashboards for a user.
// This will be the way we use this endpoint because
// a user should see all their dashboards after they log in
// and once they're loaded on the front end we'll most likely
// save the data there and use it, so we won't need to query
// for a specific dashboard.
export default pico(async (req) => {
  const { id } = url.parse(req.url, true).query;
  try {
    const conn = await makeConnection();
    const results = await conn.query(`select * from dashboard where user_id = ${id}`);
    return withCors(res(results, 200));
  } catch (error) {
    console.log('error');
    return withCors(res(error, 400));
  }
});
