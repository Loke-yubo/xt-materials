<!--  -->
<template>
  <div class="center-pane">
    <DropItem :templateNode="componentDefinition._templateNode">
    </DropItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DropItem from './DropItem.vue'

export default defineComponent({
  components: { DropItem },
  props: ['componentDefinition'],
  data () {
    return {
    }
  },
  methods: {}
})
</script>

<style scoped lang="less">
.center-pane{
  height: 100%;
  overflow: auto;
}
</style>
