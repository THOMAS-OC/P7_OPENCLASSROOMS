<template>
  <div class="profil">
    <h1>Mon profil </h1>

    <div class="picture-profil">
        <div class="add">+</div>
    </div>

    <h2>{{ name }} {{ firstname }}</h2>

    <form action="">
        
    <div>
        <label for="email">Email</label>
        <input v-on:keyup="watchEmail" type="email" name="email" id="email" v-model="email">
    </div>
    <div>
        <label for="password">Mot de passe : <br> <span> 8 caractères minimum, une majuscule, et un chiffre sont requis pour ce champs </span> </label>
        <input v-on:keyup="watchPassword" type="password" name="password" id="password" v-model="password">
    </div>
        <input type="submit" v-bind:value="action">
    </form>

  </div>
</template>

<script>


export default {
  name: 'ProfilView',
  data(){
    return {
        email : "",
        name : "",
        firstname : "",
        password : "",
        action : "Modifier mon email"
    }
  },

  // Modification de balise title  
  created: function () {
    document.title = "Mon profil / GROUPOMANIA"
  },

  mounted(){
    this.$http.post("http://localhost:3000/api/user", {
        userId : 12
    })
    .then(response => {
        console.log(response.data);
        this.email = response.data.email
        this.name = response.data.name
        this.firstname = response.data.firstname
        console.log(this.name);
    })
    .catch(error => console.log(error))
  },

  methods:{

    actionType(){

        if (this.email.trim() && this.password.trim()){
            this.action = "Modifier mon email et mon mot de passe"
            document.querySelector("input[type='submit'").className = "submit-on"

        }

        else if (this.password.trim()){
            this.action = "Modifier mon mot de passe"
            document.querySelector("input[type='submit'").className = "submit-on"
        }

        else if (this.email.trim()){
            this.action = "Modifier mon email"
            document.querySelector("input[type='submit'").className = "submit-on"
        }

        else if (!this.email && !this.password){
            this.action = "Modification impossible"
            document.querySelector("input[type='submit'").className = "submit-off"
        }

    },

    watchPassword(){
        let passwordAnalyze = this.password.split("")
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        console.log(passwordAnalyze);
        if (this.password.match(passwordRegex)){
            this.actionType()
            document.querySelector("input[type='password'").className = "valid"
        }
        else if (!this.password){
            this.actionType()
        }
        else {
            this.actionType()
            this.action = "Modification impossible"
            document.querySelector("input[type='password'").className = "invalid"
            document.querySelector("input[type='submit'").className = "submit-off"
            document.querySelector("input[type='submit'").setAttribute("disabled")
        }

    },
    watchEmail(){
        console.log(this.email);
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (this.email.match(emailRegex)){
            this.actionType()
            document.querySelector("input[type='email'").className = "valid"
        }
        else if (!this.email){
            this.actionType()
        }
        else {
            this.actionType()
            this.action = "Modification impossible"
            document.querySelector("input[type='email'").className = "invalid"
            document.querySelector("input[type='submit'").className = "submit-off"
            document.querySelector("input[type='submit'").setAttribute("disabled")
        }
    },

  }

}


</script>

<style scoped>

    .picture-profil {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin: 20px auto;
        overflow: hidden;
        background-image: url('../assets/profil_vierge.jpg');
        background-size: 100%;
        background-position: center;
        position: relative;
        cursor: pointer;
    }

    .add{
        opacity: 0;
        background-color: rgb(161, 161, 161);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        font-size: 50px;
        line-height: 200px;
        transition-duration: 0.7s;
    }

    .add:hover{
        opacity: 0.8;
    }

    h2{
        background-color: #fff;
        line-height: 50px;
        height: 50px;
    }

    form{
        margin: 100px auto;
        background-color: rgba(255, 255, 255, 0.83);
        width: 700px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        justify-content: space-around;
    }

    form div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    label{
        margin-bottom: 10px;
    }

    input{
        height: 40px;
        width: 80%;
        outline: none;
        border: 2px solid black;
        border-radius: 5px;
    }

    input[type="submit"]{
        font-weight: bold;
        font-style: italic;
        font-size: 20px;
    }

    span{
        font-style: italic;
        color: rgb(255, 118, 118);
    }

    /* Champs valides */
    .valid{
        border-color: green;
    }
    /* champs non valide */
    .invalid{
        border-color: red;
    }
    /* submit valid */
    .submit-on{
        cursor: pointer;
        background-color: rgb(93, 255, 93);
    }
    /* submit no valid */
    .submit-off {
        cursor: not-allowed;
        background-color: rgb(255, 141, 141);
    }
</style>