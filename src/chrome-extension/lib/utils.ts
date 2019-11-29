import { sendLog } from './ajax';
import { IRecursive } from '../typing/common';

/**
 * Detecting whether the file is downloaded completely
 * @param {RegExp} filenameRegex - File name
 * @return {Promise<void>>}
 */
export const fileDownloadDone = (filenameRegex: string) => {
  sendLog('checkFileDownload', {
    filenameRegex
  });
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      sendLog('file download timeout', {
        filenameRegex
      }, 'warn');
      resolve();
    }, 1000 * 30);

    const searchFilename = (filenameRegex: string) => {
      chrome.downloads.search({
        filenameRegex: filenameRegex
      }, downloadItem => {
        if (downloadItem.length !== 0 && downloadItem[0].state === 'complete') {
          clearTimeout(timeoutId);

          setTimeout(() => {
            sendLog('the file has been downloaded', {
              filenameRegex,
              downloadInfo: downloadItem[0] as any
            });

            resolve();
          }, 1000 * 3); // Add a delay insurance
        } else {
          searchFilename(filenameRegex);
        }
      });
    };
    searchFilename(filenameRegex);
  });
};

/**
 * Generate random numbers
 * @param {number} length - Length of random number
 * @return {string}
 */
export const makeID = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Post request encapsulation
 * @param {string} url - Request url
 * @param {object} data - Post body
 * @return {Promise<Response>>}
 */
export const fetchPost = (url: string, data: IRecursive) => {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  });
};
