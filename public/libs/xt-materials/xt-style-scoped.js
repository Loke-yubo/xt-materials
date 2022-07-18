window.xtDefine('xt-style-scoped', function () {
  let idx = 0
  const getDataKey = () => `data-xt-style-${new Date().getTime()}-${++idx}`
  const component = {
    name: 'xt-style-scoped',
    props: {
      /**
       * 形如：{selector: string; styleContent: string; isScoped: boolean}
       * styleContent需要包含大括号“{}”
       */
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        /** 挂载在data上的值 */
        dataKey: getDataKey()
      }
    },
    methods: {
      /** 拼接计算总的style内容 */
      getTotalStyleContent () {
        const _prefix = `[${this.dataKey}]`
        const _styleItems = this.options.map(item => {
          const { isScoped, selector, styleContent } = item
          if (isScoped) {
            return `${_prefix} ${selector} ${styleContent}`
          } else {
            return `${selector} ${styleContent}`
          }
        })
        return _styleItems.join('\n')
      }
    },
    /** 由于在“template”中编写style元素的话，在编译时会过滤掉，所以直接采用render函数的写法 */
    render (h) {
      return h('div', { attrs: { [this.dataKey]: true } }, [
        h(
          'style',
          { attrs: { type: 'text/css' } },
          this.getTotalStyleContent()
        ),
        this.$slots.default
      ])
    }
  }
  return {
    install (Vue) {
      Vue.component(component.name, component)
    },
    components: [component]
  }
})
