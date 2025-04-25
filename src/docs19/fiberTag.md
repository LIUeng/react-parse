# FiberTag 类型

## 对应表

> fiber 对应的 tag 类型

> fiber.type VS fiber.tag

| fiber tag 类型                         | 对应值 |
| -------------------------------------- | ------ |
| 其他(函数组件)                         | 0      |
| ClassComponent                         | 1      |
| FiberRoot 默认值                       | 3      |
| Portal                                 | 4      |
| 原生标签                               | 5      |
| Text                                   | 6      |
| Fragment                               | 7      |
| StrictMode                             | 8      |
| Consumer                               | 9      |
| Provider/Context                       | 10     |
| ForwardRef                             | 11     |
| Profiler                               | 12     |
| Suspense                               | 13     |
| Memo                                   | 14     |
| SimpleMemo                             | 15     |
| Lazy                                   | 16     |
| DehydratedFragment                     | 18     |
| SuspenseList                           | 19     |
| Scope                                  | 21     |
| Offscreen                              | 22     |
| Cache                                  | 24     |
| TracingMarker                          | 25     |
| host hositable(link/meta/style/script) | 26     |
| html/head/body                         | 27     |
| 不存在                                 | 29     |

## 调用栈

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
                  - workLoopSync
                    - performUnitOfWork
                      - runWithFiberInDEV(unitOfWork, beginWork)
                        - beginWork(判断 fiber 类型)
                          - createFiberFromTypeAndProps
                            - createFiber
