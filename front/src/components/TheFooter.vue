<template>

    <footer class="footer">
        <img class="footer__img" src="../assets/logo_complet2.png" alt="">
        <nav>
            <ul class="footer__nav">
                <li>Règlements</li>
                <li>Guides</li>
                <li>toto</li>
            </ul>
        </nav>
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
    align-items: center;
    justify-content: space-around;
}

.footer__img{
    width: 50%;
    min-width: 350px;
}

nav{
    width: 50%;
}

.footer__nav{
    list-style-type: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

</style>
