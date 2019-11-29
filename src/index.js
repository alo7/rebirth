const http = require('http');
const { exit } = require('./lib/exit');
const { loggerServer } = require('./lib/log');
const startChrome = require('./lib/startChrome');
const handleRequest = require('./lib/handleRequest');
const servicesStatus = require('./lib/servicesStatus');
const { MAX_RECORD_TIME } = require('./lib/constants');

const server = http.createServer(handleRequest);

server.listen(80, () => {
  loggerServer.info('Server running at http://127.0.0.1:80/');
});

// Open Chrome
startChrome();

// The exit caused by the unexpected situation will be re-recorded
process.once('exit', () => exit('exit'));
process.once('SIGTERM', () => exit('sigterm'));
process.on('message', message => {
  if (message === 'shutdown') {
    exit('shutdown');
  }
});

// Maximum recording time listener
setTimeout(() => {
  loggerServer.error('waiting for recording to complete timeout');
  exit('waitingTimeout');
}, MAX_RECORD_TIME);

// Imitate k8s liveness
setInterval(() => {
  if (!servicesStatus.isNormal) {
    exit('serviceFail')
  }
}, 1000 * 5);
