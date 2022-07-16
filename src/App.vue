<template>
  <nav class="nav_fix">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </nav>
  <main class="main-fix"><router-view/></main>

</template>
<script  lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class HomeView extends Vue {}
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

.main-fix {
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
