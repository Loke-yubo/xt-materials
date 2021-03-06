# xt-materials

## 概念

- 平台，编译器、渲染器、加载器
- 调用者，宿主、渲染器、加载器

### 宿主

- 本低代码方案采取“宿主环境”和“渲染环境”解耦的方案
  - 本低代码的主要作用（职责）：
    - 组件（插件）市场（包括插件的开发、插件的模块化管理）
    - 页面的快速搭建（主要是搭建模版、样式、简单逻辑的实现、复杂逻辑/数据的调用）
  - 低代码生成的页面不处理：1、页面路由；2、状态管理；3、“复杂”的业务逻辑
  - 复杂的业务逻辑（包括数据、和数据的处理）由渲染器顶层注入，低代码生成的页面组件的 props、inject 进行获取、执行
  - 如果低代码暂时解决不了的问题（比如复杂的配置项），可以尝试采用顶层注入的方式解决
- 宿主需要提供一个 dom 元素，来挂载渲染器渲染的 Vue 实例
- 宿主需要提供一些 props、provide，即注入一些复杂的（在低代码平台“不好生成”、“不好维护”的）属性
- 宿主需要提供 template or render 函数，来进行低代码页面插件的渲染
  - 注意 render 函数的 jsx 写法不支持，因为编译时和运行时的 vue-template-compiler 不一样

### 模块化方案（加载器）

- 使用遵循 amd 规范的 requirejs
- 平台生成的 or 手动编写的 都是”遵循 requirejs 规范“的“Vue 插件”的”js 文件“
- 在”js“文件中，可以”define 多个模块“，可以是：
  - 组件插件，用于提供给第三方使用的
  - 页面插件，用于渲染页面的
  - 页面插件的子插件，用于给”页面插件“临时使用的”子插件“
  - 以上插件的”排列组合“，不过需要注意依赖 and 依赖的 id 不重复的问题 // TODO 后续要考虑依赖的管理？？
- js 文件管理规范：
  - 项目本地采用 json/js 文件配置
  - 托管平台（比如 OSS）保存文件 + 数据库 保存依赖的映射 // TODO 后面再说吧
  - 更新策略
    - 本地文件采用文件替换
    - 云端文件采用文件上传，更新数据库映射
    - 组件版本号？？
- 插件开发方案：
  - 在开发插件的时候，如果开发的是“组件插件”的话，最好:
    - 也编写一个“测试组件插件的插件”，当做测试用例，进行自测哈
    - 根据本低代码平台对组件插件的定义，编写一些额外的配置项（XtMaterials.ConfigHelper），帮助使用者的“可视化配置”

### 平台方案

- 组件列表视图
  - 来源于本地，比如说内置的组件，配置的远端组件
  - 来自于云端，调用接口获取的组件列表
- 画布视图
  - 不实时渲染，而是采用线框图，用户在组件列表视图、画布视图、源码视图上进行操作
  - 点击按钮进行渲染
- 配置视图
  - 每一个组件，在调用时的配置选项，进行可视化配置
- 源码视图
  - 根据用户选择的组件、组件上的配置，生成源码，可以直接生成源码
  - 可以根据源码进行渲染
  - 源码的变更不会触发画布视图的改变 // TODO 现在只保留 画布视图 + 配置视图 -> 源码视图 的转换，后面再考虑双向监听更改
- 交互方案
  - tabpane
  - vue-draggable
  - iview-plus
  - ...

### 编译器方案

- es5 编译方案：采用 ts 的编译器，生成 es5 的代码（主要原因是 babel 线上运行时比较麻烦，而 ts 有现成的，参考[https://www.tslang.cn/play/index.html](https://www.tslang.cn/play/index.html)）
- 代码混淆、加密等方案：// TODO 后面再说吧

### 渲染器方案

- 采用 getVue 获取 Vue 构造函数，注意 getVue 是全局的，而 Vue 不是全局的，这是为了在项目中能够“使用多个版本的 Vue（目前只支持 Vue2.x.x），每个版本的 Vue 可以有多个 Vue 构造函数，并且在每个 Vue 上 use 不同的插件，达到千 Vue 千面的效果”
- “加载一个页面插件”，然后使用“new Vue”创建一个 Vue 实例，挂载到 dom 上

### 内置组件

- xt-v-if
- xt-style-scoped
- xt-style-global
- xt-iview-table-column or 改造 iview 的 table 组件

## 注意点

- 顶层传入的数据，如果要在低代码的页面中也保持响应性，需要在 data 中手动新增一个组件实例对 props 等的引用，以达到 reactive 的效果
- 再次说明，渲染器中传入的组件选项，不支持 render 函数的 jsx 用法（编译时、运行时的 vue-template-compiler 不一致）

## 版本计划

- 开发低代码的各模块，使用 vue3 搭建低代码平台，实现“组件仓库”，实现客资项目中页面的开发。
- 在本地插件的基础上，搭建“云端插件管理平台”，实现“组件市场”，并推广。
