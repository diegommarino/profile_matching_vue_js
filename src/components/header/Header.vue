<template>
  <header id="header">
    <div class="logo">
      <router-link to="/"><img id="nav-logo" src="@/assets/shuffle_white.png"></router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!isLogedIn">
          <router-link to="/" exact>Home</router-link>
        </li>
        <li v-if="!isLogedIn">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="!isLogedIn">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="isLogedIn">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li v-if="isLogedIn">
          <router-link to="/profile-form">Edit Profile</router-link>
        </li>
        <li v-if="isLogedIn">
          <button class="logout" @click.prevent="logout()">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('signout')
    }
  },

  computed: {
    isLogedIn () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style scoped>
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #521751;
  padding: 0 20px;
  margin-bottom: 50px;
}

.logo {
  text-align: left;
}

#nav-logo{
  width: 10%;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: white;
}

li a:hover,
li a:active,
li a.router-link-active {
  color: #fa923f;
}

.logout {
  background-color: transparent;
  border: none;
  font: inherit;
  color: white;
  cursor: pointer;
}
</style>
