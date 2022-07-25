<template>
  <div class="ThePost">
    <article>
      <h2>{{authorPost}}</h2>
      <p>{{contentPost}}</p>
      <small>{{datePost}}</small>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ThePost',

  props: ["datePost", "authorPost", "contentPost", "picturePost"],

  
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

</style>
