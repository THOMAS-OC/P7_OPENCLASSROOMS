import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    id: "",
    admin: 0,
    name: "",
    firstName: "",
    email : "",
    pictureprofil: '',
    nbPosts : 0
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.id = user.id || state.id
      state.admin = user.admin || state.admin
      state.name = user.name || state.name
      state.firstName = user.firstName || state.firstName
      state.email = user.email || state.email
      state.pictureprofil = user.pictureprofil || state.pictureprofil
    },
    setPictureProfil(state, user) {
      state.pictureprofil = user.pictureprofil
    },
    clearUser(state){
      state.id = "",
      state.admin = 0,
      state.name = "",
      state.firstName = "",
      state.email = "",
      state.pictureprofil = ''
    },
    setNbPosts(state, nbPosts){
      state.nbPosts = nbPosts
    },
    decrementNbposts(state){
      state.nbPosts = state.nbPosts - 1
    },
  },
  actions: {
  },
  modules: {
  }
})
