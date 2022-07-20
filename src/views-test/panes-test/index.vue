<template>
  <div class="home">
    <splitpanes :push-other-panes="false">
      <pane>
        <LeftPaneContent :platform="platform"></LeftPaneContent>
      </pane>
      <pane size="60">
        <CenterPaneContentVue :component-definition="componentDefinition" :platform="platform"></CenterPaneContentVue>
      </pane>
      <pane>
        <span>3</span>
      </pane>
    </splitpanes>
  </div>
</template>

<script lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { defineComponent } from 'vue'
import { Platform } from '@/utils/xt-materials/toolsets/Platform'
import LeftPaneContent from './LeftPaneContent.vue'
import CenterPaneContentVue from './CenterPaneContent.vue'
import { ActionHelper } from '@/utils/xt-materials/toolsets/ActionHelper'
import { ComponentDefinition } from '@/utils/xt-materials/toolsets/ComponentDefinition'

export default defineComponent({
  name: 'panes-test',
  components: {
    Splitpanes,
    Pane,
    LeftPaneContent,
    CenterPaneContentVue
  },
  provide () {
    return {
      actionHelper: this.actionHelper
    }
  },
  methods: {
    handleDrag (comDef: any) {
      console.log(comDef)
    }
  },
  data () {
    const platform = new Platform()
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
              children: [
                { name: 'child-2-1', children: [] }
              ]
            }
          ]
        }
      ]
      // eslint-disable-next-line no-undef
    } as unknown as XtMaterials.TemplateNode
    const componentDefinition = new ComponentDefinition()
    componentDefinition._templateNode = rootNode
    const actionHelper = new ActionHelper(rootNode)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa-1' } as any)
    platform.addComponentDefinition({ name: 'aaaa-2' } as any)
    platform.addComponentDefinition({ name: 'aaaa-3' } as any)
    platform.addComponentDefinition({ name: 'aaaa-4' } as any)
    platform.addComponentDefinition({ name: 'aaaa-5' } as any)
    platform.addComponentDefinition({ name: 'aaaa-6' } as any)
    platform.addComponentDefinition({ name: 'aaaa-7' } as any)
    platform.addComponentDefinition({ name: 'aaaa-8' } as any)
    platform.addComponentDefinition({ name: 'aaaa-9' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    platform.addComponentDefinition({ name: 'aaaa' } as any)
    return {
      platform,
      actionHelper,
      componentDefinition
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .splitpanes {
    background-color: #f8f8f8;
  }

  .splitpanes__splitter {
    background-color: #ccc;
    position: relative;
  }
  .splitpanes__splitter:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: opacity 0.4s;
    background-color: rgba(0, 187, 255, 0.3);
    opacity: 0;
    z-index: 1;
  }
  .splitpanes__splitter:hover:before {
    opacity: 1;
  }
  .splitpanes--vertical > .splitpanes__splitter:before {
    left: -10px;
    right: -10px;
    height: 100%;
  }
  .splitpanes--horizontal > .splitpanes__splitter:before {
    top: -10px;
    bottom: -10px;
    width: 100%;
  }
}
</style>
