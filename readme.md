# React 解析

- FiberNode 节点为链表

## render

### 堆栈

> React

- performWorkUntilDeadline
- flushWork
- workLoop

> ReactDom

- performConcurrentWorkOnRoot
- renderRootSync
  - prepareFreshStack
  - createWorkInProgress
- workLoopSync
- performUnitOfWork
- beginWork$1
- beginWork 通过 workInProgress 处理 fiberNode
  - updateHostRoot
  - processUpdateQueue
- updateFunctionComponent
- renderWithHooks

```jsx
import ReactDOM **from** 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<div>Hello World!</div>);
```

### 详细渲染过程的调用方法


> ReactDOM

- createRoot
  - createContainer 创建 fiberRoot
- render
  - updateContainer
    - enqueueUpdate 创建更新队列
    - scheduleUpdateOnFiber 计划更新
      - ensureRootIsScheduled 确认更新
        - performConcurrentWorkOnRoot 绑定渲染函数
          - finishConcurrentRender 渲染 fiberNode，以下为相关渲染关联的函数
            - commitRoot
              - commitRootImpl
                - commitMutationEffects
                  - commitMutationEffectsOnFiber
        - scheduleCallback$1 渲染回调函数
          - scheduleCallback 这里与 React 暴露的方法交互，传入回调 unstable_scheduleCallback

> React

unstable_scheduleCallback 执行渲染回调函数流程

- requestHostCallback
  - scheduledHostCallback
  - schedulePerformWorkUntilDeadline 使用 MessageChannel 方式执行回调
    - performWorkUntilDeadline - port.onmessage 轮询执行任务队列
      - 渲染策略 setImmediate MessageChannel setTimeout 依次兼容

## useEffect

> React

- performWorkUntilDeadline
- flushWork
- workLoop

> ReactDOM

- flushPassiveEffects
- flushPassiveEffectsImpl
- commitPassiveMountEffects
- commitPassiveMountEffects_begin
- commitPassiveMountEffects_complete
- commitPassiveMountOnFiber
- commitHookEffectListMount

## useLayoutEffect

同步执行当前任务（浏览器 paint 之前）

## useState

初始化

- useState
- mountState
- dispatchSetState

更新

- useState
- updateState
- updateReducer

> React

- performWorkUntilDeadline
- flushWork
- workLoop

> ReactDOM

- performConcurrentWorkOnRoot
- renderRootSync
- workLoopSync
- performUnitOfWork
- beginWork$1
- beginWork
- mountIndeterminateComponent
- renderWithHooks 更新渲染

## 绑定事件

> 通过重写合成事件找到绑定事件的节点

初始化

- listenToAllSupportedEvents
- listenToNativeEvent
- addTrappedEventListener
- createEventListenerWrapperWithPriority
  - addEventCaptureListenerWithPassiveFlag
  - addEventCaptureListener
  - addEventBubbleListenerWithPassiveFlag
  - addEventBubbleListener
- dispatchDiscreteEvent
- dispatchEvent
- dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
- findInstanceBlockingEvent
- dispatchEventForPluginEventSystem

### 合成事件

重写原生事件

- SyntheticEventCtor

## useTransition

中断当前任务（并发能力）

- 管理更新优先级
- 提升用户体验
- 避免界面闪烁