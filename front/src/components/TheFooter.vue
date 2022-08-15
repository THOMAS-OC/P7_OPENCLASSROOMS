<template>

    <footer class="footer">
        <img class="footer__img--text" src="../assets/logo_complet2.png" alt="">
        <img class="footer__img--form" src="../assets/logo.png" alt="">
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
    position: relative;
    overflow: hidden;
}

.footer__img--text{
    position: absolute;
    top: 50%;
    left: 20%;
    width: 50%;
    width: 500px;
    max-width: 90vw;
}

.footer__img--form {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    height: 200px;
    width: 200px;
    border-radius: 50%;
}

@media only screen and (max-width : 1200px) {
    .footer__img--form{
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
    }

    .footer__img--text {
        top: 70%;
        transform: translateX(-50%);
        left: 50%;
    }

} 

</style>
