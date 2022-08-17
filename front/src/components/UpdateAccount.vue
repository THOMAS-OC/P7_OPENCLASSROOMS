<template>

    <form class="form__update" v-on:submit.prevent>

        <div class="form__update__info">
            <h2>{{ $store.state.firstName }} {{ $store.state.name }}</h2>
            <h3> {{ $store.state.email }} </h3>
        </div>
        
        <div>
            <label v-if="emailValid" for="email">Email : OK </label>
            <label v-else for="email">Email</label>
            <input v-on:input="watchEmail" v-on:keyup="watchEmail" v-bind:placeholder="$store.state.email" type="email" name="email" id="email" v-model="email">
        </div>


        <div>
            <label v-if="passwordValid" for="password">Password : OK </label>
            <label v-else for="password">Password<br> <span> 8 caractères minimum, une majuscule, et un chiffre sont requis pour ce champs </span> </label>
            <input v-on:input="watchPassword" v-on:keyup="watchPassword" type="password" name="password" id="password" v-model="password">
        </div>


        <div :class="clsSubmitBtn">
            <input v-on:click="updateUser" v-if="this.emailValid && !this.passwordValid" class="form__update__box__item" type="submit" value="update Email">
            <input v-on:click="updateUser" v-if="this.passwordValid && !this.emailValid" class="form__update__box__item" type="submit" value="update Password">
            <input v-on:click="updateUser" v-if="this.passwordValid && this.emailValid" class="form__update__box__item" type="submit" value="update Password and email">
        </div>

    </form>
    
</template>

<script>

export default {
  name: 'UpdateAccount',

  data(){
    return {
        email : "",
        password : "",
        authorization : false,
        emailValid : false,
        passwordValid : false,
        clsSubmitBtn : "form__update__box__button form__update__box__button--off", 
    }
  },

methods:{

    actionType(){

        if (this.emailValid && this.passwordValid){
            this.clsSubmitBtn = "form__update__box__button"
            this.authorization = true
        }

        else if (this.passwordValid){
            this.clsSubmitBtn = "form__update__box__button"
            this.authorization = true
        }

        else if (this.emailValid){
            this.clsSubmitBtn = "form__update__box__button"
            this.authorization = true
        }

        else if (!this.emailValid && !this.passwordValid){
            this.clsSubmitBtn = "form__update__box__button form__update__box__button--off"
            this.authorization = false
        }

    },

    watchPassword(){
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (this.password.match(passwordRegex)){
            this.passwordValid = true
            this.actionType()
        }
        else {
            this.passwordValid = false
            this.actionType()
        }


    },

    watchEmail(){
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (this.email.match(emailRegex)){
            if (this.email == this.$store.state.email){
                this.emailValid = false
                this.actionType()
            }
            else {
                this.emailValid = true
                this.actionType()
            }
        }

        else{
            this.emailValid = false
            this.actionType()
        }

    },

    updateUser(){
        if (this.authorization){
            this.$http.put("http://localhost:3000/api/user", {
                newEmail : this.emailValid ? this.email : "",
                newPassword : this.passwordValid ? this.password : "",
            })
            .then(response => {
                alert(response.data.message);
                this.$store.commit('setUser', {email:this.email})
                this.email = ""
                this.password = ""
                this.emailValid = false
                this.passwordValid = false
            })
            .catch(error => {
                // User not connected
                 if (error.response.data.userConnected == 'false') {
                    alert("Veuillez vous connecter svp")
                    this.$router.push("connect")
                }
                else {
                    console.log(error);
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
        border: 2px solid white;
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

    .form__update__box__button{
        position: absolute;
        bottom: 0;
        left: 0;
        font-weight: bold;
        font-style: italic;
        cursor: pointer;
        background: rgb(253,45,1);
        background: linear-gradient(90deg, rgba(253,45,1,1) 0%, rgba(253,82,1,1) 100%); 
        transition-duration: 1s;
        border: none;
        width: 105%;
        height: 60px;
        margin-top: 30px;

        box-shadow: 0px -3px 3px rgb(123, 123, 123);
    }

    .form__update__box__item{
        font-size: 25px;
        cursor: pointer;
        background-color: transparent;
        border: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: white;
        text-shadow: 0px 0px 3px white;
        letter-spacing: 7px;
    }

    .form__update__submit:hover{
        background: rgb(253,45,1);
        background: linear-gradient(-90deg, rgba(253,45,1,1) 0%, rgba(253,82,1,1) 100%); 
    }

    span{
        font-style: italic;
        color: rgb(255, 118, 118);
    }

    /* submit no valid */
    .form__update__box__button--off {
        cursor: not-allowed;
        opacity: 0.5;
    }

    @media only screen and (max-width : 500px) {
    .form__update__submit{
        font-size: 13px;
        width: 90%;
     }
  } 

</style>

