<template>
  <header id="header">
    <div class="logo">
      <router-link to="/"><img id="initial-logo" src="@/assets/shuffle_white.png"></router-link>
    </div>
    <nav>
      <ul>
        <li>
          <a href="#">Sign Up</a>
        </li>
        <li>
          <a href="#">Sign In</a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
        <li>
          <button class="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
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
  }

  .logo {
    width: 20%;
    text-align: left;
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
