<template>
  <section class="profil">

    <picture-profil></picture-profil>

    <update-account></update-account>

    <delete-account></delete-account>


  </section>
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
    document.querySelector('meta[name="description"]').setAttribute("content", "Personnalisez votre profil et vos identifiants de connexion Groupomania.")

    this.$http.get("http://localhost:3000/api/auth/checkconnect")
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