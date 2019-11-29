const { parse } = require('url');
const routers = require('./routers');
const { CONTENT_TYPE_JSON } = require('./constants');
const { anyToString, urlParamsToObj } = require('./utils');

module.exports = (req, res) => {
  const { pathname, query } = parse(req.url);

  // Filter requests
  if (
    !['/', '/favicon.ico'].includes(pathname) &&
    req.headers.origin !== 'chrome-extension://cnlcagjlokccajjeehpfccjlkgflmmgj' &&
    req.headers.referer !== 'http://127.0.0.1/'
  ) {
    return;
  }

  req.pathname = pathname;
  req.query = urlParamsToObj(query);

  res.sendJson = json => {
    const result = anyToString(json);
    res.writeHead(200, CONTENT_TYPE_JSON);
    res.end(result);
  };

  res.sendError = () => {
    res.writeHead(500, CONTENT_TYPE_JSON);
    res.end('{}');
  };

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
        routers(req, res);
      } catch (e) {}
    });
  } else {
    routers(req, res);
  }
};
