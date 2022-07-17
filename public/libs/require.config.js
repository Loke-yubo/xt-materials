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
  paths['getVue-2.6.14'] = '/libs/getVue-2.6.14.min'
  paths['xt-v-if'] = '/libs/xt-materials/xt-v-if'
  paths['xt-style-global'] = '/libs/xt-materials/xt-style-global'
  paths['xt-style-scoped'] = '/libs/xt-materials/xt-style-scoped'
  // paths['xt-style-scoped'] = 'https://unpkg.com/vue@next?a=3'
  /** require挂载配置的path */
  window.xtRequire.config({ paths })
})()
