const http =  require('http');
const WebSocket = require('ws');
const { loggerServer } = require('./log');
const servicesStatus =  require('./servicesStatus');

module.exports = () => {
  const wsList = {};
  let crashStatus = false;

  /**
   * Get the websocket address of all chrome pages
   * @return {Promise<Array>}
   */
  const getWsList = () => {
    return new Promise((resolve) => {
      http.get('http://127.0.0.1:9222/json', res => {
        res.addListener('data', data => {
          try {
            const result = JSON.parse(String(data));
            const tempWsList = {};

            result.forEach(info => {
              if (typeof wsList[info.id] === 'undefined') {
                tempWsList[info.id] = info;
                wsList[info.id] = info;
              }
            });

            if (Object.keys(tempWsList).length !== 0) {
              resolve(tempWsList);
            }
          } catch (e) {
            loggerServer.error('error getting webSocket address of chrome webpage', {
              listenCrashErrorMessage: e.message,
              listenCrashErrorStack: e.stack || ''
            });
            servicesStatus.setChromeRemoteDebugError = true;
          }
        });
      }).on('error', () => {});
    });
  };

  const intervalId = setInterval(() => {
    if (!servicesStatus.isNormal) {
      clearInterval(intervalId);
    }
    getWsList().then(list => {
      Object.values(list).forEach(webSocketURLInfo => {
        const client = new WebSocket(webSocketURLInfo.webSocketDebuggerUrl);
        client.on('message', data => {
          if (data.indexOf('"method":"Inspector.targetCrashed"') !== -1) {
            // Only once
            if (!crashStatus) {
              loggerServer.error('received chrome page crash message', {
                crashInfo: data,
                webSocketURLInfo
              });
              crashStatus = true;
              servicesStatus.setChromeCrash = true;
            }
          }
        });
      })
    });
  }, 1000);
};

