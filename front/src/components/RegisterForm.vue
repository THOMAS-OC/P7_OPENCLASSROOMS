<template>

    <form class="form__register" v-on:submit.prevent="register">

        <div class="form__register__box">
            <label class="form__register__label" for="name">Nom</label>
            <input class="form__register__input" v-on:input="watchName" v-on:keyup="watchName" autocomplete="off" type="text" placeholder="Votre Nom" id="name" v-model="name">
            <i class="form__register__icon" v-if="nameValid" :class="classIcone"></i>
            <p v-if="!nameValid && name.length>=1" class="form__register__box__error">Attention, le nom ne doit contenir que des lettres et contenir plus de 3 caractères</p>
        </div>

        <div class="form__register__box">
            <label class="form__register__label" for="firstname">Prénom</label>
            <input class="form__register__input" v-on:input="watchFirstName" v-on:keyup="watchFirstName" autocomplete="off" type="text" placeholder="Votre prénom" id="firstname" v-model="firstname">
            <i class="form__register__icon" v-if="firstNameValid" :class="classIcone"></i>
            <p v-if="!firstNameValid && firstname.length>=1" class="form__register__box__error">Attention, le prénom ne doit contenir que des lettres et contenir plus de 3 caractères</p>
        </div>

        <div class="form__register__box">
            <label class="form__register__label" for="email">Email</label>
            <input class="form__register__input" v-on:input="watchEmail" v-on:keyup="watchEmail" autocomplete="off" placeholder="Email" type="email" name="" id="email" v-model="email">
            <i class="form__register__icon" v-if="emailValid" :class="classIcone"></i>
            <p v-if="!emailValid && email.length>=1" class="form__register__box__error"> {{ emailError }} </p>

        </div>

        <div class="form__register__box">
            <label class="form__register__label" for="password">Password</label>
            <input class="form__register__input" v-on:input="watchPassword" v-on:keyup="watchPassword" autocomplete="off" placeholder="Password" type="password" name="" id="password" v-model="password">
            <i class="form__register__icon" v-if="passwordValid" :class="classIcone"></i>
            <p v-if="!passwordValid && password.length>=1" class="form__register__box__error">Attention, le mot de passe doit contenir une majuscule, une minuscule et mesurer entre 8 et 20 caractères.</p>
        </div>
            
        <input :class="classSubmit" type="submit" value="S'inscrire">

    </form>
    
</template>

<script>

export default {
  name: 'RegisterForm',

data(){
    return {
        email : "",
        password : "",
        name : "",
        firstname : "",
        classIcone : 'fa-solid fa-check op0',

        nameValid : false,
        firstNameValid : false,
        passwordValid : false,
        emailValid : false,
        emailError : "Syntaxe email invalide",

        classSubmit : "form__register__submit form__register__submit--hide",
    }
  },

  methods:{

    watchAll(){

      if (this.nameValid && this.firstNameValid && this.emailValid && this.passwordValid) {
        this.classSubmit = "form__register__submit"
      }
      else {
        this.classSubmit = "form__register__submit form__register__submit--hide"
      }

    },

    watchName(){
        let nameRegex = /^[A-Za-zéàèêëï]{3,30}$/

        if (this.name.toLowerCase().match(nameRegex)){
          this.nameValid = true
          this.name = this.name.toUpperCase()
          this.watchAll()
        }

        else {
          this.name = this.name.toUpperCase()
          this.nameValid = false
          this.watchAll()
        }
    },

    watchFirstName(){
        let FirstNameRegex = /^[A-Za-zéàèêëï]{3,20}$/

        if (this.firstname.toLowerCase().match(FirstNameRegex)){
          this.firstNameValid = true
          this.watchAll()
        }

        else {
          this.firstNameValid = false
          this.watchAll()
        }
    },

    watchEmail(){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (this.email.match(emailRegex)){
            console.log("on test dans la bdd");
            this.$http.post("https://localhost:3001/api/auth/checkemail", {
              email : this.email
            })
            .then(res => {
              if (res.data.userExist){
                this.emailError = "Email déjà enregistré !"
                this.emailValid = false
                this.watchAll()
              }
            })
            .catch(() => {
              this.emailValid = true
              this.watchAll()
            })
        }

        else {
          console.log("pas de match avec la regex");
          this.emailValid = false
          this.watchAll()
        }

    },

    watchPassword(){
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/
        if (this.password.match(passwordRegex)){
            this.passwordValid = true
            this.watchAll()
        }
        else {
            this.passwordValid = false
            this.watchAll()
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
    margin: 200px auto 200px auto;
    position: relative;
    box-shadow: 0px 0px 15px black;
    text-align: center;
    width: 800px;
    max-width: 90vw;
    height: 600px;
    border-radius: 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 100px;
    overflow: hidden;
}

.form__register__box{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 60px;
    position: relative;
    background-color: rgba(255, 255, 255, 0.588);
}

.form__register__label{
  font-style: italic;
  text-align: center;
  line-height: 60px;
  width: 15%;
}

.form__register__input{
  border: none;
    border: 1.5px solid gray;
    border-bottom: 2.5px solid #FD2D01;
    width: 75%;
    height: 100%;
    font-size: 35px;
}

.form__register__box__error{
  width: 85%;
  margin-left: 15%;
  text-align: left;
  color: #FD2D01;
  text-shadow: 0px 0px 1px red;
}

.form__register__icon {
    font-style: italic;
    text-align: center;
    line-height: 60px;
    width: 10%;
}

/* SUBMIT BUTTON */

.form__register__submit{
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
    transition-duration: 0.5s;
}

.form__register__submit--hide{
  transform: translateY(100%)
}


.form__register__submit:hover{
    background-color: rgb(212, 212, 212);
}

/* END SUBMIT BUTTON */
</style>
