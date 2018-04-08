<template>
  <div id="app">
    <app-header @clear-message="clearMessage()"/>
    <bootstrap-alert v-if="appAlert" @clear-message="clearMessage()" :message="appAlert.message" :type="appAlert.type" :dismissable="appAlert.dismissable"/>
    <div id="router-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import BootstrapAlert from '@/components/alert_messages/bootstrap-alert.vue'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'bootstrap-alert': BootstrapAlert
  },
  methods: {
    clearMessage () {
      this.$store.dispatch('unsetAppAlert')
    }
  },
  computed: {
    appAlert () {
      return this.$store.getters.appAlert
    }
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
#router-content {
  margin-top: 50px;
}

.btn-theme {
  background-color: #521751;
  border-color: #521751;
  color: #fdffff;
}
</style>
