<template>
  <div class="home">
    <h1>Bienvenu sur le forum de Groupomania</h1>

    <article v-for="post in posts" :key="post.id">
      <the-post :authorPost="post.id" :contentPost="post.content" :datePost="post.date"></the-post>
    </article>

  </div>
</template>

<script>
import ThePost from '@/components/ThePost.vue'

export default {
  name: 'HomeView',

  data(){
    return {
      posts : [],
    }
  },

  components: {
    ThePost
  },

  mounted(){
    this.$http.get("http://localhost:3000/api/post")
    .then(response => {
        this.posts = response.data
        console.log(this.posts);
    })
    .catch(error => console.log(error))
  },

  created: function () {
    document.title = "Forum / GROUPOMANIA"
  },
}
</script>

<style scoped>

h2{
  color: red;
}
</style>