export const setHeaders = (obj, res) => {
  const curr = res.headers;
  for (const key in obj) {
    curr[key.toLowerCase()] = obj[key];
  }
  return {
    ...res,
    headers: curr,
  };
};

export const setStatus = (code, res) => ({
  ...res,
  status: code,
});

export const setBody = (any, res) => {
  if (any === null) {
    return setStatus(204, res);
  }

  let str = any;
  if (typeof str === 'object' || typeof str === 'number') {
    str = JSON.stringify(str);

    if (!res['content-type']) {
      res['content-type'] = 'application/json; charset=utf-8';
    }
  }

  return {
    ...res,
    body: str,
  };
};

export const end = (nodeRes, res) => {
  nodeRes.statusCode = res.status || 200;
  Object.entries(res.headers || {}).forEach(([key, val]) => {
    nodeRes.setHeader(key, val);
  });
  nodeRes.end(res.body || '');
};

const pico = (body, status, headers) => {
  const withBody = setBody(body || null, {});
  const withStatus = setStatus(status, withBody);
  return setHeaders(headers || {}, withStatus);
};

export const from = res => pico(res.body, res.status, res.headers);

export default pico;
