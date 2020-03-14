import { makeID } from './utils';
import { sendLog } from './ajax';
import { IAction } from '../typing/rebirth';
import { ITabs } from '../typing/background';

class Tabs {
  private readonly tabs: ITabs;

  constructor () {
    this.tabs = Object.create(null);
  }

  getTab (id: number) {
    return this.tabs[id] || null;
  }

  getMediaRecorder (id: number) {
    return (this.getTab(id) && this.getTab(id).mediaRecorder) ? this.getTab(id).mediaRecorder : null;
  }

  getExtraInfo (id: number) {
    return (this.getTab(id) && this.getTab(id).extraInfo) ? this.getTab(id).extraInfo : {};
  }

  getFileName (id: number) {
    return (this.getTab(id) && this.getTab(id).fileName) ? this.getTab(id).fileName : 'fileName_is_null';
  }

  getInitTimeoutId (id: number) {
    return (this.getTab(id) && this.getTab(id).initTimeoutId) ? this.getTab(id).initTimeoutId : 0;
  }

  createTab (id: number) {
    this.tabs[id] = Object.create(null);
  }

  setAction (id: number, action: IAction) {
    if (this.getTab(id) === null) {
      this.createTab(id);
    }
    if (action !== this.tabs[id].action) {
      this.tabs[id].action = action;
    }

    sendLog(`set action to ${action}`);
  }

  setMediaRecorder (id: number, mediaRecorder: MediaRecorder) {
    if (this.getTab(id) === null) {
      this.createTab(id);
    }
    this.tabs[id].mediaRecorder = mediaRecorder;
  }

  setExtraInfo (id: number, info: any) {
    if (this.getTab(id) === null) {
      this.createTab(id);
    }
    this.tabs[id].extraInfo = {
      ...this.tabs[id].extraInfo,
      ...info
    };
  }

  setFileName (id: number, fileName: string) {
    if (this.getTab(id) === null) {
      this.createTab(id);
    }
    if (fileName !== this.tabs[id].fileName) {
      // Prevent multiple machines from mounting the same location and save the same file name
      this.tabs[id].fileName = makeID(8) + fileName;
    }
  }

  setInitTimeoutId (id: number, timeoutId: number) {
    if (this.getTab(id) === null) {
      this.createTab(id);
    }
    if (timeoutId !== this.tabs[id].initTimeoutId) {
      this.tabs[id].initTimeoutId = timeoutId;
    }

  }
}

const tabs = new Tabs();

export default tabs;
