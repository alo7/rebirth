const { loggerBrowser } = require('../lib/log');

const logHandle = (req, res) => {
  const { name, payload, level } = req.body;
  loggerBrowser[level](name, payload);
  res.sendJson({});
};

module.exports = logHandle;
