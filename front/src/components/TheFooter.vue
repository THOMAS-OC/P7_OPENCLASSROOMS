<template>

    <footer class="footer">
        <img class="footer__img" src="../assets/logo_complet2.png" alt="">

    </footer>
    
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.footer{
    height: 300px;
    width: 100vw;
    background-color: #FFD7D7;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    clip-path: polygon(0 0, 100% 25%, 100% 100%, 0% 100%);
    box-shadow: 0px 0px 5px black;
}

.footer__img{
    width: 50%;
    min-width: 90vw
}

</style>
