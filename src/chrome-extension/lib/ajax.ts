import tabs from './tabs';
import { fetchPost } from './utils';
import { IRecord } from '../typing/request';
import { IRecursive } from '../typing/common';

/**
 * Send logs to the server, let the server log
 * @param {string} name - Log name
 * @param {object} [payload] - Log meta info
 * @param {string} [level=error] - Log level (debug / info / warn / error)
 * @return {void}
 */
export const sendLog = (name: string, payload?: IRecursive, level: 'debug' | 'info' | 'warn' | 'error' = 'info') => {
  fetchPost(`${SERVER_URL}/logHandle`, {
    name: name,
    payload,
    level
  })
    .catch((e: Error) => {
      console.error(e);
    });
};

/**
 * Request the server to obtain the recording task
 * @return {Promise<IRecord>}
 */
export const getRecordTasks = (): Promise<IRecord> => {
  return new Promise((resolve, reject) => {
    fetchPost(`${SERVER_URL}/getRecord`, {})
      .then(async resp => {
        const data: IRecord = await resp.json();
        return resp.ok ? resolve(data) : reject(data);
      })
      .catch(e => reject(e));
  });
};

/**
 * Send a recording completion request
 * @param {string} fileName - File name
 * @param {number} id - Tab id
 * @return {void}
 */
export const completeRecordTask = (fileName: string, id: number) => {
  fetchPost(`${SERVER_URL}/completeRecord`, {
    extraInfo: tabs.getExtraInfo(id),
    fileName: fileName,
  })
    .catch(e => {
      sendLog('complete record task request send fail', {
        completeRecordTaskError: e.message
      }, 'error');
    });
};

/**
 * Send a record fail request
 * @param {number} id - Tab id
 * @return {void}
 */
export const recordFail = (id: number) => {
  fetchPost(`${SERVER_URL}/recordFail`, {
    extraInfo: tabs.getExtraInfo(id),
  })
    .catch(e => {
      sendLog('record fail request send fail', {
        recordFail: e.message
      }, 'error');
    });
};