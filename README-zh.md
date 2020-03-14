<p align="center">
  <img src="https://user-images.githubusercontent.com/8198408/70679316-a6f08080-1c8c-11ea-8253-bcc532b79898.png"/>
</p>
<h3 align="center">
  在服务器中记录网站的美好瞬间
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

### 多语言

* [English README](./README.md)

### 介绍

这个项目是在服务器里对网页进行录制

#### 能用来干什么

* 在客户端记录下用户操作，在服务端进行复现并录制下来
* 记录下指定网页的任何变化
* 如果有客户端录制的功能，则可以减少客户端的电脑要求

#### 优点

* 针对标签页进行录制，所以刷新网页、跳转也可以记录下来
* 也可以记录下网页的声音，即使你的服务器上没有声卡也可以
* 完善的崩溃、错误处理机制
* 可以对状态增加自己的代码，而且十分的方便
* 支持 `Chrome 远程协议调试` 和 `VNC` 调试

### 快速开始

[![使用 rebirth 项目在服务端进行录制](https://i.imgur.com/oLVzqiD.png)](http://www.youtube.com/watch?v=lzos3284dUE "使用 rebirth 项目在服务端进行录制")

```shell
docker run -dit -P --name rebirth_alo7 -v `pwd`/rebirth_alo7/logs:/etc/www/logs -v `pwd`/rebirth_alo7/video:/root/Downloads -e MATERIAL_URL="https://www.alo7.com/en/" -e START_VNC="yes" alo7docker/rebirth
```

### 网页API

在网页加载完毕后，将会注入一些api，供网页使用

```javascript
// 初始化API (5分钟内如果没有调用，则认为任务失败)，确保网页可以正常打开。
rebirth.init();

// 开始进行录制
rebirth.start();

// 暂停录制
rebirth.pause();

// 恢复录制
rebirth.resume();

// 结束录制
rebirth.stop('filename');

// 录制失败
rebirth.fail();

// 设置额外信息，最终信息交付给你自定义的代码
rebirth.setExtraInfo({
  foo: 'bar'
});
```

### 环境变量

它们在 `Dockerfile` 里定义的

* `MATERIAL_URL`: 要录制的 `url`，默认值是 `https://github.com/`
* `START_VNC`: 是否开启 `VNC`，开启为 `yes`，默认值是 `no`
* `VNC_PASSWORD`: `VNC` 连接密码，默认值为 `rebirth`
* `MAX_RECORD_TIME`: 当前录制的最大时间是多少，单位毫秒，默认值为 `7200000`（两小时）

### 如何自定义代码

在 `src/hooks` 目录里，新建文件为 `index.js`，格式如下：

```js
module.exports = {
  /**
   * 完成录制后触发
   *
   * @param {Object} data - 客户端请求主体
   * @return {void | string | Object | number | boolean | Function | Promise.resolve}
   */
  completeRecordAfter: (data) => {
    console.log(data);
    return true;
  },

  // 录制失败后触发
  // 参数和 completeRecordAfter 相同
  failAfter: () => {},
};
```

### 贡献者

感谢这些了不起的人:

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

### 许可证

[MIT](./LICENSE)
