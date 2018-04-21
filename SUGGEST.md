### 开发建议

> webpack 小于 4.x 的版本，ts-loader 不要使用 4.x
ts-loader 4.x 的相关描述

```
TypeScript: 2.4.1+
webpack: 4.x+ (please use ts-loader 3.x if you need webpack 2 or 3 support)
node: 6.11.5 minimum (aligned with webpack 4)
```

#### 增强组件
```
vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
vuex-class：在 vue-class-component 提供 Vuex 的绑定
```

#### UI 组件引入方式

```
通过 main.ts 引入的组件全局注册的 Vue.component(Button) 
webpack 会把相应组件打包到 vendor.js 中
此时各个子组件均可不需要导入就能直接使用
```

```
在组件中通过 
  @Component({
    components: {
      'el-input': Input
    }
  })
局部注册的方式引入的则不会被打包 vendor 仅打入 chunk.js 中，但是其他组件无法直接使用
```

> **注意(不要使用)**
```
import ElementUI from 'element-ui'
Vue.use(ElementUI)
这个方式引入组件库，这会导致项目文件过于庞大
```
