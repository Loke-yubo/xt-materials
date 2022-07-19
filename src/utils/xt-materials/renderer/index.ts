class XtMaterialsRenderer {
  /** Vue构造函数，需要使用Vue2.x版本 */
  Vue: any;
  /** 配置项，预留的接口进行配置 */
  options: any = 123;
  constructor (Vue: any, options?: any) {
    // 创建一个Vue的“子类”，在此基础上进行操作
    this.Vue = Vue
    this.options = Object.assign({}, this.options, options)
  }

  /** 进行渲染 */
  render (pagePluginName: string, options: any, ele: Element) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const renderer = this
    return new Promise((resolve, reject) => {
      try {
        window.xtRequire([pagePluginName], function (pagePlugin: any) {
          renderer.Vue.use(pagePlugin)
          resolve(new renderer.Vue(options).$mount(ele))
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export { XtMaterialsRenderer }
