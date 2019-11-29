const { loggerController } = require('../lib/log');

const recordFail = (req, res) => {
  loggerController.info('record failed')
  res.sendJson({});

  return Promise.resolve(req.body);
};

module.exports = recordFail;
