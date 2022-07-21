<!--  -->
<template>
  <div class="left-pane component-list">
    <DragItem
      v-for="(componentDefinition, index) in platform.componentDefinitionList"
      :key="index"
      class="component-list-item"
      :template-node="componentDefinition._templateNodeWhenClone"
      :isInSourceView="true"
    >
      {{ componentDefinition.name }}
    </DragItem>
  </div>
</template>

<script lang="ts">
import { Platform } from '@/utils/xt-materials/toolsets'
import { defineComponent, inject } from 'vue'
import { DragItem } from '../components'

export default defineComponent({
  name: 'LeftPaneContent',
  components: { DragItem },
  data () {
    const platform = inject<Platform>('platform')!
    return { platform }
  },
  methods: {}
})
</script>

<style scoped lang="less">
.component-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  height: 100%;
  overflow: auto;
}
.component-list-item {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  margin: 10px;
  text-align: center;
}
</style>
