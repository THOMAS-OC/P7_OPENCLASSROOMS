<template>
  <div class="NavUser">

    <nav>
      <router-link to="/">FORUM</router-link>
      <router-link to="/profil">MON PROFIL</router-link>
      <router-link to="/connect">OFF</router-link>
    </nav>
    
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* nav user */

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

  .router-link-active{
      background-color: rgba(255, 255, 255, 0.31);
  }
/* FIN nav user */
</style>
