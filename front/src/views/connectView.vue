<template>
  <div class="TheConnection">

    <!-- <nav>
      <router-link to="/connect">Connexion</router-link>
      <router-link to="/register">Inscription</router-link>
    </nav> -->

    <h1>Se connecter sur groupomania</h1>
    <form v-on:submit.prevent="connect">

        <div>

            <input placeholder="Email" type="email" name="" id="email" v-model="email">
            <input placeholder="Password" type="password" name="" id="password" v-model="password">
        
        </div>
            
        <input type="submit" value="Se connecter">

    </form>

  </div>
</template>

<script>

export default {
  name: 'TheConnection',

  data(){
    return {
        email : "",
        password : "",
    }
  },

  props: {
    msg: String
  },

  created: function () {
    document.title = "Connexion / GROUPOMANIA";
    this.$http.get("http://localhost:3000/api/auth/logout")
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },

  methods:{


    connect(){

      if (this.email && this.password){
            this.$http.post("http://localhost:3000/api/auth/login", {
              password : this.password,
              email : this.email
      })

      .then(response => {
            console.log(response.data.token);
            window.localStorage.setItem("jwt", response.data.token)
            this.$router.push("home")
      })

      .catch(error => {
            if(error.response.data.message == "Utilisateur introuvable"){
              alert("redirection page d'inscription")
              this.$router.push("register")
            }
            else {
              alert("Votre mot de passe est incorrecte")
            }
      })

      }

    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.TheConnection{
    height: 100vh;
}

 form{
    background-image: url("../assets/logo.png");
    overflow: hidden;
    background-size: cover;
    background-position: top;
    box-shadow: 0px 0px 15px black;
    text-align: center;
    width: 50vw;
    height: 30vw;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
}

form:hover input[type="submit"]{
    transform: translateY(0%);
}

form div{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.588);
}

input:not(input[type="submit"]){
    border: none;
    border-bottom: 2px solid #FD2D01;
    width: 100%;
    height: 50px;
    font-size: 35px;
    background-color: transparent;
}


input[type="submit"]{
    position: absolute;
    bottom: 0;
    left: 0;
    border: 0;
    color: black;
    cursor: pointer;
    width: 100%;
    height: 20%;
    border-top: 2px solid #FD2D01;
    font-size: 30px;
    font-weight: bolder;
    transition-duration: 0.5s;
    transition-property: transform;
    transform: translateY(100%);
    background-color: white;
}

input[type="submit"]:hover{
    background-color: rgb(212, 212, 212);
}
</style>
