const { loggerServer } = require('./log');

let status = false;

/**
 * Unified exit event
 * @param {string} message - exit message
 * @return {void}
 */
module.exports.exit = (message) => {
  if (status) return;
  loggerServer.warn('the process was kill', {
    killMessage: message
  });

  status = true;

  process.exit();
};
