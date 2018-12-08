import { setHeaders } from './response';

const withCors = fn => (req) => {
  const res = fn(req);
  return setHeaders(
    {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-auth',
    },
    res,
  );
};

export default withCors;
