<template>
  <div id="app">
  <app-header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    'app-header': Header
  },
  created () {
    if (this.$store.getters.isAuthenticated) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.token
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
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

.btn-theme {
  background-color: #521751;
  border-color: #521751;
  color: #fdffff;
}
</style>
