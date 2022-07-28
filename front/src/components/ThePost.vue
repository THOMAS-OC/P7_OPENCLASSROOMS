<template>

  <article class="ThePost">
    <header>
      <h3> {{ title }} </h3>
    </header>

    <main>
      <p>{{ content }}</p>
    </main>
    
    <footer>
      <button><i class="fa-solid fa-thumbs-up"></i> {{ likes.length }}</button>
      <button><i class="fa-solid fa-thumbs-down"></i>{{ dislikes.length }}</button>
      <button><i class="fa-solid fa-comment"></i>{{ comment.length }}</button>
    </footer>

    <button v-if="this.$store.state.id == userIdCreated" class="delete-post">X</button>

  </article>

</template>

<script>
export default {
  name: 'ThePost',

  // http://localhost:3000/api/post/:postId

  data(){
    return {
      ID : "",
      userIdCreated : "",
      title : '',
      date : '',
      picture : '',
      content : '',
      comment : [],
      likes : [], // listes des identifiants utilisateurs ayant like
      dislikes : [] // listes des identifiants utilisateurs ayant dislike
    }
  },

  props: ["postId"],

  mounted() {
      console.log("test");
      console.log(this.postId); // !!!!!!!!!!

      this.$http.get(`http://localhost:3000/api/post/${this.postId}`)
      .then(response => {
        console.log(response.data);
        this.ID = response.data.ID,
        this.userIdCreated = response.data.userIdCreated
        this.title = response.data.title
        this.date = response.data.date
        this.picture = response.data.picture || ""
        this.content = response.data.content
        this.comment = response.data.comment
        this.likes = response.data.likes
        this.dislikes = response.data.dislikes

      })
      .catch(error => {
        // User not connected
        if (error.response.data.userConnected == 'false') {
            alert("Veuillez vous connecter svp")
            this.$router.push("connect")
        }
        else {
          console.log(error);
        }
        // ! User not connected
      })

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  article{
    position: relative;
    margin: 50px auto;
    height: 400px;
    width: 800px;
    border: 2px solid black;
    background-color: rgba(240, 248, 255, 0.768);
  }

  article section{
    border-top: 2px solid red;
    height: 100px;
  }

  article footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    border-top: 2px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  i{
    margin-right: 10px;
  }

  article footer button{
    height: 100%;
    width: 33.3%;
    cursor: pointer;
    font-size: 30px;
  }

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
