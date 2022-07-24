<template>
  <div class="TheConnection">
    <h1>S'inscrire sur groupomania</h1>
    <form v-on:submit.prevent="connect">

        <div>
            <input type="text" placeholder="Votre prénom" id="firstname">
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
  methods:{

    connect(){

      this.$http.post("http://localhost:3000/api/auth/login", {
          password : this.password,
          email : this.email
      })
      .then(response => {
        console.log("okay");
          console.log(response);
      })
      .catch(error => {
        if(error.response.data.message == "Utilisateur introuvable"){
          alert("redirection page d'inscription")
        }
        else {
          alert("Votre mot de passe est incorrecte")
        }
      })

    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
