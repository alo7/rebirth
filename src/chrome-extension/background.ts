import tabs from './lib/tabs';
import actions from './lib/recording';
import { IRecord } from './typing/request';
import { getRecordTasks, sendLog } from './lib/ajax';
import { IWebPageMessages } from './typing/background';

// Get the recording task and open the tab page
const getRecordTasksAndStartTab = () => {
  getRecordTasks()
    .then((data: IRecord) => {
      chrome.tabs.create({
        url: data.material_url
      }, tab => {
        const id = tab.id;

        tabs.setAction(id, 'waiting');
        sendLog('open url', {
          recordInfo: data
        });

        // If the init function is not called within 5 minutes, the task is considered to have failed
        const initTimeoutId = setTimeout(() => {
          sendLog('initTimeout');
          actions.fail(id);
        }, 1000 * 60 * 5);
        tabs.setInitTimeoutId(id, initTimeoutId);
      });
    })
    .catch(e => {
      sendLog('get record tasks fail', {
        getRecordTasksFail: e
      }, 'error');
    });
};

// Make sure everything is ok
setTimeout(() => {
  getRecordTasksAndStartTab();
}, 1000 * 3);

// Listening to webpage messages
chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener((data: IWebPageMessages) => {
    const currentTabId = port.sender.tab.id;
    const params = [ currentTabId, tabs.getMediaRecorder(currentTabId) ];

    if ([ 'pause', 'resume', 'fail' ].includes(data.action)) {
      return actions[data.action as 'pause' | 'resume' | 'fail'](...params);
    }

    if (data.action === 'start') {
      return actions.start(currentTabId, data.pageWidth, data.pageHeight);
    }

    if (data.action === 'stop') {
      return actions.stop(...params, data.fileName);
    }

    if (data.action === 'setExtraInfo') {
      return tabs.setExtraInfo(currentTabId, data.extraInfo);
    }

    if (data.action === 'ready') {
      port.postMessage({
        type: 'ready'
      });
    }

    if (data.action === 'init') {
      clearTimeout(tabs.getInitTimeoutId(currentTabId));
    }
  });
});
