<template>
  <div class="NavConnect">

    <nav>
      <router-link to="/connect">Connexion</router-link>
      <router-link to="/register">Inscription</router-link>
    </nav>
    
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    max-width: 90vw;
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

  .router-link-active{
      background-color: rgba(255, 255, 255, 0.31);
  }
/* FIN nav connexion et inscription */
</style>
