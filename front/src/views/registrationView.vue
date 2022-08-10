<template>
  <div class="TheRegistration">

    <form class="form__register" v-on:submit.prevent="connect">

        <div class="form__register__name">
            <input autocomplete="off" type="text" placeholder="Votre Nom" id="name" v-model="name">
            <i v-if="emailValid" :class="nameValid"></i>
        </div>

        <div class="form__register__firstname">
            <input autocomplete="off" type="text" placeholder="Votre prénom" id="firstname" v-model="firstname">
            <i v-if="emailValid" :class="firstNameValid"></i>
        </div>

        <div class="form__register__email">
            <input autocomplete="off" placeholder="Email" type="email" name="" id="email" v-model="email">
            <i v-if="emailValid" :class="emailValid"></i>
        </div>

        <div class="form__register__password">
            <input autocomplete="off" placeholder="Password" type="password" name="" id="password" v-model="password">
            <i v-if="emailValid" :class="passwordValid"></i>
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

      this.$http.post("https://localhost:3001/api/auth/signup", {
          email : this.email,
          password : this.password,
          name: this.name,
          firstname : this.firstname
      })
      .then(response => {
        if(response.data.userExist){
            alert("Vous êtes déjà inscrit sur groupomania.fr, redirection vers la page de connexion")
            this.$router.push("connect")
        }
        // Connexion automatique
        else {

            this.$http.post("https://localhost:3001/api/auth/login", {
              password : this.password,
              email : this.email
            })

            .then(response => {
              this.$store.commit('setUser', {id: response.data.user.id, admin: response.data.user.admin, name:response.data.user.name, firstName:response.data.user.firstname, email:this.email, pictureprofil:response.data.user.pictureprofil})
              this.$router.push("home")
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


.form__register{
    background-image: url("../assets/logo.png");
    background-size: cover;
    background-position: top;
    margin: 200px auto 0px auto;
    position: relative;
    box-shadow: 0px 0px 15px black;
    text-align: center;
    width: 50vw;
    height: 600px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 100px;
    overflow: hidden;
}

.form__register div{
    width: 70%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.588);
}

/*
input:not(input[type="submit"]){
    border: none;
    border-bottom: 2px solid #FD2D01;
    width: 100%;
    height: 100%;
    font-size: 35px;
    background-color: transparent;
} */

/* SUBMIT BUTTON */

input[type="submit"]{
    position: absolute;
    bottom: 0;
    left: 0;
    border: 0;
    color: black;
    cursor: pointer;
    width: 100%;
    height: 100px;
    border-top: 2px solid #FD2D01;
    font-size: 30px;
    font-weight: bolder;
    background-color: white;
}

input[type="submit"]:hover{
    background-color: rgb(212, 212, 212);
}

/* END SUBMIT BUTTON */
</style>
