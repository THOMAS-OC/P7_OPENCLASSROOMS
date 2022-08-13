<template>
  <div id="app">

    <!-- Affiche conditionnel de la nav de connexion si page connexion ou inscription active -->
    <template v-if="this.$router.history.current.name == 'connect' || this.$router.history.current.name == 'register' ">
      
      <nav-connect> </nav-connect>

    </template>

    <template v-if="this.$router.history.current.name != 'connect' && this.$router.history.current.name != 'register' ">
      
      <nav-user> </nav-user>

    </template>

    <section class="title__page">
      <transition name="title">
          <h1 key="connect" v-if="this.$router.history.current.name == 'connect'" >Connexion</h1>
          <h1 key="register" v-else-if="this.$router.history.current.name == 'register'" >Inscription</h1>
          <h1 key="home" v-else-if="this.$router.history.current.name == 'home'" >Forum</h1>
          <h1 key="profil" v-else >Mon profil</h1>
      </transition>
    </section>

    <transition>
      <router-view/>
    </transition>

    <the-footer></the-footer>

    <button v-on:click="scrollToTop" class="scrollToTop">
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import NavConnect from './components/NavConnect'
import NavUser from './components/NavUser'
import TheFooter from './components/TheFooter'

export default ({
  components: {
    NavConnect,
    NavUser,
    TheFooter
  },

  methods:{
    scrollToTop(){
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
      })
    }
  }
  
})

</script>


<style>

.scrollToTop{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #FD2D01;
  cursor: pointer;
  border: none;
  color: white;
  font-size: 35px;
  position: fixed;
  right: 50px;
  bottom: 50px;
}

.title__page{
  width: 40vw;
  height: 70px;
  background-color: #4e5166bb;
  color: white;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
  margin: 50px auto;
  overflow: hidden;
  border: 2px solid white;
  border-left: none;
  min-width: 350px;
}

.title__page h1 {
  line-height: 70px;
  letter-spacing: 10px;
  font-weight: bolder;
  font-style: italic;
  font-size: 40px;
  user-select: none;
}

.title-enter{
  opacity: 0;
  transform: translateX(-100%);
}

.title-enter-active {
  transition-delay: 1.5s;
  transition-duration: 1.5s;
}

.title-enter-to{
  transform: translateX(0%);
}

.title-leave-active {
  transition-duration: 1.5s;
}

.title-leave-to{
    transform: translateX(100%);
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
  transform: translate(-100vw);
}

.v-enter-to{
  transition-duration: 1.5s;
  transition-delay: 1.5s;
  transform: translate(0vw);
  opacity: 1;
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
    overflow-x: hidden;
    max-width: 100vw;
}

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;

}


</style>
