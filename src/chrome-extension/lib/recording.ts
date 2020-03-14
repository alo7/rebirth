import tabs from './tabs';
import { fileDownloadDone } from './utils';
import { completeRecordTask, recordFail, sendLog } from './ajax';
import { captureConfig, mediaRecorderOptions, blobOptions } from './config';

/**
 * Start record
 * @param {number} id - Tab id
 * @param {number} pageWidth - Web page width
 * @param {number} pageHeight - Web page height
 * @return {void}
 */
const start = (id: number, pageWidth: number, pageHeight: number): void => {
  tabs.setAction(id, 'start');

  // Switch the Tab to the tab page that triggered the start action because tabCapture.capture is triggered at the current tab
  chrome.tabs.update(id, {
    active: true
  });

  // Really Start Recording Screen
  // ts-ignore is added because @types/chrome has not been updated yet.
  // @ts-ignore
  chrome.tabCapture.capture(captureConfig(pageWidth, pageHeight), stream => {
    if (stream === null) {
      chrome.tabs.sendMessage(id, {
        error: chrome.runtime.lastError
      });

      sendLog('capture fail', {
        captureError: chrome.runtime.lastError as any
      }, 'error');

      return false;
    }

    const recordedBlobs: BlobPart[] = [];
    const mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);

    mediaRecorder.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const fileName = tabs.getFileName(id);
      const superBuffer = new Blob(recordedBlobs, blobOptions);

      // For the time being, we will not use the chrome.downloads.download API for downloading, because this API currently has bugs.
      // see: https://bugs.chromium.org/p/chromium/issues/detail?id=892133#makechanges
      const link = document.createElement('a');
      link.href = URL.createObjectURL(superBuffer);
      link.setAttribute('download', `${fileName}.webm`);
      link.click();

      fileDownloadDone(fileName)
        .then(() => {
          completeRecordTask(fileName, id);
        })
        .catch((e) => {
          sendLog('file download fail', {
            fileName,
            fileDownloadFailMessage: e.message
          }, 'error');
        });

      setTimeout(() => {
        chrome.tabs.remove(id);
      }, 2000);
    };

    tabs.setMediaRecorder(id, mediaRecorder);
    mediaRecorder.start();
  });
};

/**
 * Pause record
 * @param {number} id - Tab id
 * @param {MediaRecorder} mediaRecorder - MediaRecorder object
 * @return {void}
 */
const pause = (id: number, mediaRecorder: MediaRecorder): void => {
  tabs.setAction(id, 'pause');
  mediaRecorder.pause();
};

/**
 * Resume record
 * @param {number} id - Tab id
 * @param {MediaRecorder} mediaRecorder - MediaRecorder object
 * @return {void}
 */
const resume = (id: number, mediaRecorder: MediaRecorder): void => {
  tabs.setAction(id, 'resume');
  mediaRecorder.resume();
};

/**
 * Stop record
 * The detailed stop operation is in start function
 * @param {number} id - Tab id
 * @param {MediaRecorder} mediaRecorder - MediaRecorder object
 * @param {string} fileName - File name saved
 * @return {void}
 */
const stop = (id: number, mediaRecorder: MediaRecorder, fileName: string): void => {
  tabs.setAction(id, 'stop');
  tabs.setFileName(id, fileName);
  mediaRecorder.stop();

  // mediaRecorder.stop() just stopped record,
  // However, its streams have not been closed yet, so it is necessary to obtain all the streams recorded by it and close them one by one.
  mediaRecorder.stream.getTracks().forEach(track => {
    track.stop();
  });
};

/**
 * record fail
 * @param {number} id - Tab id
 * @return {void}
 */
const fail = (id: number): void => {
  recordFail(id);
};

const actions: { [keys in 'start' | 'pause' | 'resume' | 'stop' | 'fail']: Function } = {
  start,
  pause,
  resume,
  stop,
  fail,
};

export default actions;
