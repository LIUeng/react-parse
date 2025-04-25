# setState

状态变化，数据更新

## useState 调用栈

> 更新相关调用栈

- dispatchDiscreteEvent
- dispatchEvent
- dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
- dispatchEventFormPluginEventSystem
- batchedUpdates
- batchedUpdates$1
- (anonymous)
- dispatchEventForPlugins
- processsDispatchQueue
- processDispatchQueueItemsInOrder
- executeDispatch
- invokeGuardedCallbackAndCatchFirstError
- invokeGuardedCallback
- invokeGuardedCallbackDev
- callCallback

`倒序`

> 更新（批量更新）

- dispatchSetState
  - enqueueConcurrentHookUpdate
  - scheduleUpdateOnFiber
    - ensureRootIsScheduled
      - scheduleMicrotask 微任务 Promise
  - entangleTransitionUpdate
