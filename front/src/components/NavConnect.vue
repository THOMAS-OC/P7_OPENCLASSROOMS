<template>

    <nav>
      <router-link to="/connect">Connexion</router-link>
      <router-link to="/register">Inscription</router-link>
    </nav>
    
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
    background-color: #a9a9a9a5;
    border: 2px solid white;
    font-size: 30px;
    border-top: none;
    color: white;
    justify-content: space-around;
    height: 100px;
    align-items: center;
    max-width: 95vw;
    overflow: hidden;
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

  nav a:nth-child(1) {
    border-right: 2px solid white;
  }

  nav a:hover{
    background-color: #fd2b01a3;
  }

  .router-link-active{
    background-color: #fd2b01a3;
    line-height: 100px;
    color: white;
    text-shadow: 0px 0px 10px #FFD7D7;
  }
/* FIN nav connexion et inscription */
</style>
