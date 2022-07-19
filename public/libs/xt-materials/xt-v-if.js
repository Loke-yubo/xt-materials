window.xtDefine('xt-v-if', function () {
  const component = {
    name: 'xt-v-if',
    template: '<div v-if="value"><slot></slot></div>',
    props: {
      value: {
        type: Boolean,
        default: true
      }
    }
  }
  return {
    install (Vue) {
      Vue.component(component.name, component)
    },
    components: [component]
  }
})
