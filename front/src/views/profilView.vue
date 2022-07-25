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
        <label for="password">Mot de passe : <br> <span> 8 caractères minimum, une majuscule, et un caractère spécial sont requis pour ce champs </span> </label>
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
        }
        else if (this.password.trim()){
            this.action = "Modifier mon mot de passe"
        }
        else if (this.email.trim()){
            this.action = "Modifier mon email"
        }
    },

    watchPassword(){
        let passwordAnalyze = this.password.split("")
        console.log(passwordAnalyze);
        if (passwordAnalyze.length > 7){
            this.actionType()
            document.querySelector("input[type='password'").className = "valid"
        }
        else {
            this.actionType()
            this.action = "Modification impossible"
            document.querySelector("input[type='password'").className = "invalid"
        }

    },
    watchEmail(){
        console.log(this.email);
        this.actionType()
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
        cursor: pointer;
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
</style>