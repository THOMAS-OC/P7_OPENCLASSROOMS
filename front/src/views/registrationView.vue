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
    this.$http.get("https://localhost:3001/api/auth/checkconnect")
    .then(() => {
      this.$router.push("home")
    })
  },
 
}

</script>
