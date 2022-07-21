<!--  -->
<template>
  <!-- 右侧面板 -->
  <div class="right-pane">
    <div v-if="platform.activeTemplateNode">
      {{ platform.activeTemplateNode.name }}
      <h3>插槽属性slot</h3>
      <div v-for="(item, index) in platform.activeTemplateNode['v-slot']" :key="index">
        <el-row>
          <el-col :span="12">{{ item.label }}</el-col>
          <el-col :span="12">
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
          </el-col>
        </el-row>
      </div>
      <h3>静态属性attrs</h3>
      <div v-for="(item, index) in platform.activeTemplateNode.attrs" :key="index">
        <el-row>
          <el-col :span="12">{{ item.label }}</el-col>
          <el-col :span="12">
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
          </el-col>
        </el-row>
      </div>
      <h3>动态属性props</h3>
      <div v-for="(item, index) in platform.activeTemplateNode['v-bind']" :key="index">
        <el-row>
          <el-col :span="12">{{ item.label }}</el-col>
          <el-col :span="12">
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
          </el-col>
        </el-row>
      </div>
      <h3>事件监听events</h3>
      <div v-for="(item, index) in platform.activeTemplateNode['v-on']" :key="index">
        <el-row>
          <el-col :span="12">{{ item.label }}</el-col>
          <el-col :span="12">
            <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="12">v-if</el-col>
        <el-col :span="12">
          <el-input v-model="platform.activeTemplateNode['v-if']"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">v-show</el-col>
        <el-col :span="12">
          <el-input v-model="platform.activeTemplateNode['v-show']"></el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Platform } from '@/utils/xt-materials/toolsets'
import { defineComponent, inject } from 'vue'
// const directives =

export default defineComponent({
  name: 'RightPaneContent',
  components: {},
  data () {
    const platform = inject<Platform>('platform')!
    return { platform }
  },
  methods: {}
})
</script>

<style scoped lang="less">
.right-pane {
  font-size: 12px;
  padding: 5px;
}
</style>
