<template>

    <form class="form__register" v-on:submit.prevent="register">

        <div class="form__register__box">
            <label class="form__register__label" for="name">Nom</label>
            <input class="form__register__input" v-on:input="watchName" v-on:keyup="watchName" autocomplete="off" type="text" placeholder="Votre Nom" id="name" v-model="name">
            <i class="form__register__icon" v-if="nameValid" :class="classIcone"></i>
        </div>

        <div class="form__register__box">
            <label class="form__register__label" for="firstname">Prénom</label>
            <input class="form__register__input" v-on:input="watchFirstName" v-on:keyup="watchFirstName" autocomplete="off" type="text" placeholder="Votre prénom" id="firstname" v-model="firstname">
            <i class="form__register__icon" v-if="firstNameValid" :class="classIcone"></i>
        </div>

        <div class="form__register__box">
            <label class="form__register__label" for="email">Email</label>
            <input class="form__register__input" v-on:input="watchEmail" v-on:keyup="watchEmail" autocomplete="off" placeholder="Email" type="email" name="" id="email" v-model="email">
            <i class="form__register__icon" v-if="emailValid" :class="classIcone"></i>
        </div>

        <div class="form__register__box">
            <label class="form__register__label" for="password">Password</label>
            <input class="form__register__input" v-on:input="watchPassword" v-on:keyup="watchPassword" autocomplete="off" placeholder="Password" type="password" name="" id="password" v-model="password">
            <i class="form__register__icon" v-if="passwordValid" :class="classIcone"></i>
        </div>
            
        <input class="form__register__submit" type="submit" value="S'inscrire">

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
        emailValid : false,
        passwordValid : false,
    }
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
    margin: 200px auto 200px auto;
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

.form__register__box{
    width: 100%;
    display: flex;
    height: 60px;
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
    width: 70%;
    height: 100%;
    font-size: 35px;
}

.form__register__icon {
    font-style: italic;
    text-align: center;
    line-height: 60px;
    width: 15%;
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
}

.form__register__submit:hover{
    background-color: rgb(212, 212, 212);
}

/* END SUBMIT BUTTON */
</style>
