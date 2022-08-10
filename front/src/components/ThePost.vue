<template>

  <article class="ThePost">

    <header v-bind:class="headerDelete">
      <button v-on:click="deletePost($event)" class="header__delete__btn">Supprimer</button>
      <button v-on:click="viewHeaderDelete" class="header__delete__btn">Annuler</button>
    </header>

    <header v-bind:class="headerPost">

      <div class="header__post__author">
        <img :src="pictureprofil" alt="test">
        <p> {{ name }} {{ firstname }} </p>
      </div>

      <div class="header__post__title">
        <h2> {{ title }} </h2>
        <p> {{ date }} </p>
      </div>

      <div class="header__post__btn">
        <button v-on:click="viewHeaderDelete" v-if="this.$store.state.id == userIdCreated || $store.state.admin == 1" class="delete-post">X</button>
      </div>

    </header>

    <main>

      <section v-bind:class="contentView">

        <p>{{ content }}</p>

      </section>

      <section v-bind:class="commentView">

        <article v-for="com in comment" :key="com.id" class="comment__child">
          <img :src="com.pictureprofil" alt="test">
          <p v-on:keyup="onInput" :contenteditable="clsUpdateComment" class="comment__child__text">
            {{ com.commentaire }}
          </p>
          <p class="comment__child__author">{{ com.auteur }}</p>

          <button v-if="$store.state.id == com.userId || $store.state.admin == 1" v-on:click="updateComment($event, com.id)" class="comment__edit comment__edit--update"><i class="fa-solid fa-pencil"></i></button>

          <button v-if="$store.state.id == com.userId || $store.state.admin == 1" v-on:click="deleteComment($event, com.id)" class="comment__edit comment__edit--delete"><i class="fa-solid fa-trash"></i></button>

        </article>

      </section>

      <section v-bind:class="updateView">
        <label for="titre">Titre du post</label>
        <input v-model="title" id="titre" name="titre" type="text">

        <label for="content">Contenu</label>
        <textarea v-model="content" name="content" id="content" cols="30" rows="10"></textarea>
      </section>

    </main>
    
    <footer class="footer__post">

      <div v-bind:class="footerBtn">

        <button v-on:click="like"><i class="fa-solid fa-thumbs-up"></i> {{ likes.length }}</button>
        <button v-on:click="viewComment"><i class="fa-solid fa-comment"></i>{{ comment.length }}</button>
        <button v-on:click="viewUpdate" v-if="$store.state.id == userIdCreated"><i class="fa-solid fa-pen-to-square"></i></button>

      </div>

      <div v-bind:class="footerInput">

        <button v-on:click="viewComment"><i class="fa-solid fa-arrow-left"></i></button>
        <textarea v-model="newComment" name="" id="" cols="30" rows="10"></textarea>
        <button v-on:click="createComment" class="comment__send"> <i class="fa-solid fa-comment-dots"></i> </button>

      </div>

      <div v-bind:class="footerUpdate">
        <button v-on:click="viewComment"><i class="fa-solid fa-arrow-left"></i></button>
        <button v-on:click="updatePost" class="comment__send"> <i class="fa-solid fa-pen-to-square"></i> </button>
      </div>

    </footer>

  </article>

</template>

<script>
export default {
  name: 'ThePost',

  data(){
    return {
      // data back end
      ID : "",
      admin : false,
      name : '',
      firstname : '',
      userIdCreated : "",
      title : '',
      date : '',
      picture : '',
      pictureprofil : '',
      content : '',
      comment : [],
      likes : [], // listes des identifiants utilisateurs ayant like
      newComment : '',
      // class header delete
      headerPost :  'header__post',
      headerDelete : 'header__delete header__delete__hide',
      // class main post
      commentView : "comment comment-hide",
      contentView : "content",
      updateView : "updateView",
      // class footer post
      footerBtn : 'footer__post__btn footer__post__visible',
      footerInput : 'footer__post__comment',
      footerUpdate : 'footer__post__update',
      // class update comment
      clsUpdateComment : 'false',
      // variable update comment
      textUpdateComment : ""
    }
  },

  props: ["postId"],

  methods:{

    refreshPost(){
      console.log(this.postId); // !!!!!!!!!! lecture d'une props

      this.$http.get(`http://localhost:3000/api/post/${this.postId}`)
      .then(response => {
        console.log("ADMIN ?");
        console.log(response.data.admin)
        this.ID = response.data.ID
        this.admin = response.data.admin
        this.name = response.data.name
        this.firstname = response.data.firstname
        this.userIdCreated = response.data.userIdCreated
        this.title = response.data.title
        this.date = response.data.date.slice(0,10)
        this.picture = response.data.picture || ""
        this.pictureprofil = response.data.pictureprofil
        this.content = response.data.content
        this.comment = response.data.comment
        this.likes = response.data.likes
      
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

    viewHeaderDelete(){
      if (this.headerDelete == 'header__delete header__delete__hide') {
        this.headerDelete = 'header__delete'
      }
      else {
        this.headerDelete = 'header__delete header__delete__hide'
      }
    },

    viewUpdate(){
      
      this.contentView = "content content-hide"
      this.updateView = "updateView updateView-show"
      this.footerBtn = "footer__post__btn"
      this.footerUpdate += "footer__post__visible"

    },



    viewComment(){

      // Affichage de la section comment et de l'input comment
      if (this.commentView == 'comment comment-hide') {

        // MAIN
        this.commentView = "comment"
        this.contentView = "content content-hide"
        this.updateView = "updateView"

        // FOOT
        this.footerBtn = "footer__post__btn"
        this.footerInput = "footer__post__comment footer__post__visible"
        this.footerUpdate = "footer__post__update"

      }

      // Affichage de la section content
      else {

        // MAIN
        this.commentView = "comment comment-hide"
        this.contentView = "content"

        // FOOT
        this.footerBtn = "footer__post__btn footer__post__visible"
        this.footerInput = "footer__post__comment"
      }

    },

    createComment(){
      
      this.$http.post("http://localhost:3000/api/comment/", {
        postId : this.ID,
        comment : this.newComment
      })
      .then(response => {
        console.log(this.ID);
        console.log(response);
        this.comment.push({ "auteur": this.$store.state.name + " " + this.$store.state.firstName, "pictureprofil":this.$store.state.pictureprofil, "commentaire": this.newComment, "id": response.data.insertId, "userId": this.$store.state.id } )
        this.newComment = ''
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

    onInput(e) {
      this.textUpdateComment = e.target.innerText;
      console.log(e.target.innerText);
    },

    updateComment($event, id){
      if (this.clsUpdateComment == 'false'){
        alert("On modifie")
        console.log($event.target);
        this.clsUpdateComment = 'true'
      }

      else {
        alert("On enregistre")
        this.clsUpdateComment = 'false'
        this.$http.put("http://localhost:3000/api/comment/" + id, {
          comment : this.textUpdateComment
        })
        .then(response => {
          console.log(response);
          this.refreshPost()
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
      }
    },

    deleteComment($event, id){

      this.$http.delete("http://localhost:3000/api/comment/" + id)
      .then(response => {
        console.log(response);
        this.refreshPost()
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

    updatePost(){

      this.$http.put("http://localhost:3000/api/post/" + this.ID, {
        newContent: this.content,
        newTitle: this.title
      })
      .then(response => {
        console.log(response);
        this.refreshPost()
        this.viewComment()
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

    deletePost($event){
      console.log($event.target.parentNode.parentNode.parentNode);
      $event.target.parentNode.parentNode.parentNode.style.display = "none"
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
      this.$http.post("http://localhost:3000/api/post/like", {
          postId : this.ID,

      })
      .then(response => {
          console.log(response);
          this.refreshPost()
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

  },

  mounted() {

    this.refreshPost()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .ThePost{
    opacity: 1;
    transition-duration: 0.5s;
    position: relative;
    margin: 50px auto;
    height: 600px;
    max-width: 90vw;
    width: 800px;
    border: 2px solid black;
    background-color: rgba(240, 248, 255, 0.768);
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    animation-name: fondu;
    animation-duration: 1s;
  }


  @keyframes fondu {
    0%{
      opacity: 0;
    }    
    100%{
      opacity: 1;
    }
  }

  /* HEADER POST */
  .header__post{
    border-bottom: 2px solid #000;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__post__author{
    width: 25%;
    height: 100%;
    display: flex;
    padding: 5px;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
  }

  .header__post__author img {
    border: 1px solid #FD2D01;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: contain;
  }

  .header__post__title{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0;
    width: 50%;
    height: 100%;
  }

  .header__post__title p {
    font-style: italic;
  }

  .header__post__btn{
    width: 25%;
    height: 100%;
    position: relative;
  }
  /* END HEADER POST */

  /* HEADER DELETE */

  .header__delete{
    position: absolute;
    height: 15%;
    width: 100%;
    background-color: red;
    z-index: 5;
    display: flex;
    justify-content: center;
  }

  .header__delete__hide{
    transform: translateX(-100%);
  }

  .header__delete__btn{
    width: 50%;
    height: 100%;
  }

  /* FOOTER POST */
  .footer__post{
    position: relative;
  }

  .footer__post__btn{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    transition-duration: 0.5s;
    transform: translateX(-100%);
  }

  .footer__post__comment{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    transform: translateX(100%);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .footer__post__comment button{
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    text-align: center;
  }

  .footer__post__comment button:hover{
    color: #FD2D01;
  }

  .footer__post__comment textarea{
    width: 70%;
    height: 80%;
    border-radius: 15px;
    outline: none;
    border: none;
  }

  /* footer update post */

  .footer__post__update{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    transform: translateX(100%);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  /* END footer update post */

  .footer__post__visible{
      transform: translateX(0%);
  }
  /* END FOOTER POST */

    /* bouton delete-post */
  .delete-post{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    font-size: 30px;
    cursor: pointer;
    border: 2px solid #FD2D01;
    color: white;
    text-shadow: 0px 0px 3px black;
  }

  article main {
    height: 70%;
    position: relative;
  }

  article footer {
    width: 100%;
    height: 15%;
    border-top: 2px solid red;
  }

  .content{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    transition-duration: 0.5s;
  }

  .content-hide{
    transition-duration: 0.5s;
    transform: translateX(-100%);
  }

  .updateView{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    transition-duration: 0.5s;
    transform: translateX(-100%);
  }

  .updateView-show{
    z-index: 3;
    transform: translateX(0%);
  }

  .comment{
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    transition-duration: 0.5s;
    overflow-y: scroll;
    padding-left: 3%;
    padding-top: 1%;
  }

  .comment-hide{
    transition-duration: 0.5s;
    transform: translateX(100%);
  }

  /* Affichage d'un commentaire */
  .comment__child{
    background-color: white;
    display: flex;
    align-items: flex-start;
    width: 70%;
    border-radius: 15px;
    margin-top: 30px;
    position: relative;
  }

  .comment__child img {
    height: 50px;
    width: 50px;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 5px;
  }

  .comment__child__text {
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: left;
    width: 80%;
  }
  /* FIN Affichage d'un commentaire */

  /* affichage auteur d'un commentaire */
  .comment__child__author{
    position: absolute;
    left: 0;
    bottom: -25px;
    transform: translateY(-50%);
    font-size: 12px;
    font-style: italic;
  }

  /* Suppression d'un commentaire */

  .comment__edit{
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .comment__edit--delete {
    right: -60px;
  }

  /* Suppression d'un commentaire */
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
    width: 50%;
    cursor: pointer;
    font-size: 30px;
  }


  /* disparition d'un article */

  .post-disparate{
    opacity: 0;
    transition-duration: 0.5s;
    display: none;
    transform: translateY(-100px);
  }

</style>
