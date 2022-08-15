<template>

    <form class="form__delete">
        <button v-if="$store.state.admin != 1" v-on:click="viewModal=!viewModal" class="form__delete__view">Supprimer mon compte</button>
        <form v-if="viewModal == true" class="modal__delete">
            <p>êtes-vous sûr de vouloir supprimer votre compte ? </p>
            <input type="submit" v-on:click="deleteAccount(true)" class="modal__delete__confirm" value="Supprimer">
            <input type="submit" v-on:click="deleteAccount(false)" class="modal__delete__cancel" value="Annuler">
        </form>
    </form>
    
</template>

<script>

export default {
  name: 'DeleteAccount',

  data(){
    return {
        pictureProfil: null,
        viewModal: false
    }
  },

  methods:{


    deleteAccount(confirm){
        if(confirm){
            this.$http.delete("http://localhost:3000/api/user", { data: {} })
            .then(() => this.$router.push('register'))
            .catch(error => {
                console.log(error)
            })
        }
        else{
            this.viewModal = false
        }
    },


  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    .form__delete__view{
        border-color: #FD2D01;
        height: 50px;
        width: 200px;
        margin-bottom: 70px;
        cursor: pointer;
    }

    .modal__delete{
        margin: 50px auto;
        max-width: 90vw;
        width: 500px;
        border-radius: 15px;
        border: 2px solid #FD2D01;
        text-align: center;
        font-size: 25px;
        overflow: hidden;
        line-height: 35px;
        background-color: rgba(255, 255, 255, 0.788);
        position: relative;
        animation-name: modalAnimate;
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    @keyframes modalAnimate {
        0%{
            opacity: 0;
            height: 0;
            transform: scale(0);
        }
        100%{
            opacity: 1;
            height: 150px;
            transform: scale(1);
        }
    }

    .modal__delete__confirm{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50%;
        height: 30px;
        background-color: green;
        cursor: pointer;
    }

    .modal__delete__cancel{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 50%;
        height: 30px;
        background-color: red;
        cursor: pointer;
    }

</style>

