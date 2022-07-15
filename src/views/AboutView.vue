<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="toggleValue">切换显示</button>
    <input @blur="render" v-model="id" type="text">
    <div id="container-wrapper">
      <div id="container"></div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { XtMaterialsRenderer } from '@/utils/xt-materials/renderer'
import '../views-test/page1'

export default defineComponent({
  data () {
    const showTag = ref(true)
    const id = ref('')
    const renderer = new XtMaterialsRenderer(window.Vue, {})
    return {
      showTag,
      id,
      renderer
    }
  },
  methods: {
    render () {
      document.querySelector('#container-wrapper')!.innerHTML = '<div id="container">2324</div>'
      const { showTag, id } = this
      this.renderer.render(
        'page1',
        {
          render (h:any) {
            console.log(showTag, id)
            return h('page1', {
              props: {
                value: showTag,
                id: id
              }
            }, ['about-view 传入的插槽234'])
          // return (
          //   <page1 value={true} id="eeeeeeee">
          //     about-view 传入的插槽234
          //   </page1>
          // )
          }
        },
      document.querySelector('#container')!
      )
    },
    toggleValue () {
      this.showTag = !this.showTag
      this.render()
    }
  },
  mounted () {
    // 测试编译生成js
    // (window as any).xtRequire(['ts'], function (aa:any) {
    //   // eslint-disable-next-line no-undef
    //   console.log((window as any).ts)
    //   console.log('aa', aa);
    //   (() => import('@/utils/xt-materials/generator'))()
    // })
  }
})
</script>
