<template>
  <div class="home">
    <splitpanes :push-other-panes="false">
      <pane>
      <span>1</span>
      </pane>
      <pane  size="60">
        <span>2</span>
      </pane>
      <pane>
        <span>3</span>
      </pane>
    </splitpanes>
  </div>
</template>

<script  lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
    Splitpanes,
    Pane
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="less">
.home{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .splitpanes {background-color: #f8f8f8;}

.splitpanes__splitter {background-color: #ccc;position: relative;}
.splitpanes__splitter:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(0, 187, 255, 0.3);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {opacity: 1;}
.splitpanes--vertical > .splitpanes__splitter:before {left: -10px;right: -10px;height: 100%;}
.splitpanes--horizontal > .splitpanes__splitter:before {top: -10px;bottom: -10px;width: 100%;}
}
</style>
