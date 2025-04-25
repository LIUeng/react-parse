# React 优先级

二进制表示法

## 源码

```js
function getLabelForLane(lane) {
  if (lane & 1) return 'SyncHydrationLane';
  if (lane & 2) return 'Sync';
  if (lane & 4) return 'InputContinuousHydration';
  if (lane & 8) return 'InputContinuous';
  if (lane & 16) return 'DefaultHydration';
  if (lane & 32) return 'Default';
  if (lane & 64) return 'TransitionHydration';
  if (lane & 4194176) return 'Transition';
  if (lane & 62914560) return 'Retry';
  if (lane & 67108864) return 'SelectiveHydration';
  if (lane & 134217728) return 'IdleHydration';
  if (lane & 268435456) return 'Idle';
  if (lane & 536870912) return 'Offscreen';
  if (lane & 1073741824) return 'Deferred';
}

function getHighestPriorityLanes(lanes) {
  var pendingSyncLanes = lanes & 42;
  if (0 !== pendingSyncLanes) return pendingSyncLanes;
  switch (lanes & -lanes) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return lanes & 4194176;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return lanes & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return console.error('Should have found matching lanes. This is a bug in React.'), lanes;
  }
}
```

## SyncLane

| 对应调度器优先级       | 描述                           | 二进制                       |
| ---------------------- | ------------------------------ | ---------------------------- |
| ImmediatePriority (99) | 优先级最高，需要及时响应的操作 | 0b00000000000000000000000001 |

## InputContinuousLane

| 对应调度器优先级          | 描述                         | 二进制                       |
| ------------------------- | ---------------------------- | ---------------------------- |
| UserBlockingPriority (98) | 连续响应的操作（滚动，拖拽） | 0b00000000000000000000000100 |

## DefaultLane

| 对应调度器优先级    | 描述                                        | 二进制                       |
| ------------------- | ------------------------------------------- | ---------------------------- |
| NormalPriority (97) | 默认行为（useState, useReducer, useEffect） | 0b00000000000000000000010000 |

## TransitionLane

| 对应调度器优先级    | 描述                                     | 二进制                       |
| ------------------- | ---------------------------------------- | ---------------------------- |
| NormalPriority (97) | 可延迟的非关键更新（数据加载，页面跳转） | 0b00000000000000000000010000 |

## RetryLane

| 对应调度器优先级 | 描述                    | 二进制                       |
| ---------------- | ----------------------- | ---------------------------- |
| LowPriority (96) | Suspense 重试或任务恢复 | 0b00000000000000100000000000 |

## IdleLane

| 对应调度器优先级  | 描述                                         | 二进制                       |
| ----------------- | -------------------------------------------- | ---------------------------- |
| IdlePriority (95) | 完全不影响交互的后台任务（日志上报、预加载） | 0b00100000000000000000000000 |
