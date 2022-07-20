<!--  -->
<template>
  <div class="drag-item" :ref="drag">
    <slot name="action-bar"></slot>
    <!-- <div class="tips" style="position: relative">
      <span>{{ templateNode.name }}</span>
    </div> -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ActionHelper } from '@/utils/xt-materials/toolsets/ActionHelper'
import { defineComponent, inject } from 'vue'
import { useDrag } from 'vue3-dnd'
import { ItemTypes, DropResult, DropTypes } from './enum'

export default defineComponent({
  props: ['templateNode', 'isInSourceView'],
  data () {
    const actionHelper = inject<ActionHelper>('actionHelper')!
    const [collect, drag] = useDrag({
      type: ItemTypes.ComponentDefinition,
      item: () => ({
        templateNode: this.templateNode
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>()
        if (item && dropResult) {
          switch (dropResult.dropType) {
          case DropTypes.dropBefore:
            actionHelper.addByBefore(dropResult.templateNode, this.templateNode)
            break
          case DropTypes.dropAfter:
            actionHelper.addByAfter(dropResult.templateNode, this.templateNode)
            break
          case DropTypes.dropUnshift:
            actionHelper.addByUnShift(dropResult.templateNode, this.templateNode)
            break
          case DropTypes.dropPush:
            actionHelper.addByPush(dropResult.templateNode, this.templateNode)
            break
          default:
            return
          }
          console.log(item, dropResult)
        }
      }
    })
    return {
      actionHelper,
      collect,
      drag
    }
  }
})
</script>

<style scoped lang="less">
.drag-item {
  border: 1px solid #dedede;
  border-right: 0;
  padding: 5px;
  padding-right: 0;
}
</style>
