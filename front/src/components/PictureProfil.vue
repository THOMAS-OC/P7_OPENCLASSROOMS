<template>



    <form class="picture__profil">

        <img :src="$store.state.pictureprofil" alt="Photo de profil">

        <input v-if="currentPictureProfil == 'profil_vierge.jpg'" type="file" class="picture__profil__submit" name="pictureProfil" @change="onChange">
        <input v-else class="picture__profil__submit" type="submit" value="" v-on:click="deletePictureProfil">

        <i v-if="currentPictureProfil == 'profil_vierge.jpg'" class="picture__profil__icon fa-solid fa-file-arrow-up"></i>
        <i v-else class="picture__profil__icon fa-solid fa-circle-minus"></i>

    </form>

    
</template>

<script>

export default {
  name: 'PictureProfil',

  data(){
    return {
        pictureProfil: null,
        currentPictureProfil : this.$store.state.pictureprofil.slice(29,)
    }
  },

  methods:{

    onChange(event) {
        let extension = event.target.files[0].type.slice(6,)
        let extensionsAuthorize = ["jpeg", "png", "gif", "jpg", "webp"]
        if (extensionsAuthorize.includes(extension)){
            this.pictureProfil = event.target.files[0]
            this.updatePictureProfil()
        }
        else {
            alert("Format non accepté !")
        }

    },

    updatePictureProfil(){
        const formData = new FormData()
        formData.append('ProfilPicture', this.pictureProfil)
        this.$http.post(`http://localhost:3000/api/user/${this.$store.state.id}`, formData, {})
        .then((response) => {
            this.$store.commit('setPictureProfil', {pictureprofil:response.data.pictureProfil})
            this.currentPictureProfil = response.data.pictureProfil
            window.location.reload()
        })
        .catch(err => console.log(err))
    },

    deletePictureProfil(){
        this.$http.delete(`http://localhost:3000/api/user/pictureprofil`)
        .then(() => {
            this.$store.commit('setPictureProfil', {pictureprofil:"http://localhost:3000/images/profil_vierge.jpg"})
            this.currentPictureProfil = "profil_vierge.jpg"
            this.pictureProfil = null
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .picture__profil {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin: 20px auto;
        overflow: hidden;
        position: relative;
        cursor: pointer;
    }

    .picture__profil img {
        object-fit: cover;
        border-radius: 50%;
        height: 100%;
        width: 100%;
    }

    .picture__profil__submit{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        opacity: 0;
        cursor: pointer;
    }

    .picture__profil__icon{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1);
        z-index: 1;
        border-radius: 50%;
        font-size: 50px;
        line-height: 200px;
        transition-duration: 0.5s;
        background-color: #FD2D01;
        opacity: 0;
        color: white;
    }

    .picture__profil:hover .picture__profil__icon{
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.7;
        text-shadow: 0px 0px 20px#000000;
    }

    .picture__profil:hover img{
        filter:brightness(0.7)
    }

    @media only screen and (max-width : 1000px) {
        .picture__profil__icon{
        opacity: 0.5;
        }
    } 

</style>

