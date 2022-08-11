<template>

    <form class="form__connect" v-on:submit.prevent="connect">
      
          <div class="form__connect__email">
            <label for="email">Email</label>
            <input v-on:input="checkBDD($event)" v-on:keyup="checkBDD($event)" placeholder="Email" type="email" name="" id="email" v-model="email">
            <i v-if="emailValid" :class="emailValid"></i>
          
          </div>

          <div class="form__connect__password">
            <label for="password">Mot de passe</label>
            <input placeholder="Password" type="password" name="" id="password" v-model="password">
            <i style="opacity : 0" v-if="emailValid" :class="emailValid"></i>

          </div>

                    
        <input type="submit" value="Se connecter">

    </form>

</template>

<script>

export default {
  name: 'TheConnection',

  data(){
    return {
        email : "",
        password : "",
        emailValid : "fa-solid fa-check op0"
    }
  },

  created: function () {
    document.title = "Connexion / GROUPOMANIA";
    this.$http.get("https://localhost:3001/api/auth/checkconnect")
    .then(() => {
      this.$router.push("home")
    })
  },

  methods:{
    
    checkBDD(target){
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (this.email.match(emailRegex)){

        this.$http.post("https://localhost:3001/api/auth/checkemail", {
          email : this.email
        })
        .then(res => {
          if (res.data.userExist){
            console.log(target);
            target.target.style.borderBottom = "2px solid green"
            this.emailValid = "fa-solid fa-check op1"
          }
          else {
            this.emailValid = "fa-solid fa-check op0"
            target.target.style.borderColor = "#FD2D01"
          }
        })
        .catch(err => console.log(err))

      }

      else {
        this.emailValid = "fa-solid fa-check op0"
        target.target.style.borderColor = "#FD2D01"
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
              alert("Votre email est introuvable, veuillez vérifire votre saisie.")
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
  justify-content: center;
  align-items: center;
  height: 100px;
}

.form__connect__password{
  display: flex;
  justify-content: center;
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
    background-color: white;
}

input[type="submit"]:hover{
    background-color: rgb(212, 212, 212);
}
</style>
