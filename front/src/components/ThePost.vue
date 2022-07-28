<template>

  <article class="ThePost">
    <header>
      <h3> {{ title }} </h3>
    </header>

    <main>
      <p>{{ content }}</p>
    </main>
    
    <footer>
      <button v-on:click="like"><i class="fa-solid fa-thumbs-up"></i> {{ likes.length }}</button>
      <button v-on:click="dislike"><i class="fa-solid fa-thumbs-down"></i>{{ dislikes.length }}</button>
      <button><i class="fa-solid fa-comment"></i>{{ comment.length }}</button>
    </footer>

    <button v-if="this.$store.state.id == userIdCreated" class="delete-post">X</button>

  </article>

</template>

<script>
export default {
  name: 'ThePost',



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

  methods:{

    like(){
      // add like
      if (!this.likes.includes(this.$store.state.id) && !this.dislikes.includes(this.$store.state.id)){
          // FRONT
          this.likes.push(this.$store.state.id)
          // BACK
          this.$http.post("http://localhost:3000/api/post/addlike", {
            userId : this.$store.state.id,
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
          this.$http.delete("http://localhost:3000/api/post/deletelike", { data: { userId : this.$store.state.id, postId : this.ID } } )
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

      if (this.likes.includes(this.$store.state.id)){
          let myIndex = this.likes.indexOf(this.$store.state.id);
          if (myIndex !== -1) {
              this.dislikes.splice(myIndex, 1);
          }
          // back
          this.$http.delete("http://localhost:3000/api/post/deletelike", { data: { userId : this.$store.state.id, postId : this.ID } } )
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

      if (!this.likes.includes(this.$store.state.id) && !this.dislikes.includes(this.$store.state.id)){
          console.log("On ajoute un dislike");
          this.dislikes.push(this.$store.state.id)
          this.$http.post("http://localhost:3000/api/post/addlike", {
            userId : this.$store.state.id,
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
          this.$http.delete("http://localhost:3000/api/post/deletelike", { data: { userId : this.$store.state.id, postId : this.ID } } )
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
