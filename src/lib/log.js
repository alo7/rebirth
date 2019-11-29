const os = require('os');
const winston = require('winston');
const { LOG_DIR, MATERIAL_URL } = require('./constants');


const logger = winston.createLogger({
  defaultMeta: {
    hostname: os.hostname(),
    material_url: MATERIAL_URL,
  },
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `rebirth-${os.hostname()}.log`,
      dirname: LOG_DIR
    })
  ]
});

module.exports.loggerServer = logger.child({ source: 'Server' });
module.exports.loggerHooks = logger.child({ source: 'Hooks' });
module.exports.loggerHookComplete = logger.child({ source: 'Hook.CompleteRecordAfter' });
module.exports.loggerHookFail = logger.child({ source: 'Hook.FailAfter' });
module.exports.loggerServicesStatus = logger.child({ source: 'ServicesStatus' });
module.exports.loggerController = logger.child({ source: 'Controller' });
module.exports.loggerBrowser = logger.child({ source: 'Browser' });
