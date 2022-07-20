<template>
  <nav class="nav_fix">
    <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/page1-test">page-test</router-link> |
    <router-link to="/panes-test">panes-test</router-link>
    </div>
  </nav>

  <DndProvider class="dnd-provider" :backend="HTML5Backend">
    <main class="main-fix"><router-view/></main>
  </DndProvider>

</template>
<script  lang="ts">
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    DndProvider
  },
  data () {
    return {
      HTML5Backend
    }
  }
})
</script>

<style lang="less" scoped>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}
#boss {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav_fix {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.main-fix{
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  bottom: 0;
}
</style>
