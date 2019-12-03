## rebirth

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
docker run -dit -P --name rebirth_alo7 -v `pwd`/rebirth_alo7/logs:/etc/www/logs -v `pwd`/rebirth_alo7/video:/root/Downloads -e MATERIAL_URL="https://www.alo7.com/en/" -e START_VNC="yes" rebirth:1.0.0
```

### 网页API

在网页加载完毕后，将会注入一些api，供网页使用

```javascript
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

### 业务运用

> 以下是我们公司的运用场景

我们是一个在线教育的公司。在实际业务场景中有一个需求是把上课过程录制下来，并进行 `AI` 分析，生成本节课的精彩视频，供学生及老师查看。

因为我们的应用是 `Electron` 开发的，所以一开始我们使用的是在老师端启动一个屏幕录制，把上课过程录制下来，但是这样做有一个缺点，就是严重依赖了老师的电脑设备及网络带宽，导致我们公司在招聘老师的过程中，电脑性能也是一个非常重要的考察目标。

为了招聘到更多优秀的老师，避免因为非老师自身问题导致的没有招聘，所带来的影响。从而我们研发出 `Rebirth` 项目。

我们的做法是把上课页面完整的复制一份(这里称作 `replay`)，同时在上课过程中，记录下学生和老师的动作行为(鼠标移动、鼠标点击、键盘打字、课件翻页、老师及学生摄像头的画面等)，再根据这些动作行为数据，在 `replay` 里进行一次复现，在复现过程中由 `Rebirth` 进行录制。从而达到降低老师设备及网络带宽的要求，而且我们一节课可以为公司节省 **6~8** 元人民币的开销，因为之前屏幕录制使用的是第三方服务。

### 贡献者

感谢这些了不起的人:


### 许可证

[MIT](./LICENSE)
