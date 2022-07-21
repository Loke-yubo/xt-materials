<template>
  <div class="home">
    <splitpanes :push-other-panes="false">
      <pane>
        <LeftPaneContent></LeftPaneContent>
      </pane>
      <pane size="60">
        <CenterPaneContent></CenterPaneContent>
      </pane>
      <pane>
        <RightPaneContent></RightPaneContent>
      </pane>
    </splitpanes>
  </div>
</template>

<script lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { defineComponent } from 'vue'
import { Platform, ComponentDefinition } from '@/utils/xt-materials/toolsets'
import LeftPaneContent from './LeftPaneContent/index.vue'
import CenterPaneContent from './CenterPaneContent/index.vue'
import RightPaneContent from './RightPaneContent/index.vue'

export default defineComponent({
  name: 'panes-test',
  components: {
    Splitpanes,
    Pane,
    LeftPaneContent,
    CenterPaneContent,
    RightPaneContent
  },
  provide () {
    return {
      platform: this.platform
    }
  },
  methods: {
    handleDrag (comDef: any) {
      console.log(comDef)
    }
  },
  data () {
    const platform = new Platform()
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-1' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-2' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-3' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-4' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-5' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-6' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-7' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-8' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-9' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-11' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-12' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-13' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-14' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-15' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-16' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-17' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-18' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-19' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-20' }))
    platform.addComponentDefinition(new ComponentDefinition({ name: 'a-21' }))
    return {
      platform
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
