<template>
  <div class="profil">

    <picture-profil></picture-profil>

    <h2>{{ $store.state.firstName }} {{ $store.state.name }}</h2>

    <update-account></update-account>

    <delete-account></delete-account>


  </div>
</template>

<script>
import PictureProfil from '../components/PictureProfil.vue';
import DeleteAccount from '../components/DeleteAccount.vue';
import UpdateAccount from '../components/UpdateAccount.vue';

export default {
  name: 'ProfilView',

  components: {
    PictureProfil,
    DeleteAccount,
    UpdateAccount
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
  

}


</script>

<style scoped>


    h2{
        background-color: #fff;
        line-height: 50px;
        height: 50px;
    }
    
</style>