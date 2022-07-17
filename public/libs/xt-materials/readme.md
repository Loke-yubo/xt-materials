# xt-materials

这里存放内置的组件的声明 jsSchema

### 模版编写（可行）：

- 选项：template
- 选项： render-creatElement

### 模版编写（不可行）：

- 选项： render-jsx （不可使用该方法，会运行时错误，jsx 的编译时采用的 vue-template-compiler，和真正运行时的 compiler 不兼容）
