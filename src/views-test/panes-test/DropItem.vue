<!--  -->
<template>
  <div class="drop-item">
    <DragItem :template-node="templateNode">
      {{templateNode.name}}
      <template #action-bar>
        <div class="action-bar">
          <el-tooltip content="拖放到此处，复制为本节点的哥哥节点" placement="top">
            <div class="drop-item-target" :ref="dropBefore">gege</div>
          </el-tooltip>
          <el-tooltip content="拖放到此处，复制为本节点的大儿子节点" placement="top">
            <div class="drop-item-target" :ref="dropUnshift">大儿</div>
          </el-tooltip>
          <el-tooltip content="拖放到此处，复制为本节点的小儿子节点" placement="top">
            <div class="drop-item-target" :ref="dropPush">小儿</div>
          </el-tooltip>
          <el-tooltip content="拖放到此处，复制为本节点的弟弟节点" placement="top">
            <div class="drop-item-target" :ref="dropAfter">didi</div>
          </el-tooltip>
          <el-button>配置</el-button>
          <el-tooltip content="复制当前节点，在其后添加为弟弟节点" placement="top">
            <el-button @click="copy">复制</el-button>
          </el-tooltip>
          <el-tooltip content="复制当前节点，添加到“剪切板”" placement="top">
            <el-button @click="cut">剪切</el-button>
          </el-tooltip>
          <el-tooltip content="拷贝剪切板中的节点，添加至本节点的小儿子节点" placement="top">
            <el-button @click="paste">粘贴</el-button>
          </el-tooltip>
          <el-tooltip content="和哥哥节点交换" placement="top">
            <el-button @click="up">上移</el-button>
          </el-tooltip>
          <el-tooltip content="和弟弟节点交换" placement="top">
            <el-button @click="down">下移</el-button>
          </el-tooltip>
          <el-tooltip content="从父亲节点中删除本节点" placement="top">
            <el-button @click="del">删除</el-button>
          </el-tooltip>
        </div>
      </template>
      <div v-if="Array.isArray(templateNode.children) && templateNode.children.length > 0">
        <DropItem v-for="(itemNode, index) in templateNode.children" :key="index" :template-node="itemNode"></DropItem>
      </div>
    </DragItem>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useDrop } from 'vue3-dnd'
import { ItemTypes, DropTypes } from './enum'
import DragItem from './DragItem.vue'
import { ActionHelper } from '@/utils/xt-materials/toolsets/ActionHelper'

export default defineComponent({
  name: 'DropItem',
  components: { DragItem },
  props: ['templateNode'],
  data () {
    const actionHelper = inject<ActionHelper>('actionHelper')!
    const makeDropResultFn = (dropType: DropTypes) => {
      return () => ({
        dropType,
        templateNode: this.templateNode
      })
    }
    const [collectBefore, dropBefore] = useDrop({
      accept: [ItemTypes.ComponentDefinition],
      drop: makeDropResultFn(DropTypes.dropBefore)
    })
    const [collectAfter, dropAfter] = useDrop({
      accept: [ItemTypes.ComponentDefinition],
      drop: makeDropResultFn(DropTypes.dropAfter)
    })
    const [collectUnshift, dropUnshift] = useDrop({
      accept: [ItemTypes.ComponentDefinition],
      drop: makeDropResultFn(DropTypes.dropUnshift)
    })
    const [collectPush, dropPush] = useDrop({
      accept: [ItemTypes.ComponentDefinition],
      drop: makeDropResultFn(DropTypes.dropPush)
    })
    return {
      actionHelper,
      dropBefore,
      dropAfter,
      dropUnshift,
      dropPush
    }
  },
  methods: {
    copy () {
      this.actionHelper.copy(this.templateNode)
    },
    up () {
      this.actionHelper.up(this.templateNode)
    },
    down () {
      this.actionHelper.down(this.templateNode)
    },
    cut () {
      this.actionHelper.cut(this.templateNode)
    },
    paste () {
      this.actionHelper.paste(this.templateNode)
    },
    del () {
      this.actionHelper.del(this.templateNode)
    }
  }
})
</script>

<style scoped lang="less">
.drop-item {
  padding: 5px 0 5px 10px;
  margin: 5px 0 5px 10px;
  position: relative;
}
.drop-item-target {
  box-sizing: border-box;
  height: 24px;
  font-size: 12px;
  padding: 5px 11px;
  margin-right: 12px;
  position: relative;
  border: 1px solid #dedede;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
.action-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
