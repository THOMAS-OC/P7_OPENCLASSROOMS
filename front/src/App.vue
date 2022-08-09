<template>
  <div id="app">

    <!-- Affiche conditionnel de la nav de connexion si page connexion ou inscription active -->
    <template v-if="this.$router.history.current.name == 'connect' || this.$router.history.current.name == 'register' ">
      
      <nav-connect> </nav-connect>

    </template>

    <template v-if="this.$router.history.current.name != 'connect' && this.$router.history.current.name != 'register' ">
      
      <nav-user> </nav-user>

    </template>

    <div class="title__page">
      <transition name="title">
          <h1 key="connect" v-if="this.$router.history.current.name == 'connect'" >Connexion</h1>
          <h1 key="register" v-else-if="this.$router.history.current.name == 'register'" >Inscription</h1>
          <h1 key="home" v-else-if="this.$router.history.current.name == 'home'" >Forum</h1>
          <h1 key="profil" v-else >Mon profil</h1>
      </transition>
    </div>



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

    mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://localhost:3001/images/macNavAnimation.js')
      document.head.appendChild(recaptchaScript)
    },
  
})

</script>


<style>

.title__page{
  width: 40vw;
  height: 50px;
  background-color: #FD2D01;
  color: white;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
  margin: 50px auto;
  overflow: hidden;
}

.title__page h1 {
  line-height: 50px;
}

.title-enter{
  opacity: 0;
  transform: translateX(-100%);
}

.title-enter-active {
  transition-duration: 2s;
}

.title-enter-to{
  transform: translateX(0%);
}


@keyframes title {
  from{
    transform: translateX(-100%);
  }

  to{
    transform: translateX(0%);
  }
}

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
