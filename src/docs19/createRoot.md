# ReactDOM createRoot

```jsx
import { createRoot } from 'react-dom';
const App = <div>Hello World</div>;
const _root = createRoot(document.getElementById('root'));
_root.render(<App />);
```

## 渲染流程

### 首次渲染

- createRoot
  - updateContainerImpl
    - enqueueUpdate
    - scheduleUpdateOnFiber
      - ensureRootIsScheduled
        - scheduleImmediateTask(processRootScheduleMicrotask) 渲染机制的实现 MessageChannel
        - processRootScheduleMicrotask
          - scheduleTaskForRootDuringMicrotask
            - performWorkOnRootViaSchedulerTask - 调用 Schduler.unstable_scheduleCallback 执行回调
              - performWorkOnRoot
                - renderRootSync fiber 节点属性的赋值(fiber 链表生成)
                  - prepackFreshStack
                  - workLoopSync
                - commitRootWhenReady
                  - commitRoot
                    - commitRootImpl
                      - commitBeforeMutationEffects
                      - commitMutationEffects
                        - commitMutationEffectsOnFiber
                          - recursivelyTraverseMutationEffects
                          - commitReconciliationEffects
                            - runWithFiberInDEV(commitPlacement)
                              - commitPlacement
                                - insertOrAppendPlacementNode
                                - insertOrAppendPlacementNodeIntoContainer
                          - commitHookEffectListMount
                      - commitLayoutEffects
          - flushSyncWorkAcrossRoots_impl
    - entangleTransitions

### 更新阶段

[React useState](./useState.md)
