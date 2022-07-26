<template>
  <div class="home">
    <h1>Bienvenu sur le forum de Groupomania</h1>

    <div v-on:click="viewForm" class="btnCreatePost">
      <div></div>
      <div></div>
    </div>

    <form class="createPost formInvisible">
      <input placeholder="Titre" type="text">
      <textarea placeholder="Contenu de votre post" name="" id="" cols="30" rows="10"></textarea>
      <input type="file" name="" id="">
      <input type="submit" value="Poster">
      <!-- Bouton d'affichage -->
      <button v-on:click="hideForm">X</button>
    </form>

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

    },

    viewForm(){
      document.querySelector("form").className = "createPost formVisible"
    },

    hideForm(){
      document.querySelector("form").className = "createPost formInvisible"
    }

  }

}
</script>

<style scoped>

  h2{
    color: red;
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
    width: 500px;
    height: 500px;
    background-color: #fff;
    margin: 50px auto;
    border-radius: 15px;
    border: 2px solid#FD2D01;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px 20px;
    position: relative;
    transition-duration: 1s;
    opacity: 0;
    transform: scale(0.2);
  }

  .createPost button{
    position: absolute;
    right: -10px;
    top: -10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #FD2D01;
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 20px;
  }

  textarea{
    height: 80%;
    width: 100%;
  }

  .formVisible{
    opacity: 1;
    transform: scale(1);
    transition-duration: 1s;
  }

  .formInvisible{
    opacity: 0;
    transform: scale(0.2);
    transition-duration: 1s;
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