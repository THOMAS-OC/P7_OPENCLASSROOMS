<template>
  <div class="ThePost">
    <article>
      <h2>{{authorPost}}</h2>
      <p>{{contentPost}}</p>
      <small>{{datePost}}</small>
      <small class="id">{{postId}} </small>
      <button v-on:click="readComments()">READ</button>
      <section>

      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ThePost',

  data(){
    return {
      commentaires : [],
      test : [1,2,3]
    }
  },

  props: ["datePost", "authorPost", "contentPost", "picturePost", "postId"],


  mounted() { 

    this.$http.get("http://localhost:3000/api/comment/" + document.querySelector(".id").innerText)
    .then(response => {
      for (let comment of response["data"]){

        let newComment = document.createElement("p")
        newComment.innerText = comment.comment
        document.querySelector("section").appendChild(newComment)
      }
    })
    .catch(error => console.log(error))
    
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  article{
    position: relative;
    margin: 50px auto;
    height: 200px;
    width: 800px;
    border: 2px solid black;
    background-color: rgba(240, 248, 255, 0.768);
  }

  article section{
    border-top: 2px solid red;
    height: 100px;
  }

</style>
