<!--  -->
<template>
  <div class="drop-item">
    <DragItem :template-node="templateNode">
      <template #node-info>
        <div @click="() => handleCommand('config')">
          {{ templateNode.name }}
        </div>
      </template>
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
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              操作按钮<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="config">
                  <el-tooltip content="唤起配置项" placement="right">配置</el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item command="copy">
                  <el-tooltip content="复制当前节点，在其后添加为弟弟节点" placement="right">复制</el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item command="cut">
                  <el-tooltip content="复制当前节点，添加到“剪切板”" placement="right">剪切</el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item command="paste">
                  <el-tooltip content="拷贝剪切板中的节点，添加至本节点的小儿子节点" placement="right">粘贴</el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item command="up">
                  <el-tooltip content="和哥哥节点交换" placement="right">上移</el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item command="down">
                  <el-tooltip content="和弟弟节点交换" placement="right">下移</el-tooltip>
                </el-dropdown-item>
                <el-dropdown-item command="del">
                  <el-tooltip content="从父亲节点中删除本节点" placement="right">删除</el-tooltip>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
import { Platform } from '@/utils/xt-materials/toolsets'

export default defineComponent({
  name: 'DropItem',
  components: { DragItem },
  props: ['templateNode'],
  data () {
    const platform = inject<Platform>('platform')!
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
      platform,
      dropBefore,
      dropAfter,
      dropUnshift,
      dropPush
    }
  },
  methods: {
    handleCommand (command: string) {
      const actionHelper = this.platform.activeActionHelper!
      switch (command) {
      case 'config':
        this.platform.setActiveTemplateNode(this.templateNode)
        break
      case 'copy':
        actionHelper.copy(this.templateNode)
        break
      case 'up':
        actionHelper.up(this.templateNode)
        break
      case 'down':
        actionHelper.down(this.templateNode)
        break
      case 'cut':
        actionHelper.cut(this.templateNode)
        break
      case 'paste':
        actionHelper.paste(this.templateNode)
        break
      case 'del':
        actionHelper.del(this.templateNode)
        break
      default:
        break
      }
    }
  }
})
</script>

<style scoped lang="less">
.drop-item {
  padding: 5px 0 5px 10px;
  position: relative;
}
.drop-item-target {
  box-sizing: border-box;
  height: 24px;
  font-size: 12px;
  padding: 5px 11px;
  margin-right: 12px;
  position: relative;
  border: 1px dashed #dedede;
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
