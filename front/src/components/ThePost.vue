<template>
  <div class="ThePost">

    <article>

      <h2 class="id">{{postId}} </h2>

    </article>

  </div>
</template>

<script>
export default {
  name: 'ThePost',

  data(){
    return {
      commentaires : [],
    }
  },

  props: ["postId"],


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
