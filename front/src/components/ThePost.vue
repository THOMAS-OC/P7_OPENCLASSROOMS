<template>

  <article class="ThePost">
    <header>
      <h3> {{ title }} </h3>
    </header>

    <main>

      <section v-bind:class="contentView">CONTENT</section>
      <section v-bind:class="commentView">

        <p v-for="com in comment" :key="com.ID">
          {{ com }}
        </p>

          <div class="comment__add">
            <textarea v-model="newComment" class="comment__form" placeholder="Commentaire" name="" id="" cols="30" rows="10"></textarea>
            <button v-on:click="createComment" class="comment__send"> Envoyer </button>

          </div>

      </section>
      <p>{{ content }}</p>

    </main>
    
    <footer>
      <button v-on:click="like"><i class="fa-solid fa-thumbs-up"></i> {{ likes.length }}</button>
      <button v-on:click="dislike"><i class="fa-solid fa-thumbs-down"></i>{{ dislikes.length }}</button>
      <button v-on:click="viewComment"><i class="fa-solid fa-comment"></i>{{ comment.length }}</button>
    </footer>

    <button v-on:click="deletePost($event)" v-if="this.$store.state.id == userIdCreated" class="delete-post">X</button>

  </article>

</template>

<script>
export default {
  name: 'ThePost',



  data(){
    return {
      // data back end
      ID : "",
      userIdCreated : "",
      title : '',
      date : '',
      picture : '',
      content : '',
      comment : [],
      likes : [], // listes des identifiants utilisateurs ayant like
      dislikes : [], // listes des identifiants utilisateurs ayant dislike
      newComment : '',
      // class
      commentView : "comment comment-hide",
      contentView : "content"
    }
  },

  props: ["postId"],

  methods:{

    viewComment(){

      // Affichage de la section comment
      if (this.commentView == 'comment comment-hide') {
        this.commentView = "comment"
        this.contentView = "content content-hide"
      }

      // Affichage de la section content
      else {
        this.commentView = "comment comment-hide"
        this.contentView = "content"
      }

    },

    createComment(){
      
      this.$http.post("http://localhost:3000/api/comment/", {
        postId : this.ID,
        comment : this.newComment
      })
      .then(response => {
        console.log(response);
        this.comment.push({ "auteur": "", "commentaire": this.newComment, "id": response.data.insertId, "userId": this.$store.state.id } )
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

    },

    deletePost($event){
      console.log($event.target.parentNode);
      $event.target.parentNode.className = "ThePost post-disparate"
      this.$http.delete("http://localhost:3000/api/post/" + this.postId)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        // User not connected
        console.log(error.response.data.userConnected)
        if (error.response.data.userConnected == 'false') {
            alert("Veuillez vous connecter svp")
            this.$router.push("connect")
        }
        // ! User not connected
      })

    },

    like(){
      // add like
      if (!this.likes.includes(this.$store.state.id) && !this.dislikes.includes(this.$store.state.id)){
          // FRONT
          this.likes.push(this.$store.state.id)
          // BACK
          this.$http.post("http://localhost:3000/api/post/addlike", {
            postId : this.ID,
            value : "1"
          })
          .then(response => {
            console.log(response);
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

      else {
        // delete like
          // front
          let myIndex = this.likes.indexOf(this.$store.state.id);
          if (myIndex !== -1) {
              this.likes.splice(myIndex, 1);
          }
          // back
          this.$http.delete("http://localhost:3000/api/post/deletelike", { data: {postId : this.ID } } )
          .then(response => {
            console.log(response);
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

    },

    dislike(){

      if (!this.likes.includes(this.$store.state.id) && !this.dislikes.includes(this.$store.state.id)){

          console.log("On ajoute un dislike");
          this.dislikes.push(this.$store.state.id)
          this.$http.post("http://localhost:3000/api/post/addlike", {
            postId : this.ID,
            value : '-1'
          })
          .then(response => {
            console.log(response);
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

      else {
          console.log("On supprime un dislike");
          let myIndex = this.dislikes.indexOf(this.$store.state.id);
          if (myIndex !== -1) {
              this.dislikes.splice(myIndex, 1);
          }

          // back
          this.$http.delete("http://localhost:3000/api/post/deletelike", { data: {postId : this.ID } } )
          .then(response => {
              console.log(response);
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
  },

  mounted() {
      console.log(this.postId); // !!!!!!!!!! lecture d'une props

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
    height: 600px;
    width: 800px;
    border: 2px solid black;
    background-color: rgba(240, 248, 255, 0.768);
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  article header{
    border-bottom: 2px solid #000;
    height: 15%;
  }

  article main {
    height: 70%;
    position: relative;
  }

  article footer {
    width: 100%;
    height: 15%;
    border-top: 2px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .content{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: green;
    transition-duration: 0.5s;
  }

  .content-hide{
    transition-duration: 0.5s;
    transform: translateX(-100%);
  }

  .comment{
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: red;
    transition-duration: 0.5s;
    overflow: auto;
  }

  .comment-hide{
    transition-duration: 0.5s;
    transform: translateX(100%);
  }

  .comment__add{
    width: 100%;
    height: 15%;

  }

  .comment__form{
    width: 90%;
    height: 100%;
  }

  .comment_send{

  }

  footer i{
    margin-right: 10px;
  }

  article footer button{
    height: 100%;
    width: 33.3%;
    cursor: pointer;
    font-size: 30px;
  }

  /* bouton delete-post */
  .delete-post{
    position: absolute;
    right: 10px;
    top: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    font-size: 30px;
    cursor: pointer;
    border: 2px solid #FD2D01;
    color: white;
    text-shadow: 0px 0px 3px black;
  }
  /* disparition d'un article */
  .ThePost{
    opacity: 1;
    transition-duration: 0.5s;
  }
  .post-disparate{
    opacity: 0;
    transition-duration: 0.5s;
    display: none;
    transform: translateY(-100px);
  }

</style>
