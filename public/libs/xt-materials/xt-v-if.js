window.xtDefine([], function () {
  const component = {
    name: 'VIf',
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
    component
  }
})
