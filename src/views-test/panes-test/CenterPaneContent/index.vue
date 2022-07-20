<!--  -->
<template>
  <div class="center-pane">
    <div style="display: flex">
      <el-input v-model="name"></el-input>
      <el-button @click="createTab">新建组件/页面</el-button>
    </div>
    <el-tabs
      v-if="Array.isArray(platform.componentDefinitions) && platform.componentDefinitions.length > 0"
      v-model="activeTabName"
      style="padding: 0 20px"
      type="card"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane v-for="item in platform.componentDefinitions" :key="item.name" :label="item.name" :name="item.name">
        <DropItem :templateNode="item._templateNode"></DropItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ComponentDefinition, Platform } from '@/utils/xt-materials/toolsets'
import { defineComponent, inject, ref } from 'vue'
import { DropItem } from '../components'

export default defineComponent({
  name: 'CenterPaneContent',
  components: { DropItem },
  watch: {
    activeTabName (newVal: string) {
      console.log(newVal)
      this.platform.setActiveTemplateNode(null)
      const activeComponentDefinition = this.platform.componentDefinitions.find((comDef) => comDef.name === newVal)
      if (!activeComponentDefinition) return
      this.platform.setActiveComponentDefinition(activeComponentDefinition)
    }
  },
  data () {
    const platform = inject<Platform>('platform')!
    const name = ref('test-page-1')
    const activeTabName = ref('')
    const removeTab = (targetName: string) => {
      // 先过滤
      const idx = platform.componentDefinitions.findIndex((comDef) => comDef.name === targetName)
      if (idx === -1) return
      platform.componentDefinitions = platform.componentDefinitions.filter((comDef) => comDef.name !== targetName)
      // 如果删除的是激活的tab的时候，设置下一个激活的componentDefinition
      if (activeTabName.value !== targetName) return
      platform.setActiveTemplateNode(null)
      const nextActiveComponentDefinition =
        platform.componentDefinitions[idx] || platform.componentDefinitions[idx - 1] || null
      platform.setActiveComponentDefinition(nextActiveComponentDefinition)
      activeTabName.value = (nextActiveComponentDefinition && nextActiveComponentDefinition.name) || ''
    }
    const createTab = () => {
      const rootNode = {
        name: 'template',
        children: [
          {
            name: 'rootNode-xt-page-fund',
            children: [
              {
                name: 'child-1',
                children: [
                  { name: 'child-1-1', children: [] },
                  { name: 'child-1-2', children: [] }
                ]
              },
              {
                name: 'child-2',
                children: [{ name: 'child-2-1', children: [] }]
              }
            ]
          }
        ]
        // eslint-disable-next-line no-undef
      } as unknown as XtMaterials.TemplateNode
      const componentDefinition = new ComponentDefinition({ name: name.value })
      // componentDefinition._templateNode = rootNode
      platform.addComponentDefinitions(componentDefinition)
      platform.setActiveComponentDefinition(componentDefinition)
      activeTabName.value = componentDefinition.name
    }
    return {
      platform,
      name,
      activeTabName,
      removeTab,
      createTab
    }
  },
  methods: {}
})
</script>

<style scoped lang="less">
.center-pane {
  height: 100%;
  overflow: auto;
}
</style>
