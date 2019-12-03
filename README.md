## rebirth

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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
docker run -dit -P --name rebirth_alo7 -v `pwd`/rebirth_alo7/logs:/etc/www/logs -v `pwd`/rebirth_alo7/video:/root/Downloads -e MATERIAL_URL="https://www.alo7.com/en/" -e START_VNC="yes" rebirth:1.0.0
```

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

They are defined in `Dockerfile`

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

### Use of business

> The following are the business scenarios of our company

ALO7 is an online education company that provides an Intelligent EFL Ecosystem.

One of ALO7 important product is ALO7 Online Tutoring-One-stop online tutoring solutions for schools and institutions.
During the online classes, we need to record the video of the class and analyze the quality of the class, meanwhile providing feedback for students and teachers.

Our platform is implemented by “Electron”, and the video is recorded from the tutor’s portal,which requires tutors’ high-performance PC and good internet service,  plenty of experienced tutors can’t make it teach the class on our platform due to this issue.

This is how we optimized :

record all tutors’ control during the class (e.g., move the cursor, type, video, etc), then generate a video based on the data we collected, that’s why this project is named “Rebirth”. It not only makes more tutors to teach classes but save 6~8 CNY for each class (recording the class is based on the third-party service).

### Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.bugs.cc/"><img src="https://avatars0.githubusercontent.com/u/8198408?v=4" width="100px;" alt="Black-Hole"/><br /><sub><b>Black-Hole</b></sub></a><br /><a href="https://github.com/alo7/rebirth/commits?author=BlackHole1" title="Code">💻</a> <a href="#ideas-BlackHole1" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

### License

[MIT](./LICENSE)
