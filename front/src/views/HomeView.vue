<template>
  <div class="home">
    <h1>Bienvenu sur le forum de Groupomania</h1>

    <div class="btnCreatePost">
      <div></div>
      <div></div>
    </div>

    <!-- <form class="createPost" createPost>
      <input type="text">
    </form> -->

    <article class="post" v-for="post in posts" :key="post.id">

      <the-post :authorPost="post.name" :contentPost="post.content" :datePost="post.date" :postId="post.id"></the-post>
      <button v-on:click="deletePost($event, post.id)" v-if="post.user_id == returnUserId()">DELETE</button>

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

    deletePost($event, postId){
      alert(postId)
      console.log($event.target.parentNode);
      $event.target.parentNode.className = "post post-disparate"
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

  /* BOUTTON CREATION DE POSTE */

  .btnCreatePost{
    cursor: pointer;
    margin: 50px auto;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 3px solid #FD2D01;
    background-color: rgba(255, 255, 255, 0.601);
    position: relative;
    transition-duration: 0.5s;
  }

  .btnCreatePost:hover{
    transform: scale(1.1);
    box-shadow: 0px 0px 30px #FD2D01;
  }

  .btnCreatePost div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%) scale(0.8);
    width: 200px;
    height: 12px;
    background-color:#ffffff;
    transition-duration: 1s;
    border-radius: 15px;
    box-shadow: 0px 0px 30px #494949;
  }

  .btnCreatePost div:nth-child(2){
    transform: translate(-50%, 50%) rotate(90deg) scale(0.8);
  }

  /* FIN BOUTTON CREATION DE POSTE */

  /* FORMULAIRE CREATION DE POSTE */

  .createPost{
    width: 80vw;
    height: 500px;
    background-color: #fff;
    margin: 50px auto;
  }

  /* FIN FORMULAIRE CREATION DE POSTE */

  /* disparition d'un article */
  .post{
    opacity: 1;
    transition-duration: 0.5s;
  }
  .post-disparate{
    opacity: 0;
    transform: translateY(-100px);
  }

</style>