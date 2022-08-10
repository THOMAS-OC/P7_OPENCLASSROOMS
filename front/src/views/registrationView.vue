<template>
  <div class="TheRegistration">

    <form class="form__register" v-on:submit.prevent="register">

        <div class="form__register__name">
            <label for="name">Nom</label>
            <input v-on:keyup="watchName" autocomplete="off" type="text" placeholder="Votre Nom" id="name" v-model="name">
            <i v-if="nameValid" :class="classIcone"></i>
        </div>

        <div class="form__register__firstname">
            <label for="firstname">Prénom</label>
            <input v-on:keyup="watchFirstName" autocomplete="off" type="text" placeholder="Votre prénom" id="firstname" v-model="firstname">
            <i v-if="firstNameValid" :class="classIcone"></i>
        </div>

        <div class="form__register__email">
            <label for="email">Email</label>
            <input v-on:keyup="watchEmail" autocomplete="off" placeholder="Email" type="email" name="" id="email" v-model="email">
            <i v-if="emailValid" :class="classIcone"></i>
        </div>

        <div class="form__register__password">
            <label for="password">Password</label>
            <input v-on:keyup="watchPassword" autocomplete="off" placeholder="Password" type="password" name="" id="password" v-model="password">
            <i v-if="passwordValid" :class="classIcone"></i>
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
        firstname : "",
        classIcone : 'fa-solid fa-check op0',
        nameValid : false,
        firstNameValid : false,
        emailValid : false,
        passwordValid : false,
    }
  },

  props: {
    msg: String
  },
    
  created: function () {
    document.title = "Inscription / GROUPOMANIA"
  },

  methods:{

    watchName(){
        let nameRegex = /^[A-Za-zéàèêëï]{3,30}$/

        if (this.name.toLowerCase().match(nameRegex)){
          this.nameValid = true
        }

        else {
          this.nameValid = false
        }
    },

    watchFirstName(){
        let FirstNameRegex = /^[A-Za-zéàèêëï]{3,20}$/

        if (this.firstname.toLowerCase().match(FirstNameRegex)){
          this.firstNameValid = true
        }

        else {
          this.firstNameValid = false
        }
    },

    watchEmail(){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (this.email.match(emailRegex)){
          this.emailValid = true
        }

        else {
          this.emailValid = false
        }

    },

    watchPassword(){
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (this.password.match(passwordRegex)){
            this.passwordValid = true
        }
        else {
            this.passwordValid = false
        }
    },

    register(){

      if (this.nameValid && this.firstNameValid && this.emailValid && this.passwordValid){
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

      else {
        alert("Veuillez vérifier les champs de formulaire")
      }



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
    width: 800px;
    max-width: 90vw;
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
    width: 100%;
    display: flex;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.588);
}

.form__register label{
  font-style: italic;
  text-align: center;
  line-height: 60px;
  width: 15%;
}

.form__register i {
  font-style: italic;
  text-align: center;
  line-height: 60px;
  width: 15%;
}

input:not(input[type="submit"]){
    border: none;
    border: 1.5px solid gray;
    border-bottom: 2.5px solid #FD2D01;
    width: 70%;
    height: 100%;
    font-size: 35px;
}

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
