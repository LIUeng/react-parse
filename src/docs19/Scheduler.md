# React 中的调度 Scheduler

[React Scheduler](././../source/v19.0.0/scheduler.development.js)

## MessageChannel

[MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

React 目前是通过 MessageChannel 达到调度的目的（执行回调函数）

```js
const channel = new MessageChannel();
const port1 = channel.port1;
port1.onmessage = function (cb) {
  cb && cb();
};
const port2 = channel.port2;
port2.postMessage(function () {});
```

## Scheduler 其他

## 堆结构

> React 时间调度采用最小堆形式，堆顶为优先级最高，插入删除操作的时间复杂度均为 O(logn)

- callback
- priorityLevel
  - unstable_IdlePriority 5
  - unstable_ImmediatePriority 1
  - unstable_LowPriority 4
  - unstable_NormalPriority 3
  - unstable_UserBlockingPriority 2
- expirationTime 优先级转换为过期时间，过期时间越小，任务优先级越高
- sortIndex

### 延时队列

延时任务会被暂存到延时队列，到达时间后移入主队列

### 空闲时间

```js
let startTime = -1;
let frameIntervel = 5;
function shouldYieldToHost() {
  return performance.now() - startTime < frameInterval ? !1 : !0;
}
```

- 低优先级
- 高优先级

在低优先级任务函数执行超出 5ms 时，是否让出主线程，实现优先级调度（即空闲时间执行低优先级任务）
