<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="toggle">切换</button>
    <input v-model="id.value" type="text">
    <div id="container-wrapper">
      <div id="container"></div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue'
import { XtMaterialsRenderer } from '@/utils/xt-materials/renderer'
import '../views-test/page1'

export default defineComponent({
  data () {
    const renderer = new XtMaterialsRenderer(window.Vue, {})
    return {
      renderer,
      showTag: { value: true },
      id: { value: '原始 id' },
      pageVm: null as any
    }
  },
  methods: {
    async render () {
      document.querySelector('#container-wrapper')!.innerHTML = '<div id="container"></div>'
      const { showTag, id } = this
      this.pageVm = await this.renderer.render('page1', {
        render (h:any) {
          console.log(showTag, id)
          return h('page1', {
            props: {
              value: showTag,
              id: id
            }
          })
        }
      }, document.querySelector('#container')!)
    },
    toggle () {
      this.showTag.value = !this.showTag.value
      // this.render()
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    'id.value' (newVal) {
      console.log('外层监听，id.value发生了改变', newVal)
      console.log(this.pageVm, this.pageVm.id, newVal)
    }
  }
})
</script>
