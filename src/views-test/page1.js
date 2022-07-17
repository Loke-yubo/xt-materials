/** 页面组件-子组件-1，用于临时组件的场景 */
// TODO 命名的逻辑，看怎么避免重复
window.xtDefine('page1-child-component-1', ['xt-v-if'], function (...vuePlugins) {
  const component = {
    name: 'page1-child-component-1',
    props: ['value'],
    template: `
      <div>
        <xt-v-if :value="value">哈哈哈啊阿啊阿啊 v-if</xt-v-if>
        page1-child-component-1 哈哈哈啊阿啊阿啊
        <hr />
      </div>
    `
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

/** 页面组件 */
window.xtDefine('page1', ['page1-child-component-1', 'xt-v-if', 'xt-style-global', 'xt-style-scoped'], function (...vuePlugins) {
  const component = {
    name: 'xt-boss-page1',
    template:
      `<div class="page1" :id="id.value">
        <page1-child-component-1 :value="value.value"></page1-child-component-1>
        <xt-style-scoped :options="styleScopedOptions">
          这个是page1的内容,默认的id为"--id",传入的id为:{{id.value}}
          <i-button class="my-button" v-on:click="handleClick">i-button</i-button>
          <button class="my-button">默认的按钮</button>
          <button id="my-button2">默认的按钮my-button2</button>
          <xt-v-if :value="value.value">
            调用了xt-v-if组件
            <xt-style-global content=".aaa {color: red} #xt-style-default-id-1 {color: yellow} #container{color: green}">aaaaa---style</xt-style-global>
          </xt-v-if>
          <input v-model="inputVal" type="text"></input>
          <slot></slot>
        </xt-style-scoped>
      </div>
      `,
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
      const { id: id_, value: value_ } = this
      const styleScopedOptions = [
        {
          isScoped: true,
          selector: '.my-button',
          styleContent: '{color: purple}'
        },
        {
          isScoped: true,
          selector: '#my-button2',
          styleContent: '{color: lightgray}'
        },
        {
          isScoped: false,
          selector: '#my-button2',
          styleContent: '{color: gray}'
        }
      ]
      return {
        inputVal: '',
        styleScopedOptions,
        id_,
        value_
      }
    },
    methods: {
      handleClick () {
        console.log('点击了按钮')
      }
    },
    watch: {
      'id.value' (newVal) {
        console.log('id.value发生了改变', this.id, this.inId)
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
