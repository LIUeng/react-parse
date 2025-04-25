# useEffect

- 初始化
- 执行时机
  - 调用栈
- 更新
  - 依赖
  - 销毁

```jsx
import { useEffect } from 'react';
function Counter() {
  useEffect(() => {
    console.log('effect');
    return () => {
      console.log('destroy');
    };
  }, []);
  return (
    <>
      <h1>0</h1>
      <button>ADD</button>
    </>
  );
}
```

## 初始化

```js
ReactSharedInternals.H = HooksDispatcherOnMountInDEV;
```

执行函数组件 -> 执行 useEffect 函数

- ...
  - updateFunctionComponent
    - renderWithHooks
      - 与 react 中的对象变量 ReactSharedInternals.H 交互
      - HooksDispatcherOnMountInDEV
        - useEffect
          - mountHookTypesDev
          - mountEffect
            - mountEffectImpl
              - mountWorkInProgressHook
              - pushEffect

## 执行时机

元素节点挂载完执行

- ...
- performWorkOnRootViaSchedulerTask
  - flushPassiveEffects 执行一次
  - ...
  - commitRootImpl
    - flushPassiveEffects 这里执行了两次
      - 第一次（同步判断状态）
      - 第二次（MessageChannel postMessage 任务执行 useEffect callback）
        - commitPassiveMountOnFiber
        - recursivelyTraversePassiveMountEffects
        - commitHookPassiveMountEffects
        - commitHookEffectListMount
        - runWithFiberInDEV
          - callCreateInDEV

## 更新

判断是否要执行 useEffect

```js
ReactSharedInternals.H = HooksDispatcherOnUpdateInDEV;
```

### 销毁

> 组件更新会执行上一次的 useEffect 中返回的函数（销毁）

更新之前，存在上一个执行销毁函数，会先执行销毁函数，再进行依赖分析是否执行当前更新

### 依赖

通过 Object.is 判断，是否执行 useEffect 函数

```js
let objectIs = Object.is;
function areHookInputsEqual(nextDeps, prevDeps) {
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
```
