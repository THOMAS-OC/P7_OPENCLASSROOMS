<template>
  <div class="profil">

    <picture-profil></picture-profil>

    <h2>{{ $store.state.firstName }} {{ $store.state.name }}</h2>

    <form class="form__update" v-on:submit.prevent="updateUser">
        
        <div>
            <label for="email">Email</label>
            <input v-on:input="watchEmail" v-on:keyup="watchEmail" v-bind:placeholder="$store.state.email" type="email" name="email" id="email" v-model="email">
        </div>
        <div>
            <label for="password">Mot de passe : <br> <span> 8 caractères minimum, une majuscule, et un chiffre sont requis pour ce champs </span> </label>
            <input v-on:input="watchPassword" v-on:keyup="watchPassword" type="password" name="password" id="password" v-model="password">
        </div>

        <input type="submit" v-bind:value="action">

    </form>

    <button v-if="$store.state.admin != 1" v-on:click="viewModal" class="button-delete">Supprimer mon compte</button>
    <div class="confirmation-delete">
        <p>êtes-vous sûr de vouloir supprimer votre compte ? </p>
        <button v-on:click="deleteAccount(true)" class="confirmation">Supprimer</button>
        <button v-on:click="deleteAccount(false)" class="annulation">Annuler</button>
    </div>

  </div>
</template>

<script>
import PictureProfil from '../components/PictureProfil.vue';

export default {
  name: 'ProfilView',

  components: {
    PictureProfil
  },

  data(){
    return {
        email : "",
        password : "",
        action : "Modifier mon email",
        authorization : false,
    }
  },

  // Modification de balise title  
  mounted: function () {
    document.title = "Mon profil / GROUPOMANIA"
    this.$http.get("https://localhost:3001/api/auth/checkconnect")
    .catch(err => {
        console.log(err);
        alert('Veuillez vous connecter svp.')
        this.$router.push('connect')
    })
  },

  methods:{

    viewModal(){
        document.querySelector(".confirmation-delete").style.display = "block"
    },

    deleteAccount(confirm){
        if(confirm){
            this.$http.delete("https://localhost:3001/api/user", { data: {} })
            .then(() => this.$router.push('register'))
            .catch(error => {
                console.log(error)
            })
        }
        else{
            document.querySelector(".confirmation-delete").style.display = "none"
        }
    },

    actionType(){

        if (this.email.trim() && this.password.trim()){
            this.action = "Modifier mon email et mon mot de passe"
            document.querySelector("input[type='submit'").className = "submit-on"
            this.authorization = true

        }

        else if (this.password.trim()){
            this.action = "Modifier mon mot de passe"
            document.querySelector("input[type='submit'").className = "submit-on"
            this.authorization = true
        }

        else if (this.email.trim()){
            this.action = "Modifier mon email"
            document.querySelector("input[type='submit'").className = "submit-on"
            this.authorization = true
        }

        else if (!this.email && !this.password){
            this.action = "Modification impossible"
            document.querySelector("input[type='submit'").className = "submit-off"
            this.authorization = false
        }

    },

    watchPassword(){
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (this.password.match(passwordRegex)){
            this.actionType()
            this.authorization = true
            document.querySelector("input[type='password'").className = "valid"
            document.querySelector("input[type='submit'").removeAttribute("disabled")
        }
        else if (!this.password){
            this.actionType()
        }
        else {
            this.actionType()
            this.action = "Modification impossible"
            this.authorization = false
            document.querySelector("input[type='password'").className = "invalid"
            document.querySelector("input[type='submit'").className = "submit-off"
            document.querySelector("input[type='submit'").setAttribute("disabled", "")
        }

    },

    watchEmail(){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (this.email.match(emailRegex)){
            if (this.email == this.$store.state.email){
                document.querySelector("input[type='submit'").className = "submit-off"
                document.querySelector("input[type='email'").className = "invalid"
                this.authorization = false
            }
            else {
                this.actionType()
                this.authorization = true
                document.querySelector("input[type='email'").className = "valid"
                document.querySelector("input[type='submit'").removeAttribute("disabled")
            }
        }

        else if (!this.email){
            this.actionType()
        }
        else {
            this.actionType()
            this.authorization = false
            this.action = "Modification impossible"
            document.querySelector("input[type='email'").className = "invalid"
            document.querySelector("input[type='submit'").className = "submit-off"
            document.querySelector("input[type='submit'").setAttribute("disabled", "")
        }
    },

    updateUser(){
        if (this.authorization){
            this.$http.put("https://localhost:3001/api/user", {
                newEmail : this.email,
                newPassword : this.password,
            })
            .then(response => {
                alert(response.data.message);
                this.$store.commit('setUser', {email:this.email})

            })
            .catch(error => {
                // User not connected
                 if (error.response.data.userConnected == 'false') {
                    alert("Veuillez vous connecter svp")
                    this.$router.push("connect")
                }
                // ! User not connected
            })
        }
        else {
            alert("Veuillez renseigner correctement les champs de formulaire svp")
        }
    },

  }

}


</script>

<style scoped>

    h2{
        background-color: #fff;
        line-height: 50px;
        height: 50px;
    }

    .form__update{
        margin: 100px auto;
        background-color: rgba(255, 255, 255, 0.83);
        width: 700px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        justify-content: space-around;
        max-width: 90vw;
    }

    .form__update div {
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

    /* Bouton delete account */
    .button-delete{
        border-color: #FD2D01;
        height: 50px;
        width: 200px;
        margin-bottom: 70px;
        cursor: pointer;
        
    }

    .confirmation-delete{
        display: none;
        margin: 50px auto;
        max-width: 90vw;
        height: 150px;
        width: 500px;
        border-radius: 15px;
        border: 2px solid #FD2D01;
        text-align: center;
        font-size: 25px;
        overflow: hidden;
        line-height: 35px;
        background-color: rgba(255, 255, 255, 0.788);
        position: relative;
    }

    .confirmation{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50%;
        height: 30px;
        background-color: green;
        cursor: pointer;
    }

    .annulation{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 50%;
        height: 30px;
        background-color: red;
        cursor: pointer;
    }

</style>