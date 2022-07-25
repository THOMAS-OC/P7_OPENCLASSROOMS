<template>
  <div class="ThePost">
    <article>
      <h2>Un post hardcodé</h2>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ThePost',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  article{
    margin: 50px auto;
    height: 200px;
    width: 800px;
    border: 2px solid black;
  }
</style>
