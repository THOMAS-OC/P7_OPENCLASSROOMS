<template>

    <login-form></login-form>

</template>

<script>

import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'TheConnection',

  components: {
    LoginForm
  },

  created: function () {
    document.title = "Connexion / GROUPOMANIA";
    this.$http.get("http://localhost:3000/api/auth/checkconnect")
    .then(() => {
      this.$router.push("home")
    })
  },

}

</script>
