const { loggerServicesStatus } = require('./log');

class ServicesStatus {
  constructor() {
    this.chromeClose = false;
    this.chromeError = false;
    this.chromeCrash = false;
    this.chromeRemoteDebugError = false;
  }

  get getChromeClose () {
    return this.chromeClose;
  }

  set setChromeClose (val) {
    loggerServicesStatus.error('chrome close');
    this.chromeClose = val;
  }

  get getChromeError () {
    return this.chromeError;
  }

  set setChromeError (val) {
    loggerServicesStatus.error('chrome error');
    this.chromeError = val;
  }

  get getChromeRemoteDebugError () {
    return this.chromeRemoteDebugError;
  }

  set setChromeRemoteDebugError (val) {
    loggerServicesStatus.error('chrome remote debug error');
    this.chromeRemoteDebugError = val;
  }

  get getChromeCrash () {
    return this.chromeCrash;
  }

  set setChromeCrash (val) {
    loggerServicesStatus.error('chrome crash');
    this.chromeCrash = val;
  }

  get isNormal () {
    return [
      this.getChromeClose,
      this.getChromeError,
      this.getChromeRemoteDebugError,
      this.getChromeCrash
    ].every(val => !val)
  }
}

module.exports = new ServicesStatus();
