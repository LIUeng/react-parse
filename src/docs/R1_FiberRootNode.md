# FiberRootNode

> 根节点是一个 Fiber 节点

## 调用栈

```js
// root dom
let root = ReactDom.createRoot(document.getElementById('root'));
root.render(/* component */);
```

> 渲染经历的的一个过程

- createRoot
- createContainer
- createFiberRoot
- createHostRootFiber --- root.current --- createFiber
- updateContainer
  - onScheduleRoot
  - requestEventTime
  - requestUpdateLane
  - mark
  - getContextForSubtree
  - createUpdate
  - enqueueUpdate
    - enqueueConcurrentClassUpdate
      - pushConcurrentUpdateQueue
      - markUpdateLaneFromFiberToRoot
  - scheduleUpdateOnFiber
    - checkForNestedUpdates
    - markRootUpdated
    - ensureRootIsScheduled
      - performConcurrentWorkOnRoot
        - finishConcurrentRender
        - commitRoot
          - commitRootImpl
            - commitMutationEffects
              - commitMutationEffectsOnFiber
                - recursivelyTraverseMutationEffects
                - commitReconciliationEffects
                  - commitPlacement
                    - insertOrAppendPlacementNodeIntoContainer
                      - insertInContainerBefore
                      - appendChildToContainer
  - entangleTransitions

## FiberRootNode

```js
// instance fiber root node
let fiberRootNode = new FiberRootNode();
```

- callbackPriority --- 优先级
- context --- 上下文
- containerInfo --- 原始 root dom
- current --- FiberNode
- effectDuration
- entangledLanes
- entanglements --- 长度 32 位的数组 0 1 组成
- eventTimes --- 长度 32 位的数组 0 1 组成
- expirationTimes --- 长度 32 位的数组
- expiredLanes
- finishedLanes
- finishWork
- identifierPrefix
- memoizeUpdates
- mutableReadLanes
- mutableSourceEagerHydrationData
- onRecoverableError
- passiveEffectDuration
- pendingChildren
- pendingContext
- pendingLanes
- pendingUpdatersLaneMap
- pingCache
- suspendedLanes
- tag
- timeoutHandle
- \_debugRootType

## FiberNode

```js
// create fiber
let fiberNode = new FiberNode();
```

- actualDuration
- actualStartTime
- alternate - FiberNode
- child --- FiberNode
- childLanes
- deletions
- elementType
- flags
- index
- key
- lanes
- memoizedProps
- memoizedState
  - cache
  - element
    - $$typeof
    - key
    - props
    - ref
    - type
    - \_owner
    - \_store
    - \_self --- readonly
    - \_source --- readonly
  - isDyhydrated
  - pendingSuspenseBoundaries
  - transitions
- mode
- pendingProps
- ref
- return
- selfBaseDuration
- sibling
- stateNode --- FiberRootNode
- subtreeFlags
- tag
- treeBaseDuration
- type
- updateQueue
  - baseState
    - cache
    - element
    - isDehydrated
    - pendingSusppenseBoundaries
    - transitions
  - effects
  - fisrtBaseUpdate
  - lastBaseUpdate
  - shared
    - pending
    - interleaved
    - lanes
- \_debugHookTypes
- \_debugNeedsRemount
- \_debugOwner
- \_debugSource
