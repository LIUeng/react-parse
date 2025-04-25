# 组件

> 针对函数型组件进行分析

```jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleCount}>ADD</button>
    </>
  );
}
```

- 组件执行的时间
  - Counter 是什么时候执行的
- 组件执行后的状态
  - Counter 执行完有什么变化

## 执行调用栈

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
                          - updateFunctionComponent(执行函数组件)
                          - 其他类型的组件执行
