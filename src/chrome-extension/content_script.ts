import { IWebPageMessages } from './typing/background';

if (typeof chrome.runtime.id !== 'undefined') {
  const port = chrome.runtime.connect(chrome.runtime.id);

  // Process plug-in messages
  port.onMessage.addListener(msg => {
    if (({}).toString.call(msg) !== '[object Object]') {
      return;
    }

    if (msg.error) {
      console.error(`[rebirth plugin]: ${JSON.stringify(msg.error)}`);
      return;
    }

    if (msg.type === 'ready') {
      // When the plug-in is ready, load JavaScript.
      const injectedScript = document.createElement('script');
      injectedScript.src = chrome.extension.getURL('injected.js');
      (document.head || document.documentElement).appendChild(injectedScript);
    }
  });

  // The message of the webpage message is forwarded to the plug-in for processing.
  window.addEventListener("message", (event: { data: IWebPageMessages }) => {
    if(Object.keys(event.data).length === 0) return;

    if (event.data.action) {
      port.postMessage(event.data);
    }
  }, false);

  // Hide the ready interface and trigger this communication when the web page is loaded.
  // You cannot inject code into a web page until it has been loaded.
  port.postMessage({
    action: 'ready'
  });
}
