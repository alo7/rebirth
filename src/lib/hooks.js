const fs = require('fs');
const { exit } = require('./exit');
const { loggerHooks } = require('./log');
const { HOOK_MAIN_JS_FILEPATH } = require('./constants');

const routerToHooksMap = {
  '/completeRecord': 'completeRecordAfter',
  '/recordFail': 'failAfter',
};

const defaultBehavior = () => true;

const defaultHooks = {
  completeRecordAfter: defaultBehavior,
  failAfter: defaultBehavior,
};

const hooks = () => {
  let hooksList = defaultHooks;
  if (fs.existsSync(HOOK_MAIN_JS_FILEPATH)) {
    hooksList = require(HOOK_MAIN_JS_FILEPATH);
    // Replace default hooks
    Object.keys(hooksList).forEach(h => {
      defaultHooks[h] = hooksList[h];
    });
  }

  return (routerName, controllersResult) => {
    const getHookName = routerToHooksMap[routerName];
    const hookFun = defaultHooks[getHookName];

    controllersResult.then(hookFun).catch(e => {
      loggerHooks.error('custom code error', {
        hookErrorMessage: e.message,
        hookErrorStack: e.stack,
      });
      exit('custom code error');
    })
      .then(() => {
        exit('custom code execution complete')
      })
  }
};

module.exports = hooks();
