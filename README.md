## rebirth

### Multi Language

* [中文 README](./README-zh.md)

### Introduction

This project records the web page in the server.

#### What can it be used for

* Record the user operation on the client, reproduce it on the server and record it.
* Record any changes to the specified web page.
* If there is the function of client recording, the computer requirements of the client can be reduced

#### Advantages

* Record for tab pages, so refresh web pages and jump can also be recorded
* You can also record the sound of web pages, even if your server does not have a sound card.
* Perfect crash, error processing mechanism
* Built-in static compiled FFmpeg, can be used directly
* You can add your own code to state, and it is very convenient.
* Supports `Chrome DevTools Protocol` and `VNC` debugging

### Quick start

#### Single Node

[![Use the rebirth project to record on the server](http://img.youtube.com/vi/lzos3284dUE/0.jpg)](http://www.youtube.com/watch?v=lzos3284dUE "Use the rebirth project to record on the server")

```shell
docker run -dit -P --name rebirth_alo7 -v `pwd`/rebirth_alo7/logs:/etc/www/logs -v `pwd`/rebirth_alo7/video:/root/Downloads -e MATERIAL_URL="https://www.alo7.com/en/" -e START_VNC="yes" rebirth:1.0.0
```

#### Multi Node

### Web Page API

After the webpage is loaded, some api will be injected for the webpage to use.

```javascript
// start record
rebirth.start();

// pause record
rebirth.pause();

// resume record
rebirth.resume();

// stop record
rebirth.stop('filename');

// record fail
rebirth.fail();

// set extra info, The final information is delivered to your custom code
rebirth.setExtraInfo({
  foo: 'bar'
});
```

### Environmental Variable

They are defined in `docker-compose.yml`

* `MATERIAL_URL`: The `url` to be recorded, the default value is `https://github.com/`
* `START_VNC`: Whether to start `VNC`, open as `yes`. The default value is `no`
* `VNC_PASSWORD`: `VNC` connection password, default value is` rebirth`
* `MAX_RECORD_TIME`: What is the maximum time of the current recording, in milliseconds, the default value is `7200000` (two hours)

### How to customize code

In the `src/hooks` directory, create a new file: `index.js`, in the following format:

```js
module.exports = {
  /**
   * Triggered when recording is complete
   *
   * @param {Object} data - Client request body
   * @return {void | string | Object | number | boolean | Function | Promise.resolve}
   */
  completeRecordAfter: (data) => {
    console.log(data);
    return true;
  },

  // Triggered after recording failure
  // The parameters are the same as completeRecordAfter
  failAfter: () => {},
};
```

