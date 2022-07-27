<template>
  <div class="TheRegistration">

    <!-- <nav>

      <router-link to="/connect">Connexion</router-link>
      <router-link to="/register">Inscription</router-link>
      
    </nav> -->

    <h1>S'inscrire sur groupomania</h1>
    <form v-on:submit.prevent="connect">

        <div>
            <input type="text" placeholder="Votre Nom" id="name" v-model="name">
            <input type="text" placeholder="Votre prénom" id="firstname" v-model="firstname">
            <input placeholder="Email" type="email" name="" id="email" v-model="email">
            <input placeholder="Password" type="password" name="" id="password" v-model="password">
        
        </div>
            
        <input type="submit" value="S'inscrire">

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
        name : "",
        firstname : ""
    }
  },

  props: {
    msg: String
  },
    
  created: function () {
    document.title = "Inscription / GROUPOMANIA"
  },

  methods:{

    connect(){

      this.$http.post("http://localhost:3000/api/auth/signup", {
          email : this.email,
          password : this.password,
          name: this.name,
          firstname : this.firstname
      })
      .then(response => {
        console.log("okay");
        if(response.data.userExist){
            alert("Vous êtes déjà inscrit sur groupomania.fr, redirection vers la page de connexion")
            this.$router.push("connect")
        }
        // Connexion automatique
        else {

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
              alert(error)
            })
            
        }
        // Connexion automatique
      })
      .catch(error => {
        console.log(error);
      })

    }

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.TheRegistration{
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
