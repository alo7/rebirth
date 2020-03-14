import { IRecursive } from './common';
import { IAction, IActionHelper } from './rebirth';

// Data stored in memory
export type ITabs = {
  [key in string | number]: {
    action: IAction;  // Record related actions
    mediaRecorder: MediaRecorder; // MediaRecorder Object
    extraInfo: IRecursive; // Additional information to carry
    fileName: string; // Record saved file name
    initTimeoutId: number;  // init timeout id
  }
}

// All parameters received from the web page l
export interface IWebPageMessages {
  action: IAction | IActionHelper;  // List of all actions that can be sent from the web page
  fileName?: string;  // Record saved file name
  pageWidth?: number; // The width of the page
  pageHeight?: number; // The height of the page
  extraInfo?: IRecursive;  // Additional information to carry
}
