import { requireModules } from '../requireModules'

class XtMaterialsRenderer {
  /** 每一次render时候，进行自增，对container增加一个子元素，挂载到子元素上 */
  public static idx = 0
  /** 封装的require异步加载，返回一个Promise，所以可以使用async/await */
  public static requireModules = requireModules
  /** Vue构造函数，需要使用Vue2.x版本 */
  public Vue: any;
  /** 配置项，预留的接口进行配置 */
  public options: any = 123;
  constructor (Vue: any, options?: any) {
    this.Vue = Vue
    this.options = Object.assign({}, this.options, options)
  }

  /** 进行渲染 */
  render (pagePluginName: string, options: any, ele: Element) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const renderer = this
    const id = `xt-low-code-renderer-container-${++XtMaterialsRenderer.idx}`
    return new Promise((resolve, reject) => {
      try {
        ele.innerHTML = `<div id="${id}"></div>`
        const target = document.querySelector(`#${id}`)!
        window.xtRequire([pagePluginName], function (pagePlugin: any) {
          renderer.Vue.use(pagePlugin)
          resolve(new renderer.Vue(options).$mount(target))
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export { XtMaterialsRenderer }
