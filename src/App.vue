<template>
  <div id="app">
  <app-header/>
    <img id="initial-logo" src="./assets/shuffle.png">
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
export default {
  name: 'App',
  components: {
    'app-header': Header
  }
}
</script>

<style>
body, html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#initial-logo {
  width: 20%;
}
</style>
