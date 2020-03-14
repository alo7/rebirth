<p align="center">
  <img src="https://user-images.githubusercontent.com/8198408/70679316-a6f08080-1c8c-11ea-8253-bcc532b79898.png"/>
</p>
<h3 align="center">
  Record the beautiful moments in the website in the server.
</h3>

<p align="center">
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square" alt="All Contributors"/>
  </a>
  <a href="https://hub.docker.com/r/alo7docker/rebirth/builds">
    <img src="https://img.shields.io/docker/cloud/build/alo7docker/rebirth?style=flat-square" alt="Docker Cloud Build Status"/>
  </a>
    <a href="https://twitter.com/Free_BlackHole">
    <img src="https://img.shields.io/twitter/follow/Free_BlackHole?style=flat-square" alt="Twitter"/>
  </a>
  <a href="https://github.com/alo7/rebirth/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/alo7/rebirth?style=flat-square" alt="GitHub license"/>
    </a>
  <br />
</p>

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
* You can add your own code to state, and it is very convenient.
* Supports `Chrome DevTools Protocol` and `VNC` debugging

### Quick start

[![Use the rebirth project to record on the server](https://i.imgur.com/oLVzqiD.png)](http://www.youtube.com/watch?v=lzos3284dUE "Use the rebirth project to record on the server")

```shell
docker run -dit -P --name rebirth_alo7 -v `pwd`/rebirth_alo7/logs:/etc/www/logs -v `pwd`/rebirth_alo7/video:/root/Downloads -e MATERIAL_URL="https://www.alo7.com/en/" -e START_VNC="yes" alo7docker/rebirth
```

### Web Page API

After the webpage is loaded, some api will be injected for the webpage to use.

```javascript
// Initialize the API (if not called within 5 minutes, the task is considered to have failed) to ensure that the web page can be opened normally.
rebirth.init();

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

They are defined in `Dockerfile`

* `MATERIAL_URL`: The `url` to be recorded, the default value is `https://github.com/`
* `START_VNC`: Whether to start `VNC`, open as `yes`. The default value is `no`
* `VNC_PASSWORD`: `VNC` connection password, default value is `rebirth`
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

### Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.bugs.cc/"><img src="https://avatars0.githubusercontent.com/u/8198408?v=4" width="100px;" alt="Black-Hole"/><br /><sub><b>Black-Hole</b></sub></a><br /><a href="https://github.com/alo7/rebirth/commits?author=BlackHole1" title="Code">💻</a> <a href="#ideas-BlackHole1" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/pandan-12"><img src="https://avatars3.githubusercontent.com/u/56302479?v=4" width="100px;" alt="pandan-12"/><br /><sub><b>pandan-12</b></sub></a><br /><a href="https://github.com/alo7/rebirth/issues?q=author%3Apandan-12" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

### License

[MIT](./LICENSE)
