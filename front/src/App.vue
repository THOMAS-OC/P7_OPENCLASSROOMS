<template>
  <div id="app">

    <!-- Affiche conditionnel de la nav de connexion si page connexion ou inscription active -->
    <template v-if="this.$router.history.current.name == 'connect' || this.$router.history.current.name == 'register' ">
      
      <nav-connect> </nav-connect>

    </template>

    <template v-if="this.$router.history.current.name != 'connect' && this.$router.history.current.name != 'register' ">
      
      <nav-user> </nav-user>

    </template>

    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<script>
import NavConnect from './components/NavConnect'
import NavUser from './components/NavUser'

export default ({
  components: {
    NavConnect,
    NavUser
  },
})

</script>


<style>

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
}

.v-enter{
  opacity: 0;
}

.v-enter-to{
  opacity: 1;
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
    background-attachment: fixed;
}

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


</style>
