<template>

    <register-form> </register-form>
    
</template>

<script>

import RegisterForm from '../components/RegisterForm.vue';

export default {
  name: 'TheConnection',

  components: {
    RegisterForm
  },

  created: function () {
    document.title = "Inscription / GROUPOMANIA";
    document.querySelector('meta[name="description"]').setAttribute("content", "Inscrivez-vous sur Groupomania pour accéder un espace d'échange interactif avec tous vos collègues")

    this.$http.get("http://localhost:3000/api/auth/checkconnect")
    .then(() => {
      this.$router.push("home")
    })
  },
 
}

</script>
