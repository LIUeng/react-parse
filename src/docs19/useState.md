# useState

- 初始
- 执行
  - 栈
- 更新
  - 批量

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count + 1);
    // setCount(v => v + 1);
  };
  return (
    <>
      <h1>{count}</h1>
      <button onClick="handleCount">ADD</button>
    </>
  );
}
```

## 初始

赋值交互

```js
ReactSharedInternals.H = {
  useState: HooksDispatcherOnMountInDEV.useState,
};
```

## 执行

> 栈

- renderWithHooks
- mountHookTypesDev --- hooks 执行链
  - mountState
    - mountStateImpl
    - dispatchSetState --- currentlyRenderingFiber$1
      - dispatchSetStateInternal
        - scheduleUpdateOnFiber

## 更新

当调用 `useState` 函数返回的函数 dispatch `setState`

```js
ReactSharedInternals.H = {
  useState: HooksDispatcherOnUpdateInDEV.useState,
};
```

> 栈

- renderWithHooks
- updateHookTypesDev
  - updateReducer
    - updateReducerImpl
    - dispatchSetState --- currentlyRenderingFiber$1
      - dispatchSetStateInternal
        - scheduleUpdateOnFiber

## 思考

> useState 返回的 [state, dispatch] dispatch 是如何绑定当前组件

源码解读

当 workInProgress 是函数组件时，执行函数式组件进行 currentlyRenderingFiber$1 = workInProgress 绑定

- updateFunctionComponent
- renderWithHooks
- mountStateImpl
  - dispatchSetState

```js
dispatch = dispatchSetState.bind(null, currentlyRenderingFiber$1, queue);
```

> React 中的批量更新，为什么只更新一次，而函数形式却能更新多次

```jsx
// ...
const [count, setCount] = useState(0);
setCount(count + 1);
setCount(count + 1);
//...
// 一次更新结果为 0 + 1 = 1
setCount((v) => v + 1);
setCount((v) => v + 1);
// 一次更新结果为 0 + 1 + 1 = 2
```

1. 同步执行完 setCount 两次，做的操作其实 setCount(1) setCount(1) 结果
2. 函数形式可完成批量执行

源码分析

```js
// 同步执行
// 第一次执行 setCount 这里会把 hasEagerState 设置为 true，后续不会执行了
function dispatchSetStateInternal() {
  // 这里执行两次
  // 为的是形成 hook useState 更新队列 hook.queue
}

// 执行完毕
// MessageChannel -> postMessage 执行更新操作
function updateReduerImpl(hook, current, reducer) {
  let pendingQueue = hook.baseState;
  let update = current;
  do {
    // 非函数形式取的还是之前的值
    // 函数形式这里每次会得到最新的值
    pendingQueue = update.hasEagerState ? update.eagerState : reduce(pendingQueue, update.action);
  } while (update !== null && update.next !== null);
  // 更新完毕更新最新值
  hook.memoizedState = pendingQueue;
}
```
