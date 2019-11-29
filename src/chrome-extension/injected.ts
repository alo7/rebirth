/**
 * The code for this file will be injected into the web page.
 */

import { IRecursive } from './typing/common';

type rebirth = {
  [key: string]: (...args: any[]) => void;
  stop: (fileName: string) => void
  setExtraInfo: (obj: IRecursive) => void;
};

interface MyWindow extends Window {
  rebirth: rebirth
}

(window as MyWindow & typeof globalThis).rebirth = {} as rebirth;

[ 'pause', 'resume', 'fail' ].forEach((m) => {
  (window as MyWindow & typeof globalThis).rebirth[m] = () => {
    const msg = {
      'action': m,
    };
    window.postMessage(msg, '*');
  };
});

(window as MyWindow & typeof globalThis).rebirth.start = () => {
  window.postMessage({
    action: 'start',
    // The width and height of different pages are different. If they are not handled, black edges will appear during recording.
    pageWidth: document.documentElement.clientWidth,
    pageHeight: document.documentElement.clientHeight
  }, '*');
};

(window as MyWindow & typeof globalThis).rebirth.stop = (fileName: string) => {
  window.postMessage({
    action: 'stop',
    fileName: fileName,
  }, '*');
};

(window as MyWindow & typeof globalThis).rebirth.setExtraInfo = (obj: IRecursive) => {
  window.postMessage({
    action: 'setExtraInfo',
    extraInfo: obj
  }, '*');
};