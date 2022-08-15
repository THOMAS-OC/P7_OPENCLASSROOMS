<template>
  <section class="home">



    <div v-on:click="viewForm" class="btn__view__form">
      <div></div>
      <div></div>
    </div>

    <form class="form__filter">
      <label class="form__filter__label" for="filtre">Filtre</label>
      <input placeholder="search" class="form__filter__input" v-model="filter" v-on:keyup="filterPost" v-on:input="filterPost" type="search" name="filtre" id="filtre">
    </form>

    <form v-on:submit.prevent="createPost" :class="classForm">
      <label for="title">Titre {{ title.length }} / 70</label>
      <input maxlength="70" id="title" name="title" required v-model="title" placeholder="Titre" type="text">
      <label for="content">Message {{ content.length }} / 500</label>
      <textarea class="form__post__content" maxlength="500" required v-model="content" placeholder="Contenu de votre post" name="content" id="content" cols="30" rows="10"></textarea>
      <label aria-label="append image file" class="form__post__file" for="file"><i :class="buttonFile"></i></label>
      <input v-if="!picturePost" type="file" name="file" id="file" @change="appendPicture">
      <input id="file" type="file" v-else-if="picturePost" @click.prevent="deletePicture">
      <p>jpg, png, gif, webp</p>
      <p>{{ nameFile }}</p>
      <input class="form__post__submit" type="submit" value="Poster">
      <!-- Bouton d'affichage -->
      <button v-on:click.prevent="hideForm">X</button>
    </form>

    <section :class="postList">

        <the-post class="post" v-for="post in posts" :key="post" :class='post' :postId="post"></the-post>

    </section>

  </section>
</template>

<script>
import ThePost from '@/components/ThePost.vue'

export default {
  name: 'HomeView',

  data(){
    return {
      posts : [],
      filter : "",
      title : "",
      content : "",
      picturePost : null,
      nameFile : null, // name file of picture
      buttonFile : "fa-solid fa-arrow-up-from-bracket", // class button file in form
      classForm : "form__post form__post--hide", // class button file in form
      postList : "post__list" // class list of posts
    }
  },

  components: {
    ThePost
  },

  mounted(){
    this.$http.get("https://localhost:3001/api/auth/checkconnect")
    .then(()=>this.refreshPosts())
    .catch(err => {
        console.log(err);
        alert('Veuillez vous connecter svp.')
        this.$router.push('connect')
    })
    
  },

  created: function () {
    document.title = "Forum / GROUPOMANIA"
  },

  methods:{

    appendPicture(event) {
      let extension = event.target.files[0].type.slice(6,)
      let extensionsAuthorize = ["jpeg", "png", "gif", "jpg", "webp"]
      console.log(extension);
      if (extensionsAuthorize.includes(extension)){
        this.picturePost = event.target.files[0]
        this.nameFile = event.target.files[0].name
        this.buttonFile = "fa-solid fa-ban"
      }
      else {
        alert("Format non accepté !")
      }
    },

    deletePicture(){
    // delete picture post
      this.picturePost = null
      this.nameFile = null
      this.buttonFile = "fa-solid fa-arrow-up-from-bracket"
    },

    refreshPosts(){
      // this.posts = []
      this.$http.get("https://localhost:3001/api/post")
      .then(response => {
          this.posts = response.data
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

    filterPost(){

      if (this.filter) {
        this.posts = []
        // this.posts = []
        this.$http.get(`https://localhost:3001/api/post/filter/${this.filter}`)
        .then(response => {
            this.posts = response.data
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

      else {
        this.refreshPosts()
      }
      
    },

    returnUserId(){
      return window.localStorage.getItem("id")
    },

    createPost(){

      if (this.title.trim() && this.title.length <= 70 &&  this.content.trim() && this.content.length <= 500) {
        
        if (this.picturePost){
            const formData = new FormData()
            formData.append('picturePost', this.picturePost)
            formData.append('title', `${this.title.trim()}`)
            formData.append('content', `${this.content.trim()}`)
            this.$http.post(`https://localhost:3001/api/post/`, formData, {})
            .then(() => {
              this.refreshPosts()
              this.picturePost = null
              this.nameFile = null
              this.buttonFile = "fa-solid fa-arrow-up-from-bracket"
            })
            .catch(err => console.log(err))
        }

        // REQUETE POST WITHOUT PICTURE
        else {
          this.$http.post("https://localhost:3001/api/post/", {
            title : this.title,
            content : this.content,
          })
          .then(() => this.refreshPosts())
          .catch(error => {
            // User not connected
            if (error.response.data.userConnected == 'false') {
                alert("Veuillez vous connecter svp")
                this.$router.push("connect")
            }
            // ! User not connected
          })
        }

        // RESET FORM
        this.picturePost = null
        this.title = ""
        this.content = ""
        window.setTimeout(this.hideForm, 500)
      }

      else {
        alert("Veuillez respecter les conditions des champs svp")
      }


  },


    viewForm(){
      // HIDE
      if (this.classForm == "form__post formVisible"){
        this.hideForm()
      }
      // SHOW
      else {
        this.classForm = "form__post formVisible"
        this.postList = "post__list post__list--replace"
      }
    },

    hideForm(){
      this.classForm = "form__post form__post--hide"
      this.postList = "post__list"
    }

  }

}
</script>

<style scoped>

  .form__filter {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .form__filter__label{
    color: white;
    font-size: 25px;
    font-style: italic;
    text-decoration: underline;
    font-weight: bold;
    letter-spacing: 8px;
  }

  .form__filter__input{
    padding: 5px;
    width: 400px;
    max-width: 95vw;
    height: 50px;
    border-radius: 30px;
    background-color: #ffffff97;
    border-bottom: 3px solid white;
    font-size: 30px;
    color: #FD2D01;
  }

  .post__list {
    height: auto;
    transition-duration: 1s;
    transform: translateY(-500px);
  }
  /* classe pour déplacer la section des posts vers le bas */

  .post__list--replace {
    transform: translateY(0px);
  }

  /* BOUTTON CREATION DE POSTE */

  .btn__view__form{
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

  .btn__view__form:hover{
    transform: scale(1.1);
    box-shadow: 0px 0px 30px #FD2D01;
  }

  .btn__view__form div{
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

  .btn__view__form div:nth-child(2){
    transform: translate(-50%, 50%) rotate(90deg) scale(0.8);
  }

  /* FIN BOUTTON CREATION DE POSTE */

  /* FORMULAIRE CREATION DE POSTE */

  .form__post{
    width: 500px;
    height: 600px;
    max-width: 95vw;
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
    opacity: 1;
    transform: scale(1);
    overflow: hidden;
    padding-bottom: 50px;
  }

  .form__post button{
    position: absolute;
    right: 5px;
    top: 5px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #FD2D01;
    color: white;
    font-weight: bold;
    cursor: pointer;
    font-size: 20px;
    transform: scaleY(1);
    transition-duration: 1s;
  }

  input[type="file"]{
    display: none;
  }

  .form__post__file{
    cursor: pointer;
    line-height: 50px;
    width: 50px;
    height: 50px;
    font-size: 25px;
    color: white;
    text-shadow: 0px 0px 3px white;
    border-radius: 50%;
    background: rgb(253,45,1);
    background: linear-gradient(90deg, rgba(253,45,1,1) 0%, rgba(253,82,1,1) 100%); 
  }

  .form__post__submit{
    cursor: pointer;
    background: rgb(253,45,1);
    background: linear-gradient(90deg, rgba(253,45,1,1) 0%, rgba(253,82,1,1) 100%); 
    transition-duration: 1s;
    transform: translateX(-2.5%);
    border: none;
    width: 105%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    text-shadow: 0px 0px 3px white;
    font-size: 25px;
    letter-spacing: 10px;
    box-shadow: 0px -3px 3px rgb(123, 123, 123);
  }

  .form__post__submit:hover{
    background: rgb(253,45,1);
    background: linear-gradient(-90deg, rgba(253,45,1,1) 0%, rgba(253,82,1,1) 100%); 
  }

  .form__post__content{
    height: 60%;
    width: 100%;
    resize: none;
  }

  .form__post--hide{
    opacity: 0;
    transform: scaleY(0);
    transition-duration: 1s;
  }

  /* FIN FORMULAIRE CREATION DE POSTE */

</style>