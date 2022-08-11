<template>
  <section class="home">

    <div v-on:click="viewForm" class="btnCreatePost">
      <div></div>
      <div></div>
    </div>

    <form v-on:submit.prevent="createPost" class="createPost formInvisible">
      <input required v-model="title" placeholder="Titre" type="text">
      <textarea required v-model="content" placeholder="Contenu de votre post" name="" id="" cols="30" rows="10"></textarea>
      <label aria-label="append image file" class="create__post__file" for="file"><i :class="buttonFile"></i></label>
      <input v-if="!picturePost" type="file" name="file" id="file" @change="appendPicture">
      <input id="file" type="file" v-else-if="picturePost" @click.prevent="deletePicture">

      <p>{{ nameFile }}</p>
      <input class="create__post__submit" type="submit" value="Poster">
      <!-- Bouton d'affichage -->
      <button v-on:click.prevent="hideForm">X</button>
    </form>

    <section class="post__list">

      <article class="post" v-for="post in posts" :key="post">

        <the-post :class='post' :postId="post"></the-post>

      </article>

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
      title : "",
      content : "",
      picturePost : null,
      nameFile : null,
      // class button file in form
      buttonFile : "fa-solid fa-arrow-up-from-bracket",
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
      this.picturePost = event.target.files[0]
      this.nameFile = event.target.files[0].name
      this.buttonFile = "fa-solid fa-ban"
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

    returnUserId(){
      return window.localStorage.getItem("id")
    },

    createPost(){

      if (this.picturePost){
          const formData = new FormData()
          formData.append('picturePost', this.picturePost)
          formData.append('title', `${this.title}`)
          formData.append('content', `${this.content}`)
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
    },


    viewForm(){
      // HIDE
      if (document.querySelector("form").className == "createPost formVisible"){
        this.hideForm()
      }
      // SHOW
      else {
        document.querySelector("form").className = "createPost formVisible"
        document.querySelector(".post__list").className = "post__list section-replace"
      }
    },

    hideForm(){
      document.querySelector("form").className = "createPost formInvisible"
      document.querySelector(".post__list").className = "post__list"
    }

  }

}
</script>

<style scoped>

  h2{
    color: red;
  }

  .post__list {
    height: auto;
    transition-duration: 1s;
    transform: translateY(-500px);
  }
  /* classe pour déplacer la section des posts vers le bas */

  .section-replace {
    transform: translateY(0px);
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
    height: 600px;
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
    overflow: hidden;
    padding-bottom: 50px;
  }

  .createPost button{
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
  }

  input[type="file"]{
    display: none;
  }

  .create__post__file{
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

  .create__post__submit{
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

  .create__post__submit:hover{
    letter-spacing: 15px;
  }

  textarea{
    height: 70%;
    width: 100%;
    resize: none;
  }

  .formVisible{
    opacity: 1;
    transform: scaleY(1);
    transition-duration: 1s;
  }

  .formInvisible{
    opacity: 0;
    transform: scaleY(0);
    transition-duration: 1s;
  }

  /* FIN FORMULAIRE CREATION DE POSTE */

</style>