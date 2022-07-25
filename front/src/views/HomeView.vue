<template>
  <div class="home">
    <h1>Bienvenu sur le forum de Groupomania</h1>

    <div class="createPost">
      <div></div>
      <div></div>
    </div>

    <article v-for="post in posts" :key="post.id">

      <the-post :authorPost="post.name" :contentPost="post.content" :datePost="post.date" :postId="post.id"></the-post>
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

  .createPost{
    cursor: pointer;
    margin: 50px auto;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 3px solid #FD2D01;
    background-color: white;
    position: relative;
    transition-duration: 0.5s;
  }

  .createPost:hover{
    transform: scale(1.1);
    box-shadow: 0px 0px 30px #FD2D01;
  }

  .createPost:hover div{
    background-color:#4E5166;
  }

  .createPost div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%) scale(0.8);
    width: 100px;
    height: 8px;
    background-color:#7e7f8a;
    transition-duration: 1s;
    border-radius: 5px;
  }

  .createPost div:nth-child(2){
    transform: translate(-50%, 50%) rotate(90deg) scale(0.8);
  }

</style>