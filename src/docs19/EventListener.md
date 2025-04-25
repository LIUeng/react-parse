# React 中的事件

- 初始化
  - 调用栈
  - 事件代理/时间委托
- 合成事件

## 初始

调用栈分析

- listenToAllSupportedEvents
  - listenToNativeEvent
    - addTrappedEventListener
      - dispatchDiscreteEvent
        - dispatchEvent
          - findInstanceBlockingEvent
          - dispatchEventForPluginEventSystem
            - batchedUpdates$1
              - getNodeFromInstance 获取绑定对象对应的 fiber 节点
              - SyntheticEvent 合成事件
              - getListener
              - createDispatchListener 赋值 { onClick: function }
              - processDispatchQueue 执行
      - dispatchContinuousEvent
      - dispatchEvent

## 合成事件

SystheticEvent

- 浏览器差异
- 事件池机制（17+ 移除）
  - 每次都会实例化 SystheticEventCtor
- 事件委托
  - DOM 变化
- 跨平台

## 思考

> 合成事件的作用

如上

> 绑定事件的元素是如何找到当前的 fiber 节点

fiber 节点 stateNode 对象包含 \_internalPropsKey \_internalInstanceKey 相关的属性，通过绑定的元素查找 fiber
