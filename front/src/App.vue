<template>
  <div id="app">
    <!-- Affiche conditionnel de la navbar si page connexion ou inscription active -->
    <nav v-if="this.$router.history.current.name == 'connect' || this.$router.history.current.name == 'register' ">

      <router-link to="/connect">Connexion</router-link>
      <router-link to="/register">Inscription</router-link>
      
    </nav>
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<style>
/* nav connexion et inscription */

  nav{
    display: flex;
    margin: 0px auto;
    width: 1000px;
    background-color: rgba(76, 76, 76, 0.603);
    border: 2px solid white;
    font-size: 50px;
    border-radius: 15px;
    color: white;
    justify-content: space-around;
    height: 100px;
    align-items: center;
  }

  nav a {
    color: white;
    text-decoration: none;
    height: 100%;
    line-height: 100px;
    width: 50%;
    text-align: center;
    cursor: pointer;
  }

  nav a:hover{
    background-color: rgba(255, 255, 255, 0.31);
  }

/* FIN nav connexion et inscription */

.router-link-active{
    background-color: rgba(255, 255, 255, 0.31);
}
.v-enter{
  opacity: 0;
  transform: translate(-100vw);
}

.v-enter-to{
  opacity: 1;
  transform: translate(0vw);
  transition-duration: 1.5s;
}

.v-leave{
  opacity: 1;
}

.v-leave-to{
  transform: translate(100vw);
  opacity: 0;
    transition-duration: 1.5s;
}

body {
    width: 100vw;
    height: 100vh;
    background-image: url("assets/background.jpg");
    background-position: center;
    background-size: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
