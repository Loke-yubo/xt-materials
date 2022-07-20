<!--  -->
<template>
  <div class="drag-item" :ref="drag">
    <div class="drag-item-container">
      <div class="node-info"><slot name="node-info"></slot></div>
      <div class="action-bar"><slot name="action-bar"></slot></div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Platform } from '@/utils/xt-materials/toolsets'
import { defineComponent, inject } from 'vue'
import { useDrag } from 'vue3-dnd'
import { ItemTypes, DropResult, DropTypes } from './enum'

export default defineComponent({
  props: ['templateNode', 'isInSourceView'],
  data () {
    const platform = inject<Platform>('platform')!
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
            platform.activeActionHelper!.addByBefore(dropResult.templateNode, this.templateNode)
            break
          case DropTypes.dropAfter:
            platform.activeActionHelper!.addByAfter(dropResult.templateNode, this.templateNode)
            break
          case DropTypes.dropUnshift:
            platform.activeActionHelper!.addByUnShift(dropResult.templateNode, this.templateNode)
            break
          case DropTypes.dropPush:
            platform.activeActionHelper!.addByPush(dropResult.templateNode, this.templateNode)
            break
          default:
            return
          }
          console.log(item, dropResult)
        }
      }
    })
    return {
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
.drag-item-container{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  .node-info{
    font-size: 12px;
    width: 150px;
    white-space: nowrap;
    padding-right: 10px;
  }
  .action-bar{
    width: 100%;
    overflow: auto;
  }
}
</style>
