<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="toggle">切换</button>
    <input v-model="id.value" type="text">
    <div id="container"></div>
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue'
import { XtMaterialsRenderer } from '@/utils/xt-materials/renderer'
import { requireModules } from '@/utils/xt-materials/requireModules'
import '../views-test/page1'

export default defineComponent({
  data () {
    return {
      showTag: { value: true },
      id: { value: '原始 id' },
      pageVm: null as any
    }
  },
  methods: {
    async render () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const aboutVm = this
      const { showTag, id } = aboutVm
      document.querySelector('#container')!.innerHTML = '<div id="inner_container"></div>'
      const [getVue] = await requireModules(['getVue-2.6.14'])
      const renderer = new XtMaterialsRenderer(getVue(), {})
      aboutVm.pageVm = await renderer.render('page1', {
        name: 'Page11111-test',
        template: `
          <xt-boss-page1 :value="showTag" :id="id">
            <div>外部传入的内容1</div>
            <xt-v-if :value="true">xt-v-if里面的内容</xt-v-if>
          </xt-boss-page1>
        `,
        data () {
          return {
            showTag,
            id
          }
        }
      }, document.querySelector('#inner_container')!)
      // window.xtRequire(['getVue-2.6.14'], function (getVue:any) {

      // })
    },
    toggle () {
      this.showTag.value = !this.showTag.value
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    'id.value' (newVal) {
      console.log('外层监听，id.value发生了改变', newVal)
      // console.log(this.pageVm, this.pageVm.id, newVal)
      // console.log((this.pageVm as any).$options.render)
    }
  }
})
</script>

<style scoped>
.about{
  color: red;
}
</style>
