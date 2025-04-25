# Fiber

- fiber 属性
- fiber 链表

## 属性

- [tag](./fiberTag.md)
- key
- siblings 兄弟节点
- child 子节点
- return 父节点
- stateNode
- type 组件类型
- elementType 组件类型
- index
- refCleanup
- ref
- pendingProps
- dependencies
- momoizedState
- updateQueue
- momoizedProps
- mode
- subtreeFlags
- flags
- deletions
- childLanes
- lanes
- alternate 新旧 Fiber 树对比（共享部分节点）
- acutualDuration
- treeBaseDuration
- selfBaseDuration

## 链表

双缓冲机制(如何使用一个链表保证新旧 fiber 的 diff)

### 两棵树

- current 树
  - 当前已提交到 DOM 的 fiber 树
- workInProgress 树
  - 正在构建的 fiber 树

### alternate 指针

每个 fiber 节点通过 alternate 指向另一棵树的节点

```js
// current fiber
let workInProgress = current.alternate;
workInProgress.alternate = current;
current.alternate = workInProgress;
```

## 链表的形成

调用栈

- createRoot
  - updateContainerImpl
    - enqueueUpdate
    - scheduleUpdateOnFiber
      - ensureRootIsScheduled
        - scheduleImmediateTask(processRootScheduleMicrotask)
        - processRootScheduleMicrotask
          - scheduleTaskForRootDuringMicrotask
            - performWorkOnRootViaSchedulerTask
              - performWorkOnRoot
                - renderRootSync
                  - prepareFreshStack
                    - createWorkInProgress(fiberNode alternate 属性的处理)
                      - createFiber
                  - workLoopSync
                    - performUnitOfWork
                      - runWithFiberInDEV(unitOfWork, beginWork)
                        - beginWork(fiberNode 其他属性 child return siblings 属性的处理)
