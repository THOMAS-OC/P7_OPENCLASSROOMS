<template>
  <div class="profil">
    <h1>Bienvenu {{ name }} {{ firstname }}</h1>
    <img src="" alt="Photo de profil">

    <form action="">
        
    <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-bind:value="email">
    </div>
    <div>
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password">
    </div>
        <input type="submit" value="Modifier">

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
        firstname : ""
    }
  },

  mounted(){
    this.$http.post("http://localhost:3000/api/user", {
        userId : 7
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

  }

}


</script>

<style scoped>

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

</style>