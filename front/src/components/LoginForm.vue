<template>

    <form class="form__connect" v-on:submit.prevent="connect">
      
          <div class="form__connect__email">
            <label class="form__connect__label" for="email">Email</label>
            <input v-on:input="checkBDD($event)" v-on:keyup="checkBDD($event)" placeholder="Email" type="email" name="" id="email" v-model="email">
            <i v-if="emailValid" :class="emailValid"></i>
          
          </div>

          <div class="form__connect__password">
            <label class="form__connect__label" for="password">Mot de passe</label>
            <input v-on:input="checkPassword" v-on:keyup="checkPassword" placeholder="Password" type="password" name="" id="password" v-model="password">

          </div>

                    
        <input :class="classSubmit" type="submit" value="Se connecter">

    </form>
    
</template>

<script>

export default {
  name: 'LoginForm',

  data(){
    return {
        email : "",
        password : "",
        emailValid : "fa-solid fa-check op0",
        classSubmit : "form__connect__submit form__connect__submit--hide",
        emailInBDD : false
    }
  },

  methods:{
    
    checkBDD(){
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (this.email.match(emailRegex)){

        this.$http.post("https://localhost:3001/api/auth/checkemail", {
          email : this.email
        })
        .then(res => {
          if (res.data.userExist){
            this.emailInBDD = true
            this.emailValid = "fa-solid fa-check op1"
            console.log("email ok");
            this.viewSubmit()
          }
          else {
            this.emailInBDD = false
            this.emailValid = "fa-solid fa-check op0"
            this.viewSubmit()
          }
        })
        .catch(() => {
            this.emailInBDD = false
            this.emailValid = "fa-solid fa-check op0"
            this.viewSubmit()
        })

      }

      else {
        this.emailValid = "fa-solid fa-check op0"
      }

    },

    checkPassword(){
      this.viewSubmit()
    },

    viewSubmit(){
      if (this.emailInBDD && this.password){
          this.classSubmit = "form__connect__submit"
      }
      else {
          this.classSubmit = "form__connect__submit form__connect__submit--hide"
      }
    },


    connect(){

      if (this.email && this.password){
            this.$http.post("https://localhost:3001/api/auth/login", {
              password : this.password,
              email : this.email
      })

      .then(response => {
            this.$store.commit('setUser', {id: response.data.user.id, admin: response.data.user.admin, name:response.data.user.name, firstName:response.data.user.firstname, email:this.email, pictureprofil:response.data.user.pictureprofil})
            this.$router.push("home")
      })

      .catch(error => {
            if(error.response.data.message == "Utilisateur introuvable"){
              alert("Votre email est introuvable, veuillez vérifier votre saisie.")
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

.form__connect{
    background-image: url("../assets/logo.png");
    overflow: hidden;
    margin: 200px auto 200px auto;
    background-size: cover;
    background-position: top;
    box-shadow: 0px 0px 15px black;
    text-align: center;
    width: 800px;
    max-width: 90vw;
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.form__connect__email{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
}

.form__connect__password{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
}

input[type="email"], input[type="password"]{
  width: 60%;
  height: 60%;
  background-color: rgba(255, 255, 255, 0.817);
  border: 1px solid gray;
  font-size: 30px;
  border-bottom: 2px solid #FD2D01;
}

.form__connect__label{
  height: 100%;
  width: 20%;
  line-height: 100px;
  font-style: italic;
}

i{
  margin-left: 20px;
  font-size: 20px;
}

.op0{
  opacity: 0;
}

.op1{
  opacity: 1;
}

.form__connect__submit{
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
    background-color: white;
}

.form__connect__submit--hide {
  transform: translateY(100%);
}


.form__connect__submit:hover{
    background-color: rgb(212, 212, 212);
}
</style>

