(() => {
  /**
   * 重新命名下，防止webpack打包的模块对require、define的判断，互不影响
   * 需要在引入requirejs之后立即调用
   */
  window.xtRequire = window.require
  window.xtDefine = window.define
  delete window.require
  delete window.define
  // require的配置
  const paths = {}
  /**
   * 插件平台需要使用的依赖：
   * ts：编译es6为es5代码
   */
  paths.ts = '/libs/ts-playground/typescriptServices'
  paths.vue = '/vue.min'
  /**
   * 内置继承的插件依赖
   */
  paths['xt-v-if'] = '/libs/xt-materials/xt-v-if'
  /** require挂载配置的path */
  window.xtRequire.config({ paths })
})()
