### 四级联动组件设计构思
#### 数据格式

```javascript
[
  {
    100000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    200000: {
      label: xxx,
      key: xxx,
      value: xxx
    }
  },
  {
    110000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    120000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    210000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    220000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
  },
  {
    111000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    121000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    211000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    221000: {
      label: xxx,
      key: xxx,
      value: xxx
    },
  },
  {
    111100: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    121100: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    211100: {
      label: xxx,
      key: xxx,
      value: xxx
    },
    221100: {
      label: xxx,
      key: xxx,
      value: xxx
    },
  }
]

```
#### 返回数据
```javascript
[
  {label: xxx, key: xxx, value: xxx} || null,
  {label: xxx, key: xxx, value: xxx} || null,
  {label: xxx, key: xxx, value: xxx} || null,
  {label: xxx, key: xxx, value: xxx} || null,
]
```

业务需要自己根据返回数据组将需要返回的数据

#### 组件逻辑

接受参数
```
// 显示的数据
data: Array
// 是否包含“全部”选项发
hasAll: boolean 默认为true
// 显示几项
cols: Array
// 是否强制联动,(必须前面选了后面才能选)， 默认false
force: boolean 暂时不实现
// 默认选中
default: Array
// 没项label
colLabel: Array<string>
// 修改回调 返回结果 （vm(组件this) result）
change: Function
```
对外方法
// 重置
reset: Function
