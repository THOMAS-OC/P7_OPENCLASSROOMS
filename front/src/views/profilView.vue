<template>
  <div class="profil">

    <form class="picture-profil">
        <img :src="$store.state.pictureprofil" alt="">
        <input type="file" class="add" name="pictureProfil" @change="onChange">
    </form>

    <h2>{{ $store.state.firstName }} {{ $store.state.name }}</h2>

    <form class="form__update" v-on:submit.prevent="updateUser">
        
        <div>
            <label for="email">Email</label>
            <input v-on:keyup="watchEmail" v-bind:placeholder="$store.state.email" type="email" name="email" id="email" v-model="email">
        </div>
        <div>
            <label for="password">Mot de passe : <br> <span> 8 caractères minimum, une majuscule, et un chiffre sont requis pour ce champs </span> </label>
            <input v-on:keyup="watchPassword" type="password" name="password" id="password" v-model="password">
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


export default {
  name: 'ProfilView',
  data(){
    return {
        email : "",
        name : "",
        firstname : "",
        password : "",
        action : "Modifier mon email",
        authorization : false,
        pictureProfil: null
    }
  },

  // Modification de balise title  
  mounted: function () {
    document.title = "Mon profil / GROUPOMANIA"
    console.log(this);
    this.$http.get("https://localhost:3001/api/auth/checkconnect")
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
        alert('Veuillez vous connecter svp.')
        this.$router.push('connect')
    })
  },

  methods:{

    onChange(event) {
        this.pictureProfil = event.target.files[0]
        this.updatePictureProfil()
        alert(this.pictureProfil)
    },


    viewModal(){
        document.querySelector(".confirmation-delete").style.display = "block"
    },

    deleteAccount(confirm){
        if(confirm){

            this.$http.delete("https://localhost:3001/api/user", { data: {} })
            .then(response => {
                console.log(response);
                this.$router.push('connect')
            })
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
        let passwordAnalyze = this.password.split("")
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        console.log(passwordAnalyze);
        if (this.password.match(passwordRegex)){
            this.actionType()
            this.authorization = true
            document.querySelector("input[type='password'").className = "valid"
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
            document.querySelector("input[type='submit'").setAttribute("disabled")
        }

    },

    watchEmail(){
        console.log(this.email);
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (this.email.match(emailRegex)){
            this.actionType()
            this.authorization = true
            document.querySelector("input[type='email'").className = "valid"
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
            document.querySelector("input[type='submit'").setAttribute("disabled")
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
                this.$store.commit('setUser', {id: this.$store.state.id, name:this.$store.state.name, firstName:this.$store.state.firstname, email:this.email})

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
            alert("Champs mal renseignés")
        }
    },

    updatePictureProfil(){
          const formData = new FormData()
          formData.append('ProfilPicture', this.pictureProfil)
          this.$http.post('https://localhost:3001/api/user/32', formData, {})
          .then((response) => {
            console.log(response.data.pictureProfil);
            this.$store.commit('setPictureProfil', {pictureprofil:response.data.pictureProfil})

          })
          .catch(err => console.log(err))
    }

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

    .picture-profil img {
        object-fit: contain;
        height: 100%;
        width: 100%;
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