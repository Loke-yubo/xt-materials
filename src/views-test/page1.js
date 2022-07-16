window.xtDefine('page1', ['xt-v-if'], function (...vuePlugins) {
  console.log('vuePlugins', vuePlugins)
  const component = {
    name: 'Page1',
    template:
      '<div class="page1" :id="id">这个是page1的内容,默认的id为"--id",传入的id为:{{id.value}}<div v-if="value.value"><slot>显示插槽</slot></div><input v-model="inputVal" type="text"></input></div>',
    props: {
      value: {
        type: Object,
        default: () => ({ value: true })
      },
      id: {
        type: Object,
        default: () => ({ value: '--id' })
      }
    },
    data () {
      return {
        inputVal: ''
      }
    },
    watch: {
      'id.value' (newVal) {
        console.log('id.value发生了改变', newVal)
      },
      'inputVal' (newVal) {
        console.log('inputVal发生了改变', newVal)
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
