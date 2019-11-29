const { MATERIAL_URL } = require('../lib/constants');
const { loggerController } = require('../lib/log');

const getRecord = (req, res) => {
  loggerController.info('get record task')
  res.sendJson({
    material_url: MATERIAL_URL,
  });
};

module.exports = getRecord;
