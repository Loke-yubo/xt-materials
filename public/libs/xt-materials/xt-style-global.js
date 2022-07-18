window.xtDefine('xt-style-global', function () {
  let idx = 0
  const getdefaultId = () => `xt-style-default-id-${++idx}`
  const component = {
    name: 'xt-style-global',
    props: {
      content: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: getdefaultId()
      }
    },
    /** 由于在“template”中编写style元素的话，在编译时会过滤掉，所以直接采用render函数的写法 */
    render (h) {
      const { id, content } = this
      return h('style', { attrs: { id, type: 'text/css' } }, content)
    }
  }
  return {
    install (Vue) {
      Vue.component(component.name, component)
    },
    components: [component]
  }
})
