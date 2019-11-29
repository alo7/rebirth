const { loggerController } = require('../lib/log');

const completeRecord = (req, res) => {
  loggerController.info('complete record')
  res.sendJson({});

  return Promise.resolve(req.body);
};

module.exports = completeRecord;
