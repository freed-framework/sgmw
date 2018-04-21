# tsvue-demo

> Vue2.x+ + Vuex + Typescript 示例
- 整体基于 [vue-cli 2.x](https://github.com/vuejs/vue-cli) 进行创建
- 官方 Vuex
- 支持 [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)、[vue-class-component](https://github.com/vuejs/vue-class-component) 及 [vuex-class](https://github.com/ktsn/vuex-class) 组件式写法
- tslint
- [precommit](https://github.com/observing/pre-commit) git commit 钩子添加
- 包含 [element-ui](https://github.com/ElemeFE/element) 示例（2.0 版本，支持按需加载）
- 包含 sass 示例
- 包含 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)
- 添加 skeleton.vue 页面骨架
- 支持 jsx 语法和 tsx 使用 [ts-loader](https://github.com/TypeStrong/ts-loader)
- 包含本地 mock 方式

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 联调服务 -> sales-mxj.com:8080
npm run test
> 修改本地 hosts 为与 *sales* 有任意匹配的，后端会通过该字段匹配权限，切记[hosts 需要和 config/index.js 中的 test 配置一样]

# build for production with minification
npm run build
```

#### [代码风格指南](https://cn.vuejs.org/v2/style-guide/)

#### [其他建议](https://github.com/denglingbo/ts-vue-demo/blob/master/SUGGEST.md)

#### 关于 vscode 格式化文件
> prettier 升级之后 singleQuote, semi 会坑
```
{
    "editor.tabSize": 2,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "prettier.singleQuote": true,
    "prettier.semi": false
}
```


