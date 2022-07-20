<!--  -->
<template>
  <div class="left-pane component-list">
    <DragItem
      v-for="(comDef, index) in platform.componentDefinitionList"
      :key="index"
      class="component-list-item"
      :template-node="actionHelper.getTemplateNodeByComponentDefinition(comDef)"
      :isInSourceView="true"
    >
      {{ comDef.name }}
    </DragItem>
  </div>
</template>

<script lang="ts">
import { ActionHelper } from '@/utils/xt-materials/toolsets/ActionHelper'
import { defineComponent, inject } from 'vue'
import DragItem from './DragItem.vue'

export default defineComponent({
  components: { DragItem },
  props: {
    platform: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    const actionHelper = inject<ActionHelper>('actionHelper')!
    return { actionHelper }
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
