<template>

  <article class="ThePost">

    <header v-bind:class="headerDelete">
      <button v-on:click="deletePost($event)" class="header__delete__btn">Supprimer</button>
      <button v-on:click="viewHeaderDelete" class="header__delete__btn">Annuler</button>
    </header>

    <header v-bind:class="headerPost">

      <div class="header__post__author">
        <img :src="pictureprofil" alt="photo de profil">
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

        <p class="content__view__text">{{ content }}</p>

        <hr>

        <img v-if="picture" class="content__picture" :src="picture" alt="Image du post">

      </section>

      <section v-bind:class="commentView">

        <article v-for="com in comment" :key="com.id" v-on:click.self="selectComment($event, com.commentaire, com.id, com.userId)" class="comment__child">
          <img :src="com.pictureprofil" alt="Photo de profil">
          <p class="comment__child__text">
            {{ com.commentaire }}
          </p>
          <p class="comment__child__author">{{ com.auteur }}</p>

          <button v-if="$store.state.id == com.userId || $store.state.admin == 1" v-on:click="deleteComment($event, com.id)" class="comment__edit--delete"><i class="fa-solid fa-trash"></i></button>

        </article>
        <p class="comment__child__counter"> {{ newComment.length }} /300</p>

      </section>

      <section v-bind:class="updateView">
        <label for="titre">Titre du post {{ title.length }} / 70</label>
        <input required maxlength="70" v-model="title" id="titre" name="titre" type="text">

        <label for="content">Contenu {{ content.length }} / 500</label>
        <textarea required maxlength="500" v-model="content" name="content" id="content" cols="30" rows="10"></textarea>

        <label for="file">file</label>
        <input @change="onChange" type="file" name="file" id="file">
      </section>

    </main>
    
    <footer class="footer__post">

      <div v-bind:class="footerContent">

        <button v-on:click="like"><i class="fa-solid fa-thumbs-up"></i> {{ likes.length }}</button>
        <button v-on:click="viewCommentFromContent"><i class="fa-solid fa-comment"></i>{{ comment.length }}</button>
        <button v-on:click="viewUpdateFromContent" v-if="$store.state.id == userIdCreated || $store.state.admin == 1"><i class="fa-solid fa-pen-to-square"></i></button>

      </div>

      <div v-bind:class="footerComment">

        <button v-on:click="viewContentFromContent"><i class="fa-solid fa-arrow-left"></i></button>
        <textarea v-model="newComment" maxlength="300" name="" id="" cols="30" rows="10"></textarea>
        <button v-on:click="createComment" class="comment__send"> <i class="fa-solid fa-comment-dots"></i> </button>

      </div>

      <div v-bind:class="footerUpdate">
        <button v-on:click="viewContentFromUpdate"><i class="fa-solid fa-arrow-left"></i></button>
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
      contentView : "content__view",
      commentView : "comment__view to-left",
      updateView : "update__view to-right",
      // class footer post
      footerContent : 'footer__content',
      footerComment : 'footer__comment to-left',
      footerUpdate : 'footer__update to-right',
      // class update comment
      clsUpdateComment : 'false',
      // variable update comment
      selectedComment : null,
      // image input file
      picturePost : null
    }
  },

  props: ["postId"],

  methods:{

    refreshPost(){
      console.log(this.postId); // !! lecture d'une props

      this.$http.get(`http://localhost:3000/api/post/${this.postId}`)
      .then(response => {
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

    viewCommentFromContent(){
      // MAIN
      this.commentView = "comment__view"
      this.contentView = "content__view to-right"
      // FOOTER
      this.footerComment = 'footer__comment'
      this.footerContent = 'footer__content to-right'
    },

    viewContentFromContent(){
      // MAIN
      this.commentView = "comment__view to-left"
      this.contentView = "content__view"
      // FOOTER
      this.footerComment = 'footer__comment to-left'
      this.footerContent = 'footer__content'
    },

    viewUpdateFromContent(){
      // MAIN
      this.updateView = "update__view"
      this.contentView = "content__view to-left"
      // FOOT
      this.footerUpdate = "footer__update"
      this.footerContent = 'footer__content to-left'
    },

    viewContentFromUpdate(){
      // MAIN
      this.updateView = "update__view to-right"
      this.contentView = "content__view"
      // FOOT
      this.footerUpdate = "footer__update to-right"
      this.footerContent = 'footer__content'
    },


    createComment(){

      if (this.newComment.length <= 300 ) {
        alert("okay")
          // IF UPDATE COMMENT
          if (this.selectedComment && this.newComment){
            this.$http.put("http://localhost:3000/api/comment/" + this.selectedComment, {
              comment : this.newComment
            })
            .then( () => {
              this.refreshPost()
              document.querySelector('.selectComment').className = "comment__child"
              this.selectedComment = null
              this.newComment = ""
            })
            .catch(error => {
              // User not connected
              if (error.response.data.userConnected == 'false') {
                  alert("Veuillez vous connecter svp")
                  this.$router.push("connect")
              }
              // ! User not connected
            })
          }

          // CREATE COMMENT 
          else if (this.newComment){
            this.$http.post("http://localhost:3000/api/comment/", {
              postId : this.ID,
              comment : this.newComment
            })
            .then(response => {
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
          }
      }

     else {
      alert("Veuillez ne pas dépasser 300 caractères par commentaire svp !")
     } 

  },

    selectComment($event, commentaire, id, userId){
      
      if (this.$store.state.id == userId) {
        // deselect
        if (this.selectedComment == id) {
          $event.target.className = "comment__child"
          this.newComment = ""
          this.selectedComment = null
        }

        // Comment already selected
        else if (this.selectedComment){
          document.querySelector('.selectComment').className = "comment__child"
          $event.target.className = "comment__child selectComment"
          this.selectedComment = id
          this.newComment = commentaire
        }

        else {
          $event.target.className = "comment__child selectComment"
          this.selectedComment = id
          this.newComment = commentaire
        }
      }

    },

    deleteComment($event, id){

      this.$http.delete("http://localhost:3000/api/comment/" + id)
        // eslint-disable-next-line
      .then( () => {
        this.refreshPost()
      })
      .catch(error => {
        // User not connected
        if (error.response.data.userConnected == 'false') {
            alert("Veuillez vous connecter svp")
            this.$router.push("connect")
        }
        // ! User not connected
      })
    },

    updatePost(){
    if (this.title.trim() && this.title.length <= 70 &&  this.content.trim() && this.content.length <= 500) {
      // UPDATE WITH IMAGE
      if (this.picturePost){
        const formData = new FormData()
        formData.append('picturePost', this.picturePost)
        formData.append('title', `${this.title}`)
        formData.append('content', `${this.content}`)
        this.$http.put(`https://localhost:3001/api/post/${this.ID}`, formData, {})
        .then(() => {
          this.refreshPosts()
          this.picturePost = null
        })
        .catch(err => console.log(err))
      }

      else {
        this.$http.put("http://localhost:3000/api/post/" + this.ID, {
          content: this.content,
          title: this.title
        })

        .then( () => {
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
      }
    }

    else {
      alert("Veuillez respecter les conditions de chaque champs svp !")
    }

  },

    deletePost($event){
      this.$http.delete("http://localhost:3000/api/post/" + this.postId)
      .then(() => {
        $event.target.parentNode.parentNode.parentNode.style.display = "none"
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
      .then( () => {
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

    onChange(event) {
      this.picturePost = event.target.files[0]
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
    border-radius: 5px;
    background-color: rgba(240, 248, 255, 0.768);
    overflow: hidden;
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
    z-index: 5;
    display: flex;
    justify-content: center;
    transition-duration: 0.3s;
  }

  .header__delete__hide{
    transform: translateY(-100%);
  }

  .header__delete__btn{
    width: 50%;
    height: 100%;
    cursor: pointer;
  }

  /* FOOTER POST */
  .footer__post{
    position: relative;
  }

  .footer__content{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    transition-duration: 0.5s;
  }

  .footer__comment{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .footer__comment button{
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    text-align: center;
  }

  .footer__comment button:hover{
    color: #FD2D01;
  }

  .footer__comment textarea{
    width: 70%;
    height: 80%;
    border-radius: 15px;
    outline: none;
    border: none;
  }

  /* END FOOTER POST */

  /* footer update post */

  .footer__update{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 0.5s;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  /* END footer update post */


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

  .content__view{
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    transition-duration: 0.5s;
    overflow-y: scroll;
    transition-duration: 0.5s;
  }

  .content__view__text{
    margin: 20px auto 10px auto;
  }

  hr{
    margin: 0px auto;
    width: 80%;
    border-top : 1.5px solid black
  }

  .content__picture{
    margin-top: 10px;
    width: 50%;
    height: auto;
    border-radius: 15px;
    border: 2px solid white;
  }

  .to-left{
    transform: translateX(-100%);
  }

  .to-right{
    transform: translateX(100%);
  }

  .update__view{
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
  }

  .comment__view{
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
    height: 100%;
  }

  .selectComment{
    border: 3px solid red;
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

  .comment__child__counter{
    color: #FD2D01;
    text-shadow: 0px 0px 5px white;
    position: absolute;
    bottom: 5%;
    right: 5%;
  }

  /* Suppression d'un commentaire */

  .comment__edit--delete {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 20px;
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
