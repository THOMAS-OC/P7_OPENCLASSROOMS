<template>
  <div class="home">
    <h1>Bienvenu sur le forum de Groupomania</h1>

    <article v-for="post in posts" :key="post.id">

      <the-post :authorPost="post.name" :contentPost="post.content" :datePost="post.date"></the-post>
      <button v-on:click="deletePost(post.id)" v-if="post.user_id == returnUserId()">DELETE</button>

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
    window.localStorage.setItem("id","12") // Simulation d'un id d'un user connecté
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

  methods:{
    returnUserId(){
      return window.localStorage.getItem("id")
    },

    deletePost(postId){
      alert(postId)
      this.$http.delete("http://localhost:3000/api/post/" + postId)
      .then(response => {
        console.log(response);
        alert("Post supprimé !")
      })
      .catch(error => console.log(error))

    }

  }

}
</script>

<style scoped>


h2{
  color: red;
}

button{
  top: 0;
  left: 0;
}
</style>