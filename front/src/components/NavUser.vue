<template>

    <nav>
      
      <router-link aria-label="Lien forum" to="/home"><i class="fa-solid fa-comments"> </i></router-link>
      <router-link aria-label="Lien vers mon profil" to="/profil"><i class="fa-solid fa-user"></i></router-link>
      <router-link aria-label="Deconnexion" @click.native.capture="disconnect()" to=""><i class="fa-solid fa-right-from-bracket"></i></router-link>
      <!-- <button v-on:click="test()">test</button> -->
    </nav>

</template>

<script>

export default {

  name: 'NavUser',
  methods:{

    disconnect(){
      this.$http.get("http://localhost:3000/api/auth/logout") // Suppression du cookie d'authentification
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
    background-color: #ff441fcd;
    display: flex;
    width: 100vw;
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
    color: white;
    text-shadow: 0px 0px 10px white;
    text-decoration: none;
    height: 100%;
    line-height: 100px;
    width: 50%;
    text-align: center;
    cursor: pointer;
    transition-duration: 0.5s;
  }

  nav a:hover{
    font-size: 60px;
    color: white;
  }

  .router-link-active :not(.fa-right-from-bracket){
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: white;
    text-shadow: 0px 0px 10px #FFD7D7;
    border-bottom: 5px solid #ffffff;
  }
  
/* FIN nav user */
</style>
