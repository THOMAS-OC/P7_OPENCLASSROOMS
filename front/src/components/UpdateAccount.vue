<template>

    <form class="form__update" v-on:submit.prevent="updateUser">

        <div class="form__update__info">
            <h2>{{ $store.state.firstName }} {{ $store.state.name }}</h2>
            <h3> {{ $store.state.email }} </h3>
        </div>
        
        <div>
            <label for="email">Email</label>
            <input v-on:input="watchEmail" v-on:keyup="watchEmail" v-bind:placeholder="$store.state.email" type="email" name="email" id="email" v-model="email">
        </div>

        <div>
            <label for="password">Mot de passe <br> <span> 8 caractères minimum, une majuscule, et un chiffre sont requis pour ce champs </span> </label>
            <input v-on:input="watchPassword" v-on:keyup="watchPassword" type="password" name="password" id="password" v-model="password">
        </div>

        <input class="form__update__submit" type="submit" v-bind:value="action">

    </form>
    
</template>

<script>

export default {
  name: 'UpdateAccount',

  data(){
    return {
        email : "",
        password : "",
        action : "Modifier mon email",
        authorization : false,
    }
  },

methods:{

    actionType(){

        if (this.email.trim() && this.password.trim()){
            this.action = "Modifier mon email et mot de passe"
            document.querySelector("input[type='submit'").className = "submit-on"
            this.authorization = true

        }

        else if (this.password.trim()){
            this.action = "Modifier mot de passe"
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .form__update{
        margin: 100px auto;
        background-color: rgba(255, 255, 255, 0.83);
        width: 700px;
        height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 15px;
        justify-content: center;
        max-width: 95vw;
        position: relative;
        overflow: hidden;
    }

    .form__update__info{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background-color:#4E5166;
        color: white;
        letter-spacing: 7px;
    }

    .form__update div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    label{
        margin-top: 30px;
        margin-bottom: 10px;
    }

    input{
        height: 40px;
        width: 80%;
        outline: none;
        border: 2px solid black;
        border-radius: 5px;
    }

    .form__update__submit{
        font-weight: bold;
        font-style: italic;
        cursor: pointer;
        background: rgb(253,45,1);
        background: linear-gradient(90deg, rgba(253,45,1,1) 0%, rgba(253,82,1,1) 100%); 
        transition-duration: 1s;
        transform: translateX(-50%);
        border: none;
        width: 80%;
        height: 60px;
        position: absolute;
        bottom: 5%;
        left: 50%;
        color: white;
        text-shadow: 0px 0px 3px white;
        font-size: 25px;
        letter-spacing: 10px;
        box-shadow: 0px -3px 3px rgb(123, 123, 123);
    }

    .form__update__submit:hover{
        background: rgb(253,45,1);
        background: linear-gradient(-90deg, rgba(253,45,1,1) 0%, rgba(253,82,1,1) 100%); 
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

    @media only screen and (max-width : 500px) {
    .form__update__submit{
        font-size: 13px;
        width: 90%;
     }
  } 

</style>

