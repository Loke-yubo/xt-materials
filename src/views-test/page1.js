window.xtDefine('page1', ['xt-v-if'], function (...vuePlugins) {
  console.log('vuePlugins', vuePlugins)
  const component = {
    name: 'Page1',
    template:
      '<div class="page1" :id="id">这个是page1的内容,默认的id为5432,传入的id为:{{id}}<div v-if="value"><slot>显示插槽</slot></div></div>',
    props: {
      value: {
        type: Boolean,
        default: true
      },
      id: {
        type: String,
        default: '5432'
      }
    }
  }
  return {
    install (Vue) {
      if (Array.isArray(vuePlugins) && vuePlugins.length > 0) {
        vuePlugins.forEach((plugin) => Vue.use(plugin))
      }
      Vue.component(component.name, component)
    },
    component
  }
})
