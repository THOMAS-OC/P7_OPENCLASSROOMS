<template>

    <nav>
      
      <router-link to="/home"><i class="fa-solid fa-comments"> </i></router-link>
      <router-link to="/profil"><i class="fa-solid fa-user"></i></router-link>
      <router-link @click.native.capture="disconnect()" to=""><i class="fa-solid fa-right-from-bracket"></i></router-link>
      <!-- <button v-on:click="test()">test</button> -->
    </nav>

</template>

<script>

export default {

  name: 'NavUser',
  methods:{

    disconnect(){
      this.$http.get("https://localhost:3001/api/auth/logout") // Suppression du cookie d'authentification
      .then(res => {
        console.log(res);
        window.localStorage.clear() // Vidage de vueX
        this.$store.commit('clearUser')
        this.$router.push("connect")
      })
      .catch(err => console.log(err))
    },

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* nav user */

  nav{
    display: flex;
    margin: 50px auto 0px auto;
    width: 1400px;
    max-width: 90vw;
    border-bottom: 2px solid white;
    font-size: 50px;
    justify-content: space-around;
    min-height: 100px;
    align-items: center;
    letter-spacing: 15px;
  }

  span{
    background-color: transparent !important;
    border: none !important;
    text-shadow: none;
  }

  nav a {
    color: #ff5b3b;
    text-shadow: 0px 0px 10px white;
    text-decoration: none;
    height: 100%;
    line-height: 100px;
    width: 50%;
    text-align: center;
    cursor: pointer;
  }

  nav a:hover{
    color: white;
  }

  .router-link-active :not(.fa-right-from-bracket){
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: white;
    text-shadow: 0px 0px 10px #FFD7D7;
    border-bottom: 2px solid rgb(255, 255, 255);
  }
  
/* FIN nav user */
</style>
