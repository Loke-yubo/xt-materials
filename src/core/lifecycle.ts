import { App, createApp } from 'vue'
import AppComponent from '../App.vue'
import router from '../router'
import store from '../store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/**
 * 提供子应用的生命周期钩子
 * @returns
 */
export function lifeCycleProvider () {
  let instance: App<Element>

  return {
    /**
     * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
     * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async bootstrap () {},

    /**
     * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
     */
    async mount (props: any) {
      console.log(props)
      instance = render(props)
    },

    /**
     * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
     */
    async unmount (props: any) {
      instance && instance.unmount()
    }

    /**
     * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
     */
    // async update(props) { }
  }
}

/**
 * render
 * @param {*} props
 * @returns
 */
export function render (
  props: { container: HTMLElement | string } = { container: '#boss' }
) {
  const { container } = props
  const target =
    container === '#boss'
      ? '#boss'
      : (container as HTMLElement).querySelector('#boss')!

  const app = createApp(AppComponent)
  app.use(store).use(router).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount(target)
  return app
}
