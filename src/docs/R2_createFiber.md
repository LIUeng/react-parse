# CreateFiber

初始化会创建 root fiber，子节点是如何创建 fiber 的

## root fiber 调用栈

- createRoot$1
- createRoot
- createContainer
- createFiberRoot
- createHostRootFiber

## 调用栈

> 更新任务

- updateContainer
- scheduleUpdateOnFiber
- ensureRootIsScheduled
- scheduleCallback$1
- unstable_scheduleCallback
- requestHostCallback
- schedulePerformWorkUntilDeadline

`postmessage(async)`

> 多种创建 fiber 调用栈

①

- performWorkUntilDeadline
- flushWork
- workLoop
- performConcurentWorkOnRoot
- renderRootSync
- perpareFreshStack
- createWorkInProgress

②

- performWorkUntilDeadline
- flushWork
- workLoop
- performConcurentWorkOnRoot
- renderRootSync
- workLoopSync
- performUnitOfWork
- beginWork$1
- assignFiberPropertiesInDEV

③

- performWorkUntilDeadline
- flushWork
- workLoop
- performConcurentWorkOnRoot
- renderRootSync
- workLoopSync
- performUnitOfWork
- beginWork$1
- beginWork
- updateHostRoot
- reconcileChildren
- reconcileChildFibers
- reconcileSingleElement
- createFiberFromElement
- createFiberFromTypeAndProps

# Notice

- createFiber 渲染创建的次数
